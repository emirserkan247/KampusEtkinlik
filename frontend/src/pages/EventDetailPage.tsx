import { Link, useParams } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";
import { useEvents } from "../context/EventsContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { findEventById } from "../utils/filter-events";

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { events } = useEvents();
  const event = id ? findEventById(events, id) : undefined;

  useDocumentTitle(
    event ? `Kampüs Etkinlikleri – ${event.title}` : "Etkinlik bulunamadı",
  );

  if (!event) {
    return (
      <section className="detay-kapsayici">
        <div className="hata">
          <p>Etkinlik bulunamadı.</p>
          <Link to="/events">Listeye dön</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <h2>{event.title}</h2>
      <EventDetail event={event} />
    </>
  );
}

export default EventDetailPage;
