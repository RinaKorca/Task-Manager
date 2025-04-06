import { useState } from "react";
import API from "../utils/api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      onTaskAdded(); // callback to refresh tasks
    } catch (error) {
      console.error(error.response.data.message || "Error creating task");
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
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
