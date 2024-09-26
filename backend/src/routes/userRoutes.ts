import express from 'express';
import { getUsers, createUser } from '../controllers/userController';
const userRoutes = express.Router();

userRoutes.route('/').get(getUsers);
userRoutes.route('/create').post(createUser);

export default userRoutes;