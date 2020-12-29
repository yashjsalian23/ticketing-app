import request from 'supertest'; //used for http reqs
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(201)
});

it('returns a 400 on invalid email or password', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: "nkkjskd",
        password: "password"
    })
    .expect(400)

    await request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test.com",
        password: "p"
    })
    .expect(400)
});

it('returns a 400 on empty email or password', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: "test@test.com",
    })
    .expect(400)

    await request(app)
    .post('/api/users/signup')
    .send({
        password: "password",
    })
    .expect(400)
});