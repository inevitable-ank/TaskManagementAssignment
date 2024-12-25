import React, { useState } from "react";
import { Transition } from "@headlessui/react";

const priorities = [
  { id: 1, name: "High Priority", color: "from-red-500 to-pink-500", value: "high" },
  { id: 2, name: "Medium Priority", color: "from-yellow-400 to-yellow-500", value: "medium" },
  { id: 3, name: "Low Priority", color: "from-green-400 to-green-500", value: "low" },
];

const PriorityBoard = ({ tasks, onTaskClick, onDragEnd }) => {
  const [dragOverPriority, setDragOverPriority] = useState(null);

  // Group tasks by priority
  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.priority] = acc[task.priority] || [];
    acc[task.priority].push(task);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
      {priorities.map((priority) => (
        <div key={priority.id} className="space-y-4">
          {/* Priority Header */}
          <div
            className={`text-white text-xl font-bold p-4 rounded-lg bg-gradient-to-r ${priority.color} shadow-lg`}
          >
            {priority.name}
          </div>

          {/* Drop Zone */}
          <div
            className={`space-y-3 bg-white rounded-lg p-6 shadow-md border border-gray-200 min-h-[250px] ${
              dragOverPriority === priority.value ? "ring-4 ring-blue-500" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverPriority(priority.value); // Highlight drop zone
            }}
            onDragLeave={() => setDragOverPriority(null)} // Remove highlight
            onDrop={(e) => {
              setDragOverPriority(null); // Remove highlight
              const taskId = e.dataTransfer.getData("taskId");
              onDragEnd(taskId, priority.value);
            }}
          >
            {/* Task Cards */}
            {groupedTasks[priority.value]?.map((task) => (
              <Transition
                key={task.id}
                show={true}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
              >
                <div
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("taskId", task._id)}
                  className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg shadow-sm cursor-pointer transition-transform transform hover:scale-105 flex justify-between items-center"
                  onClick={() => onTaskClick(task)}
                >
                  <div>
                    <p className="font-semibold text-gray-700">{task.title}</p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 text-sm rounded-full ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {task.status}
                  </div>
                </div>
              </Transition>
            ))}
            {groupedTasks[priority.value]?.length === 0 && (
              <p className="text-gray-400 text-center">No tasks</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PriorityBoard;
