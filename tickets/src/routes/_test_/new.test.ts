import request from 'supertest'; //used for http reqs
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});
  
    expect(response.status).not.toEqual(404);
  })

it('can only be assigned if user is signed in', async()=>{});

it('gives an error for invalid title', async()=>{});

it('gives an error for invalid price', async()=>{});

it('creates a ticket with valid params', async()=>{});