import jwt from 'jsonwebtoken';
import User from '../models/userModel';

import { Request, Response } from 'express';

export const protect = async (req: Request, res: Response, next: any) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Not authorized' });
    }
}