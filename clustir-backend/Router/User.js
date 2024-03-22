// routes/users.js
const express = require("express");
const router = express.Router();
const { register, verifyUser, resendOtp, loginUser, addMurchantBusiness, getUserById } = require("../Controller");
const { authenticateToken } = require("../Utils/commonFile");
const { userFormValidation, resendMailValidation, businessAndBankingValidation } = require("../Utils/validationFile");

router.post("/register", userFormValidation, register);
router.patch("/verifyUser", verifyUser);
router.patch("/resendOtp", resendMailValidation, resendOtp);
router.post("/login", userFormValidation, loginUser);
router.post("/addBusiness", authenticateToken, businessAndBankingValidation, addMurchantBusiness);
router.get("/getUserById/:id", authenticateToken, getUserById);

module.exports = router;
