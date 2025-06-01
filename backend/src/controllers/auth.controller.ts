import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import authService from "../services/auth.service";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const data = createUserSchema.parse(req.body);
      const user = await authService.register(data);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Occured an error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const data = loginUserSchema.parse(req.body);
      const user = await authService.login(data);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Occured an error" });
    }
  },
};

export default authController;
