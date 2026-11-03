
import type { ScoreEvent } from "./score";

function validateEvent(event: ScoreEvent): void {
  if (!event.id.trim()) {
    throw new Error("Event ID is required");
  }

  if (
    !Number.isFinite(event.duration) ||
    event.duration <= 0
  ) {
    throw new RangeError("Invalid duration");
  }

  if (event.type === "note") {
    if (![1, 2, 3].includes(event.string)) {
      throw new RangeError("Invalid string number");
    }

    if (
      !Number.isInteger(event.position) ||
      event.position < 0
    ) {
      throw new RangeError("Invalid position");
    }
  }
}

function validateIndex(
  index: number,
  length: number,
  allowEnd = false
): void {
  const maximum = allowEnd ? length : length - 1;

  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index > maximum
  ) {
    throw new RangeError("Invalid event index");
  }
}

export function insertEvent(
  events: ScoreEvent[],
  index: number,
  event: ScoreEvent
): ScoreEvent[] {
  validateIndex(index, events.length, true);
  validateEvent(event);

  if (events.some((item) => item.id === event.id)) {
    throw new Error("Duplicate event ID");
  }

  return [
    ...events.slice(0, index),
    { ...event },
    ...events.slice(index),
  ];
}

export function appendEvent(
  events: ScoreEvent[],
  event: ScoreEvent
): ScoreEvent[] {
  return insertEvent(events, events.length, event);
}

export function updateEvent(
  events: ScoreEvent[],
  id: string,
  updated: ScoreEvent
): ScoreEvent[] {
  const index = events.findIndex(
    (event) => event.id === id
  );

  if (index === -1) {
    throw new Error("Event not found");
  }

  validateEvent(updated);

  if (
    updated.id !== id &&
    events.some((event) => event.id === updated.id)
  ) {
    throw new Error("Duplicate event ID");
  }

  return events.map((event) =>
    event.id === id ? { ...updated } : event
  );
}

export function removeEvent(
  events: ScoreEvent[],
  id: string
): ScoreEvent[] {
  if (!events.some((event) => event.id === id)) {
    throw new Error("Event not found");
  }

  return events.filter((event) => event.id !== id);
}
