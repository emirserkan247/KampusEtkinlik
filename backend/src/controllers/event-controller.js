import { events } from "../data/events.js";

export const getEvents = (req, res) => {
  res.status(200).json(events);
};

export const getEventById = (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }
  res.status(200).json(event);
};

export const createEvent = (req, res) => {
  const { title, category, date, capacity, time, location, description } = req.body ?? {};
  if (!title || !category || !date) {
    return res
      .status(400)
      .json({ error: { message: "title, category and date are required" } });
  }
  const newEvent = {
    id: `event-${Date.now()}`,
    title,
    category,
    capacity,
    date,
    time,
    location,
    description,
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
};
