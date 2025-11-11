import { z } from "zod";

export const qualificationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  bannerUrl: z.string().url().optional(),
  workload: z.number().int().positive(),
  duration: z.number().int().positive(),
  pdfUrl: z.string().url().optional(),
  noticeUrl: z.string().url().optional(),
  knowledgeAreas: z.string().optional(),
});
