import { z } from "zod";

export const qualificationLevelSchema = z.object({
  title: z.string(),
  description: z.string(),
  noticeUrl: z.string(),
  qualificationId: z.string(),
});
