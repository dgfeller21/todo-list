import './style.css'
import createDialog from './taskModal.js'
const addTask = document.querySelector("#addTask");
const content = document.querySelector("#content")
const taskContainer = document.querySelector('#task-container')
const dialog = createDialog()
content.append(dialog)

addTask.addEventListener("click", e => {
    dialog.showModal()
})
