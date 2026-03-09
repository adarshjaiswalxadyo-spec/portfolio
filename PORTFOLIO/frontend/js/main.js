// ===== ULTRA PRO PERFORMANCE OPTIMIZED =====
// Use requestAnimationFrame for smooth animations
// Debounce scroll events for better performance
// Lazy load animations when in viewport
// Optimize DOM queries

// ===== DOM ELEMENTS (CACHED) =====
const elements = {
  hamburger: null,
  navMenu: null,
  navLinks: null,
  themeToggle: null,
  contactForm: null,
  formStatus: null,
  categoryBtns: null,
  videoCards: null,
  loadMoreBtn: null,
  bgMusic: null,
  loadingScreen: null,
  cursorGlow: null,
  scrollIndicator: null
};

// Cache DOM elements on load
function cacheElements() {
  elements.hamburger = document.querySelector('.hamburger');
  elements.navMenu = document.querySelector('.nav-menu');
  elements.navLinks = document.querySelectorAll('.nav-link');
  elements.themeToggle = document.getElementById('themeToggle');
  elements.contactForm = document.getElementById('contactForm');
  elements.formStatus = document.getElementById('formStatus');
  elements.categoryBtns = document.querySelectorAll('.category-btn');
  elements.videoCards = document.querySelectorAll('.video-card');
  elements.loadMoreBtn = document.getElementById('loadMoreVideos');
  elements.bgMusic = document.getElementById('bgMusic');
  elements.loadingScreen = document.getElementById('loadingScreen');
  elements.cursorGlow = document.getElementById('cursorGlow');
  elements.scrollIndicator = document.getElementById('scrollIndicator');
}

// ===== PERFORMANCE UTILITIES =====
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// ===== INTERSECTION OBSERVER FOR LAZY LOADING =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stop observing once animated
      animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// ===== ULTRA FAST INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  cacheElements();
  initializeApp();
});

function initializeApp() {
  // Initialize critical features first
  setupLoadingScreen();
  
  // Initialize performance-heavy features with longer delay
  setTimeout(() => {
    // Initialize all features when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      setupThemeToggle();
      setupMobileMenu();
      setupSmoothScrolling();
      setupNavbarScroll();
      setupTypingAnimation();
      setupParticleAnimation();
      setupLazyLoading();
      setupBackgroundMusic();
      setupTechStackAnimations();
      setupVideoFilters();
      setupVideoAutoplay();
      trackPageView();
    });
    // setupCursorGlow();
    // setupScrollIndicator();
    // setupMagneticButtons();
    // setupParallaxEffects();
  }, 500);
}

// ===== LOADING SCREEN (FIXED) =====
function setupLoadingScreen() {
  if (!elements.loadingScreen) return;
  
  // Hide loading screen immediately - no waiting
  elements.loadingScreen.style.display = 'none';
  
  // Alternative: Hide after very short delay
  /*
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      elements.loadingScreen.classList.add('hidden');
      setTimeout(() => {
        elements.loadingScreen.style.display = 'none';
      }, 100);
    });
  });
  */
}

// ===== CURSOR GLOW EFFECT (OPTIMIZED) =====
function setupCursorGlow() {
  if (!elements.cursorGlow) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let rafId;

  // Throttled mouse move handler
  const handleMouseMove = throttle((e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, 16); // ~60fps

  document.addEventListener('mousemove', handleMouseMove);

  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15; // Faster response
    cursorY += dy * 0.15;
    
    elements.cursorGlow.style.left = cursorX - 10 + 'px';
    elements.cursorGlow.style.top = cursorY - 10 + 'px';
    
    rafId = requestAnimationFrame(animateCursor);
  }
  
  animateCursor();

  // Hide cursor glow when mouse leaves window
  document.addEventListener('mouseleave', () => {
    elements.cursorGlow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    elements.cursorGlow.style.opacity = '0.5';
  });
}

// ===== SCROLL INDICATOR (OPTIMIZED) =====
function setupScrollIndicator() {
  if (!elements.scrollIndicator) return;

  elements.scrollIndicator.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });

  // Hide scroll indicator when user starts scrolling
  let hasScrolled = false;
  const handleScroll = throttle(() => {
    if (!hasScrolled && window.scrollY > 100) {
      hasScrolled = true;
      elements.scrollIndicator.style.opacity = '0';
      setTimeout(() => {
        if (elements.scrollIndicator) {
          elements.scrollIndicator.style.display = 'none';
        }
      }, 300);
    }
  }, 100);

  window.addEventListener('scroll', handleScroll);
}

// ===== MAGNETIC BUTTONS (OPTIMIZED) =====
function setupMagneticButtons() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.classList.add('magnetic-btn');
    
    const handleMouseMove = throttle((e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    }, 16);
    
    button.addEventListener('mousemove', handleMouseMove);
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0) scale(1)';
    });
  });
}

// ===== PARALLAX EFFECTS (OPTIMIZED) =====
function setupParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.hero-text, .hero-image, .profile-container');
  
  parallaxElements.forEach(element => {
    element.classList.add('parallax-element');
  });

  const handleScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }, 16);

  window.addEventListener('scroll', handleScroll);
}

// ===== TECH STACK INTERACTIVE ANIMATIONS =====
function setupTechStackAnimations() {
  const techItems = document.querySelectorAll('.skill-item');
  
  techItems.forEach((item, index) => {
    // Add entrance animation with delay
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.6s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
    
    // Add interactive hover effects
    item.addEventListener('mouseenter', function() {
      this.style.animation = 'techPulse 0.6s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.animation = '';
    });
    
    // Add click interaction
    item.addEventListener('click', function() {
      const techName = this.querySelector('span').textContent;
      showTechDetail(techName, this);
    });
  });
}

function showTechDetail(techName, element) {
  // Create floating detail popup
  const existingPopup = document.querySelector('.tech-popup');
  if (existingPopup) existingPopup.remove();
  
  const popup = document.createElement('div');
  popup.className = 'tech-popup';
  popup.innerHTML = `
    <div class="tech-popup-content">
      <h3>${techName}</h3>
      <p>Advanced proficiency in ${techName} with real-world project experience.</p>
      <div class="tech-close"><i class="fas fa-times"></i></div>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // Position popup near the clicked element
  const rect = element.getBoundingClientRect();
  popup.style.position = 'fixed';
  popup.style.top = rect.top + 'px';
  popup.style.left = rect.left + 'px';
  popup.style.transform = 'translate(-50%, -120%)';
  popup.style.opacity = '0';
  
  // Animate popup
  setTimeout(() => {
    popup.style.transition = 'all 0.3s ease';
    popup.style.opacity = '1';
    popup.style.transform = 'translate(-50%, -130%)';
  }, 10);
  
  // Close popup
  const closeBtn = popup.querySelector('.tech-close');
  closeBtn.addEventListener('click', () => {
    popup.style.opacity = '0';
    setTimeout(() => popup.remove(), 300);
  });
  
  // Auto close after 3 seconds
  setTimeout(() => {
    if (popup.parentNode) {
      popup.style.opacity = '0';
      setTimeout(() => popup.remove(), 300);
    }
  }, 3000);
}

// Add CSS for tech popup
const techPopupCSS = `
  .tech-popup {
    position: fixed;
    z-index: 1000;
    pointer-events: auto;
  }
  
  .tech-popup-content {
    background: linear-gradient(135deg, #1e293b, #334155);
    border: 1px solid #6366f1;
    border-radius: 12px;
    padding: 15px;
    min-width: 200px;
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
    position: relative;
  }
  
  .tech-popup-content h3 {
    margin: 0 0 10px 0;
    color: #6366f1;
    font-size: 1.1rem;
  }
  
  .tech-popup-content p {
    margin: 0;
    color: #94a3b8;
    font-size: 0.9rem;
  }
  
  .tech-close {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    color: #64748b;
    font-size: 0.8rem;
  }
  
  .tech-close:hover {
    color: #ef4444;
  }
  
  @keyframes techPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const techStyle = document.createElement('style');
techStyle.textContent = techPopupCSS;
document.head.appendChild(techStyle);
function setupParticleAnimation() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;

  // Create additional floating particles (reduced for performance)
  for (let i = 0; i < 3; i++) {
    createParticle(particlesContainer);
  }

  // DISABLE dynamic particles for now to fix performance
  // Re-enable later if needed
  /*
  let particleTimeout;
  const handleMouseMove = throttle((e) => {
    clearTimeout(particleTimeout);
    particleTimeout = setTimeout(() => {
      if (Math.random() > 0.9) { // Very reduced frequency
        createDynamicParticle(e.clientX, e.clientY);
      }
    }, 300);
  }, 100);

  document.addEventListener('mousemove', handleMouseMove);
  */
}

function createDynamicParticle(x, y) {
  const particle = document.createElement('div');
  const size = Math.random() * 15 + 5;
  
  particle.style.cssText = `
    position: fixed;
    width: ${size}px;
    height: ${size}px;
    background: linear-gradient(135deg, 
      rgba(99, 102, 241, ${Math.random() * 0.2 + 0.05}), 
      rgba(236, 72, 153, ${Math.random() * 0.2 + 0.05}));
    border-radius: 50%;
    top: ${y}px;
    left: ${x}px;
    pointer-events: none;
    z-index: 999;
    animation: particleFade 1.5s ease-out forwards;
    transform: translateZ(0);
  `;
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 1500);
}

function createParticle(particlesContainer) {
  const particle = document.createElement('div');
  const size = Math.random() * 100 + 50;
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: linear-gradient(135deg, 
      rgba(99, 102, 241, ${Math.random() * 0.1 + 0.05}), 
      rgba(236, 72, 153, ${Math.random() * 0.1 + 0.05}));
    border-radius: 50%;
    top: ${Math.random() * 100}%;
    left: ${Math.random() * 100}%;
    animation: float ${Math.random() * 20 + 15}s infinite ease-in-out;
    animation-delay: ${Math.random() * 5}s;
    transform: translateZ(0);
    will-change: transform;
  `;
  
  particlesContainer.appendChild(particle);
}

// Add particle fade animation
if (!document.getElementById('particleStyles')) {
  const style = document.createElement('style');
  style.id = 'particleStyles';
  style.textContent = `
    @keyframes particleFade {
      0% {
        opacity: 0.6;
        transform: translate(0, 0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0.3);
      }
    }
  `;
  document.head.appendChild(style);
}

// ===== NAVIGATION (FIXED - NO GLITCHES) =====
function setupNavigation() {
  // Mobile menu toggle
  if (elements.hamburger && elements.navMenu) {
    elements.hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      elements.hamburger.classList.toggle('active');
      elements.navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  if (elements.navLinks) {
    elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Close mobile menu
        if (elements.hamburger) elements.hamburger.classList.remove('active');
        if (elements.navMenu) elements.navMenu.classList.remove('active');
        
        // Update active state
        updateActiveLink(e.target);
      });
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (elements.navMenu && !elements.navMenu.contains(e.target) && 
        elements.hamburger && !elements.hamburger.contains(e.target)) {
      elements.hamburger.classList.remove('active');
      elements.navMenu.classList.remove('active');
    }
  });

  // Set initial active link
  highlightActiveLink();
}

function updateActiveLink(clickedLink) {
  if (!elements.navLinks) return;
  
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  if (clickedLink && clickedLink.classList) {
    clickedLink.classList.add('active');
  }
}

function highlightActiveLink() {
  if (!elements.navLinks) return;
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  elements.navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ===== THEME TOGGLE (OPTIMIZED) =====
function setupThemeToggle() {
  if (!elements.themeToggle) return;

  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.toggle('light-theme', currentTheme === 'light');
  updateThemeIcon(currentTheme);

  elements.themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    const newTheme = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (!elements.themeToggle) return;
  const icon = elements.themeToggle.querySelector('i');
  if (icon) {
    icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .certificate-card, .video-card, .skill-item, .stat-item, .contact-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== CONTACT FORM =====
function setupContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Show loading state
        showFormStatus('Sending message...', 'loading');
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showFormStatus(result.message || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            showFormStatus('Network error. Please try again later.', 'error');
        }
    });
}

function showFormStatus(message, type) {
    if (!formStatus) return;
    
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

// ===== VIDEO AUTOPLAY FUNCTIONALITY =====
let currentPlayingVideo = null;
let videoObserver = null;

function setupVideoAutoplay() {
    // Get all video elements
    const videos = document.querySelectorAll('video');
    const videoCards = document.querySelectorAll('.video-card');
    
    if (!videos.length) return;

    // Create intersection observer for autoplay
    videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Video is visible in viewport
                if (!currentPlayingVideo || currentPlayingVideo === video) {
                    // Only play if no other video is playing or this is the current video
                    playVideo(video);
                }
            } else {
                // Video is not visible, pause it
                if (currentPlayingVideo === video) {
                    pauseVideo(video);
                }
            }
        });
    }, {
        threshold: 0.5, // Video is at least 50% visible
        rootMargin: '0px'
    });

    // Add click handlers to video cards
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const video = card.querySelector('video');
            if (video) {
                // Stop current video if playing
                if (currentPlayingVideo && currentPlayingVideo !== video) {
                    pauseVideo(currentPlayingVideo);
                }
                
                // Play clicked video
                playVideo(video);
                currentPlayingVideo = video;
                
                // Scroll to video
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // Observe all videos for autoplay
    videos.forEach(video => {
        videoObserver.observe(video);
    });

    // Add video event listeners
    videos.forEach(video => {
        // Play event
        video.addEventListener('play', () => {
            currentPlayingVideo = video;
            updateVideoCardState(video, 'playing');
        });

        // Pause event
        video.addEventListener('pause', () => {
            updateVideoCardState(video, 'paused');
        });

        // Ended event
        video.addEventListener('ended', () => {
            currentPlayingVideo = null;
            updateVideoCardState(video, 'ended');
            
            // Try to play next video after 2 seconds
            setTimeout(() => {
                playNextVideo(video);
            }, 2000);
        });

        // Error event
        video.addEventListener('error', () => {
            console.error('Video error:', video.error);
            updateVideoCardState(video, 'error');
        });
    });
}

function playVideo(video) {
    if (video) {
        video.play().catch(error => {
            console.error('Error playing video:', error);
        });
    }
}

function pauseVideo(video) {
    if (video) {
        video.pause();
    }
}

function updateVideoCardState(video, state) {
    const card = video.closest('.video-card');
    if (!card) return;

    // Remove all state classes
    card.classList.remove('video-playing', 'video-paused', 'video-ended', 'video-error');
    
    // Add current state class
    card.classList.add(`video-${state}`);
    
    // Update visual indicators
    const overlay = card.querySelector('.video-overlay');
    if (overlay) {
        overlay.className = `video-overlay video-${state}`;
    }
}

function playNextVideo(currentVideo) {
    const cards = Array.from(document.querySelectorAll('.video-card'));
    const currentIndex = cards.findIndex(card => card.contains(currentVideo));
    
    if (currentIndex !== -1 && currentIndex < cards.length - 1) {
        const nextCard = cards[currentIndex + 1];
        const nextVideo = nextCard.querySelector('video');
        
        if (nextVideo) {
            // Scroll to next video
            nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Play next video after scroll completes
            setTimeout(() => {
                playVideo(nextVideo);
                currentPlayingVideo = nextVideo;
            }, 1000);
        }
    }
}

// ===== VIDEO FILTERS =====
function setupVideoFilters() {
    if (!categoryBtns.length || !videoCards.length) return;

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter videos
            filterVideos(category);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterVideos('all', searchTerm);
        }, 300));
    }
}

function filterVideos(category, searchTerm = '') {
    const cards = Array.from(videoCards);
    
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        const title = card.querySelector('.video-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.video-description')?.textContent.toLowerCase() || '';
        
        const matchesCategory = category === 'all' || cardCategory === category;
        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm) || 
            description.includes(searchTerm);
        
        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== VIDEO FILTERS =====
function setupVideoFilters() {
    if (!categoryBtns.length || !videoCards.length) return;

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter videos
            videoCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== VIDEO PLAY BUTTONS =====
function setupVideoPlayButtons() {
    const playButtons = document.querySelectorAll('.video-play-button');
    
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find the associated video player
            const videoCard = button.closest('.video-card, .featured-video-container');
            const videoPlayer = videoCard.querySelector('video');
            
            if (videoPlayer) {
                if (videoPlayer.paused) {
                    videoPlayer.play();
                    button.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    videoPlayer.pause();
                    button.innerHTML = '<i class="fas fa-play"></i>';
                }
            } else {
                alert('Video player will be implemented here. This is a placeholder for the actual video playback.');
            }
        });
    });

    // Setup video player event listeners
    const videoPlayers = document.querySelectorAll('video');
    videoPlayers.forEach(player => {
        player.addEventListener('play', () => {
            const playButton = player.parentElement.querySelector('.video-play-button');
            if (playButton) {
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            }
        });

        player.addEventListener('pause', () => {
            const playButton = player.parentElement.querySelector('.video-play-button');
            if (playButton) {
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        player.addEventListener('ended', () => {
            const playButton = player.parentElement.querySelector('.video-play-button');
            if (playButton) {
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    });
}

// ===== AUTO BACKGROUND MUSIC =====
function setupBackgroundMusic() {
  if (!elements.bgMusic) return;
  
  // Auto play music with user interaction
  const playMusic = () => {
    elements.bgMusic.play().catch(e => console.log('Music autoplay prevented'));
  };
  
  // Try to play on first user interaction
  document.addEventListener('click', playMusic, { once: true });
  document.addEventListener('keydown', playMusic, { once: true });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove background blur based on scroll
        if (currentScroll > 50) {
            navbar.style.background = 'var(--overlay-bg)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'var(--overlay-bg)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        lastScroll = currentScroll;
    });
}

// ===== TYPING ANIMATION =====
function setupTypingAnimation() {
    const taglineTexts = document.querySelectorAll('.tagline-text');
    if (!taglineTexts.length) return;

    taglineTexts.forEach((text, index) => {
        const originalText = text.textContent;
        text.textContent = '';
        text.style.opacity = '1';

        setTimeout(() => {
            typeWriter(text, originalText, 50);
        }, index * 500);
    });
}

function typeWriter(element, text, speed) {
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== PARTICLE ANIMATION =====
function setupParticleAnimation() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Create additional floating particles
    for (let i = 0; i < 5; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 100 + 50}px;
        height: ${Math.random() * 100 + 50}px;
        background: linear-gradient(135deg, 
            rgba(99, 102, 241, ${Math.random() * 0.1 + 0.05}), 
            rgba(236, 72, 153, ${Math.random() * 0.1 + 0.05}));
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: float ${Math.random() * 20 + 15}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
}

// ===== LOAD MORE FUNCTIONALITY =====
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // Placeholder for load more functionality
        loadMoreBtn.innerHTML = '<span>Loading more videos...</span><div class="loading-spinner"></div>';
        
        setTimeout(() => {
            loadMoreBtn.innerHTML = '<span>No more videos to load</span><i class="fas fa-check"></i>';
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.6';
        }, 1500);
    });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Ctrl/Cmd + K for quick contact (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const contactLink = document.querySelector('a[href="contact.html"]');
        if (contactLink) {
            contactLink.click();
        }
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
setupLazyLoading();

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Add error handling for fetch requests
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== ANALYTICS PLACEHOLDER =====
function trackPageView() {
    // Placeholder for analytics tracking
    console.log('Page view tracked:', window.location.pathname);
}

function trackEvent(eventName, details) {
    // Placeholder for event tracking
    console.log('Event tracked:', eventName, details);
}

// Track page view on load
trackPageView();

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', {
            text: btn.textContent.trim(),
            href: btn.href || 'no-link'
        });
    });
});

// ===== UTILITY FUNCTIONS =====
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Animate stats when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.textContent);
            entry.target.classList.add('animated');
            animateValue(entry.target, 0, target, 2000);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🚀 Welcome to Adarsh Jaiswal\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cBuilt with passion and modern web technologies', 'font-size: 14px; color: #ec4899;');
console.log('%cFeel free to explore the source code!', 'font-size: 12px; color: #06b6d4;');
