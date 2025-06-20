// import authController from "../../../src/controllers/auth.controller";
// import {
//   CreateUserDTO,
//   UserResponseDTO,
// } from "../../../src/schemas/user.schema";
// import authService from "../../../src/services/auth.service";
// import { register } from "module";

// jest.mock("../../../src/controllers/auth.controller", () => {
//   register: jest.fn();
// });

// describe("authController.register", () => {
//   it("should create an user and return status code Created", async () => {
//     const dto: CreateUserDTO = {
//       name: "Teste",
//       email: "teste@teste.com",
//       password: "Teste123",
//     };

//     const userMock: UserResponseDTO = {
//       name: "Teste",
//       email: "teste@teste.com",
//     };

//     (authService.register as jest.Mock).mockResolvedValue(userMock);

//     const result = await authController.register(dto)
//   });
// });
