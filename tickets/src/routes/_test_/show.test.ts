import request from 'supertest'; //used for http reqs
import { app } from '../../app';

it('gives a 404 error if ticket not found', async() => {
    await request(app)
    .get('/api/ticket/kfkdfd')
    .expect(404);
});

it('return a ticket if it is found', async() => {
    let title = 'football game';
    let price = 25;

    let res = await request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title,
        price
    });

    let response =  await request(app)
    .get(`/api/tickets/${res.body.id}`);

    expect(response.body.id).toEqual(res.body.id);
    expect(response.body.title).toEqual(res.body.title);
    expect(response.body.price).toEqual(res.body.price);
});