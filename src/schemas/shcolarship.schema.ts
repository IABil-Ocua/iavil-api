import { z } from "zod";

export const scholarshipSchema = z.object({
  id: z.string().optional(), // gerado automaticamente no backend
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  sponsor: z.string().optional(),
  amount: z.number().optional(), // pode ignorar caso não tenha valor
  type: z.string().min(1, "Tipo é obrigatório"),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "CLOSED"]),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
