import Task from './task.js'
import {tasks} from './task.js'
let projects = ['Inbox']
const taskContainer = document.querySelector('#task-container')
const content = document.querySelector("#content")

export default function createEditTaskDialog(task, index) {
    console.log(task.title)
    const dialog = document.createElement('dialog')
    const form = document.createElement('form')
    const title = document.createElement('input')
    title.setAttribute('placeholder', 'Task name')
    title.setAttribute('id', 'edit-title')
    title.setAttribute('value', task.title)

    const description = document.createElement('input')
    description.setAttribute('placeholder', 'Description')
    description.setAttribute('id', 'edit-description')
    description.setAttribute('value', task.description)

    const dueDate = document.createElement('input')
    dueDate.setAttribute('placeholder', 'Due date')
    dueDate.setAttribute('id', 'edit-dueDate')
    dueDate.setAttribute('value', task.dueDate)

    const prioritySelect = document.createElement('select')
    prioritySelect.setAttribute('id', 'edit-select-priority')
    prioritySelect.setAttribute('value', task.prioritySelect)
    const option1 = document.createElement('option')
    option1.textContent = 'Low'
    option1.setAttribute('value', 'Low')
    const option2 = document.createElement('option')
    option2.textContent = 'Medium'
    option2.setAttribute('value', 'Medium')

    const projectSelect = document.createElement('select')
    projectSelect.setAttribute('id', 'edit-select-project')
    projectSelect.setAttribute('value', task.projectSelect)
    for (const item of projects) {
        const projectItem = document.createElement('option')
        projectItem.textContent = item
        projectItem.setAttribute('value', item)
        projectSelect.append(projectItem)
    }

    const buttons = document.createElement('div')
    buttons.classList.add("button-dialog-div")
    const cancel = document.createElement('button')
    cancel.classList.add('cancel')
    cancel.classList.add('button-dialog')
    cancel.textContent = 'Cancel'
    const submit = document.createElement('button')
    submit.classList.add('submit')
    submit.classList.add('button-dialog')
    if(submit.value == null) {
        submit.setAttribute('disabled', '')
    }
    submit.textContent = 'Submit'
    buttons.append(cancel)
    buttons.append(submit)
    
    prioritySelect.append(option1)
    prioritySelect.append(option2)
    form.append(title)
    form.append(description)
    form.append(dueDate)
    form.append(prioritySelect)
    form.append(projectSelect)
    form.append(buttons)
    dialog.append(form)

    cancel.addEventListener('click', e => {
        e.preventDefault()
        dialog.close()
    })

    dialog.addEventListener("submit", e => {
        e.preventDefault()
        const title = document.getElementById('edit-title').value;
        const description = document.getElementById("edit-description").value;
        const dueDate = document.getElementById("edit-dueDate").value;
        const prioritySelect = document.getElementById("edit-select-priority").value;
        const projectSelect = document.getElementById("edit-select-project").value;
        let task = new Task(title, description, dueDate, prioritySelect, projectSelect)
        tasks[index] = task
        console.log('after sumbit ')
        displayTasksAfterEdit()
        dialog.close()
    })
    dialog.addEventListener('keyup', e => {
        const title = document.getElementById('edit-title').value;
        const button = document.querySelector('.submit')
        if(title == "") {
            button.setAttribute('disabled', '')
        } else {
            if(button.hasAttribute('disabled')) {
                button.removeAttribute('disabled')
            }
        }
    })
    dialog.addEventListener("click", e => {
        const dialogDimensions = dialog.getBoundingClientRect()
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialog.close()
        }
    })

    return dialog
}
function displayTasksAfterEdit() {
    console.log('start of displayTasksAfterEdit()')
    let num = 0
    while(taskContainer.firstChild) {
        taskContainer.firstChild.remove()
    }
    for(let task of tasks) {
        const taskItem = document.createElement('div')
        taskItem.classList.add('task-item')
        taskContainer.append(taskItem)

        const taskContent = document.createElement('div')
        taskContent.classList.add('task-content')
        const taskButtons = document.createElement('div')
        taskButtons.classList.add('task-buttons')
        const editButton = document.createElement('div')
        editButton.classList.add('edit-button')
        editButton.setAttribute('num', num)
        const trashButton = document.createElement('div')
        trashButton.classList.add('trash-button')
        trashButton.setAttribute('num', num)
        taskButtons.append(editButton)
        taskButtons.append(trashButton)
        taskItem.append(taskContent)
        taskItem.append(taskButtons)

        const title = document.createElement('div')
        title.textContent = task.title
        const description = document.createElement('div')
        description.textContent = task.description
        const dueDate = document.createElement('div')
        dueDate.textContent = task.dueDate
        const prioritySelect = document.createElement('div')
        prioritySelect.textContent = task.prioritySelect
        const projectSelect = document.createElement('div')
        projectSelect.textContent = task.projectSelect
        taskContent.append(title)
        taskContent.append(description)
        taskContent.append(dueDate)
        taskContent.append(prioritySelect)
        taskContent.append(projectSelect)

        editButton.addEventListener('click', e => {
            console.log("editing in editTaskModal")
            let index = e.target.getAttribute('num')
            let editTask = tasks[index]
            const editTaskDialog = createEditTaskDialog(editTask, index)
            taskContainer.append(editTaskDialog)
            editTaskDialog.showModal()
        })
        trashButton.addEventListener('click', e => {
            let id = e.target.getAttribute('num')
            console.log(id)
            console.log('after trash ')
            console.log(tasks)
            tasks.splice(id, 1)
            console.log(tasks)
            displayTasks()
        })
        num++
    }
}