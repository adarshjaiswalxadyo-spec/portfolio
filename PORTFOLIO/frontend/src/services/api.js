// API Configuration
const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://adarsh-portfolio-api.onrender.com'
    : 'http://localhost:10000',
  ENDPOINTS: {
    // Contact
    CONTACT: '/api/contact',
    MESSAGES: '/api/messages',
    
    // Portfolio
    PROJECTS: '/api/projects',
    PROJECT: '/api/projects',
    CERTIFICATES: '/api/certificates',
    VIDEOS: '/api/videos',
    STATS: '/api/stats',
    CATEGORIES: '/api/categories'
  },
  TIMEOUT: 10000
};

// API Service Class
class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET'
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

  // Contact form submission
  async submitContact(formData) {
    return this.post(API_CONFIG.ENDPOINTS.CONTACT, formData);
  }

  // Get projects
  async getProjects(params = {}) {
    return this.get(API_CONFIG.ENDPOINTS.PROJECTS, params);
  }

  // Get single project
  async getProject(id) {
    return this.get(`${API_CONFIG.ENDPOINTS.PROJECT}/${id}`);
  }

  // Get certificates
  async getCertificates(params = {}) {
    return this.get(API_CONFIG.ENDPOINTS.CERTIFICATES, params);
  }

  // Get videos
  async getVideos(params = {}) {
    return this.get(API_CONFIG.ENDPOINTS.VIDEOS, params);
  }

  // Get portfolio stats
  async getPortfolioStats() {
    return this.get(API_CONFIG.ENDPOINTS.STATS);
  }

  // Get categories
  async getCategories() {
    return this.get(API_CONFIG.ENDPOINTS.CATEGORIES);
  }
}

// Create singleton instance
const apiService = new ApiService();

// Export for use in components
export default apiService;

// Also export the class for testing
export { ApiService, API_CONFIG };
