export class DomainError extends Error {
  public readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;

    Object.setPrototypeOf(this, DomainError.prototype); // necessário para instanceof funcionar direito em TS
  }
}
