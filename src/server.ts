import { fastify } from "fastify";
import cors from "@fastify/cors";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import fastifyJwtPlugin from "./plugins/jwt";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";

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

//ROTAS DOS ENDPOITS
app.register(authRoutes, { prefix: "/auth" });
app.register(userRoutes, { prefix: "/users" });

console.log(process.env.RESEND_API_KEY);

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log(`Server running at port ${3333}`);
});
