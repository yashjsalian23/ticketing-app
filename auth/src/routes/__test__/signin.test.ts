import request from 'supertest'; //used for http reqs
import { app } from '../../app';

it('returns a 400 if user is not signedup before', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(400)
});

it('returns a 400 if invalid password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)

    return request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "jkjkj"
        })
        .expect(400)
});

it('sets a cookie after sucessfully signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)

    await request(app)
        .post('/api/users/signin')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)
    

    expect(response.get('Set-Cookie')).toBeDefined(); //get can access the header
})