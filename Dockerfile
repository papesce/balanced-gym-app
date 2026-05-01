FROM node:22-slim AS base
RUN npm install -g pnpm@10

WORKDIR /app

# Install dependencies (layer cache)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/server/package.json ./packages/server/
COPY packages/client/package.json ./packages/client/
COPY packages/model/package.json ./packages/model/
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
