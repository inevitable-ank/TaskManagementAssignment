// src/Components/PriorityBoard.jsx
import React from "react";

const priorities = [
  { id: 1, name: "High Priority", color: "bg-red-500", tasks: [] },
  { id: 2, name: "Medium Priority", color: "bg-yellow-400", tasks: [] },
  { id: 3, name: "Low Priority", color: "bg-green-400", tasks: [] },
];

const PriorityBoard = ({ tasks, onTaskClick, onDragEnd }) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    acc[task.priority] = acc[task.priority] || [];
    acc[task.priority].push(task);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {priorities.map((priority) => (
        <div key={priority.id} className="space-y-4">
          <div
            className={`text-white text-lg font-semibold p-3 rounded-lg ${priority.color} shadow-lg`}
          >
            {priority.name}
          </div>
          <div
            className="space-y-3 bg-white rounded-lg p-4 shadow-md border border-gray-200 min-h-[200px]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDragEnd(e, priority.name)}
          >
            {groupedTasks[priority.name]?.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
                className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg shadow-sm cursor-pointer transition-transform transform hover:scale-105 flex justify-between items-center"
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
            ))}
            {groupedTasks[priority.name]?.length === 0 && (
              <p className="text-gray-400 text-center">No tasks</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PriorityBoard;
