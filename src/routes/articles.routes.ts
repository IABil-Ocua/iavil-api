import {
  createArticleHandler,
  getArticlesHandler,
  getRecentArticlesHandler,
  getArticleByIdHandler,
  updateArticleHandler,
  deleteArticleHandler,
} from "../controllers/article.controller";
import { FastifyTypedInstance } from "../types/zod";

export async function articleRoutes(app: FastifyTypedInstance) {
  app.post("/", createArticleHandler);
  app.get("/", getArticlesHandler);
  app.get("/recent", getRecentArticlesHandler);
  app.get("/:id", getArticleByIdHandler);
  app.put("/:id", updateArticleHandler);
  app.delete("/:id", deleteArticleHandler);
}
