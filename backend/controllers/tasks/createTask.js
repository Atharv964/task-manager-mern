import Task from "../../models/Task.js";

export const createTask = async (req,res)=>{
    try{
        const {title} = req.body;

        if(!title){
            return res.status(400).json({
                message:"Title is required"
            });
        }

        const task = await Task.create({
            title,
            user:req.user._id
        });

        res.status(201).json(task);
    } catch(error){
        res.status(500).json({
            message: "Server error"
        });
    }
}