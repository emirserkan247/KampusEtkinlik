# Kampüs Etkinlik Sistemi API 🚀

Bu proje, SDÜ öğrencileri için geliştirilen Kampüs Etkinlik Sistemi'nin backend API servisidir. Express.js kullanılarak geliştirilmiştir.

## 🛠 Kullanılan Teknolojiler
* Node.js & Express.js
* CORS (Cross-Origin Resource Sharing)
* dotenv (Ortam değişkenleri yönetimi)

## 📌 API Endpointleri

| Metot | Endpoint | Açıklama |
|---|---|---|
| GET | `/health` | API durumunu ve öğrenci bilgisini döner. |
| GET | `/events` | Tüm SDÜ etkinliklerini listeler. |
| GET | `/events/:id` | ID'si verilen spesifik bir etkinliği getirir. |
| POST | `/events` | Sisteme yeni bir etkinlik ekler. |

## 🚀 Kurulum ve Çalıştırma

1. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```

2. Sunucuyu geliştirme modunda başlatın:
   ```bash
   npm run dev
   ```

   API varsayılan olarak `http://localhost:3000` adresinde çalışır.
