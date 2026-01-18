const jwt = require('jsonwebtoken');
const { readDB } = require('../server-simple');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

            // Get user from the token
            const db = readDB();
            const user = db.users.find(u => u._id === decoded.id);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            req.user = { id: user._id };
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
