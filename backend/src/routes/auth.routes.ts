import { Router } from "express";

import authController from "../controllers/auth.controller";

const routes = Router();

routes.post("/register", authController.register);

export default routes;
