import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { HttpMethod } from './http-method.enum.js';
import { Middleware } from '../middleware/middleware.interface.js';

export interface Route<P extends ParamsDictionary = ParamsDictionary> {
  path: string;
  method: HttpMethod;
  handler: (req: Request<P>, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}
