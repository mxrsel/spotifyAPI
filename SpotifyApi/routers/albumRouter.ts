import express from "express";
import Album from "../models/Album";
import {AlbumWithoutId} from "../types";
import {imagesUpload} from "../multer";
import auth from "../middleware/auth";

export const albumRouter = express.Router();

albumRouter.get('/', async(_req, res, next) => {
try {
    res.send(await Album.find({isPublished: true}).populate("artist", "-_id name artistImage artistBio"));
} catch(e) {
    next(e)
    }
});

albumRouter.get('/:artistId/albums', async (req, res, next) => {
    const { artistId } = req.params;
    try {
        const albums = await Album.find({ artist: artistId });
        res.send(albums);
    } catch (e) {
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

albumRouter.post('/', imagesUpload.single('albumImage'), auth, async(req, res, next) => {
    try {
        const newAlbum: AlbumWithoutId = {
            name: req.body.name,
            artist: req.body.artist,
            released: Number(new Date().toDateString()),
            albumImage: req.file ? 'album/' + req.file.filename : null,
            isPublished: req.body.isPublished
        }

        const album = new Album(newAlbum);
        await album.save();
        res.send(album)

    } catch(e) {
            next(e)
        }
});