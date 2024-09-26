import { body } from "express-validator";

export const userValidation = [
	body("name")
		.isLength({ min: 3 })
		.withMessage("Name must be at least 3 characters long"),
	body("email").isEmail().withMessage("Please provide a valid email"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];
