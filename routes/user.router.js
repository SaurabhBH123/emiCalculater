const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt")
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,password} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash) =>{
            // Store hash in your password DB.
            const user = new UserModel({name,email,password:hash})
            await user.save()
            res.send({"msg":"registered successfully!"})
        });
    } catch (error) {
        res.send(error)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.query
    try {
        const user = UserModel.findOne({email})
        console.log(user.password)
        res.send("done")
    } catch (error) {
        res.send(error)
    }
})

module.exports = {userRouter}