const UserModel = require("../Models/User");
// const getUser=require("../Models/getalluser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup function
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "User already exists, you can login", success: false });
        }
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = "Auth failed, email or password is wrong";
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        const jwttoken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_Secret, { expiresIn: '24h' });
        res.status(201).json({
            message: "Login successful",
            success: true,
            jwttoken,
            email,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};



// Function to update a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({
            message: "User updated successfully",
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login,
    updateUser
}
