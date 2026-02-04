import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FloatingBackground from "../components/FloatingBackground.jsx";

export default function Home() {
    const { user } = useAuth();

    // If already logged in, go to dashboard
    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-white">
            <FloatingBackground />

            <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
                    <div className="text-xl font-bold tracking-tight text-blue-600">TaskFlow</div>
                    <div className="space-x-4">
                        <Link to="/login" className="font-medium hover:text-blue-600 transition">Login</Link>
                        <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                            Sign Up
                        </Link>
                    </div>
                </nav>
                <main className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
                    <div className="absolute top-0 -z-10 h-full w-full bg-white">
                        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-20 blur-[80px]"></div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        Manage tasks with <br />
                        <span className="text-blue-600">zero friction.</span>
                    </h1>

                    <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
                        The ultimate Frontend Intern demo app featuring Secure Auth,
                        Real-time Dashboards, and full CRUD capabilities.
                    </p>
                </main>
        </div>
    );
}
