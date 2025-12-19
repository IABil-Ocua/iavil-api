import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import {
  createJobVacancySchema,
  updateJobVacancySchema,
} from "../schemas/job-vacancies.schema";
import z from "zod";

export async function createJobVacancyHandler(
  req: FastifyRequest<{ Body: z.infer<typeof createJobVacancySchema> }>,
  reply: FastifyReply
) {
  try {
    const { companyName, location, title, url } = req.body;

    const JobVacancy = await prisma.jobVacancy.create({
      data: {
        url,
        companyName,
        location,
        title,
      },
    });
    return reply
      .status(201)
      .send({ message: "Vaga de emprego criado com sucesso", JobVacancy });
  } catch (error) {
    console.error("Erro ao criar vaga de emprego:", error);
    return reply
      .status(400)
      .send({ error: "Ocorreu um erro interno no servidor" });
  }
}

export async function getJobVacanciesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const jobVacancies = await prisma.jobVacancy.findMany();

    return reply.status(200).send({ message: "ok", jobVacancies });
  } catch (error) {
    console.error("Erro ao listar vagas de emprego:", error);
    return reply.status(500).send({ error: "Falha ao obter vagas de emprego" });
  }
}

export async function getJobVacancyByIdHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;

    const jobVacancy = await prisma.jobVacancy.findUnique({
      where: { id },
    });

    if (!jobVacancy)
      return reply
        .status(404)
        .send({ message: "Vaga de emprego não encontrada" });

    return reply.status(200).send({ message: "ok", jobVacancy });
  } catch (error) {
    console.error("Erro ao buscar vaga de emprego:", error);
    return reply.status(500).send({ error: "Falha ao buscar vaga de emprego" });
  }
}

export async function updateJobVacancyHandler(
  req: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateJobVacancySchema>;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;
    const { companyName, location, title, url } = req.body;

    const existing = await prisma.jobVacancy.findUnique({ where: { id } });

    if (!existing)
      return reply
        .status(404)
        .send({ error: "Vaga de emprego não encontrado" });

    const JobVacancy = await prisma.jobVacancy.update({
      where: { id },
      data: {
        url,
        companyName,
        location,
        title,
      },
    });
    return reply
      .status(200)
      .send({ message: "Vaga de emprego atualizado com sucesso", JobVacancy });
  } catch (error) {
    console.error("Erro ao actualizar vaga de emprego:", error);
    return reply
      .status(400)
      .send({ error: "Falha ao actualizar vaga de emprego" });
  }
}

export async function deleteJobVacancyHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;
    const existing = await prisma.jobVacancy.findUnique({ where: { id } });

    if (!existing)
      return reply
        .status(404)
        .send({ error: "Vaga de emprego não encontrado" });

    await prisma.jobVacancy.delete({ where: { id } });

    return reply.send({ message: "Vaga de emprego eliminado com sucesso" });
  } catch (error) {
    console.error("Erro ao eliminar vaga de emprego:", error);
    return reply
      .status(500)
      .send({ error: "Falha ao eliminar vaga de emprego" });
  }
}
