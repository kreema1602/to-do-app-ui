import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import FilterTask from "../components/FilterTask";

interface Task {
  task_id: number;
  title: string;
  done: boolean;
}

const Main: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("");

  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  // Fetch tasks
  useEffect(() => {
    axios.get("http://localhost:3000/tasks", header).then((response) => {
      setTasks(
        response.data.map((task: Task) => ({
          ...task,
          task_id: task._id,
          _id: undefined,
        }))
      );
    });
  }, []);

  // Add a task
  const addTask = async (title: string) => {
    const response = await axios.post(
      "http://localhost:3000/tasks",
      {
        title,
        done: false,
      },
      header
    );
    setTasks((prevTasks) => [...prevTasks, response.data]);
  };

  // Toggle a task
  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.task_id === id);
    if (!task) return;

    const updatedTask = { ...task, done: !task.done };
    const response = await axios.patch(
      `http://localhost:3000/tasks/${id}`,
      updatedTask,
      header
    );

    if (response.status === 200) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.task_id === id ? response.data : t))
      );
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    const response = await axios.delete(`http://localhost:3000/tasks/${id}`);
    if (response.status === 200) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.task_id !== id));
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>TodoApp</h1>
      <AddTask addTask={addTask} />
      <FilterTask setFilter={setFilter} />
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} />
    </div>
  );
};

export default Main;
