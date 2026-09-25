require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_MAIL,
        pass: process.env.GMAIL_PASS
    }
});

exports.sendBookingEmail = async (userEmail, userName, eventTitle ) => {
    try{
      const mailOption = {
        from: process.env.GMAIL_MAIL,
        to: userEmail,
        subject: `Event Booked, ${eventTitle}`,
        html: `<h2> Hi, ${userName}! </h2>
          <p> Your Booking for event <strong>${eventTitle}</strong> is Successfully Confirmed </p>
          <p> Thank Youu for choosing <strong> Eventuu </P>
        `
      };
      await transporter.sendMail(mailOption);
      console.log('Greet mail send')
    }
    catch(e){
      console.error(e);
    }
}

exports.sendOtpEmail = async (email, otp, type) => {

    try {
        const isVerification = type === 'Account_verification';

        const title = isVerification
            ? 'Verify Your Email'
            : 'Confirm Your Booking';

        const message = isVerification
            ? 'Welcome to Event Booking System! Use the OTP below to verify your email.'
            : 'Use the OTP below to confirm your event booking.';

        const mailOption = {
            from: `"Event Booking System" <${process.env.GMAIL_MAIL}>`,
            to: email,
            subject: title,
            html: `
                <div style="
                    max-width: 500px;
                    margin: 30px auto;
                    padding: 30px;
                    background: #ffffff;
                    border-radius: 12px;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                ">

                    <h2 style="color: #2563eb; margin-bottom: 10px;">
                        Event Booking System
                    </h2>

                    <h3 style="color: #222;">
                        ${title}
                    </h3>

                    <p style="color: #555; line-height: 1.6;">
                        ${message}
                    </p>

                    <div style="
                        margin: 25px 0;
                        padding: 18px;
                        background: #f3f6ff;
                        border-radius: 8px;
                    ">
                        <p style="margin: 0 0 8px; color: #777;">
                            Your OTP
                        </p>

                        <strong style="
                            font-size: 30px;
                            letter-spacing: 7px;
                            color: #2563eb;
                        ">
                            ${otp}
                        </strong>
                    </div>

                    <p style="color: #888; font-size: 13px;">
                        Do not share this OTP with anyone.
                    </p>

                    <hr style="border: 0; border-top: 1px solid #eee;">

                    <p style="color: #aaa; font-size: 12px;">
                        © 2026 Event Booking System
                    </p>

                </div>
            `
        };

        await transporter.sendMail(mailOption); 
        console.log(`OTP mail sent to ${email} ...${otp}`);

    } catch (e) {
        console.log(`Error sending ${email} for type ${type}:`, e);
    }
};