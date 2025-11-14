import {
  createJobVacancyHandler,
  deleteJobVacancyHandler,
  getJobVacanciesHandler,
  getJobVacancyByIdHandler,
  updateJobVacancyHandler,
} from "../controllers/job-vacancy.controller";
import { FastifyTypedInstance } from "../types/zod";

export async function jobVacanciesRoutes(app: FastifyTypedInstance) {
  app.post("/", createJobVacancyHandler);
  app.get("/", getJobVacanciesHandler);
  app.get("/:id", getJobVacancyByIdHandler);
  app.put("/:id", updateJobVacancyHandler);
  app.delete("/:id", deleteJobVacancyHandler);
}
