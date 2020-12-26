import { Response, Request, NextFunction } from 'express';

export const errorHandler = (
err: Error, 
res: Response, 
req: Request, 
next: NextFunction) => {
    res.status(400).send({
        message: err.message
    })
}