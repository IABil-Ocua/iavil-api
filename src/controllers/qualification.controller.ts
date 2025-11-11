import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import z from "zod";
import { qualificationSchema } from "../schemas/qualification.schema";

export async function fetchQualificationsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const qualifications = await prisma.qualification.findMany({
      relationLoadStrategy: "query",
      include: {
        modules: true,
        students: true,
      },
    });

    return reply.status(200).send({ message: "ok", qualifications });
  } catch (error) {
    console.log("Error fetching qualifications", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function fetchQualificationHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: string };

    if (!id) {
      return reply
        .status(400)
        .send({ message: "Qualification ID not provided" });
    }

    const qualification = await prisma.qualification.findUnique({
      relationLoadStrategy: "query",
      include: {
        modules: true,
        students: true,
      },
      where: {
        id: id,
      },
    });

    if (!qualification) {
      return reply.status(404).send({ message: "Qualification not found" });
    }

    return reply.status(200).send({ message: "ok", qualification });
  } catch (error) {
    console.log("Error fetching qualification", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function createQualificationHandler(
  request: FastifyRequest<{ Body: z.infer<typeof qualificationSchema> }>,
  reply: FastifyReply
) {
  try {
    const {
      duration,
      workload,
      pdfUrl,
      noticeUrl,
      knowledgeAreas,
      name,
      bannerUrl,
      description,
    } = request.body;

    const qualification = await prisma.qualification.create({
      data: {
        duration,
        workload,
        pdfUrl,
        noticeUrl,
        knowledgeAreas,
        name,
        bannerUrl,
        description,
      },
    });

    return reply
      .status(201)
      .send({ message: "Qualification created successfully", qualification });
  } catch (error) {
    console.log("Error fetching qualification", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function updateQualificationHandler(
  request: FastifyRequest<{ Body: z.infer<typeof qualificationSchema> }>,
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

    const {
      duration,
      workload,
      pdfUrl,
      noticeUrl,
      knowledgeAreas,
      name,
      bannerUrl,
      description,
    } = request.body;

    const qualification = await prisma.qualification.update({
      data: {
        duration,
        workload,
        pdfUrl,
        noticeUrl,
        knowledgeAreas,
        name,
        bannerUrl,
        description,
      },
      where: {
        id: id,
      },
    });

    return reply
      .status(200)
      .send({ message: "Qualification updated successfully", qualification });
  } catch (error) {
    console.log("Error updating qualification", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function deleteQualificationHandler(
  request: FastifyRequest<{ Body: z.infer<typeof qualificationSchema> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params as { id: string };

    if (!id) {
      return reply
        .status(400)
        .send({ message: "qualification ID not provided" });
    }

    const existingqualification = await prisma.qualification.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingqualification) {
      return reply.status(404).send({ message: "qualification not found" });
    }

    await prisma.qualification.delete({
      where: {
        id: id,
      },
    });

    return reply
      .status(200)
      .send({ message: "qualification deleted successfully" });
  } catch (error) {
    console.log("Error deleting qualification", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}
