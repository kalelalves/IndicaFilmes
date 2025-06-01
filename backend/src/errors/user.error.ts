import { DomainError } from "./domain-error.error";

export class UserNotFoundError extends DomainError {
  constructor() {
    super("Usuário não encontrado", 404);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class InvalidPasswordError extends DomainError {
  constructor() {
    super("Email e/ou senha inválidos", 400);
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
