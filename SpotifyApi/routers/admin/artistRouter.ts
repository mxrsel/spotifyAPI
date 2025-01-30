import express from "express";
import Artist from "../../models/Artist";

export const artistAdminRouter = express.Router();

artistAdminRouter.get("/", async (_req, res, next) => {
    try {
        res.send(await Artist.find());
    } catch(e) {
        next(e)
    }
});

artistAdminRouter.delete('/:id', async(req, res, next) => {
    try {
        const {id} = req.params;

        if(!id) {
            res.status(404).send('Not found!');
            return
        }

        await Artist.findOneAndDelete({_id: id});
        res.send({message: 'Artist deleted successfully.'});
    } catch(e) {
        next(e)
    }
})