
export interface Task {
    id: string
    title: string
    body: string
    // Reminder time is stored in unix timestamp.
    reminder: number
}
