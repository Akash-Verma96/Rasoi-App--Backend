import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, phoneNo, age, gender } =
      req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
      phoneNo,
      age,
      gender,
    });

    const savedUser = await user.save();

    const token = savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({
      message: "User Saved Successfully...",
      data: savedUser,
    });
  } catch (error) {
    res.status(404).send("ERROR : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;


    const user = await User.findOne({ emailId: emailId });

    if (!user){
      throw new Error("Invalid credential!");
    }

    const isValid = await user.isValidPassword(password);

    if (isValid) {
      const token = user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.json({
        message: "User logged in successfully...",
        data: user,
      });
    } else res.status(401).send("Invalid Credential !");
  } catch (error) {
    res.status(400).send( error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });

    res.send("User logged out succesfully !");
  } catch (error) {
    res.send(error.message);
  }
});

export default authRouter;
