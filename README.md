# 🚀 3D Interactive Web Portfolio

![Portofolio Banner](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Three.js_%7C_Tailwind_%7C_JavaScript-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)

Website portofolio interaktif berbasis **3D WebGL** yang dirancang untuk menampilkan profil, keahlian, proyek, dan kontak media sosial secara imersif, modern, dan responsif.

---

## ✨ Fitur Utama

- **🌐 Interactive 3D Canvas:** Rendering objek dan elemen 3D secara *real-time* menggunakan **Three.js**.
- **🔊 Audio Feedback (SFX):** Efek suara futuristik saat melakukan kursor *hover* dan *click* pada kartu keahlian/tombol.
- **✉️ Direct Contact Form:** Formulir pesan otomatis terintegrasi langsung ke email pribadi melalui **EmailJS API**.
- **🎨 Glassmorphism & UI Modern:** Desain antarmuka bersih dengan efek kaca transparan menggunakan **Tailwind CSS**.
- **📱 Fully Responsive:** Tampilan teroptimasi dengan baik di perangkat desktop, tablet, maupun smartphone.

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi / Library |
| :--- | :--- |
| **Frontend** | HTML5, JavaScript (ES6+), Tailwind CSS |
| **3D & Animation** | Three.js (WebGL), GLTFLoader |
| **Icons & SFX** | Lucide Icons, Web Audio API |
| **Integrasi API** | EmailJS API |
| **Deployment** | Vercel / Netlify |

---

## 📁 Struktur Folder Proyek

```text
├── assets/
│   ├── audio/          # File efek suara (.mp3 / .wav)
│   ├── models/         # File model 3D (.glb / .gltf)
│   └── images/         # Gambar proyek & tangkapan layar
├── index.html          # Halaman utama website
├── style.css           # Styling tambahan & Tailwind Directive
├── script.js           # Logika Three.js, efek suara, & EmailJS
└── README.md           # Dokumentasi proyek
