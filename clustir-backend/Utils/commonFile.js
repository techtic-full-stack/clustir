const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


const sendOtpAndExpire = (email, otp, UserModel) => {
    // Send the OTP to the email
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        }
    });


    const mailOptions = {
        from: process.env.MAIL_FROM, // replace with your email
        to: email,
        subject: process.env.MAIL_SUBJECT,
        text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending OTP:", error);
            return;
        }

        // Set timeout to delete OTP after one minute
        setTimeout(() => {
            UserModel.findOneAndUpdate({ email }, { reset_token: null })
                .then(() => {
                    console.log("OTP deleted successfully");
                })
                .catch((err) => {
                    console.error("Error deleting OTP:", err);
                });
        }, 60000); // One minute in milliseconds
    });
};


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) { return res.sendStatus(401); } // if there isn't any token

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // replace with your secret key
        if (err) {
            console.log({ err });
            if (err instanceof jwt.JsonWebTokenError) {
                return res.status(403).send({ status_code: 403, message: 'Invalid Authorization Token' });
            } else if (err instanceof jwt.TokenExpiredError) {
                return res.status(403).send({ status_code: 403, message: 'Authorization Token Expired' });
            } else {
                return res.status(500).send({ status_code: 500, message: 'An error occurred' });
            }
        };
        req.user = user;
        next(); // pass the execution off to whatever request the client intended
    });
};

module.exports = { sendOtpAndExpire, authenticateToken }
