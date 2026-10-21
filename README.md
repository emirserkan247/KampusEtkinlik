# Kampüs Etkinlikleri

Web Teknolojileri ve Programlama dersi kapsamında sprintler halinde geliştirilen Kampüs Etkinlikleri projesidir.

## Sprintler

- Sprint 1 — HTML
- Sprint 2 — CSS ve Responsive Tasarım
- Sprint 3 — JavaScript
- Sprint 4 (Frontend) – React + TypeScript (Vite), bkz. [frontend](frontend/README.md)

## Canlı Demo

[Vercel üzerinde görüntüle](https://kampusetkinlik-sprint2.vercel.app/)

## Sprint 5

Sprint 5'te tek dosyada toplanan (monolithic) `App.tsx`, modüler ve Component tabanlı bir mimariye dönüştürüldü. Header, Navigation, Footer, EventCard, EventList, EventFilter, EventDetail ve EventForm ayrı Component'lere ayrıldı. Veri, Props ile aşağı doğru; kullanıcı etkileşimleri ise callback fonksiyonlarıyla yukarı doğru akar. State `App.tsx` içinde tutulur (Lifting State Up). Sitenin görünümü ve davranışı Sprint 4 ile aynıdır. Ayrıntılar için [frontend/README.md](frontend/README.md) dosyasına bakınız.
