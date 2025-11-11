import { FastifyTypedInstance } from "../types/zod";
import { loginHandler } from "../controllers/user.controller";

export async function authRoutes(app: FastifyTypedInstance) {
  app.post("/login", loginHandler);
}
