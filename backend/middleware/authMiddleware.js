import jwt from 'jsonwebtoken';

export const authenticateToken = (req,res,next) => {
    const jwtSecret = process.env.JWT_SECRET;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error: 'No Token Provided'});
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if(err){
            return res.status(403).json({ error: 'Invalid Token'});
        }
        req.user = user;
        next();
    });
}