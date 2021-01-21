import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth,validateRequest } from '@ticketnext/common'

const router = express.Router();

router.post('/api/tickets',requireAuth,[
    body('title').not().isEmpty().withMessage('Enter valid title'),
    body('price').isInt({gt:0}).withMessage('Enter valid Price')
], validateRequest,
(req:Request, res:Response) => {
    res.status(200).send("hi");
})

export { router as createTicketRouter };

