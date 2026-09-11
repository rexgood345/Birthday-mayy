# Birthday Gift Website untuk May 🌹🎂

Website kejutan ulang tahun interaktif untuk **May**, didesain khusus dengan nuansa romantis-elegan (*burgundy, deep red, soft pink, & matcha green*), dilengkapi animasi, musik melodi synthesizer, teka-teki kode rahasia, serta fitur interaktif tiup lilin & ledakan konfeti.

---

## 🚀 Cara Membuka & Menjalankan Website
1. Buka folder `C:\Users\Hype\.gemini\antigravity\scratch\birthday-may\`
2. Klik ganda file **`index.html`** untuk langsung membukanya di browser apa saja (Google Chrome, Edge, Safari, Firefox).
3. Anda juga dapat menggunakan ekstensi **Live Server** di VS Code atau editor pilihan Anda.

---

## 🔐 Kode Rahasia (PIN Kado)
- **PIN Default**: `050907` (Dapat diubah kapan saja di file `config.js`).
- **Petunjuk**: Tanggal ulang tahun May (6 digit).

---

## ⚙️ Cara Kustomisasi Sangat Mudah (File `config.js`)
Anda **tidak perlu** mengedit ribuan baris HTML! Cukup buka file **`config.js`** untuk mengubah:
1. **Nama Penerima & Pengirim**:
   ```javascript
   recipientName: "Mayy",
   recipientShortName: "May",
   senderName: "Rex",
   ```
2. **Passcode Rahasia**:
   ```javascript
   secretCode: "050907", // ganti dengan tanggal lahir May (DDMMYY)
   ```
3. **Pesan Surat Pribadi & Afirmasi**:
   Ubah teks ucapan di `noteParagraphs` dan `affirmations`.
4. **Foto-Foto Polaroid**:
   Masukkan foto asli May ke dalam folder `images/` (misalnya `may-1.jpg`), lalu perbarui nama filenya di `photos` pada `config.js`.

---

## ✨ Fitur-Fitur Interaktif
1. **Loading Screen**: Animasi putaran kelopak bunga mekar dengan progress bar.
2. **Halaman QR & Gift Box**: Scan QR atau klik tombol untuk menuju pintu masuk kado.
3. **Keypad PIN Interaktif**: Tombol angka dengan getaran (*shake error*) jika salah, dan suara lonceng kemenangan saat benar.
4. **Animasi Ledakan Bunga (*Flower Burst*)**: Efek sebaran puluhan kelopak bunga mekar di seluruh layar saat kotak kado diketuk.
5. **Hero Intro Sequence**: Transisi ucapan sinematik "HAPPY BIRTHDAY Mayy".
6. **Sub-Halaman Message & Pemutar Musik**:
   - Pemutar lagu melodi *Happy Birthday* berbasis Web Audio API (tanpa perlu download file MP3 eksternal).
   - Animasi piringan hitam (*vinyl disc*) berputar.
   - Galeri foto polaroid interaktif dengan fitur swap foto dan perbesaran modal (*zoom*).
7. **Sub-Halaman Flower (Buket Interaktif)**:
   - Ketuk bunga (Matcha, Sunflower, Rose, Daisy, Pink bud) untuk memunculkan pesan rahasia yang berbeda-beda.
8. **Sub-Halaman Cake (Tiup Lilin & Konfeti)**:
   - Kue ulang tahun dengan lilin menyala berkedip (*flickering flame*).
   - Tombol **Tiup Lilin**: Memadamkan api lilin, memunculkan efek asap tipis (*smoke puff*), meledakkan hujan konfeti (*confetti cannon*), dan membunyikan jingle perayaan!
   - Tombol dapat ditekan kembali untuk menyalakan lilin kapan saja.

---

Dibuat dengan 🌹 & 💕 untuk May.
