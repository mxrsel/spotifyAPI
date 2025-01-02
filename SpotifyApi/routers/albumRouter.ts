import express from "express";
import Album from "../models/Album";
import {AlbumWithoutId} from "../types";
import {imagesUpload} from "../multer";

export const albumRouter = express.Router();

albumRouter.get('/', async(_req, res, next) => {
try {
    res.send(await Album.find());
} catch(e) {
    next(e)
    }
});

albumRouter.post('/', imagesUpload.single('albumImage'), async(req, res, next) => {
    try {
        const newAlbum: AlbumWithoutId = {
            name: req.body.name,
            artist: req.body.artist,
            released: req.body.released,
            albumImage: req.file ? 'album/' + req.file.filename : null
        }

        const album = new Album(newAlbum);
        await album.save();
        res.send(album)

    } catch(e) {
            next(e)
        }
})