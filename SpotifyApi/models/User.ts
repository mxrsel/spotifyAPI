import mongoose from "mongoose";
import bcrypt from 'bcrypt';

interface User {
    username: string
    password: string
}

const SALT_WORK_FACTOR = 8;

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
})

const User = mongoose.model("User", UserSchema);
export default User;