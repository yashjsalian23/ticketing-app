import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post("/api/users/signup", [
        body('email')
        .isEmail()
        .withMessage("Enter valid email"),
        body("password")
        .trim()
        .isLength({min: 4, max:20})
    ], 
    (req:Request, res: Response) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).send(errors.array());
        }

        res.send({});
});

export { router as signupRouter };