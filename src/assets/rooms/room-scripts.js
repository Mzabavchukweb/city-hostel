/* ZUNIFIKOWANE JAVASCRIPT DLA WSZYSTKICH POKOI */

// Lightbox functionality
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

// 360° Panorama viewer initialization
function initPanoramaViewer(containerId, panoramaPath) {
  window.addEventListener('DOMContentLoaded', function() {
    if (typeof PhotoSphereViewer !== 'undefined' && document.getElementById(containerId)) {
      try {
        new PhotoSphereViewer.Viewer({
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

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
  loadFooter();
  handleReservationForm();
}); 