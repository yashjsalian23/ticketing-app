import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

declare global {
    namespace NodeJS {
      interface Global {
        signin(): Promise<string[]>;
      }
    }
  }
  

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'ejfkfww';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for ( let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

// using this method we can extract cookie directly in any test req
global.signin = async () => {
    const authRepsonse = await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)
    const cookie = authRepsonse.get('Set-Cookie'); //extracting cookie
    return cookie;
}