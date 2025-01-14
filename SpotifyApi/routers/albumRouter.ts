import express from "express";
import Album from "../models/Album";
import {AlbumWithoutId} from "../types";
import {imagesUpload} from "../multer";

export const albumRouter = express.Router();

albumRouter.get('/', async(req, res, next) => {
try {
    const { artistId } = req.query;

    if (artistId) {
        res.send(await Album.find({ artist: artistId }).populate("artist", "-_id name artistImage artistBio"));

    }

    res.send(await Album.find().populate("artist", "-_id name artistImage artistBio"));
} catch(e) {
    next(e)
    }
});

albumRouter.get('/:id', async(req, res, next) => {
    try {
        if (!req.params.id) res.status(404).send('Not found!');

        const oneAlbum = await Album.findById(req.params.id);
        res.send(oneAlbum);
    } catch(e) {
        next(e)
    }
})

albumRouter.post('/', imagesUpload.single('albumImage'), async(req, res, next) => {
    try {
        const newAlbum: AlbumWithoutId = {
            name: req.body.name,
            artist: req.body.artist,
            released: Number(new Date().toDateString()),
            albumImage: req.file ? 'album/' + req.file.filename : null
        }

        const album = new Album(newAlbum);
        await album.save();
        res.send(album)

    } catch(e) {
            next(e)
        }
})