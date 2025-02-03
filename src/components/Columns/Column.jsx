import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Card from "../Cards/Card";
import AddCard from "../Cards/Add";
import ProfileBadge from "../User/Logo"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const TaskComponent = ({ id }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddVisible, setAddVisible] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`, {
        params: { id },
        headers: { "Content-Type": "application/json" }
      });
      
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = () => {
    fetchTasks();
    setAddVisible(false);
  };

  const onDone = async (exp, taskId) => {
    try {
      await axios.post(`${API_BASE_URL}/tasks/addExp`, {
        task_id: taskId,
        user_id: id,
        exp
      });
      await fetchTasks();
      setUpdateTrigger(prev => prev + 1); // Trigger profile update
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [id,isAddVisible]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto">
        <ProfileBadge userId={id} updateTrigger={updateTrigger} />
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl text-white font-bold">Tasks</h1>
          
        </div>

        {tasks.length === 0 ? (
          <div>
          <p className="text-white text-center">No tasks found. Add your first task!</p>
          <button
          onClick={() => setAddVisible(!isAddVisible)}
          className="bg-blue-500 text-white px-4 py-2 my-5 flex justify-center rounded-full hover:bg-blue-600 transition-colors w-full">
          {isAddVisible ? "Close" : "Add Task"}
        </button>
        </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card
                key={task.task_id}
                id={task.task_id}
                Title={task.title}
                Desc={task.description}
                Exp={task.exp}
                onDone={onDone}
              />
            ))}
            <button
            onClick={() => setAddVisible(!isAddVisible)}
            className="bg-blue-500 text-white px-4 py-2 my-5 flex justify-center rounded-full hover:bg-blue-600 transition-colors w-full"
          >
            {isAddVisible ? "Close" : "Add Task"}
          </button>
          </div>
        )}

        {isAddVisible && (
          <AddCard
            id={id}
            onTaskAdded={handleTaskAdded}
            onClose={() => setAddVisible(false)}
          />
        )}
      </div>
    </div>
  );
};

TaskComponent.propTypes = {
  id: PropTypes.number.isRequired
};

export default TaskComponent;