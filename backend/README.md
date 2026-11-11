# Kampüs Etkinlik API 🚀

SDÜ Kampüs Etkinlik Sistemi için Express.js REST API.

## 🚀 Çalıştırma

```bash
cd backend
cp .env.example .env   # Windows: copy .env.example .env
npm install
npm run dev            # geliştirme modu (npm start: normal mod)
```

Port, `.env.example` dosyasından kopyalanan `backend/.env` içindeki `PORT` değişkeniyle ayarlanır. Tanımlı değilse varsayılan `3000` kullanılır:

```env
PORT=3000
```

API adresi: `http://localhost:3000`

## 📌 REST Sözleşmesi

| Metot | Endpoint | Açıklama | Başarı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | API durumu | `200` | - | ✅ Hazır |
| GET | `/events` | Etkinlikleri listeler | `200` | - | ✅ Hazır |
| GET | `/events/:id` | Tek etkinlik getirir | `200` | `404` | ✅ Hazır |
| POST | `/events` | Etkinlik ekler (`title`, `category`, `date` zorunlu) | `201` | `400` | ✅ Hazır |
| PATCH | `/events/:id` | Etkinliği kısmen günceller | `200` | `400`, `404` | ✅ Hazır |
| DELETE | `/events/:id` | Etkinliği siler | `204` | `404` | ✅ Hazır |

Hata formatı: `{ "error": { "message": "..." } }`
