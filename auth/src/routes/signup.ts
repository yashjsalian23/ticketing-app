import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post("/api/users/signup", [
        body('email')
        .isEmail()
        .withMessage("Enter valid email"),
        body("password")
        .trim()
        .isLength({min: 4, max:20})
    ], 
    async (req:Request, res: Response) =>  {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            console.log("Exists")
            throw new BadRequestError('Email already in use');
        }

        const user = User.build({email, password});
        await user.save();

        //generating jwt
        //first param include info that we want to add
        //second is secret key (used to verify jwt is original or not)
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, "fddsfdsf");

        //setting jwt in cookie
        req.session = {
            jwt: userJwt
        };

        res.status(201).send({user});
});

export { router as signupRouter };