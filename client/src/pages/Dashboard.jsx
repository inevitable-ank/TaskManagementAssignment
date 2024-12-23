// src/Pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import PriorityBoard from "../components/PriorityBoard";
import TaskList from "../components/TaskList";
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 5; // Adjust per requirements
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  useEffect(() => {
    // Mock API call to fetch tasks
    setTasks([
      {
        id: 1,
        title: "Task 1",
        description: "Description for Task 1",
        dueDate: "2024-12-30",
        status: "pending",
        priority: "High",
      },
      // Add more sample tasks...
    ]);
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskSave = (task) => {
    if (task.id) {
      // Edit existing task
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      // Add new task
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    setIsFormVisible(false);
  };

  const handleTaskDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setSelectedTask(null);
  };

  const handleTaskStatusChange = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
      </header>

      <main className="p-6">
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mb-6"
        >
          Create Task
        </button>

        <PriorityBoard
          tasks={tasks}
          onTaskClick={handleTaskClick}
          onDragEnd={(e, priority) => {
            const taskId = e.dataTransfer.getData("taskId");
            const updatedTasks = tasks.map((task) =>
              task.id === parseInt(taskId) ? { ...task, priority } : task
            );
            setTasks(updatedTasks);
          }}
        />

        <h2 className="text-xl font-bold mt-8 mb-4">Task List</h2>
        <TaskList
          tasks={paginatedTasks}
          onTaskClick={handleTaskClick}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </main>

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={(task) => {
            setSelectedTask(null);
            setIsFormVisible(true);
          }}
          onDelete={handleTaskDelete}
          onStatusChange={handleTaskStatusChange}
        />
      )}

      {isFormVisible && (
        <TaskForm
          initialTask={selectedTask}
          onSave={handleTaskSave}
          onCancel={() => setIsFormVisible(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
