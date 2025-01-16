import express from 'express';
import Composition from "../models/Composition";
import {CompositionWithoutId} from "../types";
import Album from "../models/Album";

export const compositionRouter = express.Router();

compositionRouter.get('/', async(req, res, next) => {
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

compositionRouter.get('/:albumId/compositions', async (req, res, next) => {
    const { albumId } = req.params;
    try {
        const compositions = await Composition.find({ album: albumId });
        res.send(compositions);
    } catch (e) {
        next(e)
    }
});

compositionRouter.post('/', async(req, res, next) => {

        if(req.body.album) {
            const album = await Album.findById(req.body.album);
            if(!album) res.status(404).send('Not found')
        }
        const newComposition: CompositionWithoutId = {
            name: req.body.name,
            album: req.body.album,
            timing: req.body.timing,
            composition_number: req.body.composition_number + 1,
        };

    try {
        const composition = new Composition(newComposition);
        await composition.save();
        res.send(composition);
    } catch(e) {
        next(e)
    }
})