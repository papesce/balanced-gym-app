#!/bin/bash
set -a
source "$(dirname "$0")/.env.deploy"
set +a

podman stop balanced-gym-app 2>/dev/null
podman rm balanced-gym-app 2>/dev/null
podman rmi balanced-gym-app 2>/dev/null
podman build \
  --build-arg VITE_FIREBASE_API_KEY="$VITE_FIREBASE_API_KEY" \
  --build-arg VITE_FIREBASE_AUTH_DOMAIN="$VITE_FIREBASE_AUTH_DOMAIN" \
  --build-arg VITE_FIREBASE_PROJECT_ID="$VITE_FIREBASE_PROJECT_ID" \
  --build-arg VITE_FIREBASE_APP_ID="$VITE_FIREBASE_APP_ID" \
  -t balanced-gym-app . && podman run -d --rm --name balanced-gym-app -p 4000:3000 --env-file packages/server/.env balanced-gym-app
