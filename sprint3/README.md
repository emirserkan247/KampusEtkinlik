[Canlı siteyi görüntüle](https://kampusetkinlik-sprint2.vercel.app/)

# Kampüs Etkinlikleri — Sprint 3

Bu sprintte Sprint 2'de oluşturulan HTML ve CSS yapısı korunarak projeye **JavaScript ve DOM işlemleri** eklendi.

## Yapılanlar

- Etkinlik verileri `data.js` dosyasında tek bir dizi içinde toplandı.
- En az 6 etkinlik JavaScript nesneleri olarak tanımlandı.
- Etkinlik kartları artık HTML içinde elle yazılmak yerine JavaScript ile dinamik olarak oluşturuluyor.
- Ana sayfada tarihi en yakın 2 etkinlik gösteriliyor.
- Etkinlikler sayfasına arama kutusu ve kategori filtresi eklendi.
- Arama ve kategori filtresi birlikte çalışacak şekilde düzenlendi.
- Sonuç bulunamadığında kullanıcıya bilgilendirme mesajı gösteriliyor.
- Detay sayfasında URL'deki `?id=` parametresi kullanılarak doğru etkinlik gösteriliyor.
- Geçersiz veya eksik ID durumunda hata mesajı gösteriliyor.
- Etkinlik ekleme formuna JavaScript ile özel form doğrulama eklendi.
- Hatalı alanlar kullanıcıya ayrı ayrı gösteriliyor.
- Başarılı form gönderiminde oluşturulan etkinlik nesnesi JSON olarak gösteriliyor.
- Güncelleme sayfası seçilen etkinliğin bilgileriyle otomatik olarak dolduruluyor.
- Güncelleme sayfası ID olmadan açıldığında kullanıcıya uyarı gösteriliyor.
- JavaScript kodları modüller halinde `js` klasöründe düzenlendi.

## Kullanılan JavaScript Dosyaları

- `data.js`
- `event-list.js`
- `event-detail.js`
- `event-form.js`

## Kullanılan Temel JavaScript ve DOM Konuları

- `import` / `export`
- `querySelector`
- `innerHTML`
- `textContent`
- `addEventListener`
- `map`
- `filter`
- `find`
- `sort`
- `slice`
- `Set`
- `URLSearchParams`
- `FormData`
- `dataset`
- `JSON.stringify`

Bu sprintte kalıcı veri kaydı yapılmamaktadır. `localStorage`, framework veya jQuery kullanılmamıştır.