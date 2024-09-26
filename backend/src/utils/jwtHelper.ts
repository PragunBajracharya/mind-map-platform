import jwt from 'jsonwebtoken';

const generateToken = (userId: any) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ userId }, secret, {
        expiresIn: '30d',
    });
};

export default generateToken;