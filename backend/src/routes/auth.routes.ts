import { Router } from "express";

import authController from "../controllers/auth.controller";

const routes = Router();

routes.post("/register", authController.register);
routes.post("/login", authController.login);

export default routes;
