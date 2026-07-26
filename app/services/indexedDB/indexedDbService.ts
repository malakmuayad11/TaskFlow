let db: IDBDatabase | null = null;

const request = indexedDB.open("TaskFlow", 3);

request.onupgradeneeded = () => {
  const database = request.result;

  if (!database.objectStoreNames.contains("users")) {
    const store = database.createObjectStore("users", {
      keyPath: "userId",
      autoIncrement: true,
    });

    store.createIndex("emailIndex", "email", {
      unique: true,
    });
  }

  if (!database.objectStoreNames.contains("tasks")) {
    const store = database.createObjectStore("tasks", {
      keyPath: "taskId",
      autoIncrement: true,
    });

    store.createIndex("userIdIndex", "userId", {
      unique: false,
    });
  }
};

request.onsuccess = () => {
  db = request.result;
};

request.onerror = () => {
  console.error("Database error:", request.error);
};

export function getDB(): IDBDatabase {
  if (!db) {
    throw new Error("Database is not initialized");
  }

  return db;
}
