// import type { Task } from "../types/Task.ts";

// export function addTask(task: Task): void {
//   const tasks = getTasks();
//   tasks.push(task);
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// export function updateTask(task: Task): void {
//   const tasks = getTasks();
//   const index = tasks.findIndex((t) => t.id === task.id);

//   if (index !== -1) {
//     tasks[index] = { ...tasks[index], ...task };
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }
// }

// export function deleteTask(id: number) {
//   const tasks = getTasks();
//   localStorage.setItem(
//     "tasks",
//     JSON.stringify(tasks.filter((t) => t.id !== id)),
//   );
// }

// export function getTasks(): Task[] {
//   const storedTasks = localStorage.getItem("tasks");

//   if (!storedTasks) return [];

//   return JSON.parse(storedTasks).map((task: Task) => ({
//     ...task,
//     dueDate: new Date(task.dueDate),
//   }));
// }
