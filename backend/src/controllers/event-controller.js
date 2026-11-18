import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

const notFound = (res) =>
  res.status(404).json({ error: { message: "Event not found" } });

const handleError = (err, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: { message: err.message } });
  }
  return next(err);
};

export const getEvents = async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      return notFound(res);
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body ?? {});
    res.status(201).json(event);
  } catch (err) {
    handleError(err, res, next);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }
    const event = await Event.findByIdAndUpdate(req.params.id, req.body ?? {}, {
      new: true,
      runValidators: true,
    });
    if (!event) {
      return notFound(res);
    }
    res.json(event);
  } catch (err) {
    handleError(err, res, next);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return notFound(res);
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};