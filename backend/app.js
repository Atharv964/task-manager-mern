import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Task from "./models/Task.js";
import cors from "cors";
import { protect } from "./middleware/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js"

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/" , (req,res)=>{
    res.send("Let's Start The Project");
});

app.get("/dashboard" ,protect, (req,res)=>{
    res.json({
        message:"Welcome to dashboard",
        user: req.user
    })
    
})

app.listen(PORT , ()=>{
    console.log(`App is listening to port ${PORT}`);
});