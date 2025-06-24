---
title: "Pengenalan Markdown dan Contoh Lengkap Semua Fitur Markdown"
date: 2025-06-03
description: Panduan lengkap cara pakai Markdown untuk membuat postingan di website. Mencakup dasar penulisan, format teks, daftar, tautan, dan gambar.
tags:
  - markdown
  - tutorial
  - formatting
layout: post.njk
---

![Cover markdown](/images/Posts/markdown.jpg)


Halo! Di website ini, saya menggunakan **Markdown** sebagai format utama untuk menulis dan membuat postingan.

---

## Apa itu Markdown?

Markdown adalah bahasa markup ringan yang dibuat supaya kamu bisa menulis teks biasa yang mudah dibaca, tapi bisa juga diubah jadi format HTML untuk website.

Intinya, Markdown memudahkan kamu menulis artikel, tutorial, atau catatan tanpa harus ribet dengan kode HTML.

---

## Kenapa Saya Memilih Markdown?

Ada beberapa alasan kenapa Markdown cocok untuk bikin konten di website ini:

- **Simpel dan Mudah Dipelajari**  
  Kamu cukup fokus menulis tanpa pusing sama tag HTML yang panjang dan kompleks.
  
- **Ringan dan Cepat**  
  File Markdown biasanya sangat kecil dan mudah diolah oleh sistem pembangun situs (static site generator).
  
- **Mendukung Beragam Format**  
  Kamu bisa bikin heading, list, tautan, gambar, kode, tabel, dan lainnya dengan format yang sederhana.
  
- **Mudah Dibaca dan Diedit**  
  Baik di editor biasa maupun di platform manapun, Markdown tetap mudah dipahami.

---

## Contoh Penulisan Markdown di Website Ini

Misal, kamu ingin menulis paragraf, heading, dan menyisipkan gambar:

```markdown
# Judul Postingan

Ini adalah paragraf pertama. Kamu bisa menulis bebas di sini.

## Subjudul

- Ini list item pertama
- Ini list item kedua

![Gambar Contoh letakan path disini](/images/contoh.jpg)
```

---

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

## Text Formatting

**Tebal**  
*Italic*  
***Tebal & Italic***  
~~Coret~~  
<sub>Subscript</sub> dan <sup>Superscript</sup>  

---

## Blockquote

> Ini adalah kutipan.
> 
> > Bisa juga nested quote.

---

## Lists

### Unordered List

- Item pertama
  - Sub-item
    - Sub-sub-item
- Item kedua

### Ordered List

1. Langkah pertama
2. Langkah kedua
   1. Sub langkah
   2. Sub langkah
3. Langkah ketiga

---

## Task List

- [x] Selesai
- [ ] Belum selesai
- [x] Markdown checklist

---

## Links

Tautan ke [Google](https://www.google.com)  
Tautan dengan title: [OpenAI](https://openai.com "OpenAI Homepage")

---

## Images

![Contoh Gambar](https://via.placeholder.com/150 "Gambar Placeholder")

---

## Inline Code

Gunakan `npm install eleventy` untuk install Eleventy.

---

## Code Block (dengan Syntax Highlighting)

### JavaScript

```js
function greet(name) {
  console.log(`Hello, ${name}!`);
}
greet("Nuno");
```

---

### HTML

```html
<a href="https://example.com">Link Example</a>
```

---

## Tips Menulis Markdown

- Gunakan heading (`#`, `##`, `###`) untuk membagi bagian artikel.  
- Untuk daftar, pakai `-` atau `*`.  
- Sisipkan gambar dengan format `![alt text](path_gambar)`.  
- Gunakan backticks `` ` `` untuk menulis kode atau perintah.  
- Jangan lupa cek hasil build websitemu untuk memastikan semua tampil dengan baik.

---

## Penutup

Dengan Markdown, proses bikin posting di website jadi lebih cepat dan menyenangkan.

Kalau kamu baru mulai belajar, coba praktik sedikit demi sedikit, dan kamu akan merasa lebih mudah menulis konten berkualitas.

Selamat mencoba, dan kalau ada pertanyaan tentang Markdown atau pembuatan website, saya siap membantu!

---

*Semoga bermanfaat dan Happy Coding!!!!*
