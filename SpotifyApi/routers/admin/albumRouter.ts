import express from "express";
import Album from "../../models/Album";
import permit from "../../middleware/permit";
import {albumRouter} from "../albumRouter";

export const albumAdminRouter = express.Router();

albumAdminRouter.get('/', async(_req, res, next) => {
    try {
        res.send(await Album.find().populate("artist"));
    } catch(e) {
        next(e)
    }
});

albumAdminRouter.delete('/:id', async(req, res, next) => {
    try {
        const {id} = req.params;

        if(!id) {
            res.status(404).send('Not found!');
            return
        }

        await Album.findByIdAndDelete(id);
        res.send({message: 'Album deleted successfully.'});
    } catch(e) {
        next(e)
    }
})