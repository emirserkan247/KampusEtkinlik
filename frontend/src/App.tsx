import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const pageTitles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  detail: "Etkinlik Detay",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

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
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  useEffect(() => {
    document.title =
      page === "detail"
        ? `Kampüs Etkinlikleri — ${selected?.title || "Detay"}`
        : pageTitles[page];
  }, [page, selected]);

  const showDetail = (id: string) => go("detail", id);

  return (
    <>
      <Header title={page === "detail" ? selected?.title || "Etkinlik bulunamadı" : pageTitles[page]}>
        <Navigation current={page} onNavigate={(next) => go(next)} />
      </Header>

      <main>
        {page === "home" && (
          <>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={showDetail} />
            <a href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>
              <strong>Tüm etkinlikleri gör &rarr;</strong>
            </a>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <p>
              {filtered.length === 0
                ? "Sonuç bulunamadı"
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <EventList events={filtered} onShowDetail={showDetail} />
          </>
        )}

        {page === "detail" && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
