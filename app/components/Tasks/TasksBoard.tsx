import type { Task } from "../../types/Task";
import { useState, useEffect } from "react";
import { addTask } from "../../services/indexedDB/taskService";
import AddEditTaskForm from "./AddEditTaskForm";
import TasksColumn from "./TasksColumn";

export default function TasksBoard({ initialTasks }: { initialTasks: Task[] }) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  function handleAddTask() {
    setIsAddingTask(true);
  }
  function handleSave(addedTask: Omit<Task, "taskId">) {
    const newTask: Task = { ...addedTask, taskId: Date.now() };
    addTask(newTask);
    setTasks((previousTasks) => [...previousTasks, newTask]);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
