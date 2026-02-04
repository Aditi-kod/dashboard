import { motion } from "framer-motion";

const tasks = [
    { id: 1, color: "bg-blue-400", size: "w-32 h-10", initialX: "10%", initialY: "20%" },
    { id: 2, color: "bg-green-400", size: "w-24 h-8", initialX: "70%", initialY: "15%" },
    { id: 3, color: "bg-purple-400", size: "w-40 h-12", initialX: "15%", initialY: "60%" },
    { id: 4, color: "bg-orange-400", size: "w-28 h-10", initialX: "80%", initialY: "70%" },
];

export default function FloatingBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20 pointer-events-none">
            {tasks.map((task) => (
                <motion.div
                    key={task.id}
                    className={`${task.color} ${task.size} rounded-lg shadow-xl absolute blur-[2px]`}
                    initial={{ x: task.initialX, y: task.initialY, opacity: 0.4 }}
                    animate={{
                        y: [task.initialY, "100vh"], // Moves downward
                        rotate: [0, 45, -45, 0],    // Slight wobbling
                    }}
                    transition={{
                        duration: Math.random() * 10 + 15, // Randomized slow speed
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {/* Subtle line to look like a task */}
                    <div className="w-1/2 h-1 bg-white/30 m-2 rounded" />
                </motion.div>
            ))}
        </div>
    );
}
