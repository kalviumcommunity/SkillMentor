import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

import { UserModel } from "../model/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendMail from "../utils/mail.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

const userRoute = express.Router();



userRoute.post(
  "/signup",
  catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("Name, email, and password are required.", 400));
    }

    // ✅ Validate email format early
    if (!validator.isEmail(email)) {
      return next(new ErrorHandler("Invalid email format.", 400));
    }

    console.log(email); // for debugging

    const existingUser = await UserModel.findOne({ email });

    // ✅ Resend activation if user exists but not activated
    if (existingUser && !existingUser.isActivated) {
      const token = jwt.sign({ id: existingUser._id }, process.env.SECRET, {
        expiresIn: "1d",
      });
      const activationUrl = `http://localhost:${process.env.PORT}/user/activation/${token}`;

      try {
        await sendMail({
          email: existingUser.email,
          subject: "Activate your account",
          message: `Hi ${existingUser.name}, you previously signed up but didn’t activate your account. Activate using the link: ${activationUrl}`,
        });
      } catch (error) {
        return next(new ErrorHandler("Failed to resend activation email.", 500));
      }

      return res.status(200).json({
        status: true,
        message: "User exists but is not activated. Activation link resent.",
      });
    }

    // ✅ User already exists
    if (existingUser) {
      return next(new ErrorHandler("User already exists with this email.", 400));
    }

    // ✅ Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    const activationUrl = `http://localhost:${process.env.PORT}/user/activation/${token}`;

    // ✅ Try sending activation email
    try {
      await sendMail({
        email: newUser.email,
        subject: "Activate your account",
        message: `Hello ${newUser.name}, please activate your account: ${activationUrl}`,
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to send activation email.", 500));
    }

    await newUser.save();

    res.status(201).json({
      status: true,
      message: "Registration successful. Please check your email to activate.",
    });
  })
);

userRoute.get("/activation/:token", catchAsyncError(async (req, res, next) => {
  const token = req.params.token;
  if (!token) return next(new ErrorHandler("Token not found", 404));

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return next(new ErrorHandler("Token is not valid", 400));

    await UserModel.findByIdAndUpdate(decoded.id, { isActivated: true });
    res.redirect("http://localhost:5173/login");
  });
}));

userRoute.post("/login", catchAsyncError(async (req, res, next) => {
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();

  if (!email || !password) return next(new ErrorHandler("Email and password are required", 400));
  if (!validator.isEmail(email)) return next(new ErrorHandler("Invalid email format", 400));
  if (password.length < 6) return next(new ErrorHandler("Password must be at least 6 characters", 400));

  const user = await UserModel.findOne({ email });
  if (!user) return next(new ErrorHandler("No account found. Please sign up.", 400));
  if (!user.isActivated) return next(new ErrorHandler("Account not activated. Check your email.", 403));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new ErrorHandler("Incorrect password", 400));

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d" });

  res.cookie("accesstoken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }
  });
}));

userRoute.post("/change-password", catchAsyncError(async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;
  if (!email || !oldPassword || !newPassword) return next(new ErrorHandler("All fields are required", 400));

  const user = await UserModel.findOne({ email });
  if (!user) return next(new ErrorHandler("User not found", 404));

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return next(new ErrorHandler("Old password is incorrect", 400));

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ status: true, message: "Password changed successfully" });
}));

userRoute.post("/forgot-password", catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ErrorHandler("Email is required", 400));

  const user = await UserModel.findOne({ email });
  if (!user) return next(new ErrorHandler("User not found", 404));

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "15m" });
  const resetLink = `http://localhost:${process.env.PORT}/user/reset-password/${token}`;

  await sendMail({
    email: user.email,
    subject: "Reset your password",
    message: `Click this link to reset your password: ${resetLink}`,
  });

  res.status(200).json({ status: true, message: "Password reset link sent to your email" });
}));

userRoute.post("/reset-password/:token", catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) return next(new ErrorHandler("New password is required", 400));

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) return next(new ErrorHandler("Invalid or expired token", 400));

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ status: true, message: "Password has been reset successfully" });
  } catch (err) {
    return next(new ErrorHandler("Token expired or invalid", 400));
  }
}));

export default userRoute;
