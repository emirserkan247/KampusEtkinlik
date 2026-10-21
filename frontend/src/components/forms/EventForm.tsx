interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="ad">Etkinlik adı</label>
      <input type="text" id="ad" name="ad" />

      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori">
        <option value="">Seçiniz</option>
        <option value="Seminer">Seminer</option>
        <option value="Atölye">Atölye</option>
        <option value="Söyleşi">Söyleşi</option>
        <option value="Yarışma">Yarışma</option>
      </select>

      <label htmlFor="tarih">Tarih</label>
      <input type="date" id="tarih" name="tarih" />

      <label htmlFor="saat">Saat</label>
      <input type="time" id="saat" name="saat" />

      <label htmlFor="yer">Yer</label>
      <input type="text" id="yer" name="yer" />

      <label htmlFor="kontenjan">Kontenjan</label>
      <input type="number" id="kontenjan" name="kontenjan" min={1} max={1000} />

      <label htmlFor="aciklama">Açıklama</label>
      <textarea id="aciklama" name="aciklama" rows={3}></textarea>

      <button type="submit">Kaydet</button>
    </form>
  );
}

export default EventForm;
