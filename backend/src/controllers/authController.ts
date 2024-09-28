import bcrypt from "bcryptjs";
import generateToken from "../utils/jwtHelper";
import { Request, Response } from "express";
import User from "../models/userModel";
import Token from "../models/tokenModel";
import sendEmail from "../utils/email/sendEmail";
import { send } from "process";

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
		message: "User logges out successfully",
	});
};

export const forgotPasswordRequest = async (req: Request, res: Response) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				status: "fail",
				message: "User not found",
			});
		}
		const token = await Token.findOne({ userId: user._id });
		if (token) await token.deleteOne();
		const newToken = new Token({
			userId: user._id,
			token: generateToken(user._id),
		});
		const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${newToken.token}&userId=${user._id}`;
		sendEmail(
			user.email,
			"Password Reset Request",
			{
				name: user.name,
				link: resetLink,
			},
			""
		);
		res.status(200).json({
			status: "success",
			message: "Password reset link sent to your email",
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			message: "Server error",
		});
	}
};

export const forgotPassword = async (req: Request, res: Response) => {
	const { userId, token, password } = req.body;

	try {
		const resetToken = await Token.findOne({ userId });
		if (!resetToken) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid or expired token",
			});
		}
		const isValid = await bcrypt.compare(token, resetToken.token);
		if (!isValid) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid or expired token",
			});
		}
		const hash = await bcrypt.hash(password, 10);
		await User.updateOne({ _id: userId }, { $set: { password: hash } });
		const updatedUser = await User.findOne({ _id: userId });
		if (updatedUser) {
			sendEmail(
				updatedUser.email,
				"Password Reset Success",
				{
					name: updatedUser.name,
				},
				""
			);
		} else {
			return res.status(404).json({
				status: "fail",
				message: "User not found",
			});
		}
		await resetToken.deleteOne();
		res.status(200).json({
			status: "success",
			message: "Password reset successful",
		});
	} catch (error) {
		res.status(500).json({
			status: "fail",
			message: "Server error",
		});
	}
};
