# Kampüs Etkinlik Sistemi (Monorepo) 🎓

Bu depo, SDÜ Kampüs Etkinlik Sistemi projesinin tüm sprintlerini ve modüllerini barındırır.

## 👨💻 Geliştirici Bilgileri
* **Ad Soyad:** Emir Serkan İşçi
* **Öğrenci No:** 2321032040
* **Bölüm:** Bilgisayar Mühendisliği (3. Sınıf)

## 📂 Proje Yapısı
* 📁 `/backend`: Express.js ile geliştirilen REST API (👉 **Sprint 7 - GÜNCEL**)
  * `src/routes`, `src/controllers`, `src/data`: Katmanlı API yapısı
  * `requests/kampus-api.json`: Postman koleksiyonu (6 istek)
  * `.env.example`: Ortam değişkeni şablonu
* 📁 `/frontend`: React ile geliştirilmiş kullanıcı arayüzü (Sprint 6)
* 📁 `/sprint1` - `/sprint3`: Projenin önceki statik ve tasarım aşamaları.

## 🚀 Son Güncelleme: Sprint 7 (Express REST API)
Sistemin backend API altyapısı Node.js ve Express.js kullanılarak başarıyla ayağa kaldırılmıştır. Sunucu geliştirme ortamında `http://localhost:3000` adresi üzerinde çalışmaktadır.

### 📌 API Endpointleri
| Metot | Endpoint | Açıklama | Başarı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | API durumunu ve öğrenci bilgisini döner. | `200` | - | ✅ Hazır |
| GET | `/events` | Tüm SDÜ etkinliklerini listeler. | `200` | - | ✅ Hazır |
| GET | `/events/:id` | ID'si verilen etkinliği getirir. | `200` | `404` | ✅ Hazır |
| POST | `/events` | Yeni bir etkinlik ekler. | `201` | `400` | ✅ Hazır |
| PATCH | `/events/:id` | Etkinliği kısmen günceller. | `200` | `400`, `404` | ✅ Hazır |
| DELETE | `/events/:id` | Etkinliği siler. | `204` | `404` | ✅ Hazır |

*Not: Postman test koleksiyonu detaylı inceleme için `backend/requests/kampus-api.json` dosyasında bulunmaktadır.*

### 🛠 Kurulum
Projeyi lokalinizde test etmek için:
1. `cd backend` komutu ile backend dizinine girin.
2. `.env.example` dosyasını `.env` olarak kopyalayın (varsayılan `PORT=3000`).
3. `npm install` ile bağımlılıkları yükleyin.
4. `npm run dev` ile sunucuyu başlatın.
