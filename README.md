# Balanced Gym App

A full-stack fitness application for logging gym routines using a balanced algorithm to select the next exercise based on muscle group distribution.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Material UI 6, Redux Toolkit, Vite |
| Admin Panel | React 19, TypeScript, Material UI 6, Vite |
| Backend | Node.js 22+, Express, TypeScript |
| Database | MongoDB (Mongoose ODM) |
| Auth | Firebase Authentication |
| Charts | Recharts |
| Package Manager | pnpm 10 (workspaces) |

## Project Structure

```
balanced-gym-app/
├── packages/
│   ├── client/       # Main user-facing React app (port 3001)
│   ├── server/       # Express API server (port 3000)
│   ├── admin/        # Admin panel for managing exercises & muscles (port 3002)
│   └── model/        # Shared TypeScript types and business logic
├── docs/             # Database schema documentation
├── Dockerfile
└── pnpm-workspace.yaml
```

## Getting Started

### Prerequisites

- Node.js >= 22
- pnpm 10
- MongoDB instance
- Firebase project (for authentication)

### Environment Variables

**Server** (`packages/server/.env`):
```
MONGO_URI=<mongodb connection string>
FIREBASE_PROJECT_ID=<project id>
FIREBASE_CLIENT_EMAIL=<service account email>
FIREBASE_PRIVATE_KEY=<private key>
```

**Client** (`packages/client/.env`):
```
VITE_FIREBASE_API_KEY=<api key>
VITE_FIREBASE_AUTH_DOMAIN=<auth domain>
VITE_FIREBASE_PROJECT_ID=<project id>
VITE_FIREBASE_APP_ID=<app id>
```

### Development

```bash
# Install dependencies
pnpm install

# Run client + server
pnpm dev

# Run server + admin panel
pnpm dev:admin

# Run all three (client + server + admin)
pnpm dev:all

# Individual packages
pnpm dev:client
pnpm dev:server
pnpm dev:admin:app
```

### Build

```bash
# Build model types + client for production
pnpm build

# Start production server
pnpm start
```

### Testing

```bash
pnpm test:model    # Shared model unit tests
pnpm test:client   # Client tests
```

### Database Scripts

```bash
pnpm backup        # Backup MongoDB
pnpm restore       # Restore MongoDB
pnpm set-admin     # Set admin claim on a Firebase user
```

## API

The server exposes a REST API at `/api/v1` with Swagger documentation available at `/spec`.

**Resources:** Routines, Exercises, Muscles, Muscle Groups, Series (sets), Targets

## Deployment

### Local Deploy (Podman)

```bash
pnpm local-deploy   # Build image and run on localhost:4000
pnpm local-run      # Run existing image (no rebuild) on localhost:4000
```

`local-deploy` builds the Docker image with Firebase env vars baked in, removes any previous container/image, and runs the app in detached mode. `local-run` skips the build and just restarts the container. Both use `packages/server/.env` for runtime environment variables.

Check logs with `podman logs balanced-gym-app`, stop with `podman stop balanced-gym-app`.

### Cloud (Google Cloud Run)

Pushing to `master` triggers a GitHub Actions workflow that builds the Docker image, pushes it to Artifact Registry, and deploys to Cloud Run.

### Docker (manual)

```bash
docker build \
  --build-arg VITE_FIREBASE_API_KEY=<key> \
  --build-arg VITE_FIREBASE_AUTH_DOMAIN=<domain> \
  --build-arg VITE_FIREBASE_PROJECT_ID=<project> \
  --build-arg VITE_FIREBASE_APP_ID=<app-id> \
  -t balanced-gym-app .
docker run -p 3000:3000 --env-file packages/server/.env balanced-gym-app
```

## License

MIT
