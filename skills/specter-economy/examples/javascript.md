# JavaScript — wallet, store purchase, inventory

Assumes the `specter()` helper + login from specter-players `examples/javascript.md`.

```js
// --- Wallet ---
export const getBalances = (currencyIds) =>
  specter("player/me/get-wallet-balance", { currencyIds }); // e.g. ["coins", "gems"]

export const earn = (currencyId, amount, reason) =>
  specter("wallet/update-balance", {
    operation: "add", currencyId, amount, walletType: "virtual",
    customParams: { reason },
  });

// --- Store browse + buy ---
export async function browseStore(storeId) {
  const cats = await specter("stores/get-categories", { storeId });
  return specter("stores/get-contents", { storeId, categoryId: cats.categories[0].id });
}

export async function buy(storeId, itemId, currencyId, price) {
  try {
    return await specter("stores/default-purchase", {
      storeId, items: [{ id: itemId, amount: 1 }], currencyId, price,
    });
  } catch (e) {
    if (/balance|insufficient/i.test(e.message)) return { failed: "NOT_ENOUGH_CURRENCY" };
    throw e;
  }
}

// --- Inventory ---
export const getInventory = () => specter("player/me/get-inventory", { limit: 50 });
export const equip = (id) => specter("inventory/equip-unequip", { items: [{ id, equip: true }] });
export const consume = (id, amount = 1) => specter("inventory/consume-item", { id, amount });

// --- Gacha ---
export async function openLootBox(bundleId) {
  const result = await specter("inventory/open-gacha-bundle", { id: bundleId });
  const pity = await specter("inventory/get-pity-status", { id: bundleId });
  return { drops: result, pity };
}
```

Remember: rewards from tasks/leaderboards land in wallets **asynchronously** — refresh balances
when the reward UI shows, or subscribe to the `/notifications` WS namespace (`reward.granted`).
