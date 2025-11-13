import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import { createEventSchema, updateEventSchema } from "../schemas/event.schema";
import z from "zod";

export async function createEventHandler(
  req: FastifyRequest<{ Body: z.infer<typeof createEventSchema> }>,
  reply: FastifyReply
) {
  try {
    const {
      createdById,
      isPublished,
      startDate,
      title,
      type,
      description,
      endDate,
      imageUrl,
      location,
      organizer,
    } = req.body;

    console.log(req.body);

    const event = await prisma.event.create({
      data: {
        createdById,
        isPublished,
        startDate: new Date(startDate),
        title,
        type,
        description,
        endDate: endDate ? new Date(endDate) : null,
        imageUrl,
        location,
        organizer,
      },
    });
    return reply
      .status(201)
      .send({ message: "Evento criado com sucesso", event });
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    return reply
      .status(400)
      .send({ error: "Ocorreu um erro interno no servidor" });
  }
}

export async function getEventsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const events = await prisma.event.findMany({
      relationLoadStrategy: "query",
      orderBy: { startDate: "desc" },
      include: { createdBy: { select: { id: true, name: true, email: true } } },
    });

    return reply.status(200).send({ message: "ok", events });
  } catch (error) {
    console.error("Erro ao listar eventos:", error);
    return reply.status(500).send({ error: "Falha ao obter eventos" });
  }
}

export async function getEventByIdHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: { createdBy: { select: { id: true, name: true, email: true } } },
    });

    if (!event)
      return reply.status(404).send({ message: "Evento não encontrado" });

    return reply.status(200).send({ message: "ok", event });
  } catch (error) {
    console.error("Erro ao buscar evento:", error);
    return reply.status(500).send({ error: "Falha ao buscar evento" });
  }
}

export async function updateEventHandler(
  req: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateEventSchema>;
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;
    const {
      createdById,
      isPublished,
      startDate,
      title,
      type,
      description,
      endDate,
      imageUrl,
      location,
      organizer,
    } = req.body;

    const existing = await prisma.event.findUnique({ where: { id } });

    if (!existing)
      return reply.status(404).send({ error: "Evento não encontrado" });

    const event = await prisma.event.update({
      where: { id },
      data: {
        createdById,
        isPublished,
        startDate,
        title,
        type,
        description,
        endDate,
        imageUrl,
        location,
        organizer,
      },
    });
    return reply
      .status(200)
      .send({ message: "Evento atualizado com sucesso", event });
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    return reply.status(400).send({ error: "Falha ao atualizar evento" });
  }
}

export async function deleteEventHandler(
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = req.params;
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing)
      return reply.status(404).send({ error: "Evento não encontrado" });

    await prisma.event.delete({ where: { id } });
    return reply.send({ message: "Evento eliminado com sucesso" });
  } catch (error) {
    console.error("Erro ao eliminar evento:", error);
    return reply.status(500).send({ error: "Falha ao eliminar evento" });
  }
}
