#!/bin/sh
set -eu

if [ -x ./node_modules/.bin/prisma ] && [ -f ./prisma/schema.prisma ]; then
  echo "[worker] Running prisma generate..."
  ./node_modules/.bin/prisma generate
fi

echo "[worker] Starting application..."
exec "$@"
