import './style.css'
import createDialog from './taskModal.js'
import { displayTasks } from './taskModal.js';
import {tasks} from './task.js'
const addTask = document.querySelector("#addTask");
const content = document.querySelector("#content")
const dialog = createDialog()
content.append(dialog)

if(localStorage.getItem('myTasks')) {
    let storageTasks = JSON.parse(localStorage.getItem('myTasks'))
    for(let item of storageTasks) {
        tasks.push(item)
    }
    displayTasks()
}

addTask.addEventListener("click", e => {
    dialog.showModal()
})
