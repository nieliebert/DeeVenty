---
title: "FinderBuster - Tool OSINT untuk Reconnaissance Username & Domain"
description: "Tool OSINT yang saya buat untuk mencari username di berbagai platform, ngumpulin informasi domain, dan ekstrak profil media sosial. Cocok buat cybersecurity researcher, digital investigator, sama pentest."
image: "/assets/images/projects/finderbuster.png"
tech: ["Python", "BeautifulSoup", "Requests", "python-whois", "dnspython", "Colorama"]
links:
  github: "https://github.com/nieliebert/finderbuster"
date: 2025-01-01
layout: project.njk
author: "NunoGans"
license: "MIT License"
python_version: "3.6+"
---

## Tentang Project Ini

FinderBuster adalah tool OSINT yang saya develop untuk membantu para security researcher, pentester, dan digital investigator dalam mengumpulkan informasi tentang username, domain, dan profil media sosial dengan lebih efisien.

Jadi ceritanya, saya sering butuh tool yang bisa nyari username di banyak platform sekaligus dan ngumpulin info domain dengan cepat. Makanya saya bikin FinderBuster ini - one stop solution buat kebutuhan reconnaissance.

## Fitur Utama

### Pencarian Username
- **Scan multi-platform**: Bisa cek username di 13+ platform media sosial populer
- **Coverage lengkap**: Instagram, Twitter/X, TikTok, YouTube, GitHub, Tumblr, Medium, Quora, Twitch, dan masih banyak lagi
- **Reconnaissance cepat**: Langsung ketahuan mana aja akun yang udah ada di berbagai platform

### Analisis Domain
- **Info WHOIS**: Detail lengkap registrar, tanggal pembuatan/expire domain
- **DNS Records**: Ekstrak record A, AAAA, MX, NS, TXT, CNAME
- **IP & Geolocation**: Info lokasi server dan network
- **Analisis HTTP**: Header server dan analisis redirect chain

### Profiling Media Sosial
- **Ekstrak Profil**: Info detail dari Instagram, Twitter/X, GitHub, dan LinkedIn
- **Otomatis**: Proses pengumpulan data yang streamlined
- **Output Terstruktur**: Hasil dalam format JSON buat analisis lebih lanjut

## Spesifikasi Teknis

### Yang Kalian Butuhkan
- Python 3.6 ke atas
- pip package manager
- Virtual environment (saya rekomendasikan pakai ini)

### Dependencies
- **requests**: Buat handle HTTP request
- **beautifulsoup4**: Parsing HTML dan ekstrak data
- **colorama**: Output warna di terminal
- **python-whois**: Ambil data WHOIS
- **dnspython**: Query DNS records

## Cara Install & Setup

```bash
# Clone repository
git clone https://github.com/nieliebert/finderbuster.git
cd finderbuster

# Bikin virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Contoh Penggunaan

### Reconnaissance Username
```bash
python finderbuster.py username johndoe
```

### Analisis Domain
```bash
python finderbuster.py domain example.com
```

### Profiling Media Sosial
```bash
python finderbuster.py social github octocat
```

## Output & Hasil

- **Penyimpanan Terstruktur**: Hasil disimpan di folder `finderbuster_results`
- **Format JSON**: Output yang machine-readable untuk analisis lebih lanjut
- **File Timestamped**: Bisa tracking dan bandingkan hasil dari waktu ke waktu
- **Data Terorganisir**: Informasi yang bersih dan mudah diakses

## Platform yang Didukung

### Pencarian Username
- Twitter/X, TikTok, YouTube, GitHub
- Instagram, Tumblr, Medium, Quora
- Twitch dan platform lainnya

### Profiling Media Sosial
- Instagram, Twitter/X, GitHub, LinkedIn

## Keamanan & Etika

### Panduan Penggunaan
- **Tujuan Edukasi**: Tool ini saya buat untuk research keamanan yang legitimate
- **Kepatuhan Hukum**: Kalian bertanggung jawab untuk mengikuti hukum yang berlaku
- **Terms of Service**: Respect kebijakan platform dan rate limits
- **Kepatuhan Robots.txt**: Praktik web scraping yang etis

### Keterbatasan
- Beberapa platform butuh autentikasi yang bisa batesin akses data
- Pertimbangan rate limiting dan request blocking
- Restriksi API di beberapa platform media sosial

## Development & Kontribusi

### Cara Berkontribusi
1. Fork repository ini
2. Bikin feature branch (`git checkout -b feature/fitur-keren`)
3. Commit perubahan (`git commit -m 'Tambah fitur keren'`)
4. Push ke branch (`git push origin feature/fitur-keren`)
5. Buka Pull Request

### Lisensi
MIT License - Open source dan bebas untuk dimodifikasi serta didistribusikan

## Pembuat
**NunoGans** (2025) - Developer tools cybersecurity yang fokus pada solusi OSINT dan reconnaissance

## Use Cases

- **Penetration Testing**: Enumerasi username dan reconnaissance target
- **Digital Forensics**: Investigasi keberadaan di media sosial
- **Brand Monitoring**: Cek ketersediaan username di berbagai platform
- **Security Research**: Gathering informasi dan threat intelligence
- **Investigasi OSINT**: Analisis jejak digital yang komprehensif

## Kenapa Saya Bikin Tool Ini?

Dulu saya sering kesulitan kalau mau nyari informasi tentang target secara comprehensive. Harus buka satu-satu platform, manual cek ini itu, ribet banget. Makanya saya bikin FinderBuster - biar bisa automasi proses reconnaissance dan hemat waktu.

Tool ini sudah saya test dan pakai untuk berbagai project, dan hasilnya cukup memuaskan. Semoga bermanfaat juga buat kalian yang butuh tool OSINT yang reliable!
