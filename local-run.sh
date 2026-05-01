#!/bin/bash
podman stop balanced-gym-app 2>/dev/null
podman rm balanced-gym-app 2>/dev/null
podman run -d --rm --name balanced-gym-app -p 4000:3000 --env-file packages/server/.env balanced-gym-app
