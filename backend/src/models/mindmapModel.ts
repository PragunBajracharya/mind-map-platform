import mongoose from "mongoose";

const mindmapSchema = new mongoose.Schema({
    title: {type: String, required: true},
    modes: [
        {
            id: {type: String, required: true},
            content: {type: String, required: true},
            connections: [{type: String, required: true}]
        }
    ],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    collaborators: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    isPublic: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now},
});

const Mindmap = mongoose.model('Mindmap', mindmapSchema);
export default Mindmap;