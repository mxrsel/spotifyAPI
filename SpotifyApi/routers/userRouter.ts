import express from "express";
import User from "../models/User";
import { Error } from 'mongoose';

export const userRouter = express.Router();

userRouter.post('/register', async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        newUser.generateToken();

        await newUser.save();
        res.send({newUser, message: 'Registration success'});
        return;
    } catch(e) {
        if (e instanceof Error.ValidationError) {
            res.status(400).send(e);
            return
        }
        return next(e);
    }
});

userRouter.post('/session', async (req, res) => {
    const existsUser = await User.findOne({username: req.body.username});

    if(!existsUser) {
        res.status(400).send({error: 'User is not found'})
        return
    }

    const matchPasswords = await existsUser.passwordCheckout(req.body.password);

    if(!matchPasswords) {
        res.status(400).send({error: 'Password is wrong'});
        return
    }

    existsUser.generateToken();
    await existsUser.save();

    res.send({message: 'User and password correct', existsUser});
    return
});

userRouter.post('/secret', async(req, res) => {
    const token = req.get('Authorization');

    if(!token) {
        res.status(400).send({error: 'User token is not found'});
        return
    }
    const user = await User.findOne({token});

    if(!user) {
        res.status(400).send({error: 'Wrong token'});
        return
    }
    res.send({
        username: user.username,
        message: "Nothing there :)"
    });
    return
});