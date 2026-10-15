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

## 🐳 Docker (No Nginx — Node.js & Vite)

The application runs directly in a Node.js container using Vite's built-in preview/dev server on port `5173`.

### 1. Run with Docker Compose (Recommended)

From the repository root:

```bash
# Build & start container on port 5173
docker compose up -d --build

# View logs
docker compose logs -f docs

# Stop container
docker compose down
```

### 2. Run with Docker CLI

```bash
# 1. Build the Docker image
docker build -t cui-docs .

# 2. Run the container
docker run -d --name cui-docs -p 5173:5173 --restart unless-stopped cui-docs

# 3. Check logs
docker logs -f cui-docs
```

Visit `http://localhost:5173/`.

---

## ⚙️ Container Configuration

| Setting | Value / Path | Description |
| :--- | :--- | :--- |
| **Base Image** | `node:24-slim` | Node.js runtime environment |
| **Port** | `5173` | Vite Preview / Dev Server |
| **Server Engine** | `Vite Preview (Node.js)` | Direct Node HTTP server without Nginx |
| **Command** | `pnpm --filter docs preview` | Serves the built documentation app |
