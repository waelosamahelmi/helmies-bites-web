# Helmies Bites - Complete Deployment & Configuration Plan

## Architecture Overview

```
┌──────────────────────────┐     ┌──────────────────────────┐
│   helmies-bites-web      │     │   helmies-bites-admin    │
│   (Marketing Website)    │     │   (Admin Dashboard)      │
│   Deploy: Vercel         │     │   Deploy: Hostinger VPS  │
│   Domain: bites.helmies.fi     │   Domain: admin.helmiesbites.com
└───────────┬──────────────┘     └───────────┬──────────────┘
            │                                │
            │ API calls                      │ API calls
            ▼                                ▼
┌─────────────────────────────────────────────────────────────┐
│              helmies-bites-platform                         │
│              (Central API Server)                           │
│              Deploy: Hostinger VPS (same server as admin)   │
│              Domain: api.helmiesbites.com                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ Clones & deploys via automation
                            ▼
┌─────────────────────────────────────────────────────────────┐
│            helmies-bites-site-template                      │
│            (Restaurant Website Template)                    │
│            Deploy: Vercel (auto per tenant)                 │
│            Domain: {slug}.helmiesbites.com                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. SHARED SERVICES (Create These First)

### Supabase Project
```
Project Name: helmies-bites-production
Region: eu-central-1 (Frankfurt)
```

After creating, note these values:
- `SUPABASE_URL` → Project URL
- `SUPABASE_ANON_KEY` → anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` → service_role key (backend only)

### Stripe Account
```
Mode: Live (after testing)
```
Note these values:
- `STRIPE_PUBLISHABLE_KEY` → pk_live_xxx
- `STRIPE_SECRET_KEY` → sk_live_xxx
- `STRIPE_WEBHOOK_SECRET` → whsec_xxx (create webhook endpoint)

### Domain Configuration (Hostinger)
```
Primary Domain: helmiesbites.com
VPS IP: YOUR_VPS_IP (e.g., 154.x.x.x)

DNS Records needed:
  - A record: api.helmiesbites.com → YOUR_VPS_IP
  - A record: admin.helmiesbites.com → YOUR_VPS_IP (same VPS)
  - CNAME: bites.helmies.fi → cname.vercel-dns.com
  - Wildcard CNAME: *.helmiesbites.com → cname.vercel-dns.com (for tenant sites)
```

---

## 2. helmies-bites-platform (Backend API)

### Deployment Target: Hostinger VPS
```
Server: Hostinger VPS (YOUR_VPS_IP)
Domain: api.helmiesbites.com
Port: 3000 (behind Nginx reverse proxy)
Process Manager: PM2
```

### .env file (Production)
```dotenv
# ============================================================
# DATABASE (Supabase)
# ============================================================
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

# ============================================================
# SERVER CONFIGURATION
# ============================================================
PORT=3000
NODE_ENV=production
APP_NAME=Helmies Bites
APP_URL=https://api.helmiesbites.com
PLATFORM_URL=https://api.helmiesbites.com

# ============================================================
# CORS - Allowed Origins
# ============================================================
ALLOWED_ORIGINS=https://bites.helmies.fi,https://admin.helmiesbites.com,https://*.helmiesbites.com

# ============================================================
# JWT & SESSION
# ============================================================
JWT_SECRET=your-super-secure-jwt-secret-min-32-chars
JWT_EXPIRES_IN=7d
SESSION_SECRET=your-super-secure-session-secret-min-32-chars
SESSION_MAX_AGE=86400000

# ============================================================
# STRIPE (Payments)
# ============================================================
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# ============================================================
# GITHUB (Tenant Site Automation)
# ============================================================
GITHUB_TOKEN=ghp_xxxxx
GITHUB_ORG=helmies-bites
TEMPLATE_REPO=helmies-site-template
TEMPLATE_PATH=/home/helmies/helmies-bites-site-template

# ============================================================
# VERCEL (Tenant Site Deployment)
# ============================================================
VERCEL_API_KEY=xxxxx
VERCEL_TEAM_ID=team_xxxxx

# ============================================================
# HOSTINGER (Domain & Email Automation)
# ============================================================
HOSTINGER_API_KEY=xxxxx
HOSTINGER_API_BASE=https://api.hostinger.com/v1

# ============================================================
# EMAIL (SMTP)
# ============================================================
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=noreply@helmiesbites.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@helmies.fi
CUSTOMER_SUPPORT_EMAIL=support@helmiesbites.com

# ============================================================
# AI (OpenRouter)
# ============================================================
OPENROUTER_API_KEY=sk-or-xxxxx
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet

# ============================================================
# REDIS (Optional - for session/caching)
# ============================================================
REDIS_URL=redis://127.0.0.1:6379

# ============================================================
# TWILIO (Optional - SMS notifications)
# ============================================================
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+358xxxxxxxxx

# ============================================================
# LOGGING & MONITORING
# ============================================================
LOG_LEVEL=info
LOG_FILE=/home/helmies/logs/platform.log

# ============================================================
# RATE LIMITING
# ============================================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# ============================================================
# FILE UPLOADS
# ============================================================
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads/
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp
```

### VPS Setup & Deployment Commands (Hostinger VPS)
```bash
# ============================================================
# 1. SSH into your VPS
# ============================================================
ssh root@YOUR_VPS_IP

# ============================================================
# 2. Install Node.js, PM2, Nginx, Redis
# ============================================================
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs nginx redis-server certbot python3-certbot-nginx
npm install -g pm2

# ============================================================
# 3. Create app user
# ============================================================
adduser helmies
usermod -aG sudo helmies
su - helmies

# ============================================================
# 4. Clone repositories
# ============================================================
mkdir -p ~/apps && cd ~/apps
git clone https://github.com/helmies-bites/helmies-bites-platform.git
git clone https://github.com/helmies-bites/helmies-bites-admin.git
git clone https://github.com/helmies-bites/helmies-bites-site-template.git

# ============================================================
# 5. Setup Platform
# ============================================================
cd ~/apps/helmies-bites-platform
npm install
cp .env.example .env
nano .env  # Fill in production values
npm run build
pm2 start dist/index.js --name helmies-platform

# ============================================================
# 6. Setup Admin
# ============================================================
cd ~/apps/helmies-bites-admin
npm install
cp .env.example .env
nano .env  # Fill in production values
npm run build
pm2 start dist/server.js --name helmies-admin

# ============================================================
# 7. PM2 startup (auto-restart on reboot)
# ============================================================
pm2 startup
pm2 save

# ============================================================
# 8. Useful PM2 commands
# ============================================================
pm2 list                     # View running processes
pm2 logs helmies-platform    # View platform logs
pm2 logs helmies-admin       # View admin logs
pm2 restart all              # Restart everything
pm2 monit                    # Real-time monitoring
```

### Nginx Reverse Proxy Configuration
```nginx
# /etc/nginx/sites-available/helmies-platform
server {
    listen 80;
    server_name api.helmiesbites.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
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

# /etc/nginx/sites-available/helmies-admin
server {
    listen 80;
    server_name admin.helmiesbites.com;

    location / {
        proxy_pass http://127.0.0.1:5174;
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

### Enable Nginx Sites & SSL
```bash
# Enable sites
sudo ln -s /etc/nginx/sites-available/helmies-platform /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/helmies-admin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# SSL certificates (Let's Encrypt)
sudo certbot --nginx -d api.helmiesbites.com
sudo certbot --nginx -d admin.helmiesbites.com

# Auto-renew
sudo certbot renew --dry-run
```

### Stripe Webhook Setup
```
Endpoint URL: https://api.helmiesbites.com/api/stripe/webhook
Events to listen:
  - checkout.session.completed
  - payment_intent.succeeded
  - payment_intent.payment_failed
  - customer.subscription.created
  - customer.subscription.updated
  - customer.subscription.deleted
```

---

## 3. helmies-bites-admin (Admin Dashboard)

### Deployment Target: Hostinger VPS (same server as Platform)
```
Server: Hostinger VPS (YOUR_VPS_IP)
Domain: admin.helmiesbites.com
Frontend Port: 5174
Backend Port: 3001 (bundled)
```

### .env file (Production)
```dotenv
# ============================================================
# SUPABASE (Frontend uses anon key only)
# ============================================================
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

# ============================================================
# API CONNECTION (Points to Platform)
# ============================================================
VITE_API_URL=https://api.helmiesbites.com

# ============================================================
# APPLICATION
# ============================================================
VITE_APP_NAME=Helmies Bites Admin
VITE_APP_URL=https://admin.helmiesbites.com
NODE_ENV=production

# ============================================================
# STRIPE (Publishable only for frontend)
# ============================================================
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# ============================================================
# BACKEND SERVER (Bundled)
# ============================================================
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

# ============================================================
# EMAIL (for admin server)
# ============================================================
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_USER=admin@helmiesbites.com
SMTP_PASS=your-app-password

# ============================================================
# ADMIN CREDENTIALS (Initial setup)
# ============================================================
ADMIN_EMAIL=admin@helmies.fi
ADMIN_PASSWORD=initial-secure-password

# ============================================================
# REDIS (Optional)
# ============================================================
REDIS_URL=redis://127.0.0.1:6379

# ============================================================
# ANALYTICS (Optional)
# ============================================================
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# ============================================================
# MONITORING (Optional)
# ============================================================
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### Deployment Commands (Hostinger VPS)
```bash
# Already set up in Platform VPS setup (step 6 above)
# For updates:
ssh helmies@YOUR_VPS_IP
cd ~/apps/helmies-bites-admin
git pull origin main
npm install
npm run build
pm2 restart helmies-admin
```

---

## 4. helmies-bites-web (Marketing Website)

### Deployment Target: Vercel
```
Domain: bites.helmies.fi
Framework: Vite
```

### .env file (Production)
```dotenv
# ============================================================
# SUPABASE (Frontend uses anon key only)
# ============================================================
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

# ============================================================
# API CONNECTION (Points to Platform)
# ============================================================
VITE_API_URL=https://api.helmiesbites.com

# ============================================================
# APPLICATION
# ============================================================
VITE_APP_NAME=Helmies Bites
VITE_APP_URL=https://bites.helmies.fi
NODE_ENV=production

# ============================================================
# STRIPE (Publishable only)
# ============================================================
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# ============================================================
# ANALYTICS (Optional)
# ============================================================
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# ============================================================
# MONITORING (Optional)
# ============================================================
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from helmies-bites-web directory)
cd helmies-bites-web
vercel --prod

# Or connect GitHub repo to Vercel for auto-deploy
```

### Vercel Environment Variables
Set in Vercel Dashboard → Project → Settings → Environment Variables:
| Variable | Value |
|----------|-------|
| VITE_SUPABASE_URL | https://xxx.supabase.co |
| VITE_SUPABASE_ANON_KEY | eyJxxx |
| VITE_API_URL | https://api.helmiesbites.com |
| VITE_STRIPE_PUBLISHABLE_KEY | pk_live_xxx |

---

## 5. helmies-bites-site-template (Tenant Websites)

### Deployment: Automatic via Platform
Each tenant site is automatically deployed when:
1. Wizard is completed on helmies-bites-web
2. Platform clones template → GitHub repo (`{slug}-site`)
3. Platform creates Vercel project
4. Platform configures domain (`{slug}.helmiesbites.com`)

### Template .env (Injected by Platform)
```dotenv
# ============================================================
# SUPABASE
# ============================================================
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx

# ============================================================
# TENANT IDENTIFICATION
# ============================================================
VITE_TENANT_ID=uuid-of-tenant
VITE_TENANT_SLUG=restaurant-slug

# ============================================================
# API CONNECTION (Points to Platform)
# ============================================================
VITE_API_URL=https://api.helmiesbites.com

# ============================================================
# STRIPE (Publishable only)
# ============================================================
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

### Vercel Project Settings (Auto-configured)
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "VITE_TENANT_SLUG": "@tenant_slug",
    "VITE_TENANT_ID": "@tenant_id",
    "VITE_API_URL": "https://api.helmiesbites.com"
  }
}
```

---

## 6. DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Create Supabase project and run migrations
- [ ] Create Stripe account and configure products
- [ ] Set up GitHub organization `helmies-bites`
- [ ] Create Vercel team account
- [ ] Configure Hostinger domain and DNS

### Hostinger VPS Setup
- [ ] SSH into VPS and install Node.js 20, PM2, Nginx, Redis
- [ ] Create `helmies` user
- [ ] Clone all repos to VPS

### Platform (api.helmiesbites.com)
- [ ] Build & start with PM2 on VPS
- [ ] Create .env with production values
- [ ] Configure Nginx reverse proxy
- [ ] Configure SSL with Certbot
- [ ] Configure Stripe webhooks
- [ ] Test API endpoints

### Admin (admin.helmiesbites.com)
- [ ] Build & start with PM2 on VPS
- [ ] Create .env with production values
- [ ] Configure Nginx reverse proxy
- [ ] Configure SSL with Certbot
- [ ] Create initial admin user
- [ ] Test login and dashboard

### Web (bites.helmies.fi)
- [ ] Deploy to Vercel
- [ ] Set environment variables
- [ ] Test wizard flow end-to-end
- [ ] Verify API connectivity

### Template
- [ ] Push to GitHub `helmies-bites/helmies-site-template`
- [ ] Test automation flow manually
- [ ] Verify tenant site creation

---

## 7. CONNECTION MAP

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL SERVICES                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Supabase ───────────────────┬───────────────────────────────────────────── │
│  (Database)                  │                                              │
│                              ▼                                              │
│  ┌────────────┐   ┌────────────────┐   ┌────────────┐   ┌────────────────┐ │
│  │    Web     │──▶│    Platform    │◀──│   Admin    │   │  Tenant Sites  │ │
│  │  (Vercel)  │   │(Hostinger VPS) │   │(Hostinger) │   │   (Vercel)     │ │
│  └────────────┘   └───────┬────────┘   └────────────┘   └───────┬────────┘ │
│                           │                                      │          │
│                           ▼                                      │          │
│              ┌────────────────────────┐                          │          │
│              │   GitHub + Vercel      │◀─────────────────────────┘          │
│              │   (Auto-deployment)    │                                     │
│              └────────────────────────┘                                     │
│                                                                             │
│  Stripe ──────────────────────────────────────────────────────────────────  │
│  (Payments)   ▲                    ▲                         ▲              │
│               │                    │                         │              │
│            Platform             Admin                  Tenant Sites         │
│         (secret key)       (publishable)            (publishable)           │
│                                                                             │
│  OpenRouter ───────────────▶ Platform (AI features)                         │
│  Hostinger ────────────────▶ Platform (DNS/Email automation)                │
│  Twilio ───────────────────▶ Platform (SMS, optional)                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. LOCAL DEVELOPMENT

### Start All Services
```bash
# Terminal 1 - Platform API
cd helmies-bites-platform
npm run dev
# Runs on http://localhost:3000

# Terminal 2 - Admin Dashboard  
cd helmies-bites-admin
npm run dev
# Runs on http://localhost:5174

# Terminal 3 - Marketing Website
cd helmies-bites-web
npm run dev
# Runs on http://localhost:5173

# Terminal 4 - Template (for testing)
cd helmies-bites-site-template
npm run dev
# Runs on http://localhost:5175
```

### Local .env Files
Copy `.env.example` to `.env` in each project and update:
```bash
# In each project directory
cp .env.example .env
```

Update `VITE_API_URL` to `http://localhost:3000` for local development.

---

## 9. SECRETS MANAGEMENT

### Production Secrets (Never commit!)
Store in:
- Hostinger VPS: `.env` files (chmod 600) in each app directory
- Vercel: Dashboard → Environment Variables
- 1Password/Vault for team sharing

### Required API Keys
| Service | Key Type | Used By |
|---------|----------|---------|
| Supabase | URL + Anon Key | All frontends |
| Supabase | Service Role Key | Platform, Admin backend |
| Stripe | Publishable Key | All frontends |
| Stripe | Secret Key | Platform only |
| GitHub | Personal Access Token | Platform only |
| Vercel | API Token | Platform only |
| Hostinger | API Key | Platform only |
| OpenRouter | API Key | Platform only |
| Twilio | Account SID + Auth Token | Platform only |

---

## 10. MONITORING & LOGGING

### Recommended Services
- **Error Tracking**: Sentry (add SENTRY_DSN to all apps)
- **Logging**: PM2 logs (`pm2 logs`), Vercel logs
- **Uptime**: UptimeRobot or Better Uptime
- **Analytics**: Google Analytics (add GA_ID to frontends)

### Health Check Endpoints
```
Platform: https://api.helmiesbites.com/health
Admin:    https://admin.helmiesbites.com/health
```

---

## Quick Reference Card

| Project | Deploy To | Domain | Port | Connects To |
|---------|-----------|--------|------|-------------|
| platform | Hostinger VPS | api.helmiesbites.com | 3000 | Supabase, Stripe, GitHub, Vercel, Hostinger API |
| admin | Hostinger VPS | admin.helmiesbites.com | 5174 | Platform API, Supabase |
| web | Vercel | bites.helmies.fi | - | Platform API, Supabase |
| site-template | Vercel (auto) | {slug}.helmiesbites.com | - | Platform API, Supabase |
