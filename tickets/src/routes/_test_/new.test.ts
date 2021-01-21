import request from 'supertest'; //used for http reqs
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});
  
    expect(response.status).not.toEqual(404);
  });

it('can only be assigned if user is signed in', async()=>{
  await request(app).post('/api/tickets')
  .send({})
  .expect(401);
});

it('gives a status other than 401 when signed in', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie',global.signin())
  .send({});

  expect(response.status).not.toEqual(401);
});

it('gives an error for invalid title', async()=>{
  await request(app)
  .post('/api/tickets')
  .set('Cookie',global.signin())
  .send({
    title: "",
    price:10
  })
  .expect(400);

  await request(app)
  .post('/api/tickets')
  .set('Cookie',global.signin())
  .send({
    price:10
  })
  .expect(400);
});

it('gives an error for invalid price', async()=>{
  await request(app)
  .post('/api/tickets')
  .set('Cookie',global.signin())
  .send({
    title: "njnnj",
    price:-10
  })
  .expect(400);

  await request(app)
  .post('/api/tickets')
  .set('Cookie',global.signin())
  .send({
    title:"78787"
  })
  .expect(400);
});

it('creates a ticket with valid params', async()=>{});