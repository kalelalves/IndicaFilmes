import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import authService from "../services/auth.service";

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const user = await authService.register(req.body);
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Occured an error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const user = await authService.login(req.body);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Occured an error" });
    }
  },
};

export default authController;
