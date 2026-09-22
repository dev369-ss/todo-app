const { createUser, findUserbyEmail } = require("../services/user.service.js");
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
    console.log("api is call")
    const { name, email, password, phone } = req.body
    try {
        const existingUser = await findUserbyEmail(email)
        if (existingUser) {
            return res.status(400).json({ "message": "User already exists" })
        } else {
            const newUser = await createUser({name,email,password,phone})
            return res.status(201).json({
                "message": "User signed Up successfully",
                "data": newUser
            })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await findUserbyEmail(email)
        if (!existingUser) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await existingUser.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });
        // Generate JWT token
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email, role: existingUser.role || "user" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            message: "Login successful",
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                phone:existingUser.phone,
                role: existingUser.role,
            },
            token,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {signUp,signIn}