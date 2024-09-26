import Mindmap from '../models/mindmapModel';

import { Request, Response } from 'express';
import '../types/express'; // Import the extended types

export const createMindmap = async (req: Request, res: Response) => {
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

export const getMindmaps = async (req: Request, res: Response) => {
    const mindmaps = await Mindmap.find({ createdBy: req.user._id });
    res.json(mindmaps);
};

export const getMindmapById = async (req: Request, res: Response) => {
    const mindmap = await Mindmap.findById(req.params.id);
    if (mindmap) {
        res.json(mindmap);
    } else {
        res.status(404).json({ message: 'Mindmap not found' });
    }
};

export const updateMindmap = async (req: Request, res: Response) => {
    const {id} = req.params;
    const mindmap = await Mindmap.findById(id);

    if (!mindmap) {
        return res.status(404).json({ message: 'Mindmap not found' });
    }

    if (mindmap.createdBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    mindmap.title = req.body.title || mindmap.title;
    mindmap.nodes = req.body.nodes || mindmap.nodes;

    const updatedMindmap = await mindmap.save();
    res.json(updatedMindmap);

};

