import { FastifyTypedInstance } from "../types/zod";
import { studentSchema } from "../schemas/student.schema";
import {
  deleteStudentHandler,
  fetchStudentsHandler,
  fetchStudentByIdHandler,
  createStudentHandler,
  updateStudentHandler,
  fetchStudentsByCourseHandler,
} from "../controllers/student.controller";
import z from "zod";

const courseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(), // null no banco
  bannerUrl: z.string().nullable(), // null no banco
  year: z.number(),
  modulesNumber: z.number(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  createdById: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export async function studentRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Fetch all students",
        response: {
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchStudentsHandler
  );

  app.get(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Fetch student by ID",
        response: {
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchStudentByIdHandler
  );

  app.get(
    "/course/:courseId",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Fetch students by course",
        response: {
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchStudentsByCourseHandler
  );

  app.post(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Create a new students",
        body: studentSchema,
        response: {
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createStudentHandler
  );

  app.delete(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Delete a student",
        response: {
          200: z
            .object({ message: z.string() })
            .describe("Student deleted successfully"),
          404: z.object({ message: z.string() }).describe("students not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    deleteStudentHandler
  );

  app.put(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Update a students by ID",
        body: studentSchema.partial(),
        response: {
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("students not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    updateStudentHandler
  );
}
