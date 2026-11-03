import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <section className="detay-kapsayici">
      {event.image && (
        <figure>
          <img src={event.image} alt={`${event.title} afişi`} />
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
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>

          <dt>Yer</dt>
          <dd>{event.location}</dd>

          <dt>Kategori</dt>
          <dd>{event.category}</dd>

          <dt>Kontenjan</dt>
          <dd>{event.capacity}</dd>
        </dl>

        <p>{event.description}</p>

        <p className="eylemler">
          <Link to="/events">&larr; Listeye dön</Link>{" "}
          <Link to={`/admin/${event.id}/edit`}>Bu etkinliği güncelle</Link>
        </p>
      </div>
    </section>
  );
}

export default EventDetail;
