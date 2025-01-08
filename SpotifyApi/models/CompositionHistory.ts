import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompositionHistorySchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    composition: {
        type: Schema.Types.ObjectId,
        ref: "Composition",
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
});

const CompositionHistory = mongoose.model('CompositionHistory', CompositionHistorySchema);
export default CompositionHistory;