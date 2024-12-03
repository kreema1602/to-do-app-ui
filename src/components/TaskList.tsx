import React from "react";

interface Task {
  task_id: number;
  title: string;
  done: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTask: (task_id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTask }) => (
  <div>
    {tasks.map((task) => (
      <div
        key={task.task_id}
        style={{
          textDecoration: task.done ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.title}
        <button onClick={() => toggleTask(task.task_id)}>
          {task.done ? "Undo" : "Done"}
        </button>
      </div>
    ))}
  </div>
);

export default TaskList;
