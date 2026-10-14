import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const pageTitles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  detail: "Etkinlik Detay",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  useEffect(() => {
    document.title =
      page === "detail"
        ? `Kampüs Etkinlikleri — ${selected?.title || "Detay"}`
        : pageTitles[page];
  }, [page, selected]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="etkinlik-kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>
          {event.category} &middot;{" "}
          <time>
            {formatDate(event.date)}, {event.time}
          </time>
        </p>
        <p>{event.location}</p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör &rarr;
        </a>
      </article>
    );
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <header>
        <h1>{page === "detail" ? selected?.title || "Etkinlik bulunamadı" : pageTitles[page]}</h1>
        <nav>
          {menu.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-grid">{upcoming.map(renderCard)}</section>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              <strong>Tüm etkinlikleri gör &rarr;</strong>
            </a>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="arama">Etkinlik ara</label>
              <input
                type="search"
                id="arama"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              <label htmlFor="kategori-filtre">Kategori</label>
              <select
                id="kategori-filtre"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tümü</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </form>

            <p>
              {filtered.length === 0
                ? "Sonuç bulunamadı"
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-grid">{filtered.map(renderCard)}</section>
          </>
        )}

        {page === "detail" && (
          <section className="detay-kapsayici">
            {!selected ? (
              <div className="hata">
                <p>Etkinlik bulunamadı.</p>
                <button type="button" onClick={() => go("events")}>
                  Listeye dön
                </button>
              </div>
            ) : (
              <>
                {selected.image && (
                  <figure>
                    <img src={selected.image} alt={`${selected.title} afişi`} />
                    <figcaption>
                      <i>Şekil 1: etkinlik afişi</i>
                    </figcaption>
                  </figure>
                )}

                <div>
                  <dl>
                    <dt>Tarih</dt>
                    <dd>
                      <time>
                        {formatDate(selected.date)}, {selected.time}
                      </time>
                    </dd>

                    <dt>Yer</dt>
                    <dd>{selected.location}</dd>

                    <dt>Kategori</dt>
                    <dd>{selected.category}</dd>

                    <dt>Kontenjan</dt>
                    <dd>{selected.capacity}</dd>
                  </dl>

                  <p>{selected.description}</p>

                  <button type="button" onClick={() => go("events")}>
                    &larr; Listeye dön
                  </button>{" "}
                  <button type="button" onClick={() => go("update", selected.id)}>
                    Bu etkinliği güncelle
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <form noValidate onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="ad">Etkinlik adı</label>
              <input type="text" id="ad" name="ad" />

              <label htmlFor="kategori">Kategori</label>
              <select id="kategori" name="kategori">
                <option value="">Seçiniz</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>

              <label htmlFor="tarih">Tarih</label>
              <input type="date" id="tarih" name="tarih" />

              <label htmlFor="saat">Saat</label>
              <input type="time" id="saat" name="saat" />

              <label htmlFor="yer">Yer</label>
              <input type="text" id="yer" name="yer" />

              <label htmlFor="kontenjan">Kontenjan</label>
              <input
                type="number"
                id="kontenjan"
                name="kontenjan"
                min={1}
                max={1000}
              />

              <label htmlFor="aciklama">Açıklama</label>
              <textarea id="aciklama" name="aciklama" rows={3}></textarea>

              <button type="submit">Kaydet</button>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>
          Emir Serkan İşci &middot; <time>2026</time>
        </p>
      </footer>
    </>
  );
}

export default App;
