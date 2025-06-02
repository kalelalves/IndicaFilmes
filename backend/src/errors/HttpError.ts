export class HttpError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Requisição inválida") {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Não autorizado") {
    super(message, 401);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Acesso proibido") {
    super(message, 403);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Recurso não encontrado") {
    super(message, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ConflictError extends HttpError {
  constructor(message = "Conflito de dados") {
    super(message, 409);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Erro interno do servidor") {
    super(message, 500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
