import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
   artistImage: String,
    artistBio: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;

