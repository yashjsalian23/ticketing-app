import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { Password } from '../services/password';

const router = express.Router();

router.post("/api/users/signin",[
    body('email')
    .isEmail()
    .withMessage('Enter Valid Email'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Supply a password')
], validateRequest,
 async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if(!user){
        throw new BadRequestError('Invalid Credentials');
    }

    const passwordMatch = await Password.compare(user.password,password);

    if(!passwordMatch){
        throw new BadRequestError('Invalid Credentials');
    }

    //generating jwt
    //first param include info that we want to add
    //second is secret key (used to verify jwt is original or not)
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!); //! is to tell TS that check is completed in index.ts

    //setting jwt in cookie
    req.session = {
        jwt: userJwt
    };

    res.status(200).send({user});


});

export { router as signinRouter };