import {
  createScholarshipHandler,
  deleteScholarshipHandler,
  getScholarshipByIdHandler,
  getScholarshipsHandler,
  updateScholarshipHandler,
} from "../controllers/scholarship.controller";
import { FastifyTypedInstance } from "../types/zod";

export async function scholarshipRoutes(app: FastifyTypedInstance) {
  app.post("/", createScholarshipHandler);
  app.get("/", getScholarshipsHandler);
  app.get("/:id", getScholarshipByIdHandler);
  app.put("/:id", updateScholarshipHandler);
  app.delete("/:id", deleteScholarshipHandler);
}
