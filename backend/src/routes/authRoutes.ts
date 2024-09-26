import express, { Router } from "express";
import {register, login} from "../controllers/authController";

const authRoutes:Router = express.Router();

authRoutes.route("/register").post(register);
authRoutes.route("/login").post(login);

export default authRoutes;
