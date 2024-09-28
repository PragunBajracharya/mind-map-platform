import express, { Router } from "express";
import {register, login, forgotPassword, forgotPasswordRequest} from "../controllers/authController";

const authRoutes:Router = express.Router();

authRoutes.route("/register").post(register);
authRoutes.route("/login").post(login);
authRoutes.route("/forgot-password").post(forgotPasswordRequest);
authRoutes.route("/reset-password").put(forgotPassword);

export default authRoutes;
