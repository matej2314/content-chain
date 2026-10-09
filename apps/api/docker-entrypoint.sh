#!/bin/sh
set -eu

echo "[api] Running prisma generate..."
./node_modules/.bin/prisma generate

echo "[api] Running prisma migrate deploy..."
./node_modules/.bin/prisma migrate deploy

echo "[api] Starting application..."
exec "$@"
