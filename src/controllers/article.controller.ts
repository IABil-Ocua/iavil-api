import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/db";
import {
  createArticleSchema,
  updateArticleSchema,
} from "../schemas/article.schema";
import z from "zod";

export const createArticleHandler = async (
  request: FastifyRequest<{ Body: z.infer<typeof createArticleSchema> }>,
  reply: FastifyReply
) => {
  try {
    const {
      authorId,
      content,
      isFeatured,
      slug,
      status,
      title,
      category,
      excerpt,
      imageUrl,
      publishedAt,
      tags,
    } = request.body;

    const article = await prisma.article.create({
      data: {
        authorId,
        content,
        isFeatured,
        slug,
        status,
        title,
        category,
        excerpt,
        imageUrl,
        publishedAt,
        tags,
      },
    });

    return reply
      .status(201)
      .send({ message: "Artigo criado com sucesso.", article });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao criar o artigo." });
  }
};

export const getArticlesHandler = async (
  rquest: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const articles = await prisma.article.findMany({
      relationLoadStrategy: "query",
      orderBy: { createdAt: "desc" },
      include: { author: { select: { id: true, name: true, email: true } } },
    });

    return reply.status(200).send({ message: "ok", articles });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao buscar artigos." });
  }
};

export const getRecentArticlesHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const articles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
    return reply.status(200).send({ message: "ok", articles });
  } catch (error) {
    console.error(error);
    return reply
      .status(500)
      .send({ message: "Erro ao buscar artigos recentes." });
  }
};

export const getArticleByIdHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const article = await prisma.article.findUnique({
      relationLoadStrategy: "query",
      where: { id },
      include: { author: true },
    });

    if (!article)
      return reply.status(404).send({ message: "Artigo não encontrado." });

    return reply.status(200).send({ message: "ok", article });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao buscar o artigo." });
  }
};

// ✅ Atualizar artigo
export const updateArticleHandler = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: z.infer<typeof updateArticleSchema>;
  }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const {
      authorId,
      content,
      isFeatured,
      slug,
      status,
      title,
      category,
      excerpt,
      imageUrl,
      publishedAt,
      tags,
    } = request.body;

    const updated = await prisma.article.update({
      where: { id },
      data: {
        authorId,
        content,
        isFeatured,
        slug,
        status,
        title,
        category,
        excerpt,
        imageUrl,
        publishedAt,
        tags,
      },
    });

    return reply
      .status(200)
      .send({ message: "Artigo atualizado com sucesso.", updated });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao atualizar o artigo." });
  }
};

export const deleteArticleHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    await prisma.article.delete({ where: { id } });

    return reply.send({ message: "Artigo eliminado com sucesso." });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Erro ao eliminar o artigo." });
  }
};
