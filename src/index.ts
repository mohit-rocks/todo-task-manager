import {Task} from "./models/task";
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import {databaseName, initDatabase} from "./database/database";

function renderTasks(tasks:Task[]): void {
    console.log(tasks);
}

function init() {
    if (!window.indexedDB) {
        throw Error(`Your browser doesn't support IndexedDB`);
    }
    initDatabase().then(db => {
        db.getAll('tasks').then(tasks => {
            renderTasks(tasks);
        });
    })
    // Render the tasks
    // Add task form.
}

init();
