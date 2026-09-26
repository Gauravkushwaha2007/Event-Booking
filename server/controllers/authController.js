const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const OtpModel = require('../models/otpModel');
const { sendOtpEmail } = require('../utils/email');


const generateToken = (_id, role) => {
    return jwt.sign(
        { _id, role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};


const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                error: 'User Already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            isVerified: false,
            role: 'user'
        });
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await OtpModel.create({ email, otp, action: 'Account_verification' });
        await sendOtpEmail( user.email, otp, 'Account_verification' );

        return res.status(201).json({
            message: 'User Registered. OTP sent to your email.',
            email: user.email
        });

    } catch (e) {
        return res.status(400).json({
            error: e.message
        });
    }
};


const loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'Invalid Credentials'
            });
        }
        const match = await bcrypt.compare( password, user.password );
        if (!match) {
            return res.status(400).json({
                error: 'Invalid Credentials'
            });
        }

        if (!user.isVerified) {
            const otp = Math.floor( 100000 + Math.random() * 900000 ).toString();

            await OtpModel.deleteMany({ email, action: 'Account_verification' });
            await OtpModel.create({ email, otp, action: 'Account_verification' });

            await sendOtpEmail( email, otp, 'Account_verification' );

            return res.status(400).json({
                error: 'Account not verified. A new OTP has been sent to your email.'
            });
        }

        return res.status(200).json({
            message: 'Login Successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            }
        });

    } catch (e) {
        return res.status(400).json({
            error: e.message
        });
    }
};


const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const record = await OtpModel.findOne({ email, otp, action: 'Account_verification'});
        if (!record) {
            return res.status(400).json({
                error: 'Invalid or expired OTP'
            });
        }
        const user = await User.findOneAndUpdate(
            { email },
            { isVerified: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        await OtpModel.deleteMany({  email, action: 'Account_verification' });
        return res.status(200).json({
            message: 'Email verified successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            }
        });

    } catch (e) {
        return res.status(400).json({
            error: e.message
        });
    }
};


module.exports = { registerUser, loginUser, verifyOTP };