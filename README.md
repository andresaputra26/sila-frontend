# ✋🏻 SiLa – Sign Language Application

SiLa adalah aplikasi berbasis web untuk menerjemahkan bahasa isyarat secara **real-time** menggunakan kamera, serta menyediakan fitur **terjemahan video** untuk konten prarekaman. Dirancang dengan antarmuka pengguna yang responsif dan intuitif.

---

## 🚀 Fitur Utama

- 📱 **UI Responsif** – Desain antarmuka yang menyesuaikan berbagai perangkat.
- 🤳 **Real-time Gesture Translation** – Menggunakan kamera pengguna untuk menerjemahkan gerakan bahasa isyarat secara langsung.
- 🎥 **Video Translation** – Mendukung terjemahan dari konten video yang sudah direkam sebelumnya.

---

## 🧰 Teknologi yang Digunakan

- **React.js** – Library JavaScript untuk membangun antarmuka pengguna berbasis komponen.
- **Bootstrap** – Framework Library CSS untuk mempercepat pengembangan UI yang responsif dan konsisten.
- **Vite** – Build tool modern untuk frontend yang sangat cepat.
- **ESLint** – Linter untuk menjaga konsistensi dan kualitas kode JavaScript.

---

## 💻 Cara Menjalankan Aplikasi Secara Lokal

- Clone repositori dengan perintah:
  - `git clone https://github.com/SiLa-Sign-Language-Application/sila-frontend.git`
- Masuk ke direktori proyek:
  - `cd sila-frontend`
- Install semua dependensi dengan:
  - `npm install`
- Jalankan aplikasi dalam mode development:
  - `npm run dev`
- Aplikasi akan tersedia di:
  - `http://localhost:5173/`

---

## 📜 Skrip NPM

- `npm run dev` – Menjalankan aplikasi dalam mode pengembangan.
- `npm run build` – Membangun aplikasi untuk produksi.
- `npm run preview` – Melihat hasil build produksi secara lokal.
- `npm run lint` – Menjalankan linter untuk memeriksa dan menjaga kualitas kode.

---

## 📁 Struktur Proyek

```bash
sila-frontend/
├── public/
│   └── images/
├── src/
│   ├── api/
│   ├── assets/
│   │   ├── css/
│   │   └── images/
│   ├── components/
│   ├── data/
│   └── pages/
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── vercel.json