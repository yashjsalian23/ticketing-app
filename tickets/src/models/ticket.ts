import mongoose from 'mongoose';

//this tells ts about the properties of new Ticket
interface ticketAttrs{
    title: string,
    price: number,
    userId: string
}

//tell ts about build
interface TicketModel extends mongoose.Model<TicketDoc>{
    build(attrs: ticketAttrs): TicketDoc;
}

//tells ts about Ticket model
interface TicketDoc extends mongoose.Document{
    title: string,
    price: number,
    userId: string
    //add value here if we want more like createdAt..
}

const ticketSchema = new mongoose.Schema({
        title:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        userId:{
            type: String,
            required: true
        },
    },
    {   //formatting the json which is returned. _id converted to id and removed password and __v
        toJSON: {
            transform(doc, ret){
                ret.id = ret._id,
                delete ret._id
            }
        }
    }
);
//added typchecking
ticketSchema.statics.build = (attrs: ticketAttrs) => {
    return new Ticket(attrs);
};


const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);
export { Ticket }

//new Ticket: Ticket.build({})