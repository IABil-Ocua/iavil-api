import { FastifyTypedInstance } from "../types/zod";
import { loginHandler } from "../controllers/user.controller";
import z from "zod";

export async function authRoutes(app: FastifyTypedInstance) {
  app.post(
    "/login",
    {
      schema: {
        tags: ["users"],
        description: "User login",
      },
    },
    loginHandler
  );
}
