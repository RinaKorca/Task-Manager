import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm.jsx";
import API from "../utils/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // To track the task being edited

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error.response?.data?.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task", error.response?.data?.message);
    }
  };

  // Update task function
  const updateTask = async (id, updatedTaskData) => {
    try {
      await API.put(`/tasks/${id}`, updatedTaskData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token is sent in headers
        },
      });
      fetchTasks(); // Refresh the tasks after the update
      setEditingTask(null); // Reset editing mode after successful update
    } catch (error) {
      console.error("Failed to update task:", error.response?.data?.message);
    }
  };

  const toggleCompleted = async (id, currentStatus) => {
    try {
      const updatedTask = {
        completed: !currentStatus, // Toggle the current status
      };

      // Make sure to send the token in the headers
      await API.put(`/tasks/${id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token here
        },
      });

      fetchTasks(); // Refresh the tasks after the update
    } catch (error) {
      console.error("Failed to update task:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {/* If we are editing a task, show the form for updating it */}
      {editingTask ? (
        <div className="task-form-container">
          <TaskForm
            task={editingTask} // Pass the task being edited to the form
            onTaskUpdated={(updatedTaskData) =>
              updateTask(editingTask._id, updatedTaskData)
            } // Call updateTask function when submitting the updated task
          />
        </div>
      ) : (
        <div className="task-form-container">
          <TaskForm onTaskAdded={fetchTasks} />
        </div>
      )}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            <div className="task-info">
              <strong>{task.title}</strong> {/* Title */}
              <span>{task.description}</span> {/* Description */}
            </div>
            <div className="task-actions">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task._id, task.completed)}
              />
              <button className="edit-btn" onClick={() => setEditingTask(task)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
