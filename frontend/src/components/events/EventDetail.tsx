import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent | undefined;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  if (!event) {
    return (
      <section className="detay-kapsayici">
        <div className="hata">
          <p>Etkinlik bulunamadı.</p>
          <button type="button" onClick={onBack}>
            Listeye dön
          </button>
        </div>
      </section>
    );
  }

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

        <button type="button" onClick={onBack}>
          &larr; Listeye dön
        </button>{" "}
        <button type="button" onClick={() => onEdit(event.id)}>
          Bu etkinliği güncelle
        </button>
      </div>
    </section>
  );
}

export default EventDetail;
