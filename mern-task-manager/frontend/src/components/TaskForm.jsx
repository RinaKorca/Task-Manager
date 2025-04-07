import { useState, useEffect } from "react";
import API from "../utils/api";
import "./TaskForm.css"; // ✅ Import the new CSS file

const TaskForm = ({ onTaskAdded, task, onTaskUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      if (task) {
        onTaskUpdated({ title, description });
      } else {
        await API.post("/tasks", { title, description });
        onTaskAdded();
      }

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error.response?.data?.message || "Error creating task");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="task-input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="task-button" type="submit">
        {task ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
