import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { emptyEventForm, toEventInput } from "../utils/event-form";
import type { EventFormData } from "../utils/validate-event";

function AddEventPage() {
  useDocumentTitle("Etkinlik Ekle");
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleSubmit(data: EventFormData) {
    addEvent(toEventInput(data));
    window.alert("Etkinlik başarıyla eklendi!");
    navigate("/admin");
  }

  return (
    <>
      <h2>Etkinlik Ekle</h2>
      <EventForm initialData={emptyEventForm} onSubmit={handleSubmit} />
    </>
  );
}

export default AddEventPage;
