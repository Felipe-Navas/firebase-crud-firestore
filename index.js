import {
  deleteTask,
  getTask,
  onGetTasks,
  saveTask,
  updateTask,
} from './firebase.js'

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('tasks-container')

let isEditing = false
let editingTaskId = ''

window.addEventListener('DOMContentLoaded', async () => {
  // This is an example of how to get the data by demand
  // const querySnapshot = await getTasks()
  // let html = ''
  // querySnapshot.forEach((doc) => {
  //   const { title, description } = doc.data()
  //   html += `
  //   <div>
  //     <h3>${title}</h3>
  //     <p>${description}</p>
  //   </div>
  //   `
  // })

  onGetTasks((querySnapshot) => {
    let html = ''
    querySnapshot.forEach((doc) => {
      const { title, description } = doc.data()
      html += `
        <div>
          <h3>${title}</h3>
          <p>${description}</p>
          <button class="btn-delete" data-id="${doc.id}">Delete</button>
          <button class="btn-edit" data-id="${doc.id}">Edit</button>
        </div>
    `
    })
    taskContainer.innerHTML = html

    const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const taskId = e.target.dataset.id
        deleteTask(taskId)
      })
    })

    const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault()
        const taskId = e.target.dataset.id
        const doc = await getTask(taskId)
        const task = doc.data()

        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description
        taskForm['btn-task-save'].innerText = 'Update'

        isEditing = true
        editingTaskId = taskId
      })
    })
  })
})

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = taskForm['task-title']
  const description = taskForm['task-description']

  if (isEditing) {
    updateTask(editingTaskId, {
      title: title.value,
      description: description.value,
    })
    isEditing = false
    taskForm['btn-task-save'].innerText = 'Save'
  } else {
    saveTask(title.value, description.value)
  }

  taskForm.reset()
})
