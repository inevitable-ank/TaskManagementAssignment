// src/Components/TaskDetails.jsx
import React from "react";

const TaskDetails = ({ task, onClose, onEdit, onDelete, onStatusChange }) => {
  if (!task) {
    return null;
  }

  const { title, description, dueDate, status } = task;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          &times;
        </button>

        {/* Task Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

        {/* Task Description */}
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        {/* Task Due Date */}
        <p className="text-gray-600 text-sm mb-6">
          <strong>Due Date:</strong>{" "}
          {new Date(dueDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Task Status */}
        <div className="flex items-center mb-6">
          <strong className="text-gray-600 mr-3">Status:</strong>
          <select
            value={status}
            onChange={(e) => {
            const newStatus = e.target.value;
            onStatusChange(task._id || task.id, newStatus); // Use `_id` or `id`
            }}
            className="border border-gray-300 rounded-md px-3 py-1 focus:ring focus:ring-blue-300 transition"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(task)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) {
              onDelete(task._id || task.id);
              }
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
