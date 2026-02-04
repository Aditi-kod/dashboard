import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    const task = await Task.create({
        title: req.body.title,
        user: req.user._id
    });
    res.status(201).json(task);
};

export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
};

export const getTask = async (req, res) => {
    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
};

export const updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true }
    );
    res.json(task);
};

export const deleteTask = async (req, res) => {
    await Task.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    });
    res.json({ message: "Task deleted" });
};
