import z from "zod";
import { FastifyTypedInstance } from "../types/zod";
import {
  createLevelHandler,
  deleteLevelHandler,
  fetchLevelHandler,
  fetchLevelsHandler,
  updateLevelHandler,
} from "../controllers/qualification-level.controller";

export async function qualificationLevelRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["Levels"],
        description: "Fetch all QLevels",
        response: {
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchLevelsHandler
  );

  app.get(
    "/:id",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["Levels"],
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
    fetchLevelHandler
  );

  app.post(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["Levels"],
        description: "Create Qualification",
        response: {
          400: z.object({ message: z.string() }).describe("Bad request"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    createLevelHandler
  );

  app.put(
    "/:id",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["Levels"],
        description: "Update Qualification",
        response: {
          400: z.object({ message: z.string() }).describe("Bad request"),
          404: z.object({ message: z.string() }).describe("Not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    updateLevelHandler
  );

  app.delete(
    "/:id",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["Levels"],
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
    deleteLevelHandler
  );
}
