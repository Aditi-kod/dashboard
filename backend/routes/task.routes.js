import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
