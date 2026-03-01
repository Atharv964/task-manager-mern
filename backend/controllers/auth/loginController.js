import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "./tokenService.js";

export const loginUser= async(req,res)=>{
    try{
        const {email,password} = req.body;

        //check fields
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        //Find user
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }

        //Compare Password
        const isPasswordCorrect = await bcrypt.compare(password , user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Wrong Password"
            });
        }

        //Success
        res.status(200).json({
            message:"Login Successful",
            token: generateToken(user._id),
            user:{
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                token: generateToken(user._id)
            }
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server error"
        });
    }
}