import { CATEGORIES } from "../types/campus-event";

export interface EventFormData {
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;

export function validateEvent(data: EventFormData): EventFormErrors {
  const errors: EventFormErrors = {};

  if (data.title.trim().length < 3) {
    errors.title = "Etkinlik adı en az 3 karakter olmalıdır.";
  }

  if (!CATEGORIES.some((c) => c === data.category)) {
    errors.category = "Lütfen bir kategori seçiniz.";
  }

  if (!data.date) {
    errors.date = "Tarih seçiniz.";
  }

  if (!data.time) {
    errors.time = "Saat seçiniz.";
  }

  if (data.location.trim().length === 0) {
    errors.location = "Yer bilgisi zorunludur.";
  }

  const capacity = Number(data.capacity);
  if (
    data.capacity.trim() === "" ||
    !Number.isInteger(capacity) ||
    capacity < 1 ||
    capacity > 1000
  ) {
    errors.capacity = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalıdır.";
  }

  if (data.description.trim().length < 10) {
    errors.description = "Açıklama en az 10 karakter olmalıdır.";
  }

  return errors;
}
