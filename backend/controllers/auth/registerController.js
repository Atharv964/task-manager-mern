import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req,res)=>{
    try{
        const {name , email, password} = req.body;

        //Check if all fields exists
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //check if user already exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }


        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        //Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        //Send Response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
}