import { z } from "zod";

export const eventTypeEnum = z.enum(["TRAINING", "SEMINAR", "CONFERENCE"]);

export const createEventSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres.")
    .max(255, "O título é demasiado longo."),
  description: z
    .string()
    .max(2000, "A descrição é demasiado longa.")
    .optional()
    .nullable(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional().nullable(),
  location: z.string().optional().nullable(),
  type: eventTypeEnum,
  imageUrl: z.string().url("URL inválido").optional().nullable(),
  organizer: z.string().optional().nullable(),
  isPublished: z.boolean().optional().default(false),
  createdById: z.string().min(1, "O ID do criador é obrigatório."),
});

export const updateEventSchema = createEventSchema.partial();
