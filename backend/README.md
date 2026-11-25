# Kampüs Etkinlik API 🚀

SDÜ Kampüs Etkinlik Sistemi için Express.js ve MongoDB (Mongoose) tabanlı REST API. Etkinlikler MongoDB'de kalıcı olarak saklanır ve tam CRUD (oluştur, oku, güncelle, sil) desteklenir.

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
backend/
├── requests/
│   ├── kampus-api.json    # Postman koleksiyonu (18 istek, 45 test)
│   └── run-results.json   # Newman çalıştırma sonucu
└── src/
    ├── config/database.js     # MongoDB bağlantısı
    ├── models/event-model.js  # Mongoose Event şeması
    ├── controllers/           # İş mantığı
    ├── routes/                # Rota tanımları
    ├── utils/date.js          # GG-AA-YYYY tarih dönüşümleri
    ├── data/seed-events.js    # 6 örnek etkinlik
    ├── seed.js                # Tekrarlanabilir seed scripti
    ├── app.js                 # Express uygulaması ve hata middleware'leri
    └── server.js              # Önce DB'ye bağlanır, sonra sunucuyu başlatır
```

`npm run seed` komutu koleksiyonu temizleyip 6 etkinliği yeniden ekler; istediğiniz kadar çalıştırabilirsiniz.

## 📌 REST Sözleşmesi

| Metot | Endpoint | Açıklama | Başarı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | API durumu | `200` | - | ✅ Çalışıyor |
| GET | `/events` | Etkinlikleri tarihe göre listeler | `200` | - | ✅ Çalışıyor |
| GET | `/events?search=&category=` | Başlıkta arama (`search`) ve kategori filtresi (`category`) | `200` | - | ✅ Çalışıyor |
| GET | `/events/upcoming` | Bugün ve sonrasındaki etkinlikler (en yakın önce) | `200` | - | ✅ Çalışıyor |
| GET | `/events/:id` | Tek etkinlik getirir (MongoDB `_id`) | `200` | `404` | ✅ Çalışıyor |
| POST | `/events` | Etkinlik ekler (`title`, `category`, `date` zorunlu) | `201` | `400` | ✅ Çalışıyor |
| PATCH | `/events/:id` | Etkinliği kısmen günceller | `200` | `400`, `404` | ✅ Çalışıyor |
| DELETE | `/events/:id` | Etkinliği siler | `204` | `404` | ✅ Çalışıyor |

- **Tarih formatı:** API'ye giriş ve çıkışta tarih `GG-AA-YYYY` biçimindedir (örn. `15-10-2026`). Veritabanında gerçek `Date` olarak saklanır. Geçersiz tarih (örn. `31-02-2026`) `400` döner.
- **Kategori:** `Seminer`, `Atölye`, `Söyleşi` veya `Yarışma` olmalıdır.
- **Geçersiz ID:** Geçersiz veya bulunamayan ID her uç noktada `404` döner.
- **PATCH:** Boş body ve `_id`, `createdAt`, `updatedAt`, `__v` alanlarını değiştirme denemeleri `400` döner.

Hata formatı: `{ "error": { "message": "..." } }`

## 🧪 Test

Sunucu çalışırken Postman koleksiyonu Newman ile doğrulanır (18 istek, 45 test):

```bash
npx newman run requests/kampus-api.json
```
