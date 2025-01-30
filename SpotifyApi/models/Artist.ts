import mongoose from "mongoose";
import Album from "./Album";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
   artistImage: String,
    artistBio: String,
    isPublished: {
        type: Boolean,
        default: false
    }
});

ArtistSchema.pre("findOneAndDelete", async function (next) {
    const album = this.getQuery()._id;
    await Album.deleteMany({ album: album });
    next();
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;

