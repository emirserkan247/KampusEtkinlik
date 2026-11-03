import type {
  CampusEvent,
  CampusEventInput,
  Category,
} from "../types/campus-event";
import type { EventFormData } from "./validate-event";

export const emptyEventForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
};

export function toFormData(event: CampusEvent): EventFormData {
  return {
    title: event.title,
    category: event.category,
    date: event.date,
    time: event.time,
    location: event.location,
    capacity: String(event.capacity),
    description: event.description,
  };
}

/** Call only after `validateEvent` returned no errors. */
export function toEventInput(data: EventFormData): CampusEventInput {
  return {
    title: data.title.trim(),
    category: data.category as Category,
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    capacity: Number(data.capacity),
    description: data.description.trim(),
  };
}
