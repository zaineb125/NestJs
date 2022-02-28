import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log("ip adress is : " , req.ip);
  console.log(" body is : " ,req.body);
  
  next();
};