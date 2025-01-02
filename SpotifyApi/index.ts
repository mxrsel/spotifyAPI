import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mongoDb from "./monogoDb";
import {artistRouter} from "./routers/artistRouter";
import {albumRouter} from "./routers/albumRouter";
import {compositionRouter} from "./routers/compositionRouter";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/compositions', compositionRouter);

const run = async() => {
    await mongoose.connect('mongodb://localhost/music');

    app.listen(port, () => {
        console.log(`Server running on port: http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    })
};

run().catch(err => console.error(err));