import mongoose from "mongoose";
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        ref: "User" 
    },
	token: { 
        type: String, 
        required: true },
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
		expires: 43200,
	},
});

export default mongoose.model("Token", tokenSchema);
