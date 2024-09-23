const Mindmap = require('../models/mindmapModel');

exports.createMindmap = async (req, res) => {
    const {title, nodes } = req.body;
    const mindmap = new Mindmap({
        title,
        nodes,
        createdBy: req.user._id,
        isPublic: false
    });

    const createdMindmap = await mindmap.save();
    res.status(201).json(createdMindmap);
};

exports.getMindmaps = async (req, res) => {
    const mindmaps = await Mindmap.find({ createdBy: req.user._id });
    res.json(mindmaps);
};

exports.getMindmapById = async (req, res) => {
    const mindmap = await Mindmap.findById(req.params.id);
    if (mindmap) {
        res.json(mindmap);
    } else {
        res.status(404).json({ message: 'Mindmap not found' });
    }
};

exports.updateMindmap = async (req, res) => {
    const {id} = req.params;
    const mindmap = await Mindmap.findById(id);

    if (mindmap.createdBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    mindmap.title = req.body.title || mindmap.title;
    mindmap.nodes = req.body.nodes || mindmap.nodes;

    const updatedMindmap = await mindmap.save();
    res.json(updatedMindmap);

};

