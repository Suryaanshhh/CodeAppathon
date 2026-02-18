const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendOTPEmail } = require('../utils/emailService');


const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};


exports.signup = async (req, res) => {
    try {
        const { name, email, password, role, city } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            city
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId: user.id
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.requestSignupOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // check if already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);

        // create temporary user record
        const user = await User.create({
            email,
            otp,
            otpExpiry: expiry,
            isEmailVerified: false
        });

        await sendOTPEmail(email, otp);

        res.json({
            success: true,
            message: "OTP sent for signup"
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.verifySignupOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        await user.update({
            otp: null,
            otpExpiry: null,
        });

        res.json({
            success: true,
            message: "Email verified. Complete registration."
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.completeSignup = async (req, res) => {
    try {
        const { email, name, password, role, city } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await user.update({
            name,
            password: hashedPassword,
            role,
            city
        });

        res.status(201).json({
            success: true,
            message: "Signup completed successfully"
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.loginWithPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);
        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, role: user.role, city: user.city }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.requestOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ message: "User not found" });

      
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000); 

        await user.update({ otp, otpExpiry: expiry });

        try {
            await sendOTPEmail(email, otp);
            res.json({ success: true, message: "OTP sent to your registered email" });
        } catch (mailError) {
            console.error("Mail Error:", mailError);
            res.status(500).json({ success: false, message: "Failed to send email. Try again later." });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.loginWithOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
            return res.status(401).json({ message: "Invalid or expired OTP" });
        }

      
        await user.update({ otp: null, otpExpiry: null });

        const token = generateToken(user);
        res.json({
            success: true,
            token,
            user: { id: user.id, name: user.name, role: user.role, city: user.city }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};