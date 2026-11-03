import { createContext, useContext, useState, type ReactNode } from "react";
import type { CampusEvent, CampusEventInput } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (input: CampusEventInput) => void;
  updateEvent: (id: string, input: CampusEventInput) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(input: CampusEventInput) {
    const created: CampusEvent = { ...input, id: crypto.randomUUID() };
    setEvents((prev) => [...prev, created]);
  }

  function updateEvent(id: string, input: CampusEventInput) {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...input, id } : e)),
    );
  }

  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEvents(): EventsContextValue {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
