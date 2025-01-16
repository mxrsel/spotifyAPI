import mongoose, {Model} from "mongoose";
import bcrypt from 'bcrypt';
import {randomUUID} from "node:crypto";

export interface UserTypes {
    username: string
    password: string
    token: string
}

interface UserMethods {
    passwordCheckout(password: string): Promise<boolean>;
    generateToken(): void
}

type UserModel = Model<UserTypes, {}, UserMethods>;

const SALT_WORK_FACTOR = 8;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserTypes, UserModel, UserMethods>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (value: string): Promise<boolean> {
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

const User = mongoose.model<UserTypes, UserModel>("User", UserSchema);
export default User;