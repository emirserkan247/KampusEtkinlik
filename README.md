# Kampüs Etkinlik Sistemi (Monorepo) 🎓

Bu depo, SDÜ Kampüs Etkinlik Sistemi projesinin tüm sprintlerini ve modüllerini barındırır.

## 👨💻 Geliştirici Bilgileri
* **Ad Soyad:** Emir Serkan İşçi
* **Öğrenci No:** 2321032040
* **Bölüm:** Bilgisayar Mühendisliği (3. Sınıf)

## 📂 Proje Yapısı
* 📁 `/backend`: Express.js + MongoDB (Mongoose) ile geliştirilen REST API (👉 **Sprint 9 - GÜNCEL**)
  * `src/config/database.js`: MongoDB bağlantı modülü
  * `src/models/event-model.js`: Mongoose `Event` şeması
  * `src/utils/date.js`: `GG-AA-YYYY` tarih dönüşüm yardımcıları
  * `src/data/seed-events.js` ve `src/seed.js`: 6 örnek etkinlik ve seed scripti
  * `src/routes`, `src/controllers`: Katmanlı API yapısı
  * `requests/kampus-api.json`: Postman koleksiyonu (18 istek, 45 test)
  * `requests/run-results.json`: Newman çalıştırma sonucu
  * `.env.example`: Ortam değişkeni şablonu
* 📁 `/frontend`: React ile geliştirilmiş kullanıcı arayüzü (Sprint 6)
* 📁 `/sprint1` - `/sprint3`: Projenin önceki statik ve tasarım aşamaları.

## 🚀 Son Güncelleme: Sprint 9 (Tam CRUD, Arama ve Yaklaşan Etkinlikler)
Sprint 8'de kalıcı hale getirilen etkinlik verisi üzerinde tam CRUD (`PATCH`, `DELETE`), başlıkta arama, kategori filtresi ve yaklaşan etkinlikler uç noktası eklenmiştir. API'de tüm tarihler `GG-AA-YYYY` biçimindedir (örn. `15-10-2026`); veritabanında gerçek `Date` olarak saklanır. Sunucu önce veritabanına bağlanır, bağlantı başarılıysa `http://localhost:3000` üzerinde dinlemeye başlar.

### 📌 API Endpointleri
| Metot | Endpoint | Açıklama | Başarı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | API durumunu ve öğrenci bilgisini döner. | `200` | - | ✅ Çalışıyor |
| GET | `/events` | Etkinlikleri tarihe göre listeler. | `200` | - | ✅ Çalışıyor |
| GET | `/events?search=&category=` | Başlıkta arama ve kategori filtresi. | `200` | - | ✅ Çalışıyor |
| GET | `/events/upcoming` | Bugün ve sonrasındaki etkinlikler. | `200` | - | ✅ Çalışıyor |
| GET | `/events/:id` | MongoDB `_id` değeri verilen etkinliği getirir. | `200` | `404` | ✅ Çalışıyor |
| POST | `/events` | Yeni bir etkinlik ekler (şema doğrulamalı). | `201` | `400` | ✅ Çalışıyor |
| PATCH | `/events/:id` | Etkinliği kısmen günceller. | `200` | `400`, `404` | ✅ Çalışıyor |
| DELETE | `/events/:id` | Etkinliği siler. | `204` | `404` | ✅ Çalışıyor |

*Not: Postman test koleksiyonu `backend/requests/kampus-api.json` dosyasında bulunmaktadır (Newman: 18 istek, 45 test, 0 hata).*

### 🛠 Kurulum
1. `cd backend` komutu ile backend dizinine girin.
2. `.env.example` dosyasını `.env` olarak kopyalayın ve `MONGODB_URI` değerini kendi MongoDB bağlantınızla değiştirin (örnek: `mongodb://127.0.0.1:27017/kampus`).
3. `npm install` ile bağımlılıkları yükleyin.
4. `npm run seed` ile örnek etkinlikleri veritabanına yükleyin.
5. `npm run dev` ile sunucuyu başlatın.
