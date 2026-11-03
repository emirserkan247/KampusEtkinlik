import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { formatDate } from "../utils/format-date";

function AdminPage() {
  useDocumentTitle("Yönetim");
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string) {
    if (window.confirm(`"${title}" etkinliğini silmek istediğinize emin misiniz?`)) {
      deleteEvent(id);
    }
  }

  return (
    <>
      <h2 className="sayfa-baslik">Etkinlik Yönetimi</h2>
      <p className="ust-eylem">
        <Link to="/admin/new" className="buton">
          + Yeni Etkinlik
        </Link>
      </p>

      {events.length === 0 ? (
        <p>Henüz etkinlik yok.</p>
      ) : (
        <table className="veri-tablosu">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Kategori</th>
              <th>Tarih</th>
              <th>Kontenjan</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td data-label="Başlık">{event.title}</td>
                <td data-label="Kategori">{event.category}</td>
                <td data-label="Tarih">{formatDate(event.date)}</td>
                <td data-label="Kontenjan">{event.capacity}</td>
                <td data-label="İşlemler" className="islemler">
                  <Link to={`/admin/${event.id}/edit`} className="buton">
                    Düzenle
                  </Link>
                  <button
                    type="button"
                    className="buton buton-sil"
                    onClick={() => handleDelete(event.id, event.title)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AdminPage;
