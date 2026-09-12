/**
 * ═══════════════════════════════════════════════════════
 * KONFIGURASI BIRTHDAY GIFT — UNTUK MAY
 * ═══════════════════════════════════════════════════════
 * Anda dapat mengubah data di bawah ini kapan saja:
 * - Nama penerima & pengirim
 * - Kode PIN rahasia (misal tanggal ulang tahun DDMMYY)
 * - Teks ucapan, surat pribadi, dan afirmasi
 * - Daftar foto polaroid
 */

const BIRTHDAY_CONFIG = {
  // Informasi Utama
  recipientName: "Mayy",
  recipientShortName: "May",
  senderName: "Rex",

  // Kode PIN rahasia untuk membuka kado (6 Digit)
  // Format contoh: 050907 (5 September 2007)
  secretCode: "050907",
  pinClue: "Clue: tanggal ulang tahunmu 💕 (6 digit)",

  // Ucapan di Layar Utama (Hero Section)
  heroSubtitle: "✨ Hari Paling Istimewa",
  heroTagline: "Today — The most special day 🌹",
  heroWish:
    "Wishing you happiness, good health, and all your dreams come true 🤍",

  // Pesan Surat Pribadi (Personal Note & Sub-page Message)
  noteTitle: "Happy Birthday, Mayy 🌹",
  noteParagraphs: [
    "Maaf ya cuman bisa ngasih website sederhana ini... tapi semoga berkenan dan bikin kamu tersenyum hari ini 💕",
    "Doa tulus selalu ada buat kamu setiap harinya tanpa kamu sadari. Kamu itu orang yang luar biasa kuat dan istimewa.",
    "Semoga di usia barumu ini, kamu makin bersinar, selalu sehat, dikelilingi orang-orang baik, dan semua impianmu pelan-pelan terwujud nyata.",
  ],
  closingTagline: "#from rex to you#",

  // Pesan Bunga Interaktif (Saat bunga di buket diklik)
  flowerMessages: {
    matcha:
      "Kamu punya ketenangan dan kehangatan yang bikin orang di sekitarmu merasa nyaman 🍵🌿",
    sunflower:
      "Semoga kamu selalu ceria dan mekar menghadap cahaya seperti bunga matahari ini 🌻✨",
    daisy:
      "Ketulusan hatimu itu langka dan berharga banget, jangan pernah berubah ya 🌼🤍",
    rose: "Kamu cantik luar dalam, kuat menghadapi badai, dan pantas disayangi sepenuh hati 🌹💕",
    pinkBud:
      "Setiap langkah kecilmu berharga, teruslah bertumbuh dengan caramu sendiri 🌸🌱",
  },

  // Afirmasi Positif (Grid Kata-kata Penyemangat)
  affirmations: [
    {
      icon: "🌱",
      en: "You are stronger than you think.",
      id: "Kamu jauh lebih kuat dari yang pernah kamu kira.",
    },
    {
      icon: "✨",
      en: "Every day is a fresh start.",
      id: "Setiap hari adalah kesempatan baru untuk mekar dan bahagia.",
    },
    {
      icon: "💕",
      en: "You deserve all the love.",
      id: "Kamu sangat pantas mendapatkan cinta, ketulusan, dan kebahagiaan.",
    },
    {
      icon: "🌸",
      en: "Your presence makes the world warmer.",
      id: "Kehadiran dan senyumanmu membuat dunia ini lebih hangat.",
    },
    {
      icon: "🔥",
      en: "Keep going — your best is yet to come.",
      id: "Teruslah melangkah, hal-hal terindah dalam hidupmu sedang menanti.",
    },
    {
      icon: "🌟",
      en: "You are enough, just as you are.",
      id: "Kamu sudah sangat berharga dan cukup, persis seperti dirimu.",
    },
  ],

  // Foto Polaroid (Ganti URL/path gambar di folder images/ jika ada foto asli)
  photos: {
    mainBig: "may2.jpeg",
    thumb1: "may4.jpeg",
    thumb2: "my3.jpeg",
    thumb3: "my1.jpeg",
    thumb4: "may2.jpeg",
  },

  // File Audio Musik Latar Belakang (misal idoy.mp3)
  bgMusicFile: "idoy.mp3",

  // Pesan Kartu Bunga Sunflower (Sesuai Foto Tablet)
  sunflowerPills: {
    left1: "You are kind in ways that truly matter. 💚",
    left2: "You are strong, even when things get difficult. 🌿",
    left3: "You are thoughtful and always consider others. ✨",
    right1: "You are capable of achieving your goals. 🌻",
    right2: "You are unique, and that's your power. 💕",
    right3: "You are growing into the best version of yourself. 🌱",
  },

  // Pesan Digital Bouquet (Screenshot Fitur Interaktif Bunga)
  digitalBouquet: [
    {
      id: "tulip1",
      name: "Tulip Merah Muda",
      emoji: "🌷",
      text: "Kamu secantik bunga tulip di musim semi, segar dan penuh harapan baru.",
    },
    {
      id: "rose1",
      name: "Mawar Merah",
      emoji: "🌹",
      text: "Seperti mawar yang anggun, kamu punya pesona dan ketulusan yang selalu menghangatkan hati.",
    },
    {
      id: "daisy1",
      name: "Daisy Ceria",
      emoji: "🌼",
      text: "Kesederhanaan dan senyuman tulusmu selalu membawa kebahagiaan bagi sekitarmu.",
    },
    {
      id: "sakura1",
      name: "Sakura Lembut",
      emoji: "🌸",
      text: "Kehadiranmu menenangkan, seperti kelopak sakura yang mekar dengan anggun.",
    },
    {
      id: "bouquet1",
      name: "Buket Cinta",
      emoji: "💐",
      text: "Setiap doa dan harapan baik berkumpul hari ini khusus untuk merayakan ulang tahunmu.",
    },
    {
      id: "sakuraCenter",
      name: "Bunga Paling Istimewa",
      emoji: "🌸",
      text: "Di antara semua bunga yang indah di dunia, kamulah yang paling berharga dan istimewa 🤍",
    },
    {
      id: "hibiscus1",
      name: "Hibiscus Cantik",
      emoji: "🌺",
      text: "Kamu itu tangguh, berani, dan selalu memancarkan keindahan dalam setiap langkah.",
    },
    {
      id: "daisy2",
      name: "Daisy Matahari",
      emoji: "🌼",
      text: "Ketulusan hatimu itu langka, tetaplah menjadi dirimu yang baik hati apa adanya.",
    },
    {
      id: "rose2",
      name: "Mawar Kuncup",
      emoji: "🌹",
      text: "Masa depan indah sedang menantimu, melangkahlah dengan penuh keyakinan dan senyuman.",
    },
    {
      id: "tulip2",
      name: "Tulip Musim Semi",
      emoji: "🌷",
      text: "Semoga hari-harimu selalu dipenuhi bunga yang mekar, tawa, dan kehangatan.",
    },
    {
      id: "sunflower1",
      name: "Bunga Matahari",
      emoji: "🌻",
      text: "Teruslah bersinar terang dan menghadap ke arah cahaya, seperti bunga matahari yang gagah.",
    },
    {
      id: "sakura2",
      name: "Cosmos Pink",
      emoji: "🌸",
      text: "Kamu berharga lebih dari yang kamu kira, jangan pernah ragukan kebaikan dirimu.",
    },
    {
      id: "hibiscus2",
      name: "Bunga Bahagia",
      emoji: "🌺",
      text: "Semoga di usia barumu ini, hidupmu penuh dengan warna-warni kebahagiaan yang abadi.",
    },
    {
      id: "stemSunflower",
      name: "Bunga Tangkai Kiri",
      emoji: "🌻",
      text: "Semoga kebahagiaan selalu menyinari setiap sudut hari-harimu ✨",
    },
    {
      id: "stemSakura",
      name: "Bunga Tangkai Tengah",
      emoji: "🌸",
      text: "Selamat bertambah usia Mayy, semoga selalu sehat dan bahagia selalu 💕",
    },
    {
      id: "stemDaisy",
      name: "Bunga Tangkai Kanan",
      emoji: "🌼",
      text: "Terima kasih sudah hadir dan mewarnai dunia ini dengan senyumanmu yang manis 🌿",
    },
    {
      id: "matcha1",
      name: "Bunga Matcha",
      emoji: "🍵",
      text: "Seperti matcha yang tenang dan menyehatkan, semoga hidupmu selalu damai, hangat, dan penuh kebaikan yang mengalir 🌿💚",
    },
  ],
};
