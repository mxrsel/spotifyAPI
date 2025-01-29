import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistWithoutId} from "../types";
import auth from "../middleware/auth";

export const artistRouter = express.Router();

artistRouter.get("/", async (_req, res, next) => {
    try {
        res.send(await Artist.find());
    } catch(e) {
        next(e)
    }
});

artistRouter.get('/:id', async(req, res, next) => {
    if(!req.params.id) res.status(404).send('Not found!');

    try {
        res.send(await Artist.findById(req.params.id));
    } catch(e) {
        next(e)
    }
});

artistRouter.post("/", imagesUpload.single('artistImage'), auth, async (req, res, next) => {

    if(!req.body.name) {
        res.status(404).send({error: 'Enter Artist Name!'})
    }

    const newArtist: ArtistWithoutId = {
        name: req.body.name,
        artistImage: req.file ? 'artist/' + req.file.filename : null,
        artistBio: req.body.artistBio,
        isPublished: req.body.isPublished
    }

    try {
        const artist = new Artist(newArtist);
        await artist.save();
        res.send(artist);
    } catch(e) {
        next(e)
    }
});

