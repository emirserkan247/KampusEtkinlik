import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
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
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onShowDetail(event.id);
        }}
      >
        Detayları gör &rarr;
      </a>
    </article>
  );
}

export default EventCard;
