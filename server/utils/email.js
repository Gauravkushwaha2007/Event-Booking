require('dotenv').config()

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
    },
    

})

exports.sendOtpMail = async (email, otp, type ) => {
    
    try{
      const mailOption = {
        from: process.env.GMAIL_MAIL,
        to: email,
        subject: 'Your Otp Code',
        text: `Your Otp is ${otp}`
      }
    
      await transporter.sendMail(mailOption);
      console.log(`OTP mail send to ${email} ...${otp}`);
    }
    catch(e){
        console.log(`Error sending ${email} for type ${type}: `, e);
    }
}