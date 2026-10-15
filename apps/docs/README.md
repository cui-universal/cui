# CUI Documentation App (`apps/docs`)

Modern React documentation site showcasing CUI Universal components, themes, and interactive demos.

---

## 🚀 Running Locally

```bash
# In repository root:
pnpm --filter docs dev
```

Visit the local server at `http://localhost:5173/`.

---

## 🐳 Docker Deployment

The application includes production-grade containerization with Alpine Nginx, HTTP gzip compression, caching headers, security headers, and Single Page Application (SPA) fallback routing.

### 1. Build & Run with Docker Compose (Recommended)

From the repository root:

```bash
# Build & start container in background on port 8080
docker compose up -d --build

# View logs
docker compose logs -f docs

# Stop container
docker compose down
```

### 2. Build & Run Manually with Docker CLI

```bash
# 1. Build the docs dist assets (if not already built)
pnpm --filter docs build

# 2. Build the Docker image (~29MB)
docker build -f apps/docs/Dockerfile -t cui-docs:latest .

# 3. Run the container
docker run -d --name cui-docs -p 8080:80 --restart unless-stopped cui-docs:latest

# 4. Check health endpoint
curl -i http://localhost:8080/healthz
```

### 3. Multi-Stage Docker Build (for CI/CD Pipelines)

If building in an isolated CI/CD runner without host pre-building:

```bash
docker build -f apps/docs/Dockerfile.multistage -t cui-docs:latest .
```

---

## ⚙️ Container Configuration

| Setting | Value / Path | Description |
| :--- | :--- | :--- |
| **Base Image** | `nginx:alpine` | Ultra-lightweight (~29MB total image size) |
| **Port** | `80` (mapped to `8080` in Compose) | HTTP Server |
| **Nginx Config** | [apps/docs/nginx.conf](file:///home/chansy/dev/cui/apps/docs/nginx.conf) | SPA fallback, gzip compression, caching, security headers |
| **Health Check** | `/healthz` (returns `200 OK`) | Standard Docker & Kubernetes health probe |
