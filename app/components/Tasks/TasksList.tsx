import ControlBar from "./ControlBar";
import TasksTable from "./TasksTable";
import { useContext, useEffect, useState } from "react";
import type { Task } from "../../types/Task";
import {
  addTask,
  updateTask,
  deleteTask,
} from "../../services/indexedDB/taskService";
import AddEditTaskForm from "./AddEditTaskForm";
import PaginationRow from "./PaginationRow";
import { paginateArray } from "../../services/paginationService";
import { ThemeContext } from "~/context/ThemeContext";
import { useToast } from "~/hooks/useToast";
import Toast from "../Toast";

export default function TasksList({ initialTasks }: { initialTasks: Task[] }) {
  const theme = useContext(ThemeContext).theme;
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useToast(showToast, setShowToast);

  useEffect(() => {
    setTasks(initialTasks);
    setCurrentPage(1);
  }, [initialTasks]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  const displayedTasks = paginateArray(filteredTasks, currentPage, 5);

  function handleSearch(title: string) {
    setSearch(title);
    setCurrentPage(1);
  }

  function handleFilterChange(filter: string) {
    if (filter.toLowerCase() === "newest") {
      setTasks((previousTasks) =>
        [...previousTasks].sort((a, b) => b.taskId - a.taskId),
      );
    }

    if (filter.toLocaleLowerCase() === "oldest") {
      setTasks((previousTasks) =>
        [...previousTasks].sort((a, b) => a.taskId - b.taskId),
      );
    }
    setCurrentPage(1);
  }

  function handleAddTask(task: Omit<Task, "taskId">) {
    const newTask: Task = { ...task, taskId: Date.now() };
    addTask(newTask);
    setTasks((previousTasks) => [...previousTasks, newTask]);
    setIsAddingTask(false);
    setCurrentPage(1);
  }

  function handleDelete(id: number) {
    deleteTask(id);
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.taskId !== id),
    );
    setShowToast(true);
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
  }

  function handleSave(taskData: Omit<Task, "taskId">) {
    const updatedTask: Task = { ...taskData, taskId: editingTask!.taskId };
    updateTask(updatedTask);
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task,
      ),
    );
    setEditingTask(null);
  }

  function handleCancel() {
    setEditingTask(null);
    setIsAddingTask(false);
  }

  function handleClick(pageNum: number) {
    setCurrentPage(pageNum);
  }

  return (
    <>
      {editingTask || isAddingTask ? (
        <AddEditTaskForm
          task={editingTask ?? undefined}
          isAddMode={!editingTask}
          onSave={editingTask ? handleSave : handleAddTask}
          onCancel={handleCancel}
        />
      ) : (
        <section>
          <ControlBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onAdd={handleAddTask}
            onStartAdd={() => setIsAddingTask(true)}
          />
          <div
            className={`border ${
              theme === "Light"
                ? "border-border-color"
                : "border-border-color-dark"
            } rounded-btn mt-4 p-2`}
          >
            <TasksTable
              tasks={displayedTasks}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            <PaginationRow
              totalTasks={filteredTasks.length}
              onclick={handleClick}
            />
          </div>
          {showToast && <Toast title="Task is deleted successfully." />}
        </section>
      )}
    </>
  );
}
