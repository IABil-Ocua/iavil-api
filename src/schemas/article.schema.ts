import { z } from "zod";

export const ArticleStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const createArticleSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
  slug: z.string().min(3, "Slug inválido."),
  excerpt: z.string().optional(),
  content: z.string().min(10, "O conteúdo é obrigatório."),
  imageUrl: z.string().url().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  status: ArticleStatusEnum.default("DRAFT"),
  isFeatured: z.boolean().default(false),
  authorId: z.string(),
  publishedAt: z.string().datetime().optional(),
});

export const updateArticleSchema = createArticleSchema.partial();
