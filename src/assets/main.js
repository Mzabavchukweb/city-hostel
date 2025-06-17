// City Hostel Szczecin - JavaScript Engine
// Production version - optimized for performance

const translations = {
  pl: {
    welcome: 'Witamy w City Hostel Szczecin',
    subtitle: 'Twój przyjazny nocleg w centrum miasta',
    rooms: 'Pokoje',
    prices: 'Cennik',
    contact: 'Kontakt',
    other_hostels: 'Pozostałe hostele',
    single_room: 'Pokój 1-osobowy',
    single_room_desc: 'Przytulny pokój dla jednej osoby, z łazienką lub bez.',
    double_room: 'Pokój 2-osobowy',
    double_room_desc: 'Idealny dla par lub przyjaciół, komfort i wygoda.',
    apartment: 'Apartament',
    apartment_desc: 'Więcej przestrzeni i udogodnień dla wymagających gości.',
    prices_desc: 'Przystępne ceny, płatność z góry. Szczegóły w recepcji.',
    address: 'Adres:',
    phone: 'Telefon:',
    email: 'Email:'
  },
  en: {
    welcome: 'Welcome to City Hostel Szczecin',
    subtitle: 'Your friendly stay in the city center',
    rooms: 'Rooms',
    prices: 'Prices',
    contact: 'Contact',
    other_hostels: 'Other hostels',
    single_room: 'Single room',
    single_room_desc: 'Cozy room for one person, with or without bathroom.',
    double_room: 'Double room',
    double_room_desc: 'Perfect for couples or friends, comfort and convenience.',
    apartment: 'Apartment',
    apartment_desc: 'More space and amenities for demanding guests.',
    prices_desc: 'Affordable prices, payment in advance. Details at reception.',
    address: 'Address:',
    phone: 'Phone:',
    email: 'Email:'
  },
  de: {
    welcome: 'Willkommen im City Hostel Stettin',
    subtitle: 'Ihre freundliche Unterkunft im Stadtzentrum',
    rooms: 'Zimmer',
    prices: 'Preise',
    contact: 'Kontakt',
    other_hostels: 'Weitere Hostels',
    single_room: 'Einzelzimmer',
    single_room_desc: 'Gemütliches Zimmer für eine Person, mit oder ohne Bad.',
    double_room: 'Doppelzimmer',
    double_room_desc: 'Ideal für Paare oder Freunde, Komfort und Bequemlichkeit.',
    apartment: 'Apartment',
    apartment_desc: 'Mehr Platz und Annehmlichkeiten für anspruchsvolle Gäste.',
    prices_desc: 'Günstige Preise, Vorauszahlung. Details an der Rezeption.',
    address: 'Adresse:',
    phone: 'Telefon:',
    email: 'E-Mail:'
  },
  ru: {
    welcome: 'Добро пожаловать в City Hostel Щецин',
    subtitle: 'Ваш дружелюбный ночлег в центре города',
    rooms: 'Номера',
    prices: 'Цены',
    contact: 'Контакт',
    other_hostels: 'Другие хостелы',
    single_room: 'Одноместный номер',
    single_room_desc: 'Уютный номер для одного человека, с ванной или без.',
    double_room: 'Двухместный номер',
    double_room_desc: 'Идеально для пар или друзей, комфорт и удобство.',
    apartment: 'Апартаменты',
    apartment_desc: 'Больше пространства и удобств для требовательных гостей.',
    prices_desc: 'Доступные цены, предоплата. Подробности на ресепшене.',
    address: 'Адрес:',
    phone: 'Телефон:',
    email: 'Эл. почта:'
  }
};

let currentLanguage = 'pl';

function setLanguage(lang) {
  currentLanguage = lang;
  const dict = translations[lang] || translations['pl'];
  
  // Aktualizuj elementy z data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  
  // Aktualizuj przycisk aktualnego języka
  const langCurrent = document.querySelector('.lang-current');
  if (langCurrent) {
    langCurrent.textContent = lang.toUpperCase();
  }
  
  // Zapisz wybór w localStorage
  localStorage.setItem('selectedLanguage', lang);
  
  document.documentElement.lang = lang;
}

// === HERO SLIDER ===
let currentSlide = 0;
let slideInterval;

function initSlider() {
  const slides = document.querySelectorAll('.slide');
  
  if (!slides.length) {
    // Silent return for better performance in production
    return;
  }
  
  // Preload tylko pierwszego obrazu
  function preloadImages() {
    if (slides.length > 0) {
      const img = slides[0].querySelector('img');
      if (img) {
        const imagePreload = new Image();
        imagePreload.src = img.src;
      }
    }
  }
  
  const isMobile = window.innerWidth <= 768;
  
  function showSlide(index) {
    const prevSlide = currentSlide;
    const transitionDelay = isMobile ? 200 : 300; // Skrócone z 400/600
    
    // Lazy load następnego slajdu
    const nextIndex = (index + 1) % slides.length;
    const nextImg = slides[nextIndex].querySelector('img');
    if (nextImg && !nextImg.dataset.loaded) {
      const preload = new Image();
      preload.src = nextImg.src;
      nextImg.dataset.loaded = 'true';
    }
    
    // Dodaj klasę fading do aktualnego slajdu dla płynnego przejścia
    if (slides[prevSlide]) {
      slides[prevSlide].classList.add('fading');
    }
    
    // Po krótkim czasie usuń wszystkie klasy
    setTimeout(() => {
      slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'fading');
      });
      
      // Dodaj klasę 'prev' do poprzedniego slajdu
      if (slides[prevSlide]) {
        slides[prevSlide].classList.add('prev');
      }
    }, 100); // Skrócone z 250
    
    // Responsywny delay dla płynniejszego efektu fade
    setTimeout(() => {
      if (slides[index]) {
        slides[index].classList.add('active');
        currentSlide = index;
        
        // Aktualizuj progress dots i counter
        updateProgressIndicators(index);
      }
    }, transitionDelay);
  }
  
  function updateProgressIndicators(index) {
    // Aktualizuj progress dots
    document.querySelectorAll('.progress-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  function goToSlide(index) {
    if (index >= 0 && index < slides.length && index !== currentSlide) {
      clearInterval(slideInterval); // Stop auto slide
      showSlide(index);
      
      // Restart auto slide po krótszym czasie po interakcji użytkownika
      setTimeout(() => {
        startAutoSlide();
      }, 5000); // Skrócone z 15s do 5s
    }
  }
  
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }
  
  function startAutoSlide() {
    // Responsywny timing - szybsze interwały
    const isMobile = window.innerWidth <= 768;
    const interval = isMobile ? 4000 : 5000; // 4s na mobile, 5s na desktop (było 10s/12s)
    
    slideInterval = setInterval(() => {
      nextSlide();
    }, interval);
  }
  
  // Inicjalizacja
  preloadImages();
  
  // Dodaj event listenery do progress dots
  document.querySelectorAll('.progress-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });
  
  // Pokaż 4. slajd (indeks 3) jako pierwszy
  showSlide(3);
  
  // Start auto slide po 2 sekundach (skrócone z 8 sekund)
  setTimeout(() => {
    startAutoSlide();
  }, 2000);
  
  // OPTIMIZED MOUSE PARALLAX EFFECT
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    let ticking = false;
    let mouseX = 0.5;
    let mouseY = 0.5;
    
    function updateParallax() {
      const moveX = (mouseX - 0.5) * 10; // Zredukowane z 15
      const moveY = (mouseY - 0.5) * 10;
      
      heroContent.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      ticking = false;
    }
    
    function onMouseMove(e) {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
      
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    // Użyj passive listener dla lepszej wydajności
    document.addEventListener('mousemove', onMouseMove, { passive: true });
  }
  
  // INTERSECTION OBSERVER dla animacji
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe attraction rows
  document.querySelectorAll('.attraction-row').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Obsługa przełącznika języków
document.addEventListener('DOMContentLoaded', () => {
  // Pobierz zapisany język lub użyj domyślnego (pl)
  const savedLang = localStorage.getItem('selectedLanguage') || 'pl';
  setLanguage(savedLang);
  
  // Dodaj event listenery do opcji języków
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang) {
        setLanguage(lang);
      }
    });
  });
  
  // Sprawdź czy jesteśmy na stronie z sliderem
  const heroSlider = document.querySelector('.hero-slider');
  const slides = document.querySelectorAll('.slide');
  
  if (heroSlider && slides.length > 0) {
    // Initialize slider silently for better performance
    initSlider();
  }
  
  // Inicjalizuj widget pogody
  initWeather();
});

// === STICKY MENU SCROLL ===
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}); 

// === SMOOTH SCROLLING ===
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

// === WEATHER API ===
function initWeather() {
  const API_KEY = '895284fb2d2c50a520ea537456963d9c'; // Free OpenWeatherMap API key
  const CITY = 'Szczecin,PL';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=pl`;
  
  const weatherIcon = document.querySelector('.weather-icon');
  const weatherTemp = document.querySelector('.weather-temp');
  const weatherDesc = document.querySelector('.weather-desc');
  
  function getWeatherIcon(weatherMain, icon) {
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',  
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Smoke': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌫️',
      'Fog': '🌫️',
      'Sand': '🌫️',
      'Ash': '🌫️',
      'Squall': '💨',
      'Tornado': '🌪️'
    };
    
    return iconMap[weatherMain] || '🌤️';
  }
  
  async function fetchWeather() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (response.ok) {
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const main = data.weather[0].main;
        const icon = getWeatherIcon(main, data.weather[0].icon);
        
        // Aktualizuj UI
        if (weatherIcon) weatherIcon.textContent = icon;
        if (weatherTemp) weatherTemp.textContent = `${temp}°C`;
        if (weatherDesc) weatherDesc.textContent = description;
      } else {
        fallbackWeather();
      }
    } catch (error) {
      fallbackWeather();
    }
  }
  
  function fallbackWeather() {
    if (weatherIcon) weatherIcon.textContent = '🌤️';
    if (weatherTemp) weatherTemp.textContent = '15°C';
    if (weatherDesc) weatherDesc.textContent = 'przyjemna pogoda';
  }
  
  // Pierwsze pobranie z debounce
  setTimeout(fetchWeather, 1000);
  
  // Odświeżaj co 10 minut (600,000 ms) 
  let weatherInterval = setInterval(fetchWeather, 600000);
  
  // Zatrzymaj interval gdy strona nie jest widoczna
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(weatherInterval);
    } else {
      weatherInterval = setInterval(fetchWeather, 600000);
      fetchWeather();
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const filters = document.getElementById('room-filters');
  if (!filters) return;
  const type = document.getElementById('room-type');
  const persons = document.getElementById('room-persons');
  const price = document.getElementById('room-price');
  const search = document.getElementById('room-search');
  const amenityCheckboxes = Array.from(document.querySelectorAll('.amenity-filter'));
  const allRooms = Array.from(document.querySelectorAll('.room-card'));

  function filterRooms() {
    const t = type.value;
    const p = persons.value;
    const pr = price.value;
    const s = search.value.toLowerCase();
    const selectedAmenities = amenityCheckboxes.filter(cb => cb.checked).map(cb => cb.value);
    allRooms.forEach(card => {
      const matchType = !t || card.dataset.type === t;
      const matchPersons = !p || card.dataset.persons === p;
      const roomPrice = parseInt(card.dataset.price || '0', 10);
      let matchPrice = true;
      if (pr === '100') matchPrice = roomPrice <= 100;
      else if (pr === '150') matchPrice = roomPrice <= 150;
      else if (pr === '200') matchPrice = roomPrice <= 200;
      else if (pr === '201') matchPrice = roomPrice > 200;
      const desc = (card.dataset.desc || '').toLowerCase();
      const amenities = (card.dataset.amenities || '').split(',');
      const matchAmenities = selectedAmenities.every(a => amenities.includes(a));
      const titleElement = card.querySelector('h3');
      const titleText = titleElement ? titleElement.textContent.toLowerCase() : '';
      const matchSearch = !s || desc.includes(s) || titleText.includes(s);
      if (matchType && matchPersons && matchPrice && matchAmenities && matchSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }
  [type, persons, price, search, ...amenityCheckboxes].forEach(el => el.addEventListener('input', filterRooms));
});

// === GLASSMORPHISM FILTERS ===
document.addEventListener('DOMContentLoaded', function() {
  const glassFilters = document.getElementById('room-filters-glass');
  if (!glassFilters) return;
  
  const typeGlass = document.getElementById('room-type-glass');
  const personsGlass = document.getElementById('room-persons-glass');
  const priceGlass = document.getElementById('room-price-glass');
  const searchGlass = document.getElementById('room-search-glass');
  const toggleInputs = Array.from(document.querySelectorAll('.toggle-input'));
  const allRooms = Array.from(document.querySelectorAll('.room-card'));

  function filterRoomsGlass() {
    const t = typeGlass ? typeGlass.value : '';
    const p = personsGlass ? personsGlass.value : '';
    const pr = priceGlass ? priceGlass.value : '';
    const s = searchGlass ? searchGlass.value.toLowerCase() : '';
    const selectedAmenities = toggleInputs.filter(cb => cb.checked).map(cb => cb.value);
    
    let visibleCount = 0;
    
    allRooms.forEach(card => {
      const matchType = !t || card.dataset.type === t;
      const matchPersons = !p || card.dataset.persons === p;
      const roomPrice = parseInt(card.dataset.price || '0', 10);
      let matchPrice = true;
      if (pr === '100') matchPrice = roomPrice <= 100;
      else if (pr === '150') matchPrice = roomPrice <= 150;
      else if (pr === '200') matchPrice = roomPrice <= 200;
      else if (pr === '201') matchPrice = roomPrice > 200;
      
      const desc = (card.dataset.desc || '').toLowerCase();
      const amenities = (card.dataset.amenities || '').split(',');
      const matchAmenities = selectedAmenities.length === 0 || selectedAmenities.every(a => amenities.includes(a));
      const titleElement = card.querySelector('h3');
      const titleText = titleElement ? titleElement.textContent.toLowerCase() : '';
      const matchSearch = !s || desc.includes(s) || titleText.includes(s);
      
      if (matchType && matchPersons && matchPrice && matchAmenities && matchSearch) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.6s ease forwards';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Animuj licznik wyników
    const resultsCounter = document.querySelector('.results-counter');
    if (resultsCounter) {
      const hasFilters = t || p || pr || s || selectedAmenities.length > 0;
      if (hasFilters) {
        resultsCounter.textContent = `Znaleziono ${visibleCount} ${visibleCount === 1 ? 'pokój' : visibleCount < 5 ? 'pokoje' : 'pokoi'}`;
        resultsCounter.style.background = visibleCount > 0 ? 'rgba(127, 200, 195, 0.9)' : 'rgba(255, 107, 107, 0.9)';
        resultsCounter.style.color = '#fff';
      } else {
        resultsCounter.textContent = `Wszystkie pokoje (${allRooms.length})`;
        resultsCounter.style.background = 'rgba(255, 255, 255, 0.9)';
        resultsCounter.style.color = 'var(--primary)';
      }
      
      // Animacja pulsowania przy zmianie
      resultsCounter.style.transform = 'scale(1.05)';
      setTimeout(() => {
        resultsCounter.style.transform = 'scale(1)';
      }, 200);
    }
  }

  // Dodaj event listenery dla glassmorphism filtrów
  if (typeGlass) typeGlass.addEventListener('change', filterRoomsGlass);
  if (personsGlass) personsGlass.addEventListener('change', filterRoomsGlass);
  if (priceGlass) priceGlass.addEventListener('change', filterRoomsGlass);
  if (searchGlass) {
    let searchTimeout;
    searchGlass.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(filterRoomsGlass, 300); // Debounce
    });
  }
  
  toggleInputs.forEach(toggle => {
    toggle.addEventListener('change', filterRoomsGlass);
  });

  // Animacja floating labels
  function handleFloatingLabels() {
    [typeGlass, personsGlass, priceGlass, searchGlass].forEach(input => {
      if (!input) return;
      
      function updateLabel() {
        const label = input.nextElementSibling;
        if (!label) return;
        
        const hasValue = input.value && input.value.trim() !== '';
        const isFocused = document.activeElement === input;
        
        if (hasValue || isFocused) {
          label.style.transform = 'translateY(-100%) scale(0.85)';
          label.style.color = 'var(--accent)';
        } else {
          label.style.transform = 'translateY(-50%) scale(1)';
          label.style.color = 'rgba(45, 54, 72, 0.7)';
        }
      }
      
      input.addEventListener('focus', updateLabel);
      input.addEventListener('blur', updateLabel);
      input.addEventListener('input', updateLabel);
      
      // Sprawdź stan początkowy
      updateLabel();
    });
  }
  
  handleFloatingLabels();

  // Animacja toggle switches
  function animateToggleSwitch(toggle) {
    const label = toggle.nextElementSibling;
    if (!label) return;
    
    if (toggle.checked) {
      label.style.transform = 'scale(1.02)';
      label.style.background = 'rgba(127, 200, 195, 0.15)';
      setTimeout(() => {
        label.style.transform = 'scale(1)';
      }, 150);
    } else {
      label.style.transform = 'scale(0.98)';
      setTimeout(() => {
        label.style.transform = 'scale(1)';
        label.style.background = 'rgba(255, 255, 255, 0.05)';
      }, 150);
    }
  }
  
  toggleInputs.forEach(toggle => {
    toggle.addEventListener('change', () => {
      animateToggleSwitch(toggle);
    });
  });
});

// === HERO ROOMS ANIMATION ===
document.addEventListener('DOMContentLoaded', function() {
  const heroRooms = document.querySelector('.hero-rooms');
  if (!heroRooms) return;
  
  // Animacja statystyk z licznikami
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
    } else {
        element.textContent = target;
      }
    }
    
    updateCounter();
  }
  
  // Intersection Observer dla animacji statystyk
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        const text = statNumber.textContent;
        
        // Wyciągnij liczbę z tekstu
        const numberMatch = text.match(/\d+/);
        if (numberMatch) {
          const targetNumber = parseInt(numberMatch[0]);
          statNumber.textContent = '0';
          setTimeout(() => {
            animateCounter(statNumber, targetNumber);
          }, 500);
        }
        
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
  });
  
  // Parallax efekt dla floating elements
  if (window.innerWidth > 768) {
    let ticking = false;
    
    function updateFloatingElements(scrollY) {
      const floatingElements = document.querySelectorAll('.floating-icon');
      
      floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = scrollY * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    }
    
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => updateFloatingElements(window.scrollY));
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
  }
});

// === ENHANCED ROOM CARDS ANIMATIONS ===
document.addEventListener('DOMContentLoaded', function() {
  const roomCards = document.querySelectorAll('.room-card');
  
  if (!roomCards.length) return;
  
  // Intersection Observer dla kart pokojów
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        
        cardObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  roomCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
});

// ============================================
// GLASSMORPHISM & MICRO-INTERACTIONS
// ============================================

// Scroll Progress Bar
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// Scroll Reveal Animation
function initScrollReveal() {
  const sections = document.querySelectorAll('.section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Enhanced Room Card Interactions
function enhanceRoomCards() {
  const roomCards = document.querySelectorAll('.room-card');
  
  roomCards.forEach(card => {
    // Add hover sound effect (optional)
    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--hover-scale', '1.02');
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--hover-scale', '1');
    });
    
    // Add click ripple effect
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(127,200,195,0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        pointer-events: none;
      `;
      
      card.style.position = 'relative';
      card.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add CSS for ripple animation
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Color-coded Status Indicators
function addStatusIndicators() {
  const rooms = document.querySelectorAll('.room-card');
  
  rooms.forEach(room => {
    const priceElement = room.querySelector('.room-price');
    if (!priceElement) return; // Safety check - exit if no price element
    
    const priceText = priceElement.textContent;
    if (!priceText) return; // Safety check - exit if no price text
    
    const price = parseInt(priceText);
    if (isNaN(price)) return; // Safety check - exit if price is not a number
    
    const indicator = document.createElement('div');
    indicator.className = 'status-indicator';
    
    if (price <= 100) {
      indicator.classList.add('success');
      indicator.innerHTML = '<span>💰</span> Ekonomiczny';
    } else if (price <= 150) {
      indicator.classList.add('info');
      indicator.innerHTML = '<span>⭐</span> Standard';
    } else {
      indicator.classList.add('warning');
      indicator.innerHTML = '<span>👑</span> Komfort+';
    }
    
    const content = room.querySelector('.room-card > *:last-child');
    if (content) {
      content.style.marginBottom = '1rem';
      room.appendChild(indicator);
    }
  });
}

// Floating Action Buttons
function createFloatingActionButtons() {
  const fabContainer = document.createElement('div');
  fabContainer.className = 'fab-container';
  
  // Scroll to top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'fab scroll-to-top';
  scrollTopBtn.innerHTML = `
    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  scrollTopBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Contact button (zawsze widoczny, prowadzi do pełnego URL)
  const contactBtn = document.createElement('button');
  contactBtn.className = 'fab';
  contactBtn.innerHTML = `
    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  `;
  contactBtn.onclick = () => {
    window.location.href = 'http://127.0.0.1:5502/src/pages/kontakt.html';
  };
  fabContainer.appendChild(contactBtn);
  
  fabContainer.appendChild(scrollTopBtn);
  document.body.appendChild(fabContainer);
  
  // Show/hide based on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      fabContainer.classList.add('show');
    } else {
      fabContainer.classList.remove('show');
    }
  });
}

// Enhanced Attraction Features
function enhanceAttractionFeatures() {
  const features = document.querySelectorAll('.attraction-features span');
  
  features.forEach(feature => {
    feature.addEventListener('mouseenter', () => {
      // Add subtle scale and glow effect
      feature.style.transform = 'translateY(-2px) scale(1.05)';
      feature.style.boxShadow = '0 8px 25px rgba(127,200,195,0.2)';
    });
    
    feature.addEventListener('mouseleave', () => {
      feature.style.transform = '';
      feature.style.boxShadow = '';
    });
  });
}

// Intersection Observer for Animations
function initIntersectionAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add pulse animation to important elements
        if (entry.target.classList.contains('hero-cta')) {
          entry.target.classList.add('pulse-accent');
        }
        
        // Stagger animation for cards
        if (entry.target.classList.contains('room-card') || 
            entry.target.classList.contains('common-area-card')) {
          const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);
        }
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.hero-cta, .room-card, .common-area-card').forEach(el => {
    observer.observe(el);
  });
}

// Initialize all glassmorphism effects
function initGlassmorphismEffects() {
  createScrollProgress();
  initScrollReveal();
  enhanceRoomCards();
  addStatusIndicators();
  createFloatingActionButtons();
  enhanceAttractionFeatures();
  initIntersectionAnimations();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlassmorphismEffects);
} else {
  initGlassmorphismEffects();
}

// ============================================
// NOWE NOWOCZESNE MOBILNE MENU
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const modernMobileMenu = document.getElementById('modernMobileMenu');
  const body = document.body;
  
  if (!modernMobileMenu || !mobileMenuToggle || !mobileMenuClose) {
    return;
  }
  
  let isMenuOpen = false;
  
  // Function to open mobile menu
  function openMobileMenu() {
    isMenuOpen = true;
    modernMobileMenu.classList.add('active');
    mobileMenuToggle.classList.add('active');
    body.classList.add('mobile-menu-open');
    
    // Add aria attributes for accessibility
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    modernMobileMenu.setAttribute('aria-hidden', 'false');
    
    // Focus on close button for accessibility
    setTimeout(() => {
      mobileMenuClose.focus();
    }, 300);
    
    // Animate menu items with stagger effect
    const navItems = document.querySelectorAll('.mobile-nav-item');
    navItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      
      setTimeout(() => {
        item.style.transition = 'all 0.4s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, 200 + (index * 100));
    });
    
    // Animate other sections
    const sections = [
      '.mobile-hostels-section',
      '.mobile-cta-section', 
      '.mobile-lang-section',
      '.mobile-contact-info'
    ];
    
    sections.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          element.style.transition = 'all 0.4s ease';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 400 + (index * 150));
      }
    });
  }
  
  // Function to close mobile menu
  function closeMobileMenu() {
    isMenuOpen = false;
    modernMobileMenu.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
    body.classList.remove('mobile-menu-open');
    
    // Update aria attributes
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    modernMobileMenu.setAttribute('aria-hidden', 'true');
    
    // Focus back on hamburger button
    setTimeout(() => {
      mobileMenuToggle.focus();
    }, 300);
    
    // Reset animations
    setTimeout(() => {
      const animatedElements = document.querySelectorAll(
        '.mobile-nav-item, .mobile-hostels-section, .mobile-cta-section, .mobile-lang-section, .mobile-contact-info'
      );
      animatedElements.forEach(element => {
        element.style.transition = '';
        element.style.opacity = '';
        element.style.transform = '';
      });
    }, 500);
  }
  
  // Toggle menu function
  function toggleMobileMenu() {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
  
  // Event listeners
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  mobileMenuClose.addEventListener('click', closeMobileMenu);
  
  // Close menu when clicking on background
  modernMobileMenu.addEventListener('click', function(e) {
    if (e.target === modernMobileMenu) {
      closeMobileMenu();
    }
  });
  
  // Close menu with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Handle mobile nav item clicks
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  mobileNavItems.forEach(item => {
    item.addEventListener('click', function() {
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';
      
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // Close menu after short delay for better UX
      setTimeout(() => {
        closeMobileMenu();
      }, 200);
    });
  });
  
  // Language switcher functionality
  const langButtons = document.querySelectorAll('.mobile-lang-btn');
  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      langButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get selected language
      const selectedLang = this.dataset.lang;
      
      // Add simple feedback animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
      
      // Update main language switcher if exists
      const mainLangCurrent = document.querySelector('.lang-current');
      if (mainLangCurrent) {
        mainLangCurrent.textContent = selectedLang.toUpperCase();
      }
      
      // Save language preference
      if (typeof setLanguage === 'function') {
        setLanguage(selectedLang);
      } else {
        localStorage.setItem('selectedLanguage', selectedLang);
        document.documentElement.lang = selectedLang;
      }
      
      console.log('Language changed to:', selectedLang);
    });
  });
  
  // Handle hostel cards clicks
  const hostelCards = document.querySelectorAll('.hostel-card');
  hostelCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add click effect
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
        
        // Open link in new tab
        const href = this.getAttribute('href');
        if (href) {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      }, 150);
    });
  });
  
  // CTA button functionality
  const ctaButton = document.querySelector('.mobile-cta-btn');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add bounce effect
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
          this.style.transform = '';
          
          // Navigate to reservation page
          const href = this.getAttribute('href');
          if (href) {
            window.location.href = href;
          }
        }, 100);
      }, 100);
    });
  }
  
  // Contact info interaction
  const contactItems = document.querySelectorAll('.contact-item');
  contactItems.forEach(item => {
    item.addEventListener('click', function() {
      const contactValue = this.querySelector('.contact-value');
      if (!contactValue) return;
      
      const value = contactValue.textContent.trim();
      
      try {
        if (value.includes('@')) {
          // Email
          window.location.href = `mailto:${value}`;
        } else if (value.includes('+48')) {
          // Phone
          const cleanPhone = value.replace(/\s|\(|\)/g, '');
          window.location.href = `tel:${cleanPhone}`;
        }
      } catch (error) {
        console.log('Contact interaction error:', error);
      }
    });
    
    // Add cursor pointer for interactive items
    const contactValue = item.querySelector('.contact-value');
    if (contactValue) {
      const value = contactValue.textContent.trim();
      if (value.includes('@') || value.includes('+48')) {
        item.style.cursor = 'pointer';
        
        item.addEventListener('mouseenter', function() {
          this.style.transform = 'scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
          this.style.transform = '';
        });
      }
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && isMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Improve accessibility - trap focus within menu when open
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  
  function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];
    
    document.addEventListener('keydown', function(e) {
      if (!isMenuOpen) return;
      
      const isTabPressed = e.key === 'Tab';
      
      if (!isTabPressed) return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
  }
  
  // Initialize focus trap
  trapFocus(modernMobileMenu);
  
  // Add ripple animation styles if not exists
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  console.log('🚀 Modern Mobile Menu initialized successfully!');
});

// ============================================
// === GLOBAL CTA MICROINTERACTIONS ===
document.addEventListener('DOMContentLoaded', function() {
  // Lista klas do mikrointerakcji
  const ctaSelectors = [
    '.btn', '.details-btn', '.hero-cta', '.area-cta', '.attraction-cta',
    '.menu-res-btn', '.submit-btn', '.pricing-btn',
    '.footer-links a', '.nav a'
  ];
  const ctaElements = document.querySelectorAll(ctaSelectors.join(','));

  ctaElements.forEach(el => {
    // Ripple effect
    el.addEventListener('click', function(e) {
      // Nie dubluj ripple na room-card
      if (el.classList.contains('room-card')) return;
      // Usuwaj stare ripple
      const oldRipple = el.querySelector('.ripple-effect');
      if (oldRipple) oldRipple.remove();
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(127,200,195,0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 2;
      `;
      el.style.position = 'relative';
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
    // Focus/active effect
    el.addEventListener('focus', function() {
      el.style.boxShadow = '0 0 0 3px rgba(127,200,195,0.25)';
      el.style.transform = 'scale(1.03)';
    });
    el.addEventListener('blur', function() {
      el.style.boxShadow = '';
      el.style.transform = '';
    });
    // Tap/click scale
    el.addEventListener('mousedown', function() {
      el.style.transform = 'scale(0.97)';
    });
    el.addEventListener('mouseup', function() {
      el.style.transform = '';
    });
    el.addEventListener('mouseleave', function() {
      el.style.transform = '';
    });
    // Touch (mobile)
    el.addEventListener('touchstart', function() {
      el.style.transform = 'scale(0.97)';
    }, {passive:true});
    el.addEventListener('touchend', function() {
      el.style.transform = '';
    }, {passive:true});
  });
});
// ============================================