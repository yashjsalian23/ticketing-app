import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NotAuthorizedError, NotFoundError, requireAuth, validateRequest } from '@ticketnext/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, async (req:Request, res:Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){throw new NotFoundError();} // if ticket dosnt exist send 404
    if(ticket.userId !== req.currentUser!.id){throw new NotAuthorizedError();} //if any other user is updating send 401
    res.send(ticket);
});

export { router as updateTicketRouter };