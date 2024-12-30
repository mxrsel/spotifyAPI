import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mongoDb from "./monogoDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

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