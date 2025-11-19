import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { scholarshipSchema } from "../schemas/shcolarship.schema";
import { prisma } from "../lib/db";

export async function createScholarshipHandler(
  request: FastifyRequest<{ Body: z.infer<typeof scholarshipSchema> }>,
  reply: FastifyReply
) {
  try {
    const {
      name,
      status,
      type,
      amount,
      description,
      endDate,
      sponsor,
      startDate,
    } = request.body;

    const scholarship = await prisma.scholarship.create({
      data: {
        name,
        status,
        type,
        amount,
        description,
        endDate,
        sponsor,
        startDate,
      },
    });

    return reply.code(201).send({
      message: "Bolsa criada com sucesso!",
      scholarship,
    });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Erro ao criar bolsa" });
  }
}

export async function getScholarshipsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const scholarships = await prisma.scholarship.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return reply.status(200).send({ message: "ok", scholarships });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Erro ao buscar bolsas" });
  }
}

export async function getScholarshipByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  try {
    const scholarships = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!scholarships) {
      return reply.status(404).send({ message: "Bolsa não encontrada" });
    }

    return reply.status(200).send({ message: "ok", scholarships });
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ message: "Erro ao buscar bolsa" });
  }
}

export async function updateScholarshipHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof scholarshipSchema>;
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const {
    name,
    status,
    type,
    amount,
    description,
    endDate,
    sponsor,
    startDate,
  } = request.body;

  try {
    const existingScholarship = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!existingScholarship) {
      return reply.status(404).send({ message: "Bolsa não encontrada" });
    }

    const scholarship = await prisma.scholarship.update({
      data: {
        name,
        status,
        type,
        amount,
        description,
        endDate,
        sponsor,
        startDate,
      },
      where: {
        id,
      },
    });

    return reply
      .status(200)
      .send({ message: "Bolsa actualizada com sucesso", scholarship });
  } catch (error) {
    console.log(error);
    return reply.code(500).send({ message: "Erro ao atualizar bolsa" });
  }
}

export async function deleteScholarshipHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    const existingScholarship = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!existingScholarship) {
      return reply.status(404).send({ message: "Bolsa não encontrada" });
    }

    await prisma.scholarship.delete({
      where: {
        id,
      },
    });

    return reply.status(200).send({ message: "Bolsa eliminada com sucesso" });
  } catch (error) {
    return reply.code(500).send({ message: "Erro ao remover bolsa" });
  }
}
