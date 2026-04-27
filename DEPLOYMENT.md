# Deployment Guide

Complete guide to deploying your Bare + UltraViolet proxy on various platforms.

## Table of Contents

1. [Vercel (Recommended)](#vercel-recommended)
2. [Heroku](#heroku)
3. [Railway](#railway)
4. [GitHub Pages](#github-pages)
5. [Self-Hosted VPS](#self-hosted-vps)
6. [Docker](#docker)

---

## Vercel (Recommended)

**Setup Time:** 2 minutes  
**Cost:** Free (with limits)  
**Best For:** Quick deployment with auto-scaling

### Step 1: Deploy with One Click
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ezzuracalley71-jpg/bare-ultraviolet-proxy)

### Step 2: Authorize GitHub
- Click "Continue with GitHub"
- Authorize Vercel to access your GitHub account

### Step 3: Import Project
- Vercel auto-detects your project
- Click "Deploy"
- Wait 1-2 minutes for deployment

### Step 4: Access Your Proxy
- Vercel provides a public URL
- Open the URL in your browser
- Your proxy is live!

### Environment Variables (Optional)
```bash
PORT=3000
NODE_ENV=production
```

### Custom Domain
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Follow DNS instructions

---

## Heroku

**Setup Time:** 5 minutes  
**Cost:** Free tier available  
**Best For:** Testing and small deployments

### Prerequisites
- Heroku account (free)
- Heroku CLI installed

### Step 1: Create Heroku App
```bash
heroku login
heroku create your-app-name
```

### Step 2: Deploy Code
```bash
git push heroku main
```

### Step 3: View Logs
```bash
heroku logs --tail
```

### Step 4: Open App
```bash
heroku open
```

### Step 5: Set Environment Variables (Optional)
```bash
heroku config:set NODE_ENV=production
```

### Custom Domain
```bash
heroku domains:add www.yourdomain.com
```

Then update your DNS records with Heroku's nameservers.

---

## Railway

**Setup Time:** 3 minutes  
**Cost:** Free tier available  
**Best For:** Modern, easy deployment

### Step 1: Sign Up
- Go to [railway.app](https://railway.app)
- Click "Start Project"
- Select "Deploy from GitHub repo"

### Step 2: Connect GitHub
- Authorize Railway
- Select `bare-ultraviolet-proxy` repo
- Click "Deploy"

### Step 3: Configure
- Railway auto-detects `package.json`
- Sets `npm start` as start command
- Wait for deployment

### Step 4: Get URL
- Go to Deployments tab
- Copy the generated URL
- Open in browser

### Custom Domain
1. In Railway Dashboard
2. Select your project
3. Go to Settings
4. Add Custom Domain
5. Update DNS records

---

## GitHub Pages

**Setup Time:** 2 minutes  
**Cost:** Free  
**Limitation:** Frontend-only (no Bare server)  
**Best For:** Static hosting only

### Option 1: Enable GitHub Pages (Recommended for Frontend Only)

1. Go to your repository settings
2. Scroll to "GitHub Pages"
3. Select "main" branch as source
4. Save

Your site will be available at: `https://username.github.io/bare-ultraviolet-proxy/`

### Option 2: GitHub Actions Deployment (With Node.js)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

**⚠️ Note:** GitHub Pages is static-only. It cannot run the Node.js Bare server. Use Vercel, Heroku, or Railway for full functionality.

---

## Self-Hosted VPS

**Setup Time:** 30 minutes  
**Cost:** $5-50/month  
**Best For:** Full control and customization

### Recommended Providers
- DigitalOcean ($5/month)
- Linode ($5/month)
- AWS EC2 (free tier)
- Vultr ($2.50/month)
- Hetzner (€3/month)

### Setup Instructions (Ubuntu/Debian)

#### Step 1: Connect to Your Server
```bash
ssh root@your_server_ip
```

#### Step 2: Update System
```bash
apt update && apt upgrade -y
```

#### Step 3: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs
```

#### Step 4: Clone Repository
```bash
cd /home/ubuntu
git clone https://github.com/ezzuracalley71-jpg/bare-ultraviolet-proxy.git
cd bare-ultraviolet-proxy
```

#### Step 5: Install Dependencies
```bash
npm install
```

#### Step 6: Install PM2 (Process Manager)
```bash
npm install -g pm2
```

#### Step 7: Start Application
```bash
pm2 start server.js --name "proxy"
pm2 startup
pm2 save
```

#### Step 8: Install Nginx (Reverse Proxy)
```bash
apt install -y nginx
```

Create `/etc/nginx/sites-available/proxy`:
```nginx
server {
    listen 80;
    server_name your_domain.com www.your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/proxy /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### Step 9: Setup SSL (HTTPS)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your_domain.com -d www.your_domain.com
```

#### Step 10: Access Your Proxy
Visit `https://your_domain.com`

### Monitoring
```bash
# View logs
pm2 logs proxy

# Monitor
pm2 monit

# Restart
pm2 restart proxy
```

---

## Docker

**Setup Time:** 5 minutes  
**Best For:** Containerized deployment

### Step 1: Create Dockerfile

Create a `Dockerfile` in your repository root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Step 2: Create .dockerignore

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
```

### Step 3: Build Image
```bash
docker build -t bare-ultraviolet-proxy .
```

### Step 4: Run Container
```bash
docker run -p 3000:3000 bare-ultraviolet-proxy
```

### Step 5: Access
Open `http://localhost:3000`

### Deploy to Docker Hub
```bash
# Login
docker login

# Tag image
docker tag bare-ultraviolet-proxy username/bare-ultraviolet-proxy:latest

# Push
docker push username/bare-ultraviolet-proxy:latest
```

---

## Comparison Table

| Feature | Vercel | Heroku | Railway | VPS | Docker |
|---------|--------|--------|---------|-----|--------|
| **Cost** | Free | Free | Free | $5-50 | Free |
| **Setup Time** | 2 min | 5 min | 3 min | 30 min | 5 min |
| **Auto-scaling** | ✅ | ❌ | ❌ | ❌ | ✅* |
| **Custom Domain** | ✅ | ✅ | ✅ | ✅ | ✅* |
| **Full Control** | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Best For** | Quick Deploy | Testing | Easy Deploy | Control | Containers |

---

## Troubleshooting Deployment

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Cannot Connect to Database
- Check database URL in environment variables
- Verify network/firewall rules
- Check database is running and accessible

### Module Not Found
```bash
npm install
npm ci  # Clean install
```

### Bare API Not Responding
- Check server logs
- Verify `/bare/api/v1/` endpoint
- Ensure deployment platform supports Node.js

### SSL Certificate Errors
```bash
# Certbot renewal
certbot renew --dry-run

# Manual renewal
certbot renew
```

---

## Security Best Practices

1. **Use HTTPS** - Always use SSL/TLS certificates
2. **Environment Variables** - Store secrets in environment variables
3. **Rate Limiting** - Implement rate limiting to prevent abuse
4. **Firewall** - Configure firewall rules appropriately
5. **Updates** - Keep Node.js and dependencies updated
6. **Monitoring** - Set up monitoring and alerts

---

## Support

For deployment issues:
- Check service status pages
- Review platform documentation
- Check application logs
- Open an issue on GitHub

---

**Happy Deploying! 🚀**
