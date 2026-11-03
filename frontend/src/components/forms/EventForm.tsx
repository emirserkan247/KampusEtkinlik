import { useState, type ChangeEvent, type FormEvent } from "react";
import { CATEGORIES } from "../../types/campus-event";
import {
  validateEvent,
  type EventFormData,
  type EventFormErrors,
} from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitLabel?: string;
  onSubmit: (data: EventFormData) => void;
}

function EventForm({
  initialData,
  submitLabel = "Kaydet",
  onSubmit,
}: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(formData);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit(formData);
    }
  }

  function errorProps(name: keyof EventFormData) {
    return {
      "aria-invalid": errors[name] ? (true as const) : undefined,
      "aria-describedby": errors[name] ? `${name}-hata` : undefined,
    };
  }

  function renderError(name: keyof EventFormData) {
    return errors[name] ? (
      <p className="hata-mesaji" id={`${name}-hata`} role="alert">
        {errors[name]}
      </p>
    ) : null;
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="title">Etkinlik adı</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        {...errorProps("title")}
      />
      {renderError("title")}

      <label htmlFor="category">Kategori</label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        {...errorProps("category")}
      >
        <option value="">Seçiniz</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {renderError("category")}

      <label htmlFor="date">Tarih</label>
      <input
        type="date"
        id="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        {...errorProps("date")}
      />
      {renderError("date")}

      <label htmlFor="time">Saat</label>
      <input
        type="time"
        id="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        {...errorProps("time")}
      />
      {renderError("time")}

      <label htmlFor="location">Yer</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        {...errorProps("location")}
      />
      {renderError("location")}

      <label htmlFor="capacity">Kontenjan</label>
      <input
        type="number"
        id="capacity"
        name="capacity"
        min={1}
        max={1000}
        value={formData.capacity}
        onChange={handleChange}
        {...errorProps("capacity")}
      />
      {renderError("capacity")}

      <label htmlFor="description">Açıklama</label>
      <textarea
        id="description"
        name="description"
        rows={3}
        value={formData.description}
        onChange={handleChange}
        {...errorProps("description")}
      />
      {renderError("description")}

      <button type="submit">{submitLabel}</button>
    </form>
  );
}

export default EventForm;
