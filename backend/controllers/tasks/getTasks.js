import Task from "../../models/Task.js";

export const getTasks = async (req,res)=>{
    try{
        let tasks;

        if(req.user.role === "admin"){
            tasks = await Task.find().populate("user" , "name email");
        }else{
            tasks = await Task.find({user: req.user._id});
        }
        res.json(tasks);
    }catch(error){
        res.status(500).json({
            message:"Server error"
        })
    }
}