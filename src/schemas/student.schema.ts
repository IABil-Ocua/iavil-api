import { z } from "zod";

export const studentSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1, "O código é obrigatório"),
  name: z.string().min(1, "O nome é obrigatório"),
  gender: z.string().min(1, "O género é obrigatório"),
  scholarship: z.string().min(1, "O campo bolsa é obrigatório"),
  financier: z.string().optional().nullable(),
  qualification: z.string().min(1, "A qualificação é obrigatória"),
  specialty: z.string().optional().nullable(),

  birthProvince: z.string().optional().nullable(),
  birthDate: z.coerce.date().optional().nullable(),
  idNumber: z.coerce.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phone1: z.coerce.string().optional().nullable(),
  phone2: z.coerce.string().optional().nullable(),
  fatherAffiliation: z.string().optional().nullable(),
  motherAffiliation: z.string().optional().nullable(),
  guardianName: z.string().optional().nullable(),
  guardianAddress: z.string().optional().nullable(),
  guardianPhone: z.coerce.string().optional().nullable(),
  status: z.string().optional().nullable(),
  actualProvince: z.string().optional().nullable(),
  actualDistrict: z.string().optional().nullable(),
  currentOccupation: z.string().optional().nullable(),
  companyName: z.string().optional().nullable(),
  companyPhone: z.coerce.string().optional().nullable(),
  position: z.string().optional().nullable(),
  startYear: z.coerce.string().optional().nullable(),

  // Formação 1
  residencyRegime1: z.string().optional().nullable(),
  year1: z.coerce.string().optional().nullable(),
  level1: z.string().optional().nullable(),
  completionYear1: z.coerce.string().optional().nullable(),
  observation1: z.string().optional().nullable(),

  // Formação 2
  residencyRegime2: z.string().optional().nullable(),
  year2: z.coerce.string().optional().nullable(),
  level2: z.string().optional().nullable(),
  completionYear2: z.coerce.string().optional().nullable(),
  observation2: z.string().optional().nullable(),

  // Formação 3
  residencyRegime3: z.string().optional().nullable(),
  year3: z.coerce.string().optional().nullable(),
  level3: z.string().optional().nullable(),
  completionYear3: z.coerce.string().optional().nullable(),
  observation3: z.string().optional().nullable(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const createStudentSchema = studentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateStudentSchema = studentSchema.partial();

export type StudentSchema = z.infer<typeof studentSchema>;
