import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

// Classe para lidar com erros personalizados
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 400, // status de erro
  ) {
    super(message); // Chama o construtor da classe pai (Error)
  }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // Tratamento para erros de validação (ZodError)
  if (err instanceof ZodError) {
    const response: {
      error: boolean; // Indica se ocorreu um erro
      message: string;
      issues?: { field: string; message: string }[];
    } = {
      error: true, // Indica que ocorreu um erro
      message: 'Validation failed',
    };

    // Verifica se está em ambiente de desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      response.issues = err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
    }
    // Retorna o erro
    res.status(400).json(response);
    return;
  }

  // Tratamento para erros personalizados (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: true,
      message: err.message,
    });
    return;
  }

  // Tratamento para erros desconhecidos (genéricos)
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: true,
    message: 'Internal server error',
  });
};
