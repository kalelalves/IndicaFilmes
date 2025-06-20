import express from "express";
import authRouter from "./auth.routes";

const appRouter = express();

appRouter.use("/auth", authRouter);

export default appRouter;
