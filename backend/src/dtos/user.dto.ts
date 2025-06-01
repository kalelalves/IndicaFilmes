export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  name: string;
  email: string;
}

export interface UserLoginResponseDTO {
  name: string;
  email: string;
  token: string;
}
