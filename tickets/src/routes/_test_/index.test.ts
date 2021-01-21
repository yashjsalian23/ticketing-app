import request from 'supertest'; //used for http reqs
import { app } from '../../app';

const createTicket = () => {
    return request(app)
    .post('/api/tickets')
    .set('Cookie',global.signin())
    .send({
        title:'dddd',
        price:44
    });
}

it('returns all tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    let res = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

    expect(res.body.length).toEqual(3);
})