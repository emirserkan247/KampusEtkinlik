# Kampüs Etkinlik API 🚀

SDÜ Kampüs Etkinlik Sistemi için Express.js ve MongoDB (Mongoose) tabanlı REST API. Etkinlikler MongoDB'de kalıcı olarak saklanır.

## 🚀 Çalıştırma

```bash
cd backend
cp .env.example .env   # Windows: copy .env.example .env
npm install
npm run seed           # 6 örnek etkinliği veritabanına yükler
npm run dev            # geliştirme modu (npm start: normal mod)
```

`.env` dosyasındaki değişkenler:

| Değişken | Açıklama |
|---|---|
| `PORT` | API portu. Tanımlı değilse varsayılan `3000` kullanılır. |
| `MONGODB_URI` | MongoDB bağlantı adresi. Zorunludur; yerel örnek: `mongodb://127.0.0.1:27017/kampus` |

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```

> [!WARNING]
> `.env` dosyası git'e eklenmez. Atlas bağlantı adresinizi ve şifrenizi yalnızca bu dosyada tutun.

API adresi: `http://localhost:3000`

## 📂 Klasör Yapısı

```text
backend/src/
├── config/database.js     # MongoDB bağlantısı
├── models/event-model.js  # Mongoose Event şeması
├── controllers/           # İş mantığı
├── routes/                # Rota tanımları
├── data/seed-events.js    # 6 örnek etkinlik
├── seed.js                # Tekrarlanabilir seed scripti
├── app.js                 # Express uygulaması ve hata middleware'leri
└── server.js              # Önce DB'ye bağlanır, sonra sunucuyu başlatır
```

`npm run seed` komutu koleksiyonu temizleyip 6 etkinliği yeniden ekler; istediğiniz kadar çalıştırabilirsiniz.

## 📌 REST Sözleşmesi

| Metot | Endpoint | Açıklama | Başarı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | API durumu | `200` | - | ✅ Hazır |
| GET | `/events` | Etkinlikleri listeler (`?category=` filtresi) | `200` | `500` | ✅ Hazır |
| GET | `/events/:id` | Tek etkinlik getirir (MongoDB `_id`) | `200` | `404` | ✅ Hazır |
| POST | `/events` | Etkinlik ekler (`title`, `category`, `date` zorunlu) | `201` | `400` | ✅ Hazır |
| PATCH | `/events/:id` | Etkinliği kısmen günceller | `200` | `400`, `404` | ✅ Hazır |
| DELETE | `/events/:id` | Etkinliği siler | `204` | `404` | ✅ Hazır |

`category` değeri `Seminer`, `Atölye`, `Söyleşi` veya `Yarışma` olmalıdır. Geçersiz ID ve bulunamayan kayıt `404`, şema doğrulama hatası `400` döner.

Hata formatı: `{ "error": { "message": "..." } }`