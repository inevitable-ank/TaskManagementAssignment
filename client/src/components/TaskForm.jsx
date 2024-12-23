// src/Components/TaskForm.jsx
import React, { useState } from "react";

const TaskForm = ({ initialTask = {}, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialTask.title || "");
  const [description, setDescription] = useState(initialTask.description || "");
  const [dueDate, setDueDate] = useState(
    initialTask.dueDate
      ? new Date(initialTask.dueDate).toISOString().split("T")[0]
      : ""
  );
  const [priority, setPriority] = useState(initialTask.priority || "Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...initialTask,
      title,
      description,
      dueDate,
      priority,
    };
    onSave(taskData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fadeIn"
      >
        {/* Form Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {initialTask.id ? "Edit Task" : "Create Task"}
        </h2>

        {/* Task Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-300 transition"
            required
          />
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-300 transition"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-gray-700 font-medium mb-2"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-300 transition"
            required
          />
        </div>

        {/* Priority */}
        <div className="mb-6">
          <label
            htmlFor="priority"
            className="block text-gray-700 font-medium mb-2"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-blue-300 transition"
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
