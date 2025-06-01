import bcrypt from "bcrypt";
import { sign } from "../utils/jwt";
import userRepository from "../repositories/user.repository";
import { IUser } from "../models/User";
import {
  CreateUserDTO,
  LoginUserDTO,
  UserLoginResponseDTO,
  UserResponseDTO,
} from "../schemas/user.schema";

const authService = {
  register: async (data: CreateUserDTO): Promise<UserResponseDTO> => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user: Partial<IUser> = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    const created = await userRepository.create(user);

    return { name: created.name, email: created.email };
  },

  login: async (data: LoginUserDTO): Promise<UserLoginResponseDTO> => {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user?.password);

    if (!isPasswordValid) {
      throw new Error("A senha informada é inválida");
    }

    return {
      name: user.name,
      email: user.email,
      token: sign({ id: user._id.toString(), email: user.email }),
    };
  },
};

export default authService;
