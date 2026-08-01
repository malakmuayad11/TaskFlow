import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Task } from "../types/Task.ts";

export function exportTasksToPDF(tasks: Task[]) {
  const pdf = new jsPDF();

  pdf.text("TaskFlow - Tasks Report", 14, 15);

  pdf.setFontSize(9);
  pdf.text("Generated: " + new Date(Date.now()).toLocaleDateString(), 166, 15);

  pdf.setFontSize(12);
  autoTable(pdf, {
    startY: 25,
    head: [["Title", "Status", "Priority", "Due Date"]],
    body: tasks.map((task) => [
      task.title,
      task.status,
      task.priority,
      new Date(task.dueDate).toLocaleDateString(),
    ]),
    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 4,
      lineColor: [229, 231, 235],
      lineWidth: 0.3,
    },

    headStyles: {
      fillColor: [88, 80, 236],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },

    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },

    bodyStyles: {
      textColor: [55, 65, 81],
    },
  });

  pdf.save("TaskFlow-tasks.pdf");
}
