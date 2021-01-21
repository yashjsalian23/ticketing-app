import mongoose from 'mongoose';
import { Password } from '../services/password';

//this tells ts about the properties of new user
interface userAttrs{
    email: string,
    password: string
}

//tell ts about build
interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: userAttrs): UserDoc;
}

//tells ts about user model
interface UserDoc extends mongoose.Document{
    email: string,
    password: string
    //add value here if we want more like createdAt..
}

const userSchema = new mongoose.Schema({
        email:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        }
    },
    {   //formatting the json which is returned. _id converted to id and removed password and __v
        toJSON: {
            transform(doc, ret){
                ret.id = ret._id,
                delete ret._id,
                delete ret.password,
                delete ret.__v
            }
        }
    }
);
//added typchecking
userSchema.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
};

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
    }
    done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
export { User }

//new user: User.build({})