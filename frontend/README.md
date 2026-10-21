# Kampüs Etkinlikleri (Frontend)

Canlı demo: [https://kampusetkinlik-sprint2.vercel.app/](https://kampusetkinlik-sprint2.vercel.app/)

Sprint 3 prototipinin React + TypeScript (Vite) sürümüdür.

- `package.json`: Projenin bağımlılıklarını ve `dev`, `build`, `lint` gibi çalıştırma komutlarını tanımlar.
- `tsconfig.json`: TypeScript derleyicisinin uygulama ve Node yapılandırma dosyalarına yönlendirmesini sağlar.
- `src/App.tsx`: Beş sayfayı (ana sayfa, etkinlikler, detay, ekle, güncelle) `useState` ile yöneten ana bileşendir.
- `src/data/events.ts`: Tipli olarak tanımlanmış 6 örnek etkinliğin verisini barındırır.
- `src/types/campus-event.ts`: `Category` ve `CampusEvent` tiplerini tanımlar.
- `src/utils/filter-events.ts`: Arama, kategoriye göre filtreleme ve id ile etkinlik bulma saf fonksiyonlarını içerir.

## Sprint 5: Component Mimarisi

### Klasör yapısı

```
src/
├── components/
│   ├── layout/   Header.tsx, Navigation.tsx, Footer.tsx
│   ├── events/   EventCard.tsx, EventList.tsx, EventFilter.tsx, EventDetail.tsx
│   └── forms/    EventForm.tsx
├── types/        campus-event.ts, page.ts (PageName)
├── utils/        filter-events.ts, format-date.ts (formatDate)
├── data/         events.ts
└── App.tsx
```

### Veri akışı

- `App.tsx` yalnızca State'i (`page`, `selectedId`, `searchText`, `category`), türetilmiş değerleri (`selected`, `upcoming`, `filtered`), `go()` fonksiyonunu ve `document.title` side-effect'ini barındırır.
- Veri, parent'tan child'a **Props** ile iner: örneğin `App` → `EventList` (`events`) → `EventCard` (`event`).
- Child Component State'i doğrudan değiştirmez; kullanıcı bir şey yaptığında Props olarak aldığı **callback** fonksiyonunu çağırır (`onNavigate`, `onShowDetail`, `onBack`, `onEdit`, `onSearchChange`, `onCategoryChange`, `onSubmit`). Callback `App` içindeki `go()` ya da `setState` fonksiyonlarını çalıştırır, State değişir ve arayüz yeniden çizilir.
- `EventFilter` kontrollü (controlled) bir Component'tir: `searchText` ve `category` State'i `App`'te durur (Lifting State Up), filtrelenmiş liste de `App`'te hesaplanıp `EventList`'e verilir.
- `Header` başlığı `title` Props'u ile alır; `Navigation` Header'ın içine children olarak yerleştirilir. `EventList` her kartı `event.id` key'iyle çizer.
