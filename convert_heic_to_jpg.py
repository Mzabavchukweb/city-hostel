#!/usr/bin/env python3
"""
Skrypt do konwersji plików HEIC na JPG
Wymagane: pip install pillow pillow-heif
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    print("Błąd: Brakuje wymaganych bibliotek.")
    print("Zainstaluj je za pomocą: pip install pillow pillow-heif")
    sys.exit(1)

def convert_heic_to_jpg(source_dir, quality=85):
    """Konwertuje wszystkie pliki HEIC w katalogu na JPG"""
    source_path = Path(source_dir)
    
    if not source_path.exists():
        print(f"Błąd: Katalog {source_dir} nie istnieje")
        return
    
    converted_count = 0
    
    # Szukaj plików HEIC we wszystkich podkatalogach
    for heic_file in source_path.rglob("*.HEIC"):
        try:
            # Otwórz plik HEIC
            with Image.open(heic_file) as img:
                # Konwertuj na RGB jeśli potrzeba
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Stwórz ścieżkę dla pliku JPG
                jpg_file = heic_file.with_suffix('.jpg')
                
                # Zapisz jako JPG
                img.save(jpg_file, 'JPEG', quality=quality, optimize=True)
                
                print(f"✅ Skonwertowano: {heic_file.name} → {jpg_file.name}")
                converted_count += 1
                
        except Exception as e:
            print(f"❌ Błąd konwersji {heic_file.name}: {e}")
    
    # Szukaj plików .heic (małe litery)
    for heic_file in source_path.rglob("*.heic"):
        try:
            with Image.open(heic_file) as img:
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                jpg_file = heic_file.with_suffix('.jpg')
                img.save(jpg_file, 'JPEG', quality=quality, optimize=True)
                
                print(f"✅ Skonwertowano: {heic_file.name} → {jpg_file.name}")
                converted_count += 1
                
        except Exception as e:
            print(f"❌ Błąd konwersji {heic_file.name}: {e}")
    
    print(f"\n🎉 Zakończono! Skonwertowano {converted_count} plików.")

if __name__ == "__main__":
    print("🔄 Konwerter HEIC → JPG dla City Hostel")
    print("=" * 40)
    
    # Katalog ze zdjęciami pokoi
    rooms_dir = "src/images/rooms"
    
    if os.path.exists(rooms_dir):
        print(f"📁 Konwertuję pliki z: {rooms_dir}")
        convert_heic_to_jpg(rooms_dir)
    else:
        print(f"❌ Katalog {rooms_dir} nie został znaleziony")
        print("Uruchom skrypt z głównego katalogu projektu") 