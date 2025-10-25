# Server Setup Commands

**Run these commands on your server (SSH as caliberadmin@104.236.33.3)**

## 1. Create Directory Structure

```bash
sudo mkdir -p /srv/www/clients/compliantesolutions/{stg,prod}/{releases,logs}
sudo chown -R caliberadmin:caliberadmin /srv/www/clients/compliantesolutions
```

## 2. Install Doppler CLI

```bash
curl -Ls --tlsv1.2 --proto "=https" --retry 3 https://cli.doppler.com/install.sh | sudo sh
doppler login
```

## 3. Install PM2 (if not already installed)

```bash
npm install -g pm2
pm2 startup
# ⚠️ Run the command that PM2 outputs (it will be a sudo command)
```

## 4. Update NGINX Configs

### Copy staging config:
```bash
sudo tee /etc/nginx/sites-available/compliante.cbdg-ext.com > /dev/null << 'EOF'
server {
  listen 80;
  listen [::]:80;
  server_name compliante.cbdg-ext.com;

  access_log /srv/www/clients/compliantesolutions/stg/logs/access.log;
  error_log  /srv/www/clients/compliantesolutions/stg/logs/error.log;

  location / {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
EOF
```

### Copy production config:
```bash
sudo tee /etc/nginx/sites-available/compliantesolutions.com > /dev/null << 'EOF'
server {
  listen 80;
  listen [::]:80;
  server_name compliantesolutions.com www.compliantesolutions.com;

  access_log /srv/www/clients/compliantesolutions/prod/logs/access.log;
  error_log  /srv/www/clients/compliantesolutions/prod/logs/error.log;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
EOF
```

### Enable staging site:
```bash
sudo ln -sf /etc/nginx/sites-available/compliante.cbdg-ext.com /etc/nginx/sites-enabled/
```

### Test and reload NGINX:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 5. Verify Setup

```bash
# Check directories exist
ls -la /srv/www/clients/compliantesolutions/

# Check NGINX configs
sudo nginx -t

# Check PM2 is ready
pm2 --version

# Check Doppler is ready
doppler --version
```

## Ready for Deployment!

Once these commands are run successfully, you can:
1. Push to `staging` branch → Auto-deploys to compliante.cbdg-ext.com
2. Push to `main` branch → Auto-deploys to compliantesolutions.com

The GitHub Actions workflows will handle the rest!
