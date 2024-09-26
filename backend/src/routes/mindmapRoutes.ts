import express from 'express';
import { createMindmap, getMindmaps, getMindmapById, updateMindmap } from '../controllers/mindmapController';
import { protect } from '../middlewares/authMiddleware';

const mindmapRoutes = express.Router();    

mindmapRoutes.route('/').post(protect, createMindmap).get(protect, getMindmaps);

mindmapRoutes.route('/:id').get(protect, getMindmapById).put(protect, updateMindmap);

export default mindmapRoutes;