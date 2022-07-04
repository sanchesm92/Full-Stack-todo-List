import { NextFunction, Request, Response } from "express";


export default class errorMiddleware {
  public static validate = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err.isJoi) {
      return res.status(400).json({
        message: err.details[0].message,
      });
    }
    return res.status(400).json({
        message: 'Invalid fields',
    });
}
}