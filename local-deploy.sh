#!/bin/bash
podman stop balanced-gym-app 2>/dev/null
podman rm balanced-gym-app 2>/dev/null
podman rmi balanced-gym-app 2>/dev/null
podman build --build-arg VITE_FIREBASE_API_KEY=AIzaSyBQmkzZeN8uX-fUJRz9-IZgAblFqvsihLA --build-arg VITE_FIREBASE_AUTH_DOMAIN=balanced-life-4a8c7.firebaseapp.com --build-arg VITE_FIREBASE_PROJECT_ID=balanced-life-4a8c7 --build-arg VITE_FIREBASE_APP_ID=1:612571722603:web:da53740b78fbf08f5f122e -t balanced-gym-app . && podman run --rm --name balanced-gym-app -p 3000:3000 --env-file packages/server/.env balanced-gym-app
