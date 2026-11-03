# Kampüs Etkinlikleri - Sprint 6 & Vize (frontend)

Emir Serkan İşci - 2321032040

**Canlı Bağlantı / Live (Vercel):** https://emirserkanisci-frontend.vercel.app

## Kurulum (Installation)

```bash
npm install
npm run dev
```

Geliştirme sunucusu http://localhost:5173 adresinde açılır. Diğer komutlar: `npm run build`, `npm run lint`, `npm run preview`.

## Route Listesi

| Path                | Sayfa (Page)         |
| ------------------- | -------------------- |
| `/`                 | `HomePage`           |
| `/events`           | `EventsPage`         |
| `/events/:id`       | `EventDetailPage`    |
| `/admin`            | `AdminPage`          |
| `/admin/new`        | `AddEventPage`       |
| `/admin/:id/edit`   | `EditEventPage`      |
| `/login`            | `LoginPage`          |
| `/register`         | `RegisterPage`       |
| `/forgot-password`  | `ForgotPasswordPage` |
| `*`                 | `NotFoundPage`       |

## Klasör Yapısı

```
src/
  components/   layout/ (Header, Navigation, Footer)
                events/ (EventCard, EventList, EventFilter, EventDetail)
                forms/  (EventForm)
  context/      EventsContext (events, addEvent, updateEvent, deleteEvent)
  pages/        10 sayfa bileşeni
  utils/        validate-event, filter-events, format-date
```
