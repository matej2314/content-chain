# syntax=docker/dockerfile:1
# Context: monorepo root
#   docker build -f apps/api/Dockerfile .

FROM node:24.19.0-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

FROM base AS build
RUN apk add --no-cache libc6-compat openssl python3 make g++

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json .npmrc ./
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api

RUN pnpm install --frozen-lockfile --filter api...
RUN pnpm --filter @content-chain/shared build
RUN pnpm --filter api build
RUN pnpm --filter api deploy --prod /prod/api \
  && test -f /prod/api/dist/main.js \
  && test -f /prod/api/prisma/schema.prisma

FROM node:24.19.0-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001

RUN apk add --no-cache libc6-compat openssl \
  && addgroup -g 1001 -S nodejs \
  && adduser -S api -u 1001 \
  && mkdir -p /app/data \
  && chown api:nodejs /app/data

COPY --from=build --chown=api:nodejs /prod/api ./
COPY --chown=api:nodejs apps/api/docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

USER api

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "\
    require('http').get('http://localhost:3001/api/v1/health', (r) => { \
      let body = ''; \
      r.on('data', (c) => body += c); \
      r.on('end', () => { \
        try { \
          const j = JSON.parse(body); \
          process.exit(r.statusCode === 200 && j.status === 'healthy' ? 0 : 1); \
        } catch { process.exit(1); } \
      }); \
    }).on('error', () => process.exit(1)); \
  "

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]
