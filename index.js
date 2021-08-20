/*global _ */

const db = new Dexie('TodoApp')

db.version(2).stores({ items: '++id,description,isComplete' })

const taskList = _().react({}, {
  render: state => {
    return _(`
      <div>
        ${state.taskData?.map(task => {
          return `
            <div class="row">
              <div class="col s5">
                <label>
                  <input type="checkbox" 
                    ${task.isComplete && 'checked'} 
                    onchange="markAsComplete(event, ${task.id})"
                  />
                  <span class="black-text ${task.isComplete && 'strike'}">
                    ${task.description}
                  </span>
                </label>
              </div>
              <i class="col s2 material-icons delete-button" 
                  onclick="removeItem(${task.id})">
                delete
              </i>
            </div>
          `
        }).join('')}
      </div>
    `)
  }
})

_('#taskList', taskList )

db.items.reverse().toArray().then(data => taskList.state.taskData = data)

const addItemToDb = async event => {
  event.preventDefault()

  await db.items.add({ description: _('#taskInput').val() })
  taskList.state.taskData = await db.items.reverse().toArray()

  _('#taskInput').val('')
}

const removeItem = async id => {
  await db.items.delete(id)
  taskList.state.taskData = await db.items.reverse().toArray()
}

const markAsComplete = async (event, id) => {
  if (event.target.checked) {
    await db.items.update(id, {isComplete: true})
    taskList.state.taskData = await db.items.reverse().toArray()
  }
  else {
    await db.items.update(id, {isComplete: false})
    taskList.state.taskData = await db.items.reverse().toArray()
  }
}

const inputForm = document.querySelector('#inputForm')

inputForm.addEventListener('submit', addItemToDb)
