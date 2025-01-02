import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistWithoutId} from "../types";

export const artistRouter = express.Router();

artistRouter.get("/", async (_req, res, next) => {
    try {
        res.send(await Artist.find());
    } catch(e) {
        next(e)
    }
});

artistRouter.post("/", imagesUpload.single('artistImage'), async (req, res, next) => {

    if(!req.body.name) {
        res.status(404).send({error: 'Enter Artist Name!'})
    }

    const newArtist: ArtistWithoutId = {
        name: req.body.name,
        artistImage: req.file ? 'artist/' + req.file.filename : null,
        artistBio: req.body.artistBio
    }

    try {
        const artist = new Artist(newArtist);
        await artist.save();
        res.send(artist);
    } catch(e) {
        next(e)
    }
})