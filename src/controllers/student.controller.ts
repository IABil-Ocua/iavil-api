import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { hash } from "bcrypt";
import { Resend } from "resend";

import { prisma } from "../lib/db";
import { studentSchema } from "../schemas/student.schema";
import { passwordGenerator } from "../lib/password-generator";
//import { UserRegistrationTemplate } from "../emails/user-registration";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createStudentHandler(
  request: FastifyRequest<{ Body: z.infer<typeof studentSchema> }>,
  reply: FastifyReply
) {
  try {
    const {
      birthDate,
      email,
      gender,
      name,
      code,
      avatar,
      bio,
      financier,
      graduationYear,
      phoneNumber2,
      phoneNumber,
      specialty,
      qualificationId,
    } = request.body;

    const password = passwordGenerator({
      passwordLength: 10,
      useLowerCase: true,
      useNumbers: true,
      useSymbols: false,
      useUpperCase: true,
    });
    const hashedPassword = await hash(password, 10);

    const student = await prisma.$transaction(
      async (tx) => {
        const student = await tx.student.create({
          data: {
            qualificationId,
            birthDate,
            email,
            gender,
            name,
            code,
            avatar,
            bio,
            financier,
            graduationYear,
            phoneNumber2,
            phoneNumber,
            specialty,
          },
        });

        await tx.user.create({
          data: {
            username: email,
            avatar,
            name,
            email,
            password: hashedPassword,
            role: "STUDENT",
          },
        });

        return student;
      },
      { timeout: 40000 }
    );

    /*
    const { data: emailData, error } = await resend.emails.send({
      from: "Run Code School <comercial@binario.co.mz>",
      to: [email],
      subject: "Cofirmação de Registro na Plataforma | Run Code School",
      react: UserRegistrationTemplate({
        name: name,
        email: email,
        password: password,
        role: "STUDENT",
      }) as React.ReactElement,
    });

    if (error) {
      console.error("Error sending email:", error);
      return reply
        .status(500)
        .send({ error: "Error sending confirmation email" });
    }
    */

    return reply.status(201).send({
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function fetchStudentsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const students = await prisma.student.findMany({
      relationLoadStrategy: "query",
      include: {
        qualification: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return reply.status(200).send({ message: "ok", students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function fetchStudentByIdHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "Student ID not provided" });
    }

    const student = await prisma.student.findUnique({
      relationLoadStrategy: "query",
      include: {
        qualification: true,
      },
      where: {
        id,
      },
    });

    if (!student) {
      return reply.status(404).send({ message: "Student not found." });
    }

    return reply.status(200).send({ message: "ok", student });
  } catch (error) {
    console.error("Error fetching students:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function fetchStudentsByCourseHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { qualificationId } = request.params as { qualificationId: string };

    const students = await prisma.student.findMany({
      relationLoadStrategy: "query",
      include: {
        qualification: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      where: {
        qualificationId,
      },
    });

    return reply.status(200).send({ message: "ok", students });
  } catch (error) {
    console.log("Error fetching students:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function updateStudentHandler(
  request: FastifyRequest<{
    Body: z.infer<typeof studentSchema>;
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "Student ID not provided" });
    }

    const existingStudent = await prisma.student.findUnique({
      where: { id },
    });

    if (!existingStudent) {
      return reply.status(404).send({ message: "Student not found." });
    }

    const {
      birthDate,
      email,
      gender,
      name,
      code,
      avatar,
      bio,
      financier,
      graduationYear,
      phoneNumber2,
      phoneNumber,
      specialty,
      qualificationId,
    } = request.body;

    const student = await prisma.$transaction(
      async (tx) => {
        const student = await tx.student.update({
          where: { id },
          data: {
            birthDate,
            email,
            gender,
            name,
            code,
            avatar,
            bio,
            financier,
            graduationYear,
            phoneNumber2,
            phoneNumber,
            specialty,
            qualificationId,
          },
        });

        await tx.user.update({
          where: {
            email: student.email,
          },
          data: {
            email: student.email,
            name,
          },
        });

        return student;
      },
      { timeout: 20000 }
    );

    return reply
      .status(200)
      .send({ message: "Student updated successfully", student });
  } catch (error) {
    console.log("Error update student:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function deleteStudentHandler(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;

    if (!id) {
      return reply.status(400).send({ message: "Student ID not provided" });
    }

    const student = await prisma.student.findUnique({
      where: {
        id,
      },
    });

    if (!student) {
      return reply.status(404).send({ message: "Student not found." });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: student.email,
      },
    });

    if (!existingUser) {
      return reply
        .status(404)
        .send({ message: "The student don't have an account." });
    }

    await prisma.$transaction(
      async (tx) => {
        await tx.student.delete({
          where: {
            id,
          },
        });

        await tx.user.delete({
          where: {
            email: existingUser.email,
          },
        });
      },
      { timeout: 20000 }
    );

    return reply.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    console.log("Error deleting student:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}
