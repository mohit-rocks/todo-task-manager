import {Task} from "./models/task";
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import {databaseName, initDatabase} from "./database/database";
import { v4 as uuidv4 } from 'uuid';

function renderTasks(tasks:Task[]): void {
    const lists: string[] = [];
    tasks.forEach((task, index) => {
        let date = new Date(task.reminder).toDateString()
        let entry = `<li class="flex justify-between gap-x-6 py-5">
    <div class="flex min-w-10 gap-x-6">
      <div class="min-w-0 flex-auto">
        <p class="text-sm font-semibold leading-6 text-gray-900">${task.title}</p>
        <p class="mt-1 truncate text-xs leading-5 text-gray-500">${task.body}</p>
        <p class="text-sm leading-6 text-gray-900">${date}</p>
      </div>
    </div>
  </li>`;
        lists.push(entry)
    })
    const list = document.getElementById("task-list");
    if (list) {
        list.innerHTML = lists.join('');
    }
}

function resetForm() {
    document.querySelector<HTMLFormElement>("#task-create-form")?.reset();
}

async function saveTask(task:Task) {
    const db = initDatabase();
    db.then(db => {
       db.put('tasks', task);
       db.getAll('tasks').then(reminders => {
           renderTasks(reminders);
       })
    });
    resetForm();
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
    const form = document.getElementById("task-create-form");
    const input = document.querySelector<HTMLInputElement>("#task-title")
    const date = document.querySelector<HTMLInputElement>("#task-date")
    const body = document.querySelector<HTMLTextAreaElement>("#task-body")

    form?.addEventListener("submit", ev => {
        ev.preventDefault();

        if (!input?.value || !date?.value) {
            return null;
        }

        let task:Task = {
            id: uuidv4(),
            title: input.value,
            body: body?.value ?? '',
            reminder: Date.parse(date.value),
        }
        saveTask(task);
    });
}

init();
