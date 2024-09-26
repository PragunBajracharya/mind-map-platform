import User from "../models/userModel";
import bcrypt from "bcryptjs";
import generateToken from "../utils/jwtHelper";
import { Request, Response } from "express";
import { ReadPosition } from "fs";

export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({
				status: "fail",
				message: "User already exists",
			});
		}

		const user = await User.create({ name, email, password });

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			message: "Server error",
		});
	}
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
			res.status(200).json({
				status: "success",
				data: {
					user: {
						_id: user._id,
						name: user.name,
						email: user.email,
						token: generateToken(user._id),
					},
				},
			});
		} else {
			res.status(401).json({
				status: "fail",
				message: "Invalid email or password",
			});
		}
	} catch (error) {
		res.status(500).json({
			status: "fail",
			message: "Server error",
		});
	}
};

export const signout = (req: Request, res: Response) => {
	res.cookie("token", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.clearCookie("token");
	res.status(200).json({ 
		status: "success",
		message: "User logges out successfully" 
	});
};
