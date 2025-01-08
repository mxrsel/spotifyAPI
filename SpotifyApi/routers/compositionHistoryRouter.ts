import express from "express";
import CompositionHistory from "../models/CompositionHistory";
import {CompositionHistoryTypes} from "../types";
import User from "../models/User";
import { Error } from 'mongoose';


export const compositionHistoryRouter = express.Router();

compositionHistoryRouter.get('/', async(_req, res) => {
    res.send(await CompositionHistory.find().populate('composition', 'name'));
})

compositionHistoryRouter.post('/', async (req, res, next) => {
try {
    const token = req.get('Authorization');

    if (!token) {
        res.status(400).send({error: 'User Token is not found!'});
    }

    const userToken = await User.findOne({token});

    if (!userToken) {
        res.status(400).send({error: 'User Token wrong'});
    }

    const userHistory: CompositionHistoryTypes = {
        user: req.body.user,
        composition: req.body.composition,
        datetime: new Date().toDateString(),
    }

    const history = new CompositionHistory(userHistory);

    await history.save();
    res.send(history);
} catch(e) {
    if (e instanceof Error.ValidationError) {
        res.status(400).send(e);
        return
    }
    return next(e);
    }
});

