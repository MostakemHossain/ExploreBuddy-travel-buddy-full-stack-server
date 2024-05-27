import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      return next();
    } catch (err: any) {
      const originalErrors = err.issues;

      const combinedMessage = originalErrors
        .map((error: any) => error.message)
        .join(" ");
      const error: any = new Error(combinedMessage);
      error.errorDetails = {
        issues: originalErrors.map((error: any) => ({
          field: error.path[1],
          message: error.message,
        })),
      };
      return next(error);
    }
  };

export default validateRequest;
