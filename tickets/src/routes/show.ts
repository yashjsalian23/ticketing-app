import express, { Request, Response } from 'express';
import { NotFoundError } from '@ticketnext/common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.get("/api/tickets/:id",async(req:Request, res:Response) => {
    const ticket = await Ticket.findById(req.params.id);
    console.log(req.params.id )
    if(!ticket){
        throw new NotFoundError();
        // return res.status(404)
    }
    res.status(200).send(ticket);
})

export { router as showTicketRouter };