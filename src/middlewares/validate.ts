import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next(); // Se a validação for bem-sucedida, prossegue para o próximo middleware
    } catch (error) {
      next(error); // Se a validação falhar, chama o middleware de erro (errorHandler centralizado)
    }
  };
