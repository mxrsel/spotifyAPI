import express from "express";
import mongoDb from "../monogoDb";
import Artist from "../models/Artist";

export const artistRouter = express.Router();

artistRouter.get("/", async (req, res) => {

})