import request from 'supertest'; //used for http reqs
import { app } from '../../app';

it('responds with details about current user', async () => {
    const authRepsonse = await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)
    const cookie = authRepsonse.body.get('Set-Cookie');

    const response = await request(app)
        .get('/api/users/currentUser')
        .set('Cookie', cookie)
        .send().
        expect(200)

    expect(response.body.currentUser.email).toEqual('test@test.com');
})