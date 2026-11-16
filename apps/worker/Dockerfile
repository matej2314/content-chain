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
COPY apps/api ./apps/api
COPY apps/worker ./apps/worker

RUN pnpm install --frozen-lockfile --filter worker...
RUN pnpm --filter @content-chain/shared build
# Prisma client for worker (schema lives under apps/api)
RUN pnpm --filter api exec prisma generate
RUN pnpm --filter worker build
RUN pnpm --filter worker deploy --prod /prod/worker \
  && mkdir -p /prod/worker/prisma \
  && cp apps/api/prisma/schema.prisma /prod/worker/prisma/schema.prisma \
  && test -f /prod/worker/dist/worker/src/main.js

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
CMD ["node", "dist/worker/src/main.js"]
