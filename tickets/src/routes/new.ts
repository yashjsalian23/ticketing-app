import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth,validateRequest } from '@ticketnext/common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/tickets',requireAuth,[
    body('title').not().isEmpty().withMessage('Enter valid Title'),
    body('price').isInt({gt:0}).withMessage('Enter valid Price')
], validateRequest,
async (req:Request, res:Response) => {
    let { title, price } = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    });

    await ticket.save();
    res.status(201).send(ticket);
});

export { router as createTicketRouter };

