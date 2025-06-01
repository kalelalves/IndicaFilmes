import { StatusCodes } from "http-status-codes";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { DomainError } from "../errors/domain-error.error";

export const errorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  try {
    console.error(err);

    if (err instanceof ZodError) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Erro de validação",
        errors: err.errors,
      });
      return;
    }

    if (err instanceof DomainError) {
      res.status(err.status).json({
        success: false,
        message: err.message,
      });
      return;
    }

    if (typeof err.code === "number") {
      if (err.code === 11000) {
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          message: "Erro de duplicidade no banco de dados",
        });
        return;
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Erro no banco de dados",
      });
      return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Erro interno do servidor",
    });
  } catch (error) {
    console.error("Erro dentro do middleware de erro:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Erro crítico no servidor",
    });
  }
};
