import mongoose, { Mongoose } from 'mongoose';

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
});

userSchema.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
export { User }

//new user: User.build({})