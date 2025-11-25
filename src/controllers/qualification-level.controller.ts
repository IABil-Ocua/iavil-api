import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import z from "zod";
import { qualificationSchema } from "../schemas/qualification.schema";
import { qualificationLevelSchema } from "../schemas/qualification-level.schema";

export async function fetchLevelsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const levels = await prisma.qualificationLevel.findMany({
      relationLoadStrategy: "query",
      include: {
        qualification: true,
      },
    });

    return reply.status(200).send({ message: "ok", levels });
  } catch (error) {
    console.log("Error fetching levels", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function fetchLevelHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: string };

    if (!id) {
      return reply
        .status(400)
        .send({ message: "Qualification level ID not provided" });
    }

    const level = await prisma.qualificationLevel.findUnique({
      relationLoadStrategy: "query",
      include: {
        qualification: true,
      },
      where: {
        id: id,
      },
    });

    if (!level) {
      return reply.status(404).send({ message: "Level not found" });
    }

    return reply.status(200).send({ message: "ok", level });
  } catch (error) {
    console.log("Error fetching level", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function createLevelHandler(
  request: FastifyRequest<{ Body: z.infer<typeof qualificationLevelSchema> }>,
  reply: FastifyReply
) {
  try {
    const { noticeUrl, qualificationId, title, description } = request.body;

    const level = await prisma.qualificationLevel.create({
      data: {
        noticeUrl,
        qualificationId,
        title,
        description,
      },
    });

    return reply
      .status(201)
      .send({ message: "Level created successfully", level });
  } catch (error) {
    console.log("Error fetching qualification", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function updateLevelHandler(
  request: FastifyRequest<{ Body: z.infer<typeof qualificationLevelSchema> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: string };

    if (!id) {
      return reply
        .status(400)
        .send({ message: "Qualification ID not provided" });
    }

    const existingQualification = await prisma.qualification.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingQualification) {
      return reply.status(404).send({ message: "Qualification not found" });
    }

    const { noticeUrl, qualificationId, title, description } = request.body;

    const level = await prisma.qualificationLevel.update({
      data: {
        noticeUrl,
        qualificationId,
        title,
        description,
      },
      where: {
        id: id,
      },
    });

    return reply
      .status(200)
      .send({ message: "Level updated successfully", level });
  } catch (error) {
    console.log("Error updating level", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function deleteLevelHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: string };

    if (!id) {
      return reply.status(400).send({ message: "Level ID not provided" });
    }

    const existingLevel = await prisma.qualificationLevel.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingLevel) {
      return reply.status(404).send({ message: "Level not found" });
    }

    await prisma.qualificationLevel.delete({
      where: {
        id: id,
      },
    });

    return reply.status(200).send({ message: "Level deleted successfully" });
  } catch (error) {
    console.log("Error deleting level", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}
