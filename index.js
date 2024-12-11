import { deleteTask, onGetTasks, saveTask } from './firebase.js'

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('tasks-container')

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
        </div>
    `
    })
    taskContainer.innerHTML = html

    const btnsDetele = taskContainer.querySelectorAll('.btn-delete')

    btnsDetele.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const taskId = e.target.dataset.id
        deleteTask(taskId)
      })
    })
  })
})

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = taskForm['task-title']
  const description = taskForm['task-description']

  saveTask(title.value, description.value)

  taskForm.reset()
})
