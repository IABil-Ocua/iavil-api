import { fastify } from "fastify";
import cors from "@fastify/cors";
import {
  ZodTypeProvider,
  jsonSchemaTransform,
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import fastifyJwtPlugin from "./plugins/jwt";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";
import { QualificationRoutes } from "./routes/qualification.routes";
import { studentRoutes } from "./routes/student.routes";
import { eventRoutes } from "./routes/events.route";
import { articleRoutes } from "./routes/articles.routes";
import { jobVacanciesRoutes } from "./routes/job-vacancies.routes";
import { scholarshipRoutes } from "./routes/scholarship.routes";

const app =
  fastify(/**{
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
} */).withTypeProvider<ZodTypeProvider>();

app.register(cors, {
  origin: true,
  methods: ["GET", "PUT", "POST", "DELETE"],
});

app.register(fastifyJwtPlugin);

app.setValidatorCompiler(validatorCompiler); // Diz ao fastify que será usado zod para fazer as validações de entrada
app.setSerializerCompiler(serializerCompiler); //Diz ao fastify que será usado o zod para fazer a serialização dos dados de saida

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "RCS-Documenting API",
      version: "1.0.0",
      description: "API documentation for the RCS backend",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  transform: jsonSchemaTransform,
});

//Configuração do Swagger UI
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "none",
    deepLinking: false,
  },
});

//ROTAS DOS ENDPOITS
app.register(authRoutes, { prefix: "/auth" });
app.register(userRoutes, { prefix: "/users" });
app.register(QualificationRoutes, { prefix: "/qualifications" });
app.register(studentRoutes, { prefix: "/students" });
app.register(eventRoutes, { prefix: "/events" });
app.register(articleRoutes, { prefix: "/articles" });
app.register(jobVacanciesRoutes, { prefix: "/job-vacancies" });
app.register(scholarshipRoutes, { prefix: "/scholarships" });

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log(`Server running at port ${3333}`);
});
