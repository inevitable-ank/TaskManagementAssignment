import React, { useState, useEffect } from "react";
import PriorityBoard from "../components/PriorityBoard";
import TaskList from "../components/TaskList";
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";
import { getTasks, createTask, updateTask, deleteTask } from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const tasksPerPage = 5;

  // Fetch tasks from backend
  const fetchTasks = async (page = 1) => {
    try {
      const data = await getTasks(page, tasksPerPage);
      setTasks(data.tasks);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskSave = async (task) => {
    try {
      if (task.id) {
        await updateTask(task.id, task);
      } else {
        await createTask({ ...task, priority: task.priority.toLowerCase() });
      }
      fetchTasks(currentPage);
      setIsFormVisible(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error saving task:", error.response?.data || error.message);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      console.log("Deleting Task ID:", id);  
      await deleteTask(id); // Ensure `id` is passed correctly
      fetchTasks(currentPage);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error deleting task:", error.message || error);
      alert("Failed to delete the task. Please try again.");
    }
  };

  const handleTaskStatusChange = async (id, status) => {
    try {
      await updateTask(id, { status }); 
      fetchTasks(currentPage);
    } catch (error) {
      console.error("Error updating task status:", error.message || error);
      alert("Failed to update task status. Please try again.");
    }
  };
  

  const handleDragEnd = async (taskId, newPriority) => {
    try {
      if (!taskId) throw new Error("Task ID is not available");

      await updateTask(taskId, { priority: newPriority });
      fetchTasks(currentPage);
    } catch (error) {
      console.error("Error updating task priority:", error);
    }
  };

  const handlePageChange = (page) => {
    fetchTasks(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      



      <main className="p-6">
        <button
          onClick={() => {
            setIsFormVisible(true);
            setSelectedTask(null);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mb-6"
        >
          Create Task
        </button>

        <PriorityBoard
          tasks={tasks}
          onTaskClick={handleTaskClick}
          onDragEnd={handleDragEnd}
        />

        <h2 className="text-xl font-bold mt-8 mb-4">Task List</h2>
        <TaskList
          tasks={tasks}
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
          onEdit={() => {
            setIsFormVisible(true);
            setSelectedTask(selectedTask);
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
