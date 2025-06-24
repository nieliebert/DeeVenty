---
title: "Tools Forensik Gratis yang Saya Pakai dan Rekomendasikan"
date: 2025-06-04
description: List tools digital forensik gratis dan open-source yang cocok buat pemula maupun praktisi. Termasuk analisis jaringan, disk imaging, metadata, dan lainnya.
tags:
  - digital-forensics
  - tools
  - open-source
  - cybersecurity
  - beginner
layout: post.njk
---


Sebagai seseorang yang suka mengulik dunia digital forensik dan cybersecurity, saya sering banget nyobain berbagai tools open-source buat investigasi digital. Nah, di postingan ini saya pengen berbagi beberapa **tools forensik gratis** yang menurut saya layak banget buat dipelajari—baik lo masih pemula ataupun udah cukup familiar sama dunia forensik.

---

## 1. Wireshark  
![Wireshark](https://www.pngkit.com/png/full/365-3657626_wireshark-icon.png)

**Kategori:** Network Forensics  
**Platform:** Windows, macOS, Linux

Wireshark adalah tool open-source buat analisa jaringan. Lo bisa capture traffic jaringan secara live, terus analisis paket-paket yang lewat. Cocok banget buat ngelacak komunikasi mencurigakan, malware traffic, atau debugging protokol.

**Fitur keren:**
- Filter kuat (display & capture)
- Bisa export paket spesifik
- Support banyak protokol (HTTP, TCP, DNS, dll)

---

## 2. Autopsy  
![Autopsy Logo](https://www.autopsy.com/wp-content/uploads/2019/08/autopsy-logo.svg)

**Kategori:** Digital Disk Forensics  
**Platform:** Windows (GUI), Linux (via Sleuth Kit)

Autopsy adalah front-end GUI dari Sleuth Kit. Cocok buat lo yang pengen analisis disk image tanpa ribet. Misalnya lo dapet file `.E01`, `.img`, atau `.dd`, Autopsy bisa bantu parsing dan nyari evidence kayak file yang dihapus, metadata, dan artefak lainnya.

**Kelebihan:**
- GUI user-friendly
- Timeline analysis
- Keyword search dan hash filtering
- Plugin support (bisa nambahin fitur baru)

---

## 3. ExifTool  
![exiftool Logo](https://exiftool.org/ET-256.png)
**Kategori:** Metadata Forensics  
**Platform:** Windows, macOS, Linux

ExifTool digunakan buat baca, nulis, dan manipulasi metadata file (terutama gambar dan dokumen). Lo bisa cek informasi tersembunyi seperti GPS, kamera, waktu pengambilan, dan lainnya yang bisa jadi bukti penting dalam investigasi.

```bash
exiftool gambar.jpg
```

---

## 4. Volatility

**Kategori:** Memory Forensics  
**Platform:** Windows, Linux, macOS

Volatility dipakai buat analisis dump memory (RAM). Berguna banget buat nyari process mencurigakan, password di memori, network connection aktif, dan lainnya.

```bash
volatility -f memory.dmp --profile=Win10x64 pslist
```

**Butuh sedikit belajar syntax, tapi powerful banget.**

---

## 5. FTK Imager
![FTK Imager Logo](https://www.exterro.com/uploads/transformed/_1200x630_crop_center-center_82_none/ftk-imager-pg-og-1024x512.jpg)

**Kategori:** Disk Imaging & Preview  
**Platform:** Windows

Walau versi lengkap FTK berbayar, **FTK Imager** gratis dan bisa dipakai buat bikin forensic image dari disk atau folder. Selain itu, bisa juga dipakai preview isi disk dan folder secara forensic-safe (tanpa mengubah data).

---

## 6. Magnet RAM Capture

**Kategori:** Memory Acquisition  
**Platform:** Windows

Dikembangkan oleh Magnet Forensics. Tool ini dipakai buat capture RAM dari mesin target sebelum dianalisis pakai Volatility atau tool lain.

---

## 7. CyberChef

**Kategori:** Data Analysis & Decoding  
**Platform:** Web (online/offline)

Dijuluki *"The Cyber Swiss Army Knife"*. CyberChef bisa dipakai buat decode, encode, hash, decrypt, analyze data—tanpa perlu coding. Cocok banget buat analisis string hasil dump atau decoding malware obfuscation.

Link: [https://gchq.github.io/CyberChef/](https://gchq.github.io/CyberChef/)

---

## 8. Plaso (Log2Timeline)

**Kategori:** Timeline Analysis  
**Platform:** Linux/macOS

Tool ini bisa ngubah berbagai artefak digital (browser history, registry, log files, dll) jadi satu **timeline lengkap** yang bisa lo telusuri.

---

## Penutup

Itu tadi daftar tools forensik yang saya pake dan bisa kalian coba juga. Semua gratis dan open-source, jadi bisa langsung diunduh dan dipelajari tanpa harus keluar biaya.

Jika Kalian tertarik mendalami digital forensik, tools ini bisa jadi starting point yang kuat. Nanti saya akan bahas juga cara penggunaannya satu per satu di postingan berikutnya.
