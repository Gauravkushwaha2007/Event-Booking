const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            const token = authHeader.split(' ')[1];
            const data = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(data._id).select('-password');

            if (!req.user) {
                return res.status(401).json({ error: 'Not authorized' });
            }

            next();
        }
        catch (e) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
    }
    else {
        // 401 is the standard response when authentication credentials are missing.
        return res.status(401).json({ message: 'Not authorized' });
    }
};


const admin = async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        return res.status(403).json({ message: 'Admin access required' });
    }
};


module.exports = { protect, admin };
