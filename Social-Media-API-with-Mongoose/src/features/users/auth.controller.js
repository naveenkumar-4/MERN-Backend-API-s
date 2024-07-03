import UserModel from "./user.schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json("message:'User already exists");

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ name, email, hashedPassword, gender });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    newUser.tokens = newUser.tokens.concat({ token });
    console.log(`Tokens:${newUser.tokens}`);

    await newUser.save();
    res.status(201).json({ result: newUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env, JWT_SECRET, {
      expiresIn: "1h",
    });
    existingUser.tokens = existingUser.tokens.concat({ token });
    await existingUser.save();
    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).json({ message: "Logged out from all devices" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
