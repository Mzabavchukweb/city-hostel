/* ZUNIFIKOWANE JAVASCRIPT DLA WSZYSTKICH POKOI */

// Professional Lightbox functionality
const galleryImages = Array.from(document.querySelectorAll('.gallery img'));
let currentImageIndex = 0;
let lightbox = null;
let lightboxImg = null;
let lightboxThumbs = null;
let isAnimating = false;

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeLightbox();
  loadFooter();
  handleReservationForm();
});

function initializeLightbox() {
  // Create lightbox HTML structure if it doesn't exist
  if (!document.getElementById('lightbox')) {
    createLightboxHTML();
  }
  
  lightbox = document.getElementById('lightbox');
  lightboxImg = document.getElementById('lightbox-img');
  lightboxThumbs = document.getElementById('lightbox-thumbs');
  
  // Add click handlers to gallery images
  galleryImages.forEach((img, idx) => {
    img.onclick = function(e) {
      e.preventDefault();
      openLightbox(idx);
    };
  });
  
  // Add keyboard support
  document.addEventListener('keydown', handleKeyboard);
  
  // Add swipe support for mobile
  if (lightboxImg) {
    addSwipeSupport(lightboxImg);
  }
}

function createLightboxHTML() {
  const lightboxHTML = `
    <div id="lightbox" class="lightbox" tabindex="-1" aria-modal="true" role="dialog">
      <div class="lightbox-content">
        <div class="lightbox-close" onclick="closeLightbox()" aria-label="Zamknij">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>
        </div>
        <div class="lightbox-img-container">
          <button class="lightbox-nav lightbox-prev" onclick="prevLightboxImage()" aria-label="Poprzednie zdjęcie">&#10094;</button>
          <img id="lightbox-img" src="" alt="Podgląd zdjęcia" />
          <button class="lightbox-nav lightbox-next" onclick="nextLightboxImage()" aria-label="Następne zdjęcie">&#10095;</button>
          <div class="lightbox-loading" id="lightbox-loading" style="display: none;"></div>
        </div>
        <div class="lightbox-thumbs" id="lightbox-thumbs"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);
}

function openLightbox(imageIndex = 0) {
  if (!galleryImages.length || !lightbox || isAnimating) return;
  
  isAnimating = true;
  currentImageIndex = imageIndex;
  
  // Immediately scroll to top and block body scroll
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.body.classList.add('lightbox-open');
  
  // Show lightbox
  lightbox.style.display = 'flex';
  
  // Preload image
  showLoadingState();
  preloadImage(galleryImages[currentImageIndex].src, () => {
    hideLoadingState();
    updateLightboxImage();
    
    // Fade in effect with delay for smooth animation
    requestAnimationFrame(() => {
      lightbox.classList.add('active');
      setTimeout(() => {
        isAnimating = false;
      }, 400);
    });
  });
  
  // Focus management for accessibility
  setTimeout(() => {
    lightbox.focus();
  }, 100);
}

function closeLightbox() {
  if (!lightbox || isAnimating) return;
  
  isAnimating = true;
  lightbox.classList.remove('active');
  
  setTimeout(() => {
    lightbox.style.display = 'none';
    document.body.classList.remove('lightbox-open');
    isAnimating = false;
  }, 400);
}

function updateLightboxImage() {
  if (!galleryImages[currentImageIndex] || !lightboxImg) return;
  
  // Update image
  lightboxImg.src = galleryImages[currentImageIndex].src;
  lightboxImg.alt = galleryImages[currentImageIndex].alt || 'Podgląd zdjęcia';
  
  // Update thumbnails
  updateLightboxThumbs();
  
  // Update navigation button visibility
  updateNavigationButtons();
  
  // Add image counter for accessibility
  updateImageCounter();
}

function prevLightboxImage() {
  if (galleryImages.length <= 1 || isAnimating) return;
  
  isAnimating = true;
  
  // Fade out current image
  lightboxImg.style.opacity = '0';
  
  setTimeout(() => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    
    // Preload new image
    preloadImage(galleryImages[currentImageIndex].src, () => {
      updateLightboxImage();
      
      // Fade in new image
      lightboxImg.style.opacity = '1';
      isAnimating = false;
    });
  }, 150);
}

function nextLightboxImage() {
  if (galleryImages.length <= 1 || isAnimating) return;
  
  isAnimating = true;
  
  // Fade out current image
  lightboxImg.style.opacity = '0';
  
  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    
    // Preload new image
    preloadImage(galleryImages[currentImageIndex].src, () => {
      updateLightboxImage();
      
      // Fade in new image
      lightboxImg.style.opacity = '1';
      isAnimating = false;
    });
  }, 150);
}

function updateLightboxThumbs() {
  if (!lightboxThumbs || galleryImages.length <= 1) {
    if (lightboxThumbs) lightboxThumbs.style.display = 'none';
    return;
  }
  
  lightboxThumbs.style.display = 'flex';
  lightboxThumbs.innerHTML = '';
  
  galleryImages.forEach((img, idx) => {
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.alt = img.alt || '';
    thumb.className = 'lightbox-thumb' + (idx === currentImageIndex ? ' active' : '');
    thumb.onclick = (e) => {
      e.stopPropagation();
      if (idx !== currentImageIndex && !isAnimating) {
        jumpToImage(idx);
      }
    };
    lightboxThumbs.appendChild(thumb);
  });
  
  // Scroll active thumbnail into view
  setTimeout(() => {
    const activeThumb = lightboxThumbs.querySelector('.lightbox-thumb.active');
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, 100);
}

function jumpToImage(index) {
  if (isAnimating || index === currentImageIndex) return;
  
  isAnimating = true;
  lightboxImg.style.opacity = '0';
  
  setTimeout(() => {
    currentImageIndex = index;
    preloadImage(galleryImages[currentImageIndex].src, () => {
      updateLightboxImage();
      lightboxImg.style.opacity = '1';
      isAnimating = false;
    });
  }, 150);
}

function updateNavigationButtons() {
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  if (galleryImages.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  } else {
    if (prevBtn) prevBtn.style.display = 'flex';
    if (nextBtn) nextBtn.style.display = 'flex';
  }
}

function updateImageCounter() {
  // Add or update image counter
  let counter = document.getElementById('lightbox-counter');
  if (!counter && galleryImages.length > 1) {
    counter = document.createElement('div');
    counter.id = 'lightbox-counter';
    counter.style.cssText = `
      position: absolute;
      top: -70px;
      left: 0;
      color: white;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.5);
      padding: 8px 12px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
      font-weight: 500;
    `;
    document.querySelector('.lightbox-content').appendChild(counter);
  }
  
  if (counter && galleryImages.length > 1) {
    counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
  }
}

function preloadImage(src, callback) {
  const img = new Image();
  img.onload = callback;
  img.onerror = callback; // Continue even if image fails to load
  img.src = src;
}

function showLoadingState() {
  const loading = document.getElementById('lightbox-loading');
  if (loading) {
    loading.style.display = 'block';
  }
}

function hideLoadingState() {
  const loading = document.getElementById('lightbox-loading');
  if (loading) {
    loading.style.display = 'none';
  }
}

function handleKeyboard(e) {
  if (!lightbox || !lightbox.classList.contains('active') || isAnimating) return;
  
  switch(e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      prevLightboxImage();
      break;
    case 'ArrowRight':
      e.preventDefault();
      nextLightboxImage();
      break;
    case 'Escape':
      e.preventDefault();
      closeLightbox();
      break;
    case 'Home':
      e.preventDefault();
      if (galleryImages.length > 1) jumpToImage(0);
      break;
    case 'End':
      e.preventDefault();
      if (galleryImages.length > 1) jumpToImage(galleryImages.length - 1);
      break;
  }
}

function addSwipeSupport(element) {
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let startTime = 0;
  
  element.addEventListener('touchstart', function(e) {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
    startTime = Date.now();
  }, { passive: true });
  
  element.addEventListener('touchend', function(e) {
    if (isAnimating) return;
    
    endX = e.changedTouches[0].screenX;
    endY = e.changedTouches[0].screenY;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const deltaTime = Date.now() - startTime;
    
    // Only handle horizontal swipes (ignore vertical scrolling)
    // And ensure it's a quick swipe (not a slow drag)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && deltaTime < 300) {
      if (deltaX > 0) {
        prevLightboxImage();
      } else {
        nextLightboxImage();
      }
    }
  }, { passive: true });
}

// Close lightbox when clicking on background
document.addEventListener('click', function(e) {
  if (e.target === lightbox && !isAnimating) {
    closeLightbox();
  }
});

// Prevent image click from closing lightbox
document.addEventListener('click', function(e) {
  if (e.target === lightboxImg) {
    e.stopPropagation();
  }
});

// 360° Panorama viewer initialization
function initPanoramaViewer(containerId, panoramaPath) {
  window.addEventListener('DOMContentLoaded', function() {
    if (typeof PhotoSphereViewer !== 'undefined' && document.getElementById(containerId)) {
      try {
        window.panoramaViewer = new PhotoSphereViewer.Viewer({
          container: document.getElementById(containerId),
          panorama: panoramaPath,
          loadingImg: null,
          navbar: ["zoom", "fullscreen"],
        });
      } catch (error) {
        // Silent fallback - hide panorama container if error occurs
        console.warn('360° viewer initialization failed:', error);
        const panoramaContainer = document.querySelector('.panorama-360-container');
        if (panoramaContainer) {
          panoramaContainer.style.display = 'none';
        }
      }
    } else if (typeof PhotoSphereViewer === 'undefined') {
      // Silent fallback - hide panorama container if library not loaded
      const panoramaContainer = document.querySelector('.panorama-360-container');
      if (panoramaContainer) {
        panoramaContainer.style.display = 'none';
      }
    }
  });
}

// Footer loading
function loadFooter() {
  fetch('../components/footer.html')
    .then(response => response.text())
    .then(html => { 
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = html; 
      }
    })
    .catch(error => {
      console.warn('Footer loading failed:', error);
    });
}

// Automatic room selection in reservation form
function handleReservationForm() {
  if (window.location.pathname.includes('zapytaj-o-rezerwacje.html')) {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (room) {
      const select = document.getElementById('room');
      if (select) select.value = room;
    }
  }
}