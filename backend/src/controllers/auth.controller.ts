import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import authService from "../services/auth.service";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import dotenv from "dotenv";

dotenv.config();

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

    res.cookie("token", user.token, {
      httpOnly: true,
      secure: false, // true production
      sameSite: "lax", // strict production,
      maxAge: Number(process.env.EXPIRES_IN),
    });

    res.status(StatusCodes.OK).json({ name: user.name, email: user.email });
  },
};

export default authController;
