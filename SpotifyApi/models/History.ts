import mongoose from "mongoose";

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

const History = mongoose.model('History', HistorySchema);
export default History;