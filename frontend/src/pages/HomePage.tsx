import { Link } from "react-router-dom";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function HomePage() {
  useDocumentTitle("Kampüs Etkinlikleri");
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      <h2>Yaklaşan {upcoming.length} Etkinlik</h2>
      <EventList events={upcoming} emptyText="Yaklaşan etkinlik yok." />
      <Link to="/events">
        <strong>Tüm etkinlikleri gör &rarr;</strong>
      </Link>
    </>
  );
}

export default HomePage;
