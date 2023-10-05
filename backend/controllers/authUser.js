import express from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import { handleError } from "../error.js";
// import UserModel from "../models/UserModel.js";
export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

    const { password, ...othersData } = newUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(othersData);
  } 
  catch(err){
    if(err.code===1100 && err.keyPattern && err.keyPattern.email===1){
      res.status(400).json({error:'email address is already in use'});
    }
    else{
      next(err);
    }
  }
}
export const signin = async (req, res, next) => {
    try {
      const user = await User.findOne({ userName: req.body.userName });
  
      if (!user) return next(handleError(404, "User not found"));
  
      const isCorrect = await bcrypt.compare(req.body.password, user.password);
  
      if (!isCorrect) return next(handleError(400, "Wrong password"));
  
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      const { password, ...othersData } = user._doc;
  
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(othersData);
    } catch (err) {
      next(err);
    }
  };
