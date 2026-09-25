const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res, next )=>{
    const {name, email, password} = req.body;
    let existUser = User.findOne({email});
    if(existUser){
        res.status(400).json({error: 'User Already exist'})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash( password, salt );
    try{
        const user = new User({
              name,
              email,
              password: hashPassword
            });
        await user.save();
        res.status(201).json({message: 'User Created'});

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        
    }
    catch (e) {
        res.status(400).json({error: e.message})
    }
}

const loginUser = ()=>{

}

const verifyOTP = ()=>{

}


module.exports = {registerUser, loginUser, verifyOTP};