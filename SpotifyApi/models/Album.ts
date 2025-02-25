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
        type: String,
        required: true,
    },
    albumImage: String,
    isPublished: {
        type: Boolean,
        default: false
    }
});

AlbumSchema.pre("findOneAndDelete", async function (next) {
    const composition = this.getQuery()._id;
    await Album.deleteMany({ composition: composition });
    next();
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album