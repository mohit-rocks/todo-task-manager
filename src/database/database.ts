import {DBSchema, IDBPDatabase, openDB} from 'idb';
import {Task} from "../models/task";

export const databaseName = "tasks-db";
interface TaskSchema extends DBSchema {
    tasks: {
        value: {
            id: string;
            title: string;
            body: string;
            reminder: number
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
