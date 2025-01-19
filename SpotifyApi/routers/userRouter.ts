import express from "express";
import User from "../models/User";
import { Error } from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";

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

userRouter.post('/sessions', async (req, res) => {
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

    res.send({message: 'User and password correct', user: existsUser});
    return
});

userRouter.delete('/sessions', auth, async(req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    try {
        const existsUser = await User.findOne({_id: user._id});
        if(existsUser) {
            existsUser.generateToken();
            await existsUser.save();
            res.send({message: 'Logout successfully done'});
        }
    } catch(e) {
        next(e)
    }
});

userRouter.post('/secret', auth, async(req, res) => {
    let expressReq = req as RequestWithUser;

    const user = expressReq.user;

    console.log(user);
    res.send({
        username: user.username,
        message: "Nothing there :)"
    });
    return
});