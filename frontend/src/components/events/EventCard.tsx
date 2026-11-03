import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="etkinlik-kart">
      <h3>{event.title}</h3>
      <p>
        {event.category} &middot;{" "}
        <time>
          {formatDate(event.date)}, {event.time}
        </time>
      </p>
      <p>{event.location}</p>
      <p>{event.description}</p>
      <Link to={`/events/${event.id}`}>Detayları gör &rarr;</Link>
    </article>
  );
}

export default EventCard;
