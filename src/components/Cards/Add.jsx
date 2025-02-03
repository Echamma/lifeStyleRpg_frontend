import axios from "axios";
import { useEffect, useState } from "react";

const AddCard = ({ id, setAddButton }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [exp, setExp] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(title && desc && exp);
    }, [title, desc, exp]);

    const handleClick = async () => {
        try {
            await axios.post("http://localhost:3000/tasks/addTask", {
                user_id: id,
                title: title,
                exp: exp,
                description: desc,
            });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <article className="bg-white p-4 rounded-lg shadow-md space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Add New Task</h3>
            </div>
            
            <div className="space-y-3">
                <input
                    className="w-full p-2 border rounded"
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength="50"
                    placeholder="Task Title"
                />
                
                <textarea
                    className="w-full p-2 border rounded"
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Task Description"
                    rows="3"
                />
                
                <input
                    className="w-full p-2 border rounded"
                    onChange={(e) => setExp(e.target.value)}
                    maxLength="3"
                    placeholder="Experience Points"
                    type="number"
                />
            </div>

            <button
                onClick={handleClick}
                disabled={!isFormValid}
                className={`w-full py-2 rounded ${isFormValid 
                    ? "bg-blue-500 text-white hover:bg-blue-600" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"}`
                }
            >
                Add Task
            </button>
        </article>
    );
};

export default AddCard;