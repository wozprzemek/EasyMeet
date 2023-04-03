import { NextFunction, Request, Response } from "express";
import { RequestValidators } from "../interfaces/RequestValidators";
import { ZodError } from "zod";

export function validateRequest(validators: RequestValidators) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (validators.params) {
          req.params = await validators.params.parseAsync(req.params);
        }
        if (validators.body) {
          req.body = await validators.body.parseAsync(req.body);
        }
        if (validators.query) {
          req.query = await validators.query.parseAsync(req.query);
        }
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          res.status(400);
        }
        next(error);
      }
    };
  }