import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import TaskForm from "../components/TaskForm";
import { Link } from "react-router-dom";
import {
    FiLogOut, FiPlus, FiSearch, FiTrash2,
    FiCheckCircle, FiClock, FiLayers
} from "react-icons/fi"; // Install react-icons

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data);
        } catch (err) {
            setError("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const deleteTask = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (err) {
            alert("Failed to delete task");
        }
    };

    const handleLogout = () => {
        logout();
        window.location.href = "/login";
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            {/* --- SIDEBAR --- */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col p-6 hidden md:flex">
                <div className="flex items-center gap-2 text-2xl font-bold mb-10 text-blue-400">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">T</div>
                    TaskFlow
                </div>
                <nav className="flex-1 space-y-2">
                    <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded bg-blue-600/10 text-blue-400 border border-blue-600/20">
                        <FiLayers /> Dashboard
                    </Link>
                </nav>
                <button
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-3 p-3 text-slate-400 hover:text-white transition"
                >
                    <FiLogOut /> Sign Out
                </button>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.name || 'Intern'}!</h1>
                        <p className="text-slate-500">{user?.email}</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center gap-2 transition-all active:scale-95"
                    >
                        <FiPlus /> New Task
                    </button>
                </header>

                {/* --- STATS CARDS --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard icon={<FiLayers className="text-blue-600"/>} label="Total Tasks" value={tasks.length} />
                    <StatCard icon={<FiCheckCircle className="text-green-600"/>} label="Completed" value={tasks.filter(t => t.completed).length} color="text-green-600" />
                    <StatCard icon={<FiClock className="text-orange-500"/>} label="Pending" value={tasks.filter(t => !t.completed).length} color="text-orange-500" />
                </div>

                {/* --- TASK TABLE CONTAINER --- */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="font-bold text-lg text-slate-800">Active Tasks</h2>
                        <div className="relative w-full md:w-64">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="p-0">
                        {loading ? (
                            <div className="p-20 text-center text-slate-400">Loading your tasks...</div>
                        ) : filteredTasks.length > 0 ? (
                            <ul className="divide-y divide-slate-100">
                                {filteredTasks.map((task) => (
                                    <li key={task._id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition group">
                                        <div className="flex items-center gap-4">
                                            <input type="checkbox" checked={task.completed} className="w-5 h-5 rounded-full border-slate-300 text-blue-600 focus:ring-blue-500" />
                                            <span className={`text-slate-700 font-medium ${task.completed ? 'line-through text-slate-400' : ''}`}>
                                                {task.title}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => deleteTask(task._id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-20 text-center">
                                <p className="text-slate-400 italic mb-4">No tasks found. Time to relax! ☕</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* --- ADD TASK MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Create New Task</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                        </div>
                        <TaskForm onAdd={() => { fetchTasks(); setIsModalOpen(false); }} />
                    </div>
                </div>
            )}
        </div>
    );
}

// Sub-component for Stats to keep code clean
function StatCard({ icon, label, value, color = "text-slate-900" }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl">
                {icon}
            </div>
            <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{label}</p>
                <p className={`text-2xl font-black ${color}`}>{value}</p>
            </div>
        </div>
    );
}
