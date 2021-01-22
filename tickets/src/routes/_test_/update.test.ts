import request from 'supertest'; //used for http reqs
import { app } from '../../app';

import mongoose from 'mongoose';

it('returns a 404 if not a valid id', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie',global.signin())
    .send({
        title: "ijjdd",
        price: 25
    })
    .expect(404);
});

it('returns a 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
    .put(`/api/tickets/${id}`)
    .send({
        title: "ijjdd",
        price: 25
    })
    .expect(401);
});

it('returns a 401 if user doesnt owns a ticket', async () => {
    const res = await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title: "dsdsd",
        price: 55
    });

    await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie',global.signin())
    .send({
        title: "qwqw",
        price: 77
    })
    .expect(401);
});

it('returns a 400 if title or price is invalid', async () => {
    const cookie = global.signin();
    const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
        title: "dsdsd",
        price: 55
    });

    request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: '',
        price: 4
    })
    .expect(400);

    request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({
        title: 'sdjsnd',
        price: -4
    })
    .expect(400);
});

it('returns a 200 if given correct inputs', async () => {});