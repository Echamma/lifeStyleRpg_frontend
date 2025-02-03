import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const ProfileBadge = ({ userId, updateTrigger }) => {
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [username, setUsername] = useState("Adventurer");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user`, {
          params: { id: userId },
          headers: { "Content-Type": "application/json" }
        });
        
        setExp(response.data.exp);
        setUsername(response.data.username || "Adventurer");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId, updateTrigger]); // Add updateTrigger to dependencies

  useEffect(() => {
    const newLevel = Math.floor(exp / 100) + 1;
    const newProgress = (exp % 100) / 100;
    setLevel(newLevel);
    setProgress(newProgress);
  }, [exp]);

  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="mr-4">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {level}
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800">{username}</h2>
        <div className="flex items-center">
          <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden mr-2">
            <div 
              className="h-full bg-blue-500 transition-all duration-500" 
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">
            {exp} EXP (Level {level})
          </span>
        </div>
      </div>
    </div>
  );
};

ProfileBadge.propTypes = {
  userId: PropTypes.number.isRequired,
  updateTrigger: PropTypes.number
};

export default ProfileBadge;