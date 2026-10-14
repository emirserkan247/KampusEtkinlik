# Kampüs Etkinlikleri (Frontend)

Canlı demo: [https://kampusetkinlik-sprint2.vercel.app/](https://kampusetkinlik-sprint2.vercel.app/)

Sprint 3 prototipinin React + TypeScript (Vite) sürümüdür.

- `package.json`: Projenin bağımlılıklarını ve `dev`, `build`, `lint` gibi çalıştırma komutlarını tanımlar.
- `tsconfig.json`: TypeScript derleyicisinin uygulama ve Node yapılandırma dosyalarına yönlendirmesini sağlar.
- `src/App.tsx`: Beş sayfayı (ana sayfa, etkinlikler, detay, ekle, güncelle) `useState` ile yöneten ana bileşendir.
- `src/data/events.ts`: Tipli olarak tanımlanmış 6 örnek etkinliğin verisini barındırır.
- `src/types/campus-event.ts`: `Category` ve `CampusEvent` tiplerini tanımlar.
- `src/utils/filter-events.ts`: Arama, kategoriye göre filtreleme ve id ile etkinlik bulma saf fonksiyonlarını içerir.
