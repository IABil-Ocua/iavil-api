import { z } from "zod";

export const qualificationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  bannerUrl: z.string().url().optional(),
  workload: z.number().int().positive(),
  credits: z.number().int().positive(),
  knowledgeAreas: z.string().optional(),
});
