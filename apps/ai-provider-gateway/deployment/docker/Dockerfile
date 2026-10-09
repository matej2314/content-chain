# syntax=docker/dockerfile:1
# Context: monorepo root
#   docker build -f apps/ai-provider-gateway/deployment/docker/Dockerfile .

FROM node:24.19.0-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

FROM base AS build
RUN apk add --no-cache libc6-compat

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.json .npmrc ./
COPY apps/ai-provider-gateway ./apps/ai-provider-gateway

RUN pnpm install --frozen-lockfile --filter ai-provider-gateway...
RUN pnpm --filter ai-provider-gateway build
RUN pnpm --filter ai-provider-gateway deploy --prod /prod/gateway \
  && test -f /prod/gateway/dist/src/main.js

FROM node:24.19.0-alpine AS production
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3100

RUN apk add --no-cache libc6-compat \
  && addgroup -g 1001 -S nodejs \
  && adduser -S gateway -u 1001 \
  && mkdir -p /app/logs \
  && chown gateway:nodejs /app/logs

COPY --from=build --chown=gateway:nodejs /prod/gateway ./

# Default config baked into image; host volume mount overrides at runtime
COPY --chown=gateway:nodejs apps/ai-provider-gateway/gateway.config.yaml ./gateway.config.yaml

# Nest assets used at runtime (prompts) — not always present in deploy packlist
COPY --from=build --chown=gateway:nodejs \
  /app/apps/ai-provider-gateway/src/config/system-prompt \
  ./src/config/system-prompt

USER gateway

EXPOSE 3100

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "\
    require('http').get('http://localhost:3100/api/v1/health/ready', (r) => { \
      let body = ''; \
      r.on('data', (c) => body += c); \
      r.on('end', () => { \
        try { \
          const j = JSON.parse(body); \
          process.exit(r.statusCode === 200 && j.status === 'ready' ? 0 : 1); \
        } catch { process.exit(1); } \
      }); \
    }).on('error', () => process.exit(1)); \
  "

CMD ["node", "dist/src/main.js"]
