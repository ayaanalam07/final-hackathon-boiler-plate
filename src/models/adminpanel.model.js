import mongoose  from "mongoose";

const adminPanelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    tokenNumber: {
        type: String
    },

}, { timestamps: true });

export default mongoose.model("adminPanel", adminPanelSchema);
