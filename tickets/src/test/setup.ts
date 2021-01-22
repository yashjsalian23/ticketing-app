import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';

import { app } from '../app';

declare global {
    namespace NodeJS {
      interface Global {
        signin(): string[];
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
global.signin = () => {
   const payload = {
       id: mongoose.Types.ObjectId().toHexString(),
       email: 'test@tets.com'
   };

   const token = jwt.sign(payload,process.env.JWT_KEY!);
   const session = {jwt:token};
   const sessionJSON = JSON.stringify(session);
   const base64 = Buffer.from(sessionJSON).toString('base64');

   return [`express:sess=${base64}`];
}