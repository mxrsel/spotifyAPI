import express from "express";
import User from "../models/User";
import { Error } from 'mongoose';

export const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        await newUser.save();
        res.send(newUser);
        return;
    } catch(e) {
        if (e instanceof Error.ValidationError) {
            res.status(400).send(e);
            return
        }
        return next(e);
    }
})