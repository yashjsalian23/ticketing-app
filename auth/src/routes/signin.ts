import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

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
 (req: Request, res: Response) => {
    res.send({})
});

export { router as signinRouter };