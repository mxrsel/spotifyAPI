import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompositionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    timing: String,
    composition_number: {
        type: Number,
    },
    isPublished: {
        type: Boolean,
        default: false
    }

})

const Composition = mongoose.model('Composition', CompositionSchema);
export default Composition;