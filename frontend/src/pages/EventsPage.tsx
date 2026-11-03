import { useState } from "react";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";

function EventsPage() {
  useDocumentTitle("Tüm Etkinlikler");
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2>Tüm Etkinlikler</h2>
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
      <EventList events={filtered} />
    </>
  );
}

export default EventsPage;
