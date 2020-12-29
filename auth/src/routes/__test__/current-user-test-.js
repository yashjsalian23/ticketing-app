import request from 'supertest'; //used for http reqs
import { app } from '../../app';

it('responds with details about current user', async () => {
    const cookie = await global.signin()

    const response = await request(app)
        .get('/api/users/currentUser')
        .set('Cookie', cookie) //sending cookie
        .send().
        expect(200)

    expect(response.body.currentUser.email).toEqual('test@test.com'); 
});

it('responds with null if user not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentUser')
        .send().
        expect(200)

    expect(response.body.currentUser).toEqual(null); 
})