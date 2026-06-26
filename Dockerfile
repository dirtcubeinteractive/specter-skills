# Specter MCP server — stdio. Used by Glama (and any container host) to start
# the server and answer MCP introspection (initialize / tools/list).
FROM node:22-alpine

WORKDIR /app

# Install production dependencies first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund

# App source
COPY . .

# Introspection-friendly defaults. Mutations still require auth to actually run;
# enabling them here only makes the full tool set visible to introspection.
ENV SPECTER_ENV=staging \
    SPECTER_ALLOW_MUTATIONS=true

# stdio MCP server
ENTRYPOINT ["node", "mcp/src/index.mjs"]
