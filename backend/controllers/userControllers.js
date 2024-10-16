import bcrypt from "bcryptjs";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_TOKEN

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(401)
        .json({ message: "Email or Username already exists" });
    }

    const newUser = new UserModel({ username, email, password });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
    const {email, password} = req.body
  try {
    const user = await UserModel.findOne({ email })
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'})
    } else if(user.isBlocked){
        return res.status(401).json({message: 'Your account has been blocked'})
    } else {
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(401).json({ message:"Invalid password"})
        }
        const token = jwt.sign({ userId: user._id}, JWT_SECRET, {expiresIn: '24h'})
        return res.status(200).json({ token, userId: user._id})
    }
  } catch (error) {
    console.log(error);
  }
};
