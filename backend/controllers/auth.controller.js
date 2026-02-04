import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields required" });

    const userExists = await User.findOne({ email });
    if (userExists)
        return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    res.status(201).json({
        token: generateToken(user._id),
        user: { id: user._id, name: user.name, email: user.email }
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
        return res.status(401).json({ message: "Invalid credentials" });

    res.json({
        token: generateToken(user._id),
        user: { id: user._id, name: user.name, email: user.email }
    });
};
