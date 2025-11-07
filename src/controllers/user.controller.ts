import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { compare, hash } from "bcrypt";
import { Resend } from "resend";

import { createUserSchema, loginSchema } from "../schemas/user.schema";
import { prisma } from "../lib/db";
import { UserRegistrationTemplate } from "../email/user-registration";

const resend = new Resend("re_mAKjqos4_KGKZnC6SUBV46FJRJb57FtdQ");

export async function loginHandler(
  request: FastifyRequest<{ Body: z.infer<typeof loginSchema> }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await compare(password, user.password))) {
      return reply.status(401).send({ message: "Invalid credentials" });
    }

    const token = await reply.jwtSign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: "1d",
      }
    );

    return reply.status(200).send({ message: "ok", token, user });
  } catch (error) {
    console.error("Error during login:", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}

export async function registerUserHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createUserSchema> }>,
  reply: FastifyReply
) {
  try {
    const { email, name, password, role, birthDate, username, avatar, cover } =
      request.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return reply.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await hash(password, 10);

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
      from: "IAbil <dev@binario.co.mz>",
      to: [email],
      subject: "Cofirmação de Registro na Plataforma | IABIl",
      react: UserRegistrationTemplate({
        name: name,
        email: email,
        password: password,
        platformName: "IABil",
        loginUrl: "",
        role: role,
      }) as React.ReactElement,
    });

    /** 
 * 
 *     if (error) {
      console.error("Error sending email:", error);
      return reply
        .status(500)
        .send({ error: "Error sending confirmation email" });
    }
*/

    return reply.status(201).send({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatar,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return reply.status(500).send({ message: "Internal Server Error", error });
  }
}
