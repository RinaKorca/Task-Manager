import { useState, useEffect } from "react";
import API from "../utils/api";

const TaskForm = ({ onTaskAdded, task, onTaskUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]); // When task changes, populate the form with the existing task details

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      if (task) {
        // If there's a task being edited, update it
        onTaskUpdated({ title, description });
      } else {
        // Otherwise, create a new task
        await API.post("/tasks", { title, description });
        onTaskAdded(); // callback to refresh tasks
      }

      setTitle(""); // Reset the form
      setDescription("");
    } catch (error) {
      console.error(error.response?.data?.message || "Error creating task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{task ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
