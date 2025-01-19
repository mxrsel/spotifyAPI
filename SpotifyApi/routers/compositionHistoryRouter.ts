import express from "express";
import User from "../models/User";
import { Error } from 'mongoose';
import History from "../models/History";
import auth, {RequestWithUser} from "../middleware/auth";


export const HistoryRouter = express.Router();

HistoryRouter.get('/', auth, async(req, res) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    const userId = user._id
    res.send(await History.find({user: userId}).populate('composition', 'name timing'));
})

HistoryRouter.post('/', auth, async (req, res, next) => {
   try {
    const token = req.get('Authorization');

    if (!token) {
        res.status(400).send({error: 'User Token is not found!'});
    }

    const userToken = await User.findOne({token});

    if (!userToken) {
        res.status(400).send({error: 'User Token wrong'});
    }
    if (userToken === null) {
        res.status(400).send({error: 'Token not found'})
        return
    }

    const userHistory = new History( {
        user: userToken._id,
        composition: req.body.composition,
        datetime: new Date().toISOString(),
    })


    const history = await userHistory.save();
    res.send(history);
} catch(e) {
    if (e instanceof Error.ValidationError) {
        res.status(400).send(e);
        return
    }
    return next(e);
    }
});

