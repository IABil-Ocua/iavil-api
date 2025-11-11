import z from "zod";
import {
  createQualificationHandler,
  deleteQualificationHandler,
  fetchQualificationHandler,
  fetchQualificationsHandler,
  updateQualificationHandler,
} from "../controllers/qualification.controller";
import { FastifyTypedInstance } from "../types/zod";
import { qualificationSchema } from "../schemas/qualification.schema";

export async function QualificationRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["Qualifications"],
        description: "Fetch all Qualifications",
        response: {
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchQualificationsHandler
  );

  app.get(
    "/:id",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["Qualifications"],
        description: "Fetch Qualification by ID",
        response: {
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchQualificationHandler
  );

  app.post(
    "/",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Qualifications"],
        description: "Create Qualification",
        body: qualificationSchema,
        response: {
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createQualificationHandler
  );

  app.put(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Qualifications"],
        description: "Update Qualification",
        body: qualificationSchema.partial(),
        response: {
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    updateQualificationHandler
  );

  app.delete(
    "/:id",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["Qualifications"],
        description: "Delete Qualification",
        response: {
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    deleteQualificationHandler
  );
}
