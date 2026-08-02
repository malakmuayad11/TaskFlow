let db: IDBDatabase | null = null;

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("TaskFlow", 4);

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
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getDB(): Promise<IDBDatabase> {
  await openDatabase();
  if (!db) {
    throw new Error("Database is not initialized");
  }
  return db;
}
