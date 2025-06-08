import express from "express";
import appRouter from "./routes/app-router.routes";
import { connectDB } from "./config/database";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middlewares/error-handler.middleware";
import corsOptions from "./config/cors";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", appRouter);

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
};

startServer();
