import {openDB, DBSchema, IDBPDatabase} from 'idb';
import {Status, Task} from "../models/task";

export const databaseName = "tasks-db";
interface TaskSchema extends DBSchema {
    tasks: {
        value: {
            id: bigint;
            title: string;
            body: string;
            reminder: bigint
            status: Status
        };
        key: string;
    };
}

export async function initDatabase(): Promise<IDBPDatabase<TaskSchema>> {
    const db = await openDB<TaskSchema>(databaseName, 1, {
        upgrade(db) {
            db.createObjectStore('tasks', {
                keyPath: 'id',
            });
        },
    });
    return db;
}
