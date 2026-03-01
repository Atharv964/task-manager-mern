import Task from "../../models/Task.js";

export const updateTask = async (req,res)=>{
    try{
        //find task that belong to logi user
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }
        
        //Update fields if provided
        if(req.body.title !== undefined){
            task.title = req.body.title;
        }

        if(req.body.completed !== undefined){
            task.completed = req.body.completed;
        }

        //Save updated task
        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch(error){
        res.status(500).json({
            message: "Server error"
        });
    }
}