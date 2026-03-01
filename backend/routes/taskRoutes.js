import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import { createTask } from "../controllers/tasks/createTask.js";
import { getTasks } from "../controllers/tasks/getTasks.js";
import { updateTask } from "../controllers/tasks/updateTask.js";
import { deleteTask } from "../controllers/tasks/deleteTask.js";

const router = express.Router();

// Protect all task routes
router.use(protect);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;