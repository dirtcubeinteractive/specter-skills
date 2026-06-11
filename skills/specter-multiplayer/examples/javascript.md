# JavaScript — full matchmaking flow (socket.io-client)

```js
import { io } from "socket.io-client";

// staging: https://staging.multiplayer.specterapp.xyz
const WS_URL = "https://multiplayer.specterapp.xyz";

export function connectMultiplayer({ accessToken, apiKey, onState }) {
  const socket = io(WS_URL, {
    transports: ["websocket"],
    auth: { token: accessToken, apiKey, type: "client" },
  });

  // --- queue lifecycle ---
  socket.on("queue:joined",  (d) => onState({ phase: "queued", ...d }));
  socket.on("queue:status",  (d) => onState({ phase: "queued", position: d.position, eta: d.estimatedWaitTime }));
  socket.on("queue:timeout", (d) => onState({ phase: "idle", error: "queue timeout" }));

  // --- ready check ---
  socket.on("match:found", (d) => {
    onState({ phase: "ready-check", timeout: d.acceptTimeout, players: d.players });
    // auto-accept here, or wire to an Accept button:
    socket.emit("matchmaking:accept-match", { matchId: d.pendingMatchId });
  });
  socket.on("match:playerStatus", (d) =>
    onState({ phase: "ready-check", accepted: d.acceptedCount, total: d.totalRequired }));
  socket.on("match:cancelled", () => onState({ phase: "idle", error: "match cancelled" }));

  // --- confirmed → game server handoff ---
  socket.on("match:confirmed", (d) => onState({ phase: "confirmed", sessionId: d.sessionId }));
  socket.on("match:server-ready", (d) =>
    onState({ phase: "connect-to-game", server: d.serverInfo /* {ip, port, connectionToken} */ }));

  // --- in-match ---
  socket.on("match:started", (d) => onState({ phase: "playing", session: d.matchSessionId }));
  socket.on("match:leaderboard-update", (d) => onState({ phase: "playing", board: d.individual }));
  socket.on("match:ended", (d) => onState({ phase: "results", results: d.finalLeaderboard }));

  // --- reconnect resilience ---
  socket.on("match:reconnect", (d) => {            // app came back mid-ready-check
    onState({ phase: "ready-check", timeout: d.acceptTimeout, players: d.players });
  });
  socket.on("match:rejoined", (d) => onState({ phase: "playing", session: d.matchSessionId }));

  return {
    // joining the queue is a REST call (see endpoints-index.md): matchmaking/find-match
    updateScore: (matchSessionId, score) =>
      socket.emit("match:update-score", { matchSessionId, score }),
    cancelQueue: () => socket.emit("matchmaking:cancel-match", {}),
    disconnect: () => socket.disconnect(),
  };
}
```

Order matters: **connect the socket before** calling REST `matchmaking/find-match`, or you can
miss `match:found`. The REST call and this socket share the same `accessToken` + `api-key`.
