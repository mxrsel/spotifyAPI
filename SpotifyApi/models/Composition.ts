import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompositionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    albumName: {
        type: Schema.Types.ObjectId,
        required: true
    },
    timing: {
        type: String,
    }
})