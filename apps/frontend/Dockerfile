# syntax=docker/dockerfile:1
# Context: monorepo root
#   docker build -f apps/frontend/Dockerfile .

FROM node:24.19.0-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

FROM base AS build
RUN apk add --no-cache libc6-compat

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json .npmrc ./
COPY packages/shared ./packages/shared
COPY apps/frontend ./apps/frontend

RUN pnpm install --frozen-lockfile --filter frontend...
RUN pnpm --filter @content-chain/shared build
# API_BASE_URL is runtime-only (BFF); not baked as a secret. Non-secret placeholder
# satisfies any build-time server evaluation without pinning production origin into layers.
ENV API_BASE_URL=http://api:3001
RUN pnpm --filter frontend build
RUN pnpm --filter frontend deploy --prod /prod/frontend \
  && test -d /prod/frontend/.next \
  && test -f /prod/frontend/next.config.ts

FROM node:24.19.0-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3004

RUN apk add --no-cache libc6-compat \
  && addgroup -g 1001 -S nodejs \
  && adduser -S frontend -u 1001

COPY --from=build --chown=frontend:nodejs /prod/frontend ./

USER frontend

EXPOSE 3004

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "\
    require('http').get('http://localhost:3004/', (r) => { \
      process.exit(r.statusCode && r.statusCode < 500 ? 0 : 1); \
    }).on('error', () => process.exit(1)); \
  "

CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3004"]
