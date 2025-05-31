import bcrypt from "bcrypt";
import { CreateUserDTO, UserResponseDTO } from "../dtos/user.dto";
import authRepository from "../repositories/auth.repository";
import { IUser } from "../models/User";

const authService = {
  register: async (data: CreateUserDTO): Promise<UserResponseDTO> => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user: Partial<IUser> = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    const created = await authRepository.register(user);

    return { name: created.name, email: created.email };
  },
};

export default authService;
