# Deployment Guide

## Server Setup (One-time)

Run these commands on the server (SSH as `caliberadmin@104.236.33.3`):

```bash
# 1. Create directory structure
sudo mkdir -p /srv/www/clients/compliantesolutions/{stg,prod}/{releases,logs}
sudo chown -R caliberadmin:caliberadmin /srv/www/clients/compliantesolutions

# 2. Install Doppler CLI
curl -Ls --tlsv1.2 --proto "=https" --retry 3 https://cli.doppler.com/install.sh | sudo sh
doppler login

# 3. Install PM2 globally (if not already installed)
npm install -g pm2

# 4. Set up PM2 to start on boot
pm2 startup
# Follow the command output by PM2

# 5. Update NGINX configs
sudo cp /path/to/nginx-staging.conf /etc/nginx/sites-available/compliante.cbdg-ext.com
sudo cp /path/to/nginx-production.conf /etc/nginx/sites-available/compliantesolutions.com

# Enable staging site
sudo ln -sf /etc/nginx/sites-available/compliante.cbdg-ext.com /etc/nginx/sites-enabled/

# Test and reload NGINX
sudo nginx -t
sudo systemctl reload nginx

# 6. Configure Doppler on server
cd /srv/www/clients/compliantesolutions/stg
doppler setup --project compliante-www --config stg

cd /srv/www/clients/compliantesolutions/prod
doppler setup --project compliante-www --config prd
```

## NGINX Configuration

Update the following files on the server:

### Staging: `/etc/nginx/sites-available/compliante.cbdg-ext.com`

```nginx
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
```

### Production: `/etc/nginx/sites-available/compliantesolutions.com`

```nginx
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
```

## Manual Deployment (if needed)

```bash
# SSH into server
ssh caliberadmin@104.236.33.3

# Navigate to project
cd /srv/www/clients/compliantesolutions/stg  # or prod

# Pull latest code (if using git on server)
git pull origin staging  # or main

# Install dependencies
npm ci

# Build with Doppler
doppler run -- npm run build

# Restart PM2
pm2 restart compliantesolutions-staging  # or compliantesolutions-production
```

## Rollback Procedure

If a deployment fails, rollback to previous release:

```bash
# SSH into server
ssh caliberadmin@104.236.33.3

# List available releases
ls -la /srv/www/clients/compliantesolutions/prod/releases

# Update symlink to previous release
ln -sfn /srv/www/clients/compliantesolutions/prod/releases/YYYYMMDDHHMMSS /srv/www/clients/compliantesolutions/prod/current

# Restart PM2
pm2 restart compliantesolutions-production
```

## Monitoring

```bash
# View PM2 processes
pm2 list

# View logs
pm2 logs compliantesolutions-production
pm2 logs compliantesolutions-staging

# View detailed process info
pm2 show compliantesolutions-production

# Monitor resources
pm2 monit
```

## Troubleshooting

### Application won't start

```bash
# Check PM2 logs
pm2 logs compliantesolutions-production --err

# Check if port is in use
sudo lsof -i :3000  # or :3001 for staging

# Verify Doppler token
doppler run --token=YOUR_TOKEN -- printenv
```

### NGINX issues

```bash
# Test configuration
sudo nginx -t

# View error logs
sudo tail -f /srv/www/clients/compliantesolutions/prod/logs/error.log

# Restart NGINX
sudo systemctl restart nginx
```

### Out of memory

```bash
# Check memory usage
free -h
pm2 show compliantesolutions-production

# Increase PM2 memory limit in ecosystem.config.js
# Then reload PM2
pm2 reload ecosystem.config.js
```
