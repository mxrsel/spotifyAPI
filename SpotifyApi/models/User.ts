import mongoose, {HydratedDocument, Model} from "mongoose";
import bcrypt from 'bcrypt';
import {randomUUID} from "node:crypto";
import {UserTypes} from "../types";

interface UserMethods {
    passwordCheckout(password: string): Promise<boolean>;
    generateToken(): void
}

type UserModel = Model<UserTypes, {}, UserMethods>;

const SALT_WORK_FACTOR = 8;

const Schema = mongoose.Schema;

const UserSchema = new Schema<
    HydratedDocument<UserTypes>,
    UserModel,
    UserMethods>
({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (this: HydratedDocument<UserTypes>, value: string): Promise<boolean> {
                if(!this.isModified('username')) return true;
                const user: UserTypes | null = await User.findOne({username: value});
                return !user;
            },
            message: 'This name is already exists!',
        }
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin, user']
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
})

UserSchema.methods.passwordCheckout = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function() {
    this.token = randomUUID();
};

const User = mongoose.model("User", UserSchema);
export default User;