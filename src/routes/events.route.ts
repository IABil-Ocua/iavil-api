import {
  createEventHandler,
  getEventsHandler,
  getEventByIdHandler,
  updateEventHandler,
  deleteEventHandler,
} from "../controllers/events.controller";
import { FastifyTypedInstance } from "../types/zod";

export async function eventRoutes(app: FastifyTypedInstance) {
  app.post("/", createEventHandler);
  app.get("/", getEventsHandler);
  app.get("/:id", getEventByIdHandler);
  app.put("/:id", updateEventHandler);
  app.delete("/:id", deleteEventHandler);
}
