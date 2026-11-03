import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

function EventList({ events, emptyText }: EventListProps) {
  return (
    <section className="etkinlik-grid">
      {events.length === 0 && emptyText && <p>{emptyText}</p>}
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default EventList;
