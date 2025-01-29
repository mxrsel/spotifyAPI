import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: true
    },
    released: {
        type: Number,
        required: true,
    },
    albumImage: String,
    isPublished: {
        type: Boolean,
        default: false
    }
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album