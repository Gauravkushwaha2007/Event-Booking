const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// User authentication middleware
const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify( token, process.env.JWT_SECRET );

            req.user = await User.findById(decoded._id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            next();

        } catch (e) {
            return res.status(401).json({
                message: 'Invalid or expired token'
            });
        }

    } else {
        return res.status(401).json({
            message: 'Not authorized, No Token'
        });
    }
};


// Check for admin
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            message: 'Admin access required'
        });
    }
};

module.exports = { protect, admin };