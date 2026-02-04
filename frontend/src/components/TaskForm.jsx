import { useState } from "react";
import api from "../services/api";

export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return setError("Task title required");

        try {
            setLoading(true);
            await api.post("/tasks", { title });
            setTitle("");
            onAdd();
        } catch (err) {
            setError("Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                className="flex-1 border p-2 rounded"
                placeholder="New task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button
                disabled={loading}
                className="bg-blue-600 text-white px-4 rounded"
            >
                {loading ? "Adding..." : "Add"}
            </button>

            {error && <p className="text-red-500 mt-1">{error}</p>}
        </form>
    );
}
