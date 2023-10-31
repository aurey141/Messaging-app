import { config } from "dotenv";
config();

import fastify from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from "./routes/users";

const app = fastify();
app.register(cors, { origin: process.env.CLIENT_URL });
app.register(userRoutes);

app.get('/', async (request, reply) => {
    reply.send('Hello, this is the root route!');
  });


app.listen({ port: parseInt(process.env.PORT!) });