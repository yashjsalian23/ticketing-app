import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

//required to define the format of payload
interface UserPayload{
    id: string,
    email: string
}

//required to add the currentUser prop to req since in ts we cannot directly add it
declare global{
    namespace Express{
        interface Request{
            currentUser? : UserPayload
        }
    }
}

export const currentUser = (req: Request, res:Response, next: NextFunction) => {
    if(!req.session || !req.session.jwt){
        return next();
    }

    try{
        const payload = jwt.verify(
            req.session.jwt, 
            process.env.JWT_KEY!
        ) as UserPayload;
        req.currentUser = payload; //cannot directly add a property to the req obj in ts hence need to define interface and global
    } catch(err){}

    next();
}