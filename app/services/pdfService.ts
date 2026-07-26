import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Task } from "../types/Task.ts";

export function exportTasksToPDF(tasks: Task[]) {
  const pdf = new jsPDF();

  pdf.text("TaskFlow - Tasks Report", 14, 15);
  pdf.text("Generated: " + new Date(Date.now()).toLocaleDateString(), 140, 15);

  autoTable(pdf, {
    startY: 25,
    head: [["Title", "Status", "Priority", "Due Date"]],
    body: tasks.map((task) => [
      task.title,
      task.status,
      task.priority,
      new Date(task.dueDate).toLocaleDateString(),
    ]),
  });

  pdf.save("TaskFlow-tasks.pdf");
}
