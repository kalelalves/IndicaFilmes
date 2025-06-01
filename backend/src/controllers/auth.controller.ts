import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import authService from "../services/auth.service";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

const authController = {
  register: async (req: Request, res: Response) => {
    const data = createUserSchema.parse(req.body);
    const user = await authService.register(data);
    res.status(StatusCodes.CREATED).json(user);
  },

  login: async (req: Request, res: Response) => {
    const data = loginUserSchema.parse(req.body);
    const user = await authService.login(data);
    res.status(StatusCodes.OK).json(user);
  },
};

export default authController;
