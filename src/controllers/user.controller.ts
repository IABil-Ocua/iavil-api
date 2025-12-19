import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { compare, hash } from "bcrypt";
import { Resend } from "resend";

import { createUserSchema, loginSchema } from "../schemas/user.schema";
import { prisma } from "../lib/db";
import { UserRegistrationTemplate } from "../email/user-registration";
import { passwordGenerator } from "../lib/password-generator";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function loginHandler(
  request: FastifyRequest<{ Body: z.infer<typeof loginSchema> }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }

    const passwordMatch = user.password
      ? await compare(password, user.password)
      : false;

    if (!passwordMatch) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }

    const token = await reply.jwtSign(
      { id: user.id, email: user.email, role: user.role },
      { expiresIn: "1d" }
    );

    return reply.status(200).send({ message: "ok", token, user });
  } catch (error) {
    console.error("Error during login:", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}

export async function listUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await prisma.user.findMany();

    const safeUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    return reply.status(200).send({ message: "ok", users: safeUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}

export async function registerUserHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createUserSchema> }>,
  reply: FastifyReply
) {
  try {
    const { email, name, role, birthDate, username, avatar, cover } =
      request.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return reply
        .status(400)
        .send({ message: "Já existe um usuário cadastrado com o mesmo email" });
    }

    const password = passwordGenerator({
      passwordLength: 8,
      useLowerCase: true,
      useNumbers: true,
      useSymbols: false,
      useUpperCase: true,
    });

    const hashedPassword = await hash("Iabil2025", 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: role,
        username,
        avatar,
        birthDate,
        cover,
      },
    });

    const { data: emailData, error } = await resend.emails.send({
      from: "IAbil <plataforna@iabil.co.mz>",
      to: [email],
      subject: "Cofirmação de Registro na Plataforma | IABIl",
      react: UserRegistrationTemplate({
        name: name,
        email: email,
        password: password,
        platformName: "IABil",
        loginUrl: "https://iabil.co.mz/login",
        role: role,
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Error sending email:", error);
      return reply
        .status(500)
        .send({ error: "Error sending confirmation email" });
    }

    return reply.status(201).send({
      message: "Usuário criado com sucesso",
      user,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}

export async function fetchAuthenticatedUserHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const userId = request.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return reply.status(404).send({ message: "User not found" });
    }

    return reply.status(200).send({
      message: "ok",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}
