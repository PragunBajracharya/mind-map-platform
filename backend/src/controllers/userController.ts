import User from "../models/userModel";

import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).json({
			status: "success",
			results: users.length,
			data: {
				users,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: (error as Error).message,
		});
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const userExists = await User.findOne({ email: req.body.email });
		if (userExists) {
			return res.status(400).json({
				status: "fail",
				message: "User already exists",
			});
		}

		const newUser = await User.create(req.body);
		res.status(201).json({
			status: "success",
			data: {
				user: newUser,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: (error as Error).message,
		});
	}
};
