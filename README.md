# Kampüs Etkinlik Sistemi (Monorepo) 🎓

Bu depo, SDÜ Kampüs Etkinlik Sistemi projesinin tüm sprintlerini ve modüllerini barındırır.

## 👨💻 Geliştirici Bilgileri
* **Ad Soyad:** Emir Serkan İşçi
* **Öğrenci No:** 2321032040
* **Bölüm:** Bilgisayar Mühendisliği (3. Sınıf)

## 📂 Proje Yapısı
* 📁 `/backend`: Express.js + MongoDB (Mongoose) ile geliştirilen REST API (👉 **Sprint 8 - GÜNCEL**)
  * `src/config/database.js`: MongoDB bağlantı modülü
  * `src/models/event-model.js`: Mongoose `Event` şeması
  * `src/data/seed-events.js` ve `src/seed.js`: 6 örnek etkinlik ve seed scripti
  * `src/routes`, `src/controllers`: Katmanlı API yapısı
  * `requests/kampus-api.json`: Postman koleksiyonu (6 istek)
  * `.env.example`: Ortam değişkeni şablonu
* 📁 `/frontend`: React ile geliştirilmiş kullanıcı arayüzü (Sprint 6)
* 📁 `/sprint1` - `/sprint3`: Projenin önceki statik ve tasarım aşamaları.

## 🚀 Son Güncelleme: Sprint 8 (MongoDB ve Mongoose ile Kalıcı Veri)
Sprint 7'de bellekte tutulan etkinlik verisi, MongoDB Atlas üzerinde Mongoose ile kalıcı hale getirilmiştir. Sunucu önce veritabanına bağlanır, bağlantı başarılıysa `http://localhost:3000` üzerinde dinlemeye başlar.

### 📌 API Endpointleri
| Metot | Endpoint | Açıklama | Başarı | Hata |
|---|---|---|---|---|
| GET | `/health` | API durumunu ve öğrenci bilgisini döner. | `200` | - |
| GET | `/events` | Etkinlikleri tarihe göre listeler (`?category=` ile filtrelenebilir). | `200` | `500` |
| GET | `/events/:id` | MongoDB `_id` değeri verilen etkinliği getirir. | `200` | `404` |
| POST | `/events` | Yeni bir etkinlik ekler (şema doğrulamalı). | `201` | `400` |
| PATCH | `/events/:id` | Etkinliği kısmen günceller. | `200` | `400`, `404` |
| DELETE | `/events/:id` | Etkinliği siler. | `204` | `404` |

*Not: Postman test koleksiyonu `backend/requests/kampus-api.json` dosyasında bulunmaktadır.*

### 🛠 Kurulum
1. `cd backend` komutu ile backend dizinine girin.
2. `.env.example` dosyasını `.env` olarak kopyalayın ve `MONGODB_URI` değerini kendi MongoDB bağlantınızla değiştirin (örnek: `mongodb://127.0.0.1:27017/kampus`).
3. `npm install` ile bağımlılıkları yükleyin.
4. `npm run seed` ile örnek etkinlikleri veritabanına yükleyin.
5. `npm run dev` ile sunucuyu başlatın.