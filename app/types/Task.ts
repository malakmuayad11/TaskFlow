export type TaskStatus = "In Progress" | "Todo" | "Completed";

export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
  taskId: number;
  userId: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
}
