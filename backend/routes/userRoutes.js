const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');
const router = express.Router();

router.route('/').get(getUsers);
router.route('/create').post(createUser);

module.exports = router;