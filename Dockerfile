FROM node:24-slim

WORKDIR /app

# Install pnpm matching project version
RUN npm install -g pnpm@12.3.4

# Copy monorepo manifests for layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/theme/package.json ./packages/theme/
COPY packages/react/package.json ./packages/react/
COPY packages/vue/package.json ./packages/vue/
COPY apps/docs/package.json ./apps/docs/
COPY apps/nuxt/package.json ./apps/nuxt/

# Install workspace dependencies needed for docs app
RUN pnpm --filter docs... install --frozen-lockfile --ignore-scripts

# Copy source code for theme, react components, and docs app
COPY packages/theme ./packages/theme
COPY packages/react ./packages/react
COPY apps/docs ./apps/docs

# Build internal packages and documentation web application
RUN pnpm --filter @cui-universal/theme build && \
    pnpm --filter @cui-universal/react build && \
    pnpm --filter docs build

# Expose Vite preview/dev port
EXPOSE 5173

# Run the docs app directly using Vite preview server (no nginx)
CMD ["pnpm", "--filter", "docs", "preview"]
