const User = require("../models/users.model.js")

const createUser = async ({ name, email, password, phone }) => {
    const newUser = new User({
        name,
        email,
        password,
        phone
    })
    await newUser.save();
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return userResponse;
}

const findUserbyEmail = async (email) => {
    const existingUser = await User.findOne({ email });
    return existingUser
}

module.exports = { createUser, findUserbyEmail }