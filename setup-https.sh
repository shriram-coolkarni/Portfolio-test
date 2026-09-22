#!/usr/bin/env bash
# One-time HTTPS setup for shriramkulkarni.in.
# Run this ONCE, directly on the server (via SSH), as root or with sudo.
# After this, Jenkins (jenkins.txt) handles regular deploys on its own.

set -euo pipefail

DOMAIN="shriramkulkarni.in"
DOMAIN_WWW="www.shriramkulkarni.in"
CONTAINER_NAME="portfolio-container"
IMAGE_NAME="portfolio-app:https-setup"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> 1. Installing certbot"
apt update
apt install -y certbot

echo "==> 2. Stopping anything currently bound to port 80"
if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  docker stop "$CONTAINER_NAME"
fi

echo "==> 3. Requesting Let's Encrypt certificate"
certbot certonly --standalone \
  -d "$DOMAIN" -d "$DOMAIN_WWW" \
  --non-interactive --agree-tos -m "shriram.kulkarni.official@gmail.com"

echo "==> 4. Building the image"
docker build -t "$IMAGE_NAME" "$REPO_DIR"

echo "==> 5. Running the container"
docker rm -f "$CONTAINER_NAME" 2>/dev/null || true
docker run -d --name "$CONTAINER_NAME" \
  -p 80:80 -p 443:443 \
  -v /etc/letsencrypt:/etc/letsencrypt:ro \
  --restart unless-stopped \
  "$IMAGE_NAME"

echo "==> 6. Setting up auto-renewal deploy hook"
mkdir -p /etc/letsencrypt/renewal-hooks/deploy
cat > /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh <<EOF
#!/usr/bin/env bash
docker exec ${CONTAINER_NAME} nginx -s reload
EOF
chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh

echo "==> 7. Verifying"
sleep 2
curl -I "https://${DOMAIN}" || echo "WARNING: HTTPS check failed, inspect manually."

echo "==> Done. certbot's systemd timer will auto-renew and reload nginx from here on."
