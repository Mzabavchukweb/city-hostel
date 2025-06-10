# City Hostel Szczecin - Website

## 🎉 Najnowsze poprawki i ulepszenia

### ✅ Naprawione problemy:

**1. Hero Slider - Animacja działa!**
- Slider automatycznie zmienia zdjęcia co 4 sekundy
- Płynne animacje z efektem slide + fade
- Debugowanie w konsoli przeglądarki
- Preloading obrazów dla lepszej wydajności
- Usunięto przyciski nawigacji (tylko auto-slide)

**2. Header - Poprawione zachowanie**
- **Strona główna**: Przezroczysty na start → biały po scroll
- **Inne strony**: Od razu białe tło (normalny header)
- Fallback dla starszych przeglądarek

**3. Pokoje - Dedykowane zdjęcia**
- Każdy pokój ma swoje unikalne zdjęcie z Unsplash
- Wysokiej jakości zdjęcia 600x400px
- Lepsze alt teksty dla SEO

**4. Karta pokoju - Premium design**
- Galeria 2x3 zdjęcia zamiast 2x2
- Sekcja recenzji gości z avatarami
- Virtual Tour 360° placeholder
- Ocena gości w sidebaru (9.2/10 ⭐)
- Więcej szczegółów wyposażenia
- Rabat dla długich pobytów

---

## 📸 Konwersja zdjęć HEIC → JPG

Aby używać własnych zdjęć zamiast Unsplash:

### Opcja 1: Skrypt Python (zalecane)

```bash
# 1. Zainstaluj wymagane biblioteki
pip install pillow pillow-heif

# 2. Uruchom skrypt konwersji
python convert_heic_to_jpg.py
```

Skrypt automatycznie:
- Znajdzie wszystkie pliki .HEIC i .heic
- Konwertuje je na wysokiej jakości .jpg
- Zachowa strukturę katalogów
- Pokaże postęp konwersji

### Opcja 2: Ręczna konwersja

**macOS:**
- Otwórz zdjęcie w aplikacji Podgląd
- Eksportuj jako JPEG (⌘+Shift+E)

**Windows:**
- Użyj Paint lub Photos app
- Zapisz jako JPEG

**Online:**
- convertio.co/heic-jpg
- cloudconvert.com

### Aktualizacja ścieżek w kodzie

Po konwersji zaktualizuj ścieżki w:
- `src/pages/pokoje.html` - zdjęcia kart pokoi
- `src/pages/index.html` - zdjęcia w hero slider i sekcji pokoi
- `src/pages/pokoj-10.html` - galeria pokoju

Przykład:
```html
<!-- Zamiast -->
<img src="../images/rooms/room103/IMG_8400.HEIC" />

<!-- Użyj -->
<img src="../images/rooms/room103/IMG_8400.jpg" />
```

---

## 🚀 Funkcje strony

- **Hero Slider**: Automatyczne przewijanie 5 zdjęć
- **Responsive Design**: Mobilne i desktop
- **Language Switcher**: PL, EN, DE, RU
- **Easy One Style**: Profesjonalne kolory i typografia
- **Animacje**: Smooth scrolling, hover effects
- **SEO Ready**: Proper meta tags, alt texts

---

## 📁 Struktura plików

```
src/
├── assets/
│   ├── style.css      # Style Easy One
│   └── main.js        # JavaScript + slider
├── images/
│   ├── page/          # Zdjęcia hero (JPG)
│   └── rooms/         # Zdjęcia pokoi (HEIC→JPG)
└── pages/
    ├── index.html     # Strona główna
    ├── pokoje.html    # Lista pokoi  
    ├── cennik.html    # Cennik
    ├── kontakt.html   # Kontakt + mapa
    ├── hostele.html   # Pozostałe hostele
    └── pokoj-10.html  # Przykład karty pokoju
```

---

## 🎨 Style Guide

**Kolory Easy One:**
- Primary: `#2d3648` (ciemny niebieski)
- Accent: `#7fc8c3` (mint)
- Accent2: `#ffd4a3` (brzoskwiniowy)
- Accent3: `#f7e6b5` (kremowy)
- Background: `#fefcf9` (ciepły biały)

**Fonty:**
- Headers: Playfair Display (serif)
- Body: Poppins (sans-serif)

---

## 📞 Kontakt

**City Hostel Szczecin**
- Jana Kazimierza 14, 71-620 Szczecin
- +48 (91) 422 58 88 / 607 067 353
- recepcja@cityhostel.com.pl

---

## 📝 Notatki techniczne

- Header sticky z backdrop blur
- CSS Grid dla layoutu pokoi
- SVG ikony zamiast fontów
- Optimized images (Unsplash API)
- Semantic HTML5 structure
- CSS Custom Properties (variables) 