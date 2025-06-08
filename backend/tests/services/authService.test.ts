import { CreateUserDTO, LoginUserDTO } from "../../src/schemas/user.schema";
import authService from "../../src/services/auth.service";
import userRepository from "../../src/repositories/user.repository";
import bcrypt from "bcrypt";
import { BadRequestError } from "../../src/errors/HttpError";
import { sign } from "../../src/utils/jwt";

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("../../src/repositories/user.repository", () => ({
  create: jest.fn(),
  findByEmail: jest.fn(),
}));

jest.mock("../../src/utils/jwt", () => ({
  sign: jest.fn(),
}));

describe("authService.register", () => {
  it("should create an user", async () => {
    const dto: CreateUserDTO = {
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "Teste@123",
    };

    const mockHashedPassword = "hashedSenha123";

    (bcrypt.hash as jest.Mock).mockResolvedValue(mockHashedPassword);

    const createdUser = {
      _id: "abc123",
      name: dto.name,
      email: dto.email,
      password: mockHashedPassword,
    };

    (userRepository.create as jest.Mock).mockResolvedValue(createdUser);

    const result = await authService.register(dto);

    expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);

    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: dto.name,
        email: dto.email,
        password: mockHashedPassword,
      })
    );

    expect(result).toEqual({
      name: dto.name,
      email: dto.email,
    });
  });
});

describe("authService.login", () => {
  it("should login an user and return token", async () => {
    const dto: LoginUserDTO = {
      email: "teste@teste.com",
      password: "Teste123",
    };

    const mockUser = {
      _id: "123",
      name: "User Test",
      email: "teste@teste.com",
      password: "hashedPassword",
    };

    (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const fakeToken = "mytoken123";
    (sign as jest.Mock).mockReturnValue(fakeToken);

    const result = await authService.login(dto);

    expect(result).toEqual({
      email: dto.email,
      name: mockUser.name,
      token: fakeToken,
    });

    expect(sign).toHaveBeenCalledWith({
      id: mockUser._id.toString(),
      email: mockUser.email,
    });
  });

  it("should throw a BadRequestError when user is not found", async () => {
    const dto: LoginUserDTO = {
      email: "teste@teste.com",
      password: "Teste123",
    };

    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

    await expect(authService.login(dto)).rejects.toThrow(BadRequestError);
    await expect(authService.login(dto)).rejects.toThrow(
      "Senha e/ou email inválidos"
    );
  });

  it("should throw a BadRequestError when password is invalid", async () => {
    const dto: LoginUserDTO = {
      email: "teste@teste.com",
      password: "Teste123",
    };

    const mockUser = {
      _id: "123",
      name: "User Test",
      email: "teste@teste.com",
      password: "hashedPassword",
    };

    (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(authService.login(dto)).rejects.toThrow(BadRequestError);
    await expect(authService.login(dto)).rejects.toThrow(
      "Senha e/ou email inválidos"
    );

    expect(bcrypt.compare).toHaveBeenCalledWith(
      dto.password,
      mockUser.password
    );
  });
});
