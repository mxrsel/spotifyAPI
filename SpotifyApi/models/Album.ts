import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    artist_id: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
    },
    released: {
        type: Date,
        default: new Date(),
        required: true,
    },
    albumImage: String,
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album