# Kampüs Etkinlik Sistemi (Monorepo) 🎓

Bu depo, SDÜ Kampüs Etkinlik Sistemi projesinin tüm sprintlerini ve modüllerini barındırır.

## 👨💻 Geliştirici Bilgileri
* **Ad Soyad:** Emir Serkan İşçi
* **Öğrenci No:** 2321032040
* **Bölüm:** Bilgisayar Mühendisliği (3. Sınıf)

## 📂 Proje Yapısı
* 📁 `/backend`: Express.js ile geliştirilen REST API (👉 **Sprint 7 - GÜNCEL**)
* 📁 `/frontend`: React ile geliştirilmiş kullanıcı arayüzü (Sprint 6)
* 📁 `/sprint1` - `/sprint3`: Projenin önceki statik ve tasarım aşamaları.

## 🚀 Son Güncelleme: Sprint 7 (Express REST API)
Sistemin backend API altyapısı Node.js ve Express.js kullanılarak başarıyla ayağa kaldırılmıştır. Sunucu geliştirme ortamında `http://localhost:3000` adresi üzerinde çalışmaktadır.

### 📌 API Endpointleri
| Metot | Endpoint | Açıklama | URL Örneği |
|---|---|---|---|
| GET | `/health` | API durumunu ve öğrenci bilgisini döner. | `http://localhost:3000/health` |
| GET | `/events` | Tüm SDÜ etkinliklerini listeler. | `http://localhost:3000/events` |
| GET | `/events/:id` | ID'si verilen spesifik bir etkinliği getirir. | `http://localhost:3000/events/event-2` |
| POST | `/events` | Sisteme yeni bir etkinlik ekler. | `http://localhost:3000/events` |

*Not: Postman test koleksiyonu detaylı inceleme için `backend/requests/kampus-api.json` dosyasında bulunmaktadır.*

### 🛠 Kurulum
Projeyi lokalinizde test etmek için:
1. `cd backend` komutu ile backend dizinine girin.
2. `npm install` ile bağımlılıkları yükleyin.
3. `npm run dev` ile sunucuyu başlatın.
