import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
const EXPIRES_IN = Number(process.env.EXPIRES_IN);

export const sign = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: EXPIRES_IN });
};

export const verify = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET!) as JwtPayload;
  } catch (err) {
    throw new Error("Token inválido ou expirado");
  }
};
