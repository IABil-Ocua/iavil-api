import z from "zod";

export const studentSchema = z.object({
  name: z.string(),
  email: z.string(),
  avatar: z.string().url().optional(),
  phoneNumber: z.string(),
  phoneNumber2: z.string().optional(),
  specialty: z.string().optional(),
  graduationYear: z.string().optional(),
  birthDate: z.string().optional(),
  bio: z.string().optional(),
  gender: z.string().optional(),
  code: z.string(),
  financier: z.string().optional(),
  qualificationId: z.string(),
});
