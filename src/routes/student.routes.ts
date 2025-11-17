import { FastifyTypedInstance } from "../types/zod";
import { studentSchema } from "../schemas/student.schema";
import {
  deleteStudentHandler,
  fetchStudentsHandler,
  fetchStudentByIdHandler,
  createManyStudentsHandler,
  updateStudentHandler,
  exportExcelHandler,
  createStudentHandler,
} from "../controllers/student.controller";
import z from "zod";

export async function studentRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      //preHandler: app.authenticate,
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
    "/export",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Export all students as Excel file",
        response: {
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    exportExcelHandler
  );

  app.get(
    "/:id",
    {
      //preHandler: app.authenticate,
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

  app.post(
    "/create-many",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Create many students",
        body: z.array(studentSchema),
        response: {
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createManyStudentsHandler
  );

  app.post(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["students"],
        description: "Creat student",
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
      //preHandler: app.authenticate,
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
      //preHandler: app.authenticate,
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
