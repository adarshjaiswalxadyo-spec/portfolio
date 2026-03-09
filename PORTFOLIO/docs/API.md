# 📚 Portfolio API Documentation

## 🌐 Overview

Secure RESTful API for Adarsh Jaiswal's portfolio website with authentication, rate limiting, and comprehensive error handling.

**Base URL**: `https://adarsh-portfolio-api.onrender.com/api`
**Version**: v1.0.0
**Status**: Production Ready

---

## 🔐 Authentication

### JWT Token Authentication
Protected endpoints require JWT token in Authorization header:

```http
Authorization: Bearer <jwt_token>
```

### Get Token
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "your-password"
}
```

---

## 📧 Contact API

### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully! We'll get back to you soon.",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "submittedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Validation Rules:**
- `name`: 2-50 characters, required
- `email`: Valid email, required
- `phone`: Optional, phone format
- `subject`: Optional, max 100 characters
- `message`: 10-500 characters, required

**Rate Limiting:**
- 5 submissions per hour per IP
- 100 requests per 15 minutes per IP

---

### Get Messages (Admin Only)
```http
GET /api/messages?page=1&limit=10&status=pending
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "subject": "Project Inquiry",
        "message": "I would like to discuss a project...",
        "status": "pending",
        "ip": "192.168.1.1",
        "userAgent": "Mozilla/5.0...",
        "createdAt": "2024-01-15T10:30:00.000Z",
        "formattedDate": "January 15, 2024"
      }
    ],
    "pagination": {
      "current": 1,
      "pages": 3,
      "total": 25
    }
  }
}
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 50)
- `status`: Filter by status (`pending`, `read`, `replied`, `archived`)

---

### Update Message Status (Admin Only)
```http
PATCH /api/messages/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "read"
}
```

**Status Values:**
- `pending`: New message
- `read`: Message viewed
- `replied`: Response sent
- `archived`: Message archived

---

### Delete Message (Admin Only)
```http
DELETE /api/messages/:id
Authorization: Bearer <token>
```

---

## 🎨 Portfolio API

### Get Projects
```http
GET /api/projects?featured=true&category=web&page=1&limit=12
```

**Response:**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "E-Commerce Platform",
        "description": "Modern e-commerce solution with React and Node.js",
        "category": "web",
        "featured": true,
        "technologies": ["React", "Node.js", "MongoDB"],
        "liveUrl": "https://example.com",
        "githubUrl": "https://github.com/user/project",
        "imageUrl": "/uploads/projects/project1.jpg",
        "views": 1250,
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "current": 1,
      "pages": 2,
      "total": 18
    }
  }
}
```

**Query Parameters:**
- `featured`: Filter featured projects (`true`/`false`)
- `category`: Filter by category
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 12)

---

### Get Single Project
```http
GET /api/projects/:id
```

**Note**: This endpoint increments the project's view count.

---

### Get Certificates
```http
GET /api/certificates?page=1&limit=12
```

**Response:**
```json
{
  "success": true,
  "data": {
    "certificates": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "Full Stack Web Development",
        "issuer": "Coursera",
        "date": "2024-01-15",
        "credentialId": "ABC123XYZ",
        "imageUrl": "/uploads/certificates/cert1.jpg",
        "certificateUrl": "https://coursera.org/verify/ABC123XYZ"
      }
    ],
    "pagination": {
      "current": 1,
      "pages": 1,
      "total": 8
    }
  }
}
```

---

### Get Videos
```http
GET /api/videos?category=web&search=react&page=1&limit=12
```

**Response:**
```json
{
  "success": true,
  "data": {
    "videos": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "title": "React Tutorial for Beginners",
        "description": "Complete React tutorial from scratch",
        "category": "web",
        "thumbnailUrl": "/uploads/videos/thumb1.jpg",
        "videoUrl": "https://youtube.com/watch?v=abc123",
        "duration": "45:30",
        "views": 5420,
        "tags": ["react", "javascript", "tutorial"],
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "current": 1,
      "pages": 3,
      "total": 25
    }
  }
}
```

**Query Parameters:**
- `category`: Filter by category
- `search`: Search in title, description, tags
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 12)

---

### Get Portfolio Stats
```http
GET /api/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "projects": 24,
    "certificates": 12,
    "videos": 15,
    "totalViews": 15420,
    "experience": 5,
    "clients": 50
  }
}
```

---

### Get Categories
```http
GET /api/categories
```

**Response:**
```json
{
  "success": true,
  "data": {
    "projects": ["web", "mobile", "desktop", "ai"],
    "videos": ["web", "design", "coding", "tutorial"]
  }
}
```

---

## 🔒 Security Features

### Rate Limiting
- **General**: 100 requests per 15 minutes per IP
- **Contact Form**: 5 submissions per hour per IP
- **Auth**: 10 login attempts per 15 minutes per IP

### CORS Protection
Only allowed origins can access the API:
```javascript
const allowedOrigins = [
  'https://adarshjaiswalxadyo-spec.github.io',
  'https://your-portfolio.vercel.app',
  'http://localhost:3000'
];
```

### Security Headers
```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
```

### Input Validation
All inputs are validated using Joi schemas:
```javascript
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).max(500).required()
});
```

---

## 🚨 Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable error message"
}
```

### Common Error Codes
- `400` - Bad Request (Validation Error)
- `401` - Unauthorized (Invalid/Missing Token)
- `403` - Forbidden (Insufficient Permissions)
- `404` - Not Found (Resource doesn't exist)
- `429` - Too Many Requests (Rate Limit)
- `500` - Internal Server Error

### Validation Error Example
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "name: Name must be at least 2 characters long"
}
```

---

## 📊 Monitoring & Health

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 86400
}
```

### API Documentation
```http
GET /api
```

**Response:**
```json
{
  "success": true,
  "message": "Portfolio API v1.0.0",
  "version": "1.0.0",
  "endpoints": {
    "contact": {
      "POST /contact": "Submit contact form",
      "GET /messages": "Get all messages (admin)"
    },
    "portfolio": {
      "GET /projects": "Get all projects",
      "GET /stats": "Get portfolio statistics"
    }
  }
}
```

---

## 🧪 Testing

### Example cURL Commands

**Submit Contact Form:**
```bash
curl -X POST https://adarsh-portfolio-api.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Test message from API documentation"
  }'
```

**Get Projects:**
```bash
curl https://adarsh-portfolio-api.onrender.com/api/projects?featured=true
```

**Get Stats:**
```bash
curl https://adarsh-portfolio-api.onrender.com/api/stats
```

---

## 📈 Performance

### Response Times
- **Contact Submission**: < 500ms
- **Project Queries**: < 300ms
- **Stats API**: < 200ms
- **Health Check**: < 100ms

### Caching Strategy
- **Portfolio Data**: 5 minutes cache
- **Stats**: 1 hour cache
- **Static Assets**: 1 year cache

### Database Optimization
- Indexed queries for performance
- Pagination for large datasets
- Connection pooling
- Query optimization

---

## 🔄 Version History

### v1.0.0 (Current)
- ✅ Contact form API
- ✅ Portfolio data API
- ✅ Authentication system
- ✅ Rate limiting
- ✅ Security headers
- ✅ Error handling

### Upcoming Features
- 🔄 File upload API
- 🔄 Search functionality
- 🔄 Analytics API
- 🔄 Newsletter subscription
- 🔄 Blog API

---

## 🆘 Support

### Common Issues

**CORS Error:**
```javascript
// Ensure your frontend domain is in allowedOrigins
const allowedOrigins = ['https://your-portfolio.vercel.app'];
```

**Rate Limit:**
```javascript
// Wait for the rate limit window to reset
// Check rate limit headers in response
```

**Validation Error:**
```javascript
// Check the validation rules in the documentation
// Ensure all required fields are included
```

### Debug Tips
1. Check browser console for errors
2. Verify API endpoint URLs
3. Check network tab for request/response
4. Validate input data format
5. Check rate limit headers

---

## 📞 Contact

For API support or questions:
- **Email**: adarshjaiswalxadyo@gmail.com
- **GitHub**: [adarshjaiswalxadyo-spec](https://github.com/adarshjaiswalxadyo-spec)
- **Portfolio**: [https://your-portfolio.vercel.app](https://your-portfolio.vercel.app)

---

*API Documentation Last Updated: January 2024*
