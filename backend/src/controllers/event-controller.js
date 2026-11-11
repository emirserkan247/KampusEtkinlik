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

export const updateEvent = (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }
  const allowed = ["title", "category", "capacity", "date", "time", "location", "description"];
  const body = req.body ?? {};
  const updates = Object.fromEntries(allowed.filter((k) => k in body).map((k) => [k, body[k]]));
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: { message: "No valid fields to update" } });
  }
  for (const k of ["title", "category", "date"]) {
    if (k in updates && !updates[k]) {
      return res.status(400).json({ error: { message: `${k} cannot be empty` } });
    }
  }
  Object.assign(event, updates);
  res.status(200).json(event);
};

export const deleteEvent = (req, res) => {
  const index = events.findIndex((e) => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }
  events.splice(index, 1);
  res.status(204).end();
};