import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

//middleware for jwt token
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: 'Access Denied. Token Missing.'})
    }

    const token = authHeader.split(' ')[1];
    try {
        const decode =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};
