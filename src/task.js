export default class Task {
    constructor(title, description, dueDate, prioritySelect, projectSelect) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.prioritySelect = prioritySelect
        this.projectSelect = projectSelect
    }
}
export const tasks = []