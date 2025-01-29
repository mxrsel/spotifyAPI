import express from "express";
import Composition from "../../models/Composition";

export const compositionAdminRouter = express.Router();

compositionAdminRouter.get('/', async(req, res, next) => {
    try {
        const {albumId} = req.query;

        if(albumId) {
            res.send(await Composition.find({album: albumId}).populate("album", "-_id name artist released albumImage"))
        }

        res.send(await Composition.find().
        populate("album", "-_id name artist released albumImage").
        sort({composition_number: 1}));
    } catch(e) {
        next(e)
    }
});

compositionAdminRouter.delete('/:id', async(req, res, next) => {
    try {
        const {id} = req.params;

        if(!id) {
            res.status(404).send('Not found!');
            return
        }

        await Composition.findByIdAndDelete(id);
        res.send({message: 'Composition deleted successfully.'});
    } catch(e) {
        next(e)
    }
})