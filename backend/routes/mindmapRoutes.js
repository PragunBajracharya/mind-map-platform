const express = require('express');
const { createMindmap, getMindmaps, getMindmapById, updateMindmap } = require('../controllers/mindmapController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();    

router.route('/').post(protect, createMindmap).get(protect, getMindmaps);

router.route('/:id').get(protect, getMindmapById).put(protect, updateMindmap);

module.exports = router;