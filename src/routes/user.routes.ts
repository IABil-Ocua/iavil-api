import { FastifyTypedInstance } from "../types/zod";
import { registerUserHandler } from "../controllers/user.controller";

export async function userRoutes(app: FastifyTypedInstance) {
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
}
