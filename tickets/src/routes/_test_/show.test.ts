import request from 'supertest'; //used for http reqs
import { app } from '../../app';

it('returns a 404 if the ticket is not found', async () => {
    const res = await request(app)
      .get('/api/tickets/laskdjfalksfdlkakj')
      .send()
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
    })
    .expect(201);

    let response =  await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send()
    .expect(200);

    // expect(response.body.id).toEqual(res.body.id);
    expect(response.body.title).toEqual(res.body.title);
    expect(response.body.price).toEqual(res.body.price);
});