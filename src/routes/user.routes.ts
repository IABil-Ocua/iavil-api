import { FastifyTypedInstance } from "../types/zod";
import {
  fetchAuthenticatedUserHandler,
  listUsersHandler,
  registerUserHandler,
} from "../controllers/user.controller";
import z from "zod";

export async function userRoutes(app: FastifyTypedInstance) {
  app.get(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Fetch all users",
        response: {
          200: z
            .object({
              message: z.string(),
              users: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  role: z.string(),
                  avatar: z.string().nullable(),
                  createdAt: z.coerce.date(),
                  updatedAt: z.coerce.date(),
                })
              ),
            })
            .describe("Users fetched successfully"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    listUsersHandler
  );

  app.post(
    "/",
    {
      //preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Create a new user",
      },
    },
    registerUserHandler
  );

  app.get(
    "/me",
    {
      preHandler: app.authenticate,
      schema: {
        tags: ["users"],
        description: "Fetch authenticated user",
        response: {
          404: z.object({ message: z.string() }).describe("User not found"),
          500: z
            .object({ message: z.string() })
            .describe("Internal server error"),
        },
      },
    },
    fetchAuthenticatedUserHandler
  );
}
