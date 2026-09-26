const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const OtpModel = require('../models/otpModel')
const { sendOtpEmail } = require('../utils/email');


const generateToken = (_id, role)=>{
    return jwt.sign({_id, role}, process.env.JWT_SECRET, {expiresIn: '7d'});
}

const registerUser = async (req, res, next )=>{
    const {name, email, password} = req.body;
    let existUser = await User.findOne({email});
    if(existUser){
        res.status(400).json({error: 'User Already exist'})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash( password, salt );
    try{
        const user = await User.create({
          name,
          email,
          password: hashPassword,
          isVerified: false,
          role: 'user',
        });
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await OtpModel.create({ email, otp, action: 'Account_verification' })
        await sendOtpEmail(user.email, otp, 'Account_verification');
        res.status(201).json({
            message: 'User Registered',
            email: user.email
        });
        
    }
    catch (e) {
        res.status(400).json({error: e.message});
    }
}

const loginUser = async (req, res, next)=>{
    const { email, password } = req.body;
    let user = await User.findOne({email});
    
    if(!user) {
        return res.status(400).json({error: 'Invalid Credentials'});
    }

    let match = await bcrypt.compare(password, user.password);
    if(!match) {
        res.status(400).json({error: 'Invalid Credentials'});
    }

    if(!user.isVerified) {
        let otp = Math.floor(100000 + Math.random()*900000).toString();
        OtpModel.deleteMany({ email, action:'Account_verification' });
        OtpModel.create({ email, otp, action: 'Account_verification' });
        return res.status(400).json({
            error: 'Account not verified. A new OTP has sent to your Email'
        })
    }
    
    res.status(200).json({
        message: 'Login Successfully',
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        }
    })
}

const verifyOTP = async (req, res, next)=>{
    const {email, otp} = req.body
    let isMatch = jwt.verify(otp, process.env.JWT_SECRET);
    if(!isMatch){
        return res.json({})
    }
}


module.exports = {registerUser, loginUser, verifyOTP};