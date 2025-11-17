import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import ExcelJS from "exceljs";

import { prisma } from "../lib/db";
import { createStudentSchema, studentSchema } from "../schemas/student.schema";
import { hash } from "bcrypt";
import { passwordGenerator } from "../lib/password-generator";

export async function createManyStudentsHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createStudentSchema>[] }>,
  reply: FastifyReply
) {
  try {
    const studentsData = request.body;

    const createdStudents = await prisma.student.createMany({
      data: studentsData,
    });

    return reply.status(201).send({
      message: "Estudantes cadastrados com sucesso!",
      students: createdStudents,
    });
  } catch (error) {
    console.error("Error creating students:", error);
    return reply.status(500).send({ message: "Internal server error", error });
  }
}

export async function createStudentHandler(
  request: FastifyRequest<{ Body: z.infer<typeof createStudentSchema> }>,
  reply: FastifyReply
) {
  try {
    const { name, qualification, completionYear3, email, phone1, code } =
      request.body;

    const existingStudent = await prisma.student.findUnique({
      where: {
        code,
      },
    });

    if (!existingStudent) {
      await prisma.student.create({
        data: {
          name,
          qualification,
          completionYear3,
          email,
          phone1,
          code,
        },
      });
    }

    const password = passwordGenerator({
      passwordLength: 8,
      useLowerCase: true,
      useNumbers: true,
      useSymbols: false,
      useUpperCase: true,
    });

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email!,
        name,
        password: hashedPassword,
        username: email!,
        role: "STUDENT",
      },
    });

    return reply.status(201).send({ message: "ok", user });
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

export async function exportExcelHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const students = await prisma.student.findMany();

    //Criar um workbook e uma sheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Estudantes");

    //Cabeçalhos das colunas
    worksheet.columns = [
      { header: "ID", key: "id", width: 35 },
      { header: "Nome", key: "name", width: 25 },
      { header: "Código", key: "code", width: 15 },
      { header: "Gênero", key: "gender", width: 10 },
      { header: "Email", key: "email", width: 25 },
    ];

    //Adicionar as linhas
    students.forEach((student) => worksheet.addRow(student));

    // Preparar resposta
    const buffer = await workbook.xlsx.writeBuffer();

    reply
      .header(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
      .header("Content-Disposition", "attachment; filename=students.xlsx")
      .status(200)
      .send(Buffer.from(buffer));
  } catch (error) {
    console.log(error);
    return reply
      .status(500)
      .send({ message: "Ocorreu um erro interno no servidor", error });
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

    const { birthDate, email, gender, name, code, financier, specialty } =
      request.body;

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
            financier,
            specialty,
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

    await prisma.$transaction(
      async (tx) => {
        await tx.student.delete({
          where: {
            id,
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
