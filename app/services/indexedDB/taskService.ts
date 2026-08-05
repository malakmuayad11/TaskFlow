import type { Task } from "../../types/Task";
import { getDB } from "./indexedDbService";

export async function addTask(task: Task) {
  const db = await getDB();

  return new Promise((resolve, reject) => {
    if (!db) {
      alert("Db is not initialized");
      reject(new Error("Database is not initialized."));
      return;
    }

    const tx = db.transaction("tasks", "readwrite");
    const store = tx.objectStore("tasks");

    const addRequest = store.add(task);

    addRequest.onsuccess = () => {
      alert("task is added in db");

      console.log(`Task "${task.title}" added`);
      resolve(addRequest.result);
    };

    addRequest.onerror = () => {
      alert("Error adding task in db");
      reject(addRequest.error ?? new Error("Error adding task."));
    };
  });
}

export async function updateTask(task: Task): Promise<IDBValidKey> {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not initialized."));
      return;
    }

    const tx = db.transaction("tasks", "readwrite");
    const store = tx.objectStore("tasks");
    const check = store.get(task.taskId);

    check.onsuccess = () => {
      if (check.result === undefined) {
        reject(new Error("Task with id: " + task.taskId + " is not found"));
        return;
      }

      const updatedTask = { ...task };
      const updateRequest = store.put(updatedTask);

      updateRequest.onsuccess = () => {
        resolve(updateRequest.result);
      };

      updateRequest.onerror = () => {
        reject(updateRequest.error ?? new Error("Error updating task."));
      };
    };

    check.onerror = () => {
      reject(check.error ?? new Error("Error checking task."));
    };
  });
}

export async function deleteTask(taskId: number) {
  const db = await getDB();
  if (!db) {
    console.log("Database is not initialized.");
    return;
  }

  const tx = db.transaction("tasks", "readwrite");
  const store = tx.objectStore("tasks");

  tx.oncomplete = () => {
    console.log("Task id deleted successfully");
  };

  tx.onerror = () => {
    console.log("Error while deleting the task");
  };

  const check = store.get(taskId);

  check.onsuccess = () => {
    if (check.result === undefined) {
      console.log("Task is not found");
      return;
    }
    store.delete(taskId);
  };

  check.onerror = () => {
    console.log("Error while deleting the task");
  };
}

export async function getTasksByUserId(userId: number): Promise<Task[]> {
  const db = await getDB();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not initialized."));
      return;
    }

    const transaction = db.transaction("tasks", "readonly");
    const store = transaction.objectStore("tasks");
    const index = store.index("userIdIndex");

    const request = index.getAll(userId);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error ?? new Error("Error retrieving tasks."));
    };
  });
}

export async function deleteAllUserTasks(userId: number): Promise<void> {
  const db = await getDB();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database is not initialized."));
      return;
    }

    const transaction = db.transaction("tasks", "readwrite");
    const store = transaction.objectStore("tasks");
    const index = store.index("userIdIndex");

    const request = index.openCursor(IDBKeyRange.only(userId));

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };

    request.onerror = () => {
      reject(
        request.error ??
          new Error("Error opening cursor for deleteAllUserTasks."),
      );
    };

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(transaction.error ?? new Error("Error deleting user tasks."));
    };
  });
}
