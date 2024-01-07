
export enum Status {
    "completed",
    "open",
    "snoozed",
}
export interface Task {
    id: bigint
    title: string
    body: string
    // Reminder time is stored in unix timestamp.
    reminder: bigint
    status: Status
}
