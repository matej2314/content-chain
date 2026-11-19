# syntax=docker/dockerfile:1
# Context: monorepo root
#   docker build -f apps/worker/Dockerfile .

FROM node:24.19.0-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

FROM base AS build
RUN apk add --no-cache libc6-compat openssl python3 make g++

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json .npmrc ./
COPY packages/shared ./packages/shared
COPY packages/domain-kit ./packages/domain-kit
COPY packages/persistence ./packages/persistence
COPY packages/runs-kernel ./packages/runs-kernel
COPY packages/run-pipelines ./packages/run-pipelines
COPY apps/worker ./apps/worker
# Prisma schema SoT nadal w api — kopiuj TYLKO schema (nie całe src api)
COPY apps/api/prisma ./apps/api/prisma
COPY apps/api/package.json ./apps/api/package.json

RUN pnpm install --frozen-lockfile --filter worker...
RUN pnpm --filter @content-chain/shared build \
 && pnpm --filter @content-chain/domain-kit build \
 && pnpm --filter @content-chain/persistence build \
 && pnpm --filter @content-chain/runs-kernel build \
 && pnpm --filter @content-chain/run-pipelines build
# prisma CLI z deps workera; cwd filtra = apps/worker → schema względnie ../api/prisma
RUN pnpm --filter worker exec prisma generate --schema=../api/prisma/schema.prisma
RUN pnpm --filter worker build
# deploy respektuje package.json "files" (dist) — bez src/tsconfig/nest-cli w obrazie
RUN pnpm --filter worker deploy --prod /prod/worker \
  && mkdir -p /prod/worker/prisma \
  && cp apps/api/prisma/schema.prisma /prod/worker/prisma/schema.prisma \
  && test -f /prod/worker/dist/main.js \
  && test ! -d /prod/worker/src \
  && test ! -f /prod/worker/tsconfig.json \
  && test ! -f /prod/worker/tsconfig.build.json \
  && test ! -f /prod/worker/nest-cli.json

FROM node:24.19.0-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat openssl \
  && addgroup -g 1001 -S nodejs \
  && adduser -S worker -u 1001

COPY --from=build --chown=worker:nodejs /prod/worker ./
COPY --chown=worker:nodejs apps/worker/docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

USER worker

# No EXPOSE — worker has no public runs HTTP (M-10 / D1).

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]
