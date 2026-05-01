# Deployment Guide

This document describes how to deploy the Balanced Gym App to Google Cloud Run with automated CI/CD via GitHub Actions.

## One-Time GCP Setup

Before the GitHub Actions workflow can deploy, you need to set up Google Cloud Platform and configure GitHub secrets. Follow these steps:

### 1. Create a GCP Project
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project (e.g., `balanced-gym`)
- Note your **Project ID**

### 2. Enable Required APIs
In the Cloud Console, enable these APIs:
- Cloud Run API
- Artifact Registry API
- Cloud IAM API
- Service Usage API

```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com iam.googleapis.com serviceusage.googleapis.com --project=YOUR_PROJECT_ID
```

### 3. Create Artifact Registry Repository
```bash
gcloud artifacts repositories create balanced-gym \
  --repository-format=docker \
  --location=us-central1 \
  --project=YOUR_PROJECT_ID
```

### 4. Create a Service Account
```bash
gcloud iam service-accounts create github-actions-deploy \
  --display-name="GitHub Actions Deploy Service Account" \
  --project=YOUR_PROJECT_ID
```

### 5. Grant Service Account Permissions
```bash
SERVICE_ACCOUNT_EMAIL="github-actions-deploy@YOUR_PROJECT_ID.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
  --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:$SERVICE_ACCOUNT_EMAIL" \
  --role="roles/serviceusage.serviceUsageConsumer"
```

### 6. Set Up Workload Identity Federation
This allows GitHub Actions to authenticate to GCP without storing long-lived credentials.

```bash
PROJECT_ID="YOUR_PROJECT_ID"
POOL_ID="github-pool"
PROVIDER_ID="github-provider"
REPO="papesce/balanced-gym-app"

# Create Workload Identity Pool
gcloud iam workload-identity-pools create $POOL_ID \
  --project=$PROJECT_ID \
  --location=global \
  --display-name="GitHub Actions Pool"

# Get the pool resource name
POOL_RESOURCE=$(gcloud iam workload-identity-pools describe $POOL_ID \
  --project=$PROJECT_ID \
  --location=global \
  --format='value(name)')

# Create Workload Identity Provider
gcloud iam workload-identity-providers create-oidc $PROVIDER_ID \
  --project=$PROJECT_ID \
  --location=global \
  --display-name="GitHub Provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.aud=assertion.aud,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-condition="assertion.repository == '$REPO'"

# Get the provider resource name
PROVIDER_RESOURCE="$POOL_RESOURCE/providers/$PROVIDER_ID"

# Grant GitHub the ability to impersonate the service account
gcloud iam service-accounts add-iam-policy-binding $SERVICE_ACCOUNT_EMAIL \
  --project=$PROJECT_ID \
  --role="roles/iam.workloadIdentityUser" \
  --principal="principalSet://goog/subject/system.serviceAccount/$PROVIDER_RESOURCE"
```

### 7. Get the Workload Identity Provider Resource
```bash
PROVIDER_RESOURCE=$(gcloud iam workload-identity-pools providers describe github-provider \
  --project=YOUR_PROJECT_ID \
  --location=global \
  --workload-identity-pool=github-pool \
  --format='value(name)')

echo "GCP_WORKLOAD_IDENTITY_PROVIDER=$PROVIDER_RESOURCE"
```

### 8. Configure GitHub Secrets
In your GitHub repository settings, add these secrets:

- **`GCP_PROJECT_ID`**: Your GCP project ID
- **`GCP_WORKLOAD_IDENTITY_PROVIDER`**: The provider resource name from step 7
- **`GCP_SERVICE_ACCOUNT`**: The service account email (`github-actions-deploy@YOUR_PROJECT_ID.iam.gserviceaccount.com`)

### 9. Configure Cloud Run Environment Variables
Go to the [Cloud Run Console](https://console.cloud.google.com/run) and create a service called `balanced-gym-app` (or let the workflow create it on first deploy). Then edit the service to add these environment variables:

Required:
- `MONGO_URI`: Your MongoDB connection string
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_CLIENT_EMAIL`: Firebase service account email
- `FIREBASE_PRIVATE_KEY`: Firebase private key (with `\n` for newlines)

Optional:
- `SESSION_SECRET`: Cookie session secret (recommended to set)
- `NODE_ENV`: Set to `production`

## Local Docker Build and Test

Before pushing to GitHub, you can test the Docker build locally:

```bash
# Build the image
docker build -t balanced-gym-app:test .

# Run with your local .env file
docker run -p 3000:3000 --env-file packages/server/.env balanced-gym-app:test

# Visit http://localhost:3000
```

## Automated Deployment

Once GitHub secrets are configured:

1. Push code to `master` branch
2. GitHub Actions workflow triggers automatically
3. Workflow builds Docker image and pushes to Artifact Registry
4. Workflow deploys to Cloud Run
5. Service is updated and available at `https://balanced-gym-app-<random>.a.run.app`

Monitor the deployment:
- Check the Actions tab in your GitHub repository
- View Cloud Run deployments in the [Cloud Run Console](https://console.cloud.google.com/run)

## Manual Deployment (If Needed)

If you need to deploy manually without GitHub Actions:

```bash
PROJECT_ID="YOUR_PROJECT_ID"

docker build -t us-central1-docker.pkg.dev/$PROJECT_ID/balanced-gym/app:latest .

gcloud auth configure-docker us-central1-docker.pkg.dev

docker push us-central1-docker.pkg.dev/$PROJECT_ID/balanced-gym/app:latest

gcloud run deploy balanced-gym-app \
  --image us-central1-docker.pkg.dev/$PROJECT_ID/balanced-gym/app:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars PORT=3000 \
  --project=$PROJECT_ID
```

## Troubleshooting

### Workflow fails with authentication errors
- Verify `GCP_WORKLOAD_IDENTITY_PROVIDER` secret is set correctly
- Check that the service account has the required IAM roles
- Ensure the repository name in `attribute-condition` matches `papesce/balanced-gym-app`

### Cloud Run deployment fails
- Check that all required environment variables are set in Cloud Run
- Verify MongoDB URI is correct and accessible from Google Cloud
- Check Cloud Run logs: `gcloud run logs read balanced-gym-app --region=us-central1`

### Docker build fails locally
- Ensure you have `pnpm` installed: `npm install -g pnpm`
- Verify `pnpm-lock.yaml` exists in the repo
- Check that all package dependencies are listed correctly
