import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import authService from "../services/auth.service";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

const authController = {
  // <SERVER_BASE_URL>/api/auth/register
  register: async (req: Request, res: Response) => {
    const data = createUserSchema.parse(req.body);
    const user = await authService.register(data);
    res.status(StatusCodes.CREATED).json(user);
  },

  // <SERVER_BASE_URL>/api/auth/login
  login: async (req: Request, res: Response) => {
    const data = loginUserSchema.parse(req.body);
    const user = await authService.login(data);
    res.status(StatusCodes.OK).json(user);
  },
};

export default authController;
