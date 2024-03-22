
const UserModel = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendOtpAndExpire } = require("../Utils/commonFile");

/**
 * Register a new user
 */
const register = async (req, res) => {
  try {
    let { body } = req;
    // Check if user already exists
    let whereQuery = {
      email: body.email,
    };
    UserModel.findOne(whereQuery)
      .then(async (response) => {
        if (response) {
          return res.status(409).json({
            status_code: 409,
            message: "User already exists",
          });
        } else {
          // the OTP should expire in one minute
          const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6 digit OTP
          // Send the OTP to the email
          await sendOtpAndExpire(body.email, otp, UserModel);

          // Create new user
          let newUser = new UserModel({
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            reset_token: otp,
            // Add other user properties here
          });
          newUser.save()
            .then((savedUser) => {
              return res.status(201).json({
                status_code: 200,
                message: "User registered successfully",
                data: {
                  email: savedUser.email,
                  password: savedUser.password,
                },
              });
            })
            .catch((error) => {
              console.error("Error registering user:", error);
              return res.status(500).json({ status_code: 500, error: "An error occurred" });
            });
        }
      })
      .catch((error) => {
        console.error("Error checking user existence:", error);
        return res.status(500).json({ status_code: 500, error: "An error occurred" });
      });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ status_code: 500, error: "An error occurred" });
  }
}

/**
 * Verify the OTP sent to the user
 */
const verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ status_code: 400, message: 'Email and OTP are required' });

    const userDetail = await UserModel.findOne({ email })
    if (!userDetail) {
      return res.status(404).json({ status_code: 404, message: 'User not found' });
    }
    if (userDetail && userDetail.reset_token === Number(otp)) {
      await UserModel.updateOne({ email }, { is_verified: true });
      return res.status(200).json({ status_code: 200, message: 'OTP verification successful' });
    }
    return res.status(400).json({ status_code: 400, message: 'OTP verification failed' });

  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Resend the OTP to the user
 */
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const userDetail = await UserModel.findOne({ email });
    if (!userDetail) {
      return res.status(404).json({ status_code: 404, message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6 digit OTP

    await UserModel.updateOne({ email }, { reset_token: otp });

    await sendOtpAndExpire(email, otp, UserModel);

    return res.status(200).json({ status_code: 200, message: 'OTP sent successfully' });
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ status_code: 500, error: 'An error occurred' });
  }
}

/**
* Login a user
*/
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ status_code: 404, message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ status_code: 401, message: 'Invalid password' });
    }

    if (!user.is_verified) {
      return res.status(401).json({ status_code: 401, message: 'User not verified' });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT_SECRET, // replace with your secret key
      { expiresIn: '1h' } // token expires in 1 hour
    );

    const response = await UserModel.findOneAndUpdate({ email }, { is_login: true });

    return res.status(200).json({ status_code: 200, response, token });
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: 'An error occurred' });
  }
};

const addMurchantBusiness = async (req, res) => {
  try {
    if (!req.query.step) {
      return res.status(400).json({ status_code: 400, message: 'step is required in query parameter' });
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // replace with your secret key

    if (!decoded) {
      return res.status(403).json({ status_code: 403, message: 'Unauthorized' });
    }
    const user = await UserModel.find({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ status_code: 404, message: 'User not found' });
    }
    switch (Number(req.query.step)) {
      case 1:
        user[0].merchantBusiness = req.body;
        await user[0].save();
        return res.status(200).json({ status_code: 200, message: 'Business data added successfully' });
      case 2:
        user[0].marchantBanking = req.body;
        await user[0].save();
        await UserModel.updateOne({ email: decoded.email }, { is_onBoard: true });
        return res.status(200).json({ status_code: 200, message: 'Banking Info added successfully' });
      default:
        return res.status(400).json({ status_code: 400, message: 'Invalid step' });
    }

  } catch (error) {
    console.log({ error })
    return res.status(500).json({ status_code: 500, error: 'An error occurred' });
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status_code: 404, message: 'User not found' });
    }
    return res.status(200).json({ status_code: 200, data: user });
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ status_code: 500, error: 'An error occurred' });
  }
}

module.exports = { register, verifyUser, resendOtp, loginUser, addMurchantBusiness, getUserById }