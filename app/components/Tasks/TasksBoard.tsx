import type { Task } from "../../types/Task";
import { useState } from "react";
import { addTask } from "../../services/indexedDB/taskService";
import AddEditTaskForm from "./AddEditTaskForm";
import TasksColumn from "./TasksColumn";

export default function TasksBoard({ initialTasks }: { initialTasks: Task[] }) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(task: Omit<Task, "taskId">) {
    addTask(task as Task); // add it to indexedDB
    setTasks((previousTasks) => [...previousTasks, task as Task]); // refresh the UI
  }
  function handleSave(addedTask: Omit<Task, "taskId">) {
    handleAddTask(addedTask);
    setIsAddingTask(false);
  }
  function handleCancel() {
    setIsAddingTask(false);
  }

  return (
    <>
      {isAddingTask ? (
        <AddEditTaskForm
          isAddMode={true}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div>
          <TasksColumn status="Todo" tasks={tasks} onAdd={handleAddTask} />
          <TasksColumn
            status="In Progress"
            tasks={tasks}
            onAdd={handleAddTask}
          />
          <TasksColumn status="Completed" tasks={tasks} onAdd={handleAddTask} />
        </div>
      )}
    </>
  );
}
