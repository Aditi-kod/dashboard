import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password)
            return setError("All fields are required");

        if (password.length < 6)
            return setError("Password must be at least 6 characters");

        try {
            setLoading(true);
            await api.post("/auth/signup", { name, email, password });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="w-80 p-6 border rounded" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Sign Up</h2>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input
                    className="w-full border p-2 mb-2"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="w-full border p-2 mb-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full border p-2 mb-4"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    disabled={loading}
                    className="w-full bg-green-600 text-white p-2 rounded"
                >
                    {loading ? "Creating..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}
