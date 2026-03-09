# 🚀 Portfolio Deployment Guide

## 📋 Overview

This guide covers deploying the full-stack portfolio application using free hosting services.

### Architecture
- **Frontend**: Vercel (Static Hosting)
- **Backend**: Render (Node.js Server)
- **Database**: MongoDB (Render Free Tier)
- **Domain**: Free subdomains or custom domain

---

## 🎯 Prerequisites

1. **GitHub Account**
2. **Vercel Account** (Sign up with GitHub)
3. **Render Account** (Sign up with GitHub)
4. **MongoDB Atlas Account** (Optional, or use Render's MongoDB)

---

## 📁 Project Structure

```
portfolio/
├── backend/                 # Node.js API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Security middleware
│   │   └── utils/          # Helper functions
│   ├── uploads/           # File uploads
│   ├── package.json
│   └── render.yaml        # Render configuration
├── frontend/              # Static website
│   ├── public/           # HTML files
│   ├── src/              # JavaScript modules
│   ├── assets/           # Static assets
│   └── vercel.json       # Vercel configuration
└── docs/                 # Documentation
```

---

## 🔧 Step 1: Backend Deployment (Render)

### 1.1 Prepare Backend
```bash
cd backend
npm install
```

### 1.2 Environment Variables
Create `.env` file in backend:
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=https://your-portfolio.vercel.app
```

### 1.3 Deploy to Render
1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

### 1.4 Add Environment Variables
In Render dashboard, add all environment variables from `.env` file.

### 1.5 Deploy Database
1. In Render, click "New" → "PostgreSQL" or "Mongo"
2. Choose free plan
3. Get connection string and update `MONGODB_URI`

---

## 🎨 Step 2: Frontend Deployment (Vercel)

### 2.1 Prepare Frontend
```bash
cd frontend
npm install
```

### 2.2 Environment Variables
Create `.env.production`:
```env
NODE_ENV=production
VITE_API_URL=https://adarsh-portfolio-api.onrender.com
```

### 2.3 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Other`
   - **Root Directory**: `frontend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

### 2.4 Add Environment Variables
In Vercel dashboard, add production environment variables.

---

## 🌐 Step 3: Domain Configuration

### 3.1 Free Subdomains
After deployment, you'll get:
- **Frontend**: `https://portfolio-xyz.vercel.app`
- **Backend**: `https://adarsh-portfolio-api.onrender.com`

### 3.2 Custom Domain (Optional)
1. Buy domain from GoDaddy/Namecheap (~$10/year)
2. Add to Vercel dashboard
3. Update DNS settings:
   ```
   A: @ -> 76.76.21.21
   CNAME: www -> cname.vercel-dns.com
   ```

---

## 🔒 Step 4: Security Configuration

### 4.1 CORS Settings
Update backend CORS to allow your frontend domain:
```javascript
const corsOptions = {
  origin: [
    'https://your-portfolio.vercel.app',
    'https://your-custom-domain.com'
  ]
};
```

### 4.2 Environment Variables
Never commit `.env` files to Git. Always use platform environment variables.

### 4.3 Security Headers
Both platforms automatically add security headers via configuration files.

---

## 📊 Step 5: Testing & Monitoring

### 5.1 Health Checks
Test backend health:
```bash
curl https://adarsh-portfolio-api.onrender.com/health
```

### 5.2 API Testing
Test contact form submission:
```bash
curl -X POST https://adarsh-portfolio-api.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'
```

### 5.3 Monitoring
- **Render**: Built-in logs and metrics
- **Vercel**: Analytics and logs
- **MongoDB**: Atlas monitoring dashboard

---

## 🔄 Step 6: CI/CD Pipeline

### 6.1 Automatic Deployments
Both platforms auto-deploy on `git push` to main branch.

### 6.2 Manual Deployments
- **Render**: Manual deploy button in dashboard
- **Vercel**: Redeploy from project settings

### 6.3 Rollbacks
Both platforms support one-click rollbacks to previous deployments.

---

## 💰 Cost Breakdown

| Service | Cost | Features |
|---------|------|----------|
| Vercel Pro | $0/month | Static hosting, CI/CD |
| Render Free | $0/month | 750 hours/month |
| MongoDB Free | $0/month | 512MB storage |
| Custom Domain | $10/year | Optional |
| **Total** | **$0-10/year** | **Full-stack hosting** |

---

## 🚨 Common Issues & Solutions

### Issue 1: Backend Sleep Time
**Problem**: Free Render services sleep after 15 minutes.
**Solution**: First request takes 30-60 seconds, subsequent requests are fast.

### Issue 2: CORS Errors
**Problem**: Frontend can't access backend API.
**Solution**: Update CORS settings in backend to include frontend domain.

### Issue 3: Build Failures
**Problem**: Deployment fails due to missing dependencies.
**Solution**: Check `package.json` and ensure all dependencies are listed.

### Issue 4: Environment Variables
**Problem**: Sensitive data exposed in frontend.
**Solution**: Move all sensitive logic to backend, use secure HTTP headers.

---

## 📈 Performance Optimization

### Frontend Optimization
```javascript
// Implement lazy loading
const lazyLoad = () => {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  images.forEach(img => imageObserver.observe(img));
};
```

### Backend Optimization
```javascript
// Implement caching
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes

// Cache middleware
const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cached = cache.get(key);
    
    if (cached) {
      return res.json(cached);
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.sendResponse(body);
    };
    
    next();
  };
};
```

---

## 🎯 Best Practices

### Security
1. Always validate input on backend
2. Use HTTPS everywhere
3. Implement rate limiting
4. Sanitize user input
5. Use environment variables for secrets

### Performance
1. Implement caching strategies
2. Use CDN for static assets
3. Optimize images and videos
4. Minify CSS and JavaScript
5. Use lazy loading

### Maintenance
1. Regular dependency updates
2. Monitor error logs
3. Backup database regularly
4. Test deployment pipeline
5. Document changes

---

## 🆘 Support & Troubleshooting

### Helpful Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.mongodb.com/atlas)

### Common Commands
```bash
# Check deployment status
vercel logs
render logs

# Redeploy manually
vercel --prod
# Go to Render dashboard and click "Manual Deploy"

# Debug environment variables
console.log(process.env.NODE_ENV);
```

---

## 🎉 Conclusion

Your portfolio is now live with:
- ✅ Secure backend API
- ✅ Optimized frontend
- ✅ Free hosting
- ✅ CI/CD pipeline
- ✅ SSL certificates
- ✅ Performance monitoring

**Next Steps:**
1. Set up custom domain
2. Configure analytics
3. Add monitoring alerts
4. Optimize for SEO
5. Add more features

---

*Last Updated: January 2024*
