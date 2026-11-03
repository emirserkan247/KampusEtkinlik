import { Link, useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { toEventInput, toFormData } from "../utils/event-form";
import { findEventById } from "../utils/filter-events";
import type { EventFormData } from "../utils/validate-event";

function EditEventPage() {
  useDocumentTitle("Etkinlik Güncelle");
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = id ? findEventById(events, id) : undefined;

  if (!id || !event) {
    return (
      <div className="hata">
        <p>Etkinlik bulunamadı.</p>
        <Link to="/admin">Yönetim sayfasına dön</Link>
      </div>
    );
  }

  function handleSubmit(data: EventFormData) {
    updateEvent(event!.id, toEventInput(data));
    navigate("/admin");
  }

  return (
    <>
      <h2>Etkinlik Güncelle</h2>
      <EventForm
        key={event.id}
        initialData={toFormData(event)}
        submitLabel="Güncelle"
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default EditEventPage;
