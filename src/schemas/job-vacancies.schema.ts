import z from "zod";

/**export const createJobVacancySchema = z.object({
  title: z.string().min(3, "O título é obrigatório"),
  area: z.string().min(2, "A área é obrigatória"),
  description: z.string().min(10, "A descrição deve ter no mínimo 10 caracteres"),
  requirements: z.string().min(5, "Os requisitos são obrigatórios"),
  imageFile: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "A imagem deve ter no máximo 5MB",
    })
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "image/webp"].includes(file.type),
      { message: "Apenas PNG, JPEG ou WEBP são permitidos" }
    )
    .optional(),
}); */

export const createJobVacancySchema = z.object({
  title: z.string().min(3, "O título é obrigatório"),
  area: z.string().min(2, "A área é obrigatória"),
  description: z
    .string()
    .min(10, "A descrição deve ter no mínimo 10 caracteres"),
  requirements: z.string().min(5, "Os requisitos são obrigatórios"),
  imageUrl: z.string().optional(),
  publishedAt: z.coerce.date(),
});

export const updateJobVacancySchema = createJobVacancySchema.partial();
