import { getTasks, saveTask } from './firebase.js'

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('tasks-container')

window.addEventListener('DOMContentLoaded', async () => {
  const querySnapshot = await getTasks()
  let html = ''
  querySnapshot.forEach((doc) => {
    const { title, description } = doc.data()
    html += `
    <div>
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
    `
  })
  taskContainer.innerHTML = html
})

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = taskForm['task-title']
  const description = taskForm['task-description']

  saveTask(title.value, description.value)

  taskForm.reset()
})
