# =============================================================================
# Production Nginx Container for CUI Documentation App
# =============================================================================
FROM nginx:alpine AS runner

# Remove default nginx HTML files
RUN rm -rf /usr/share/nginx/html/*

# Copy production Nginx configuration (gzip, cache headers, SPA routing, security)
COPY apps/docs/nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static output
COPY apps/docs/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/healthz || exit 1

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
