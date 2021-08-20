/*global _ */

const db = new Dexie('TodoApp')

db.version(1).stores(
  { items: '++id,description,isComplete' }
)

const taskList = _().react({}, {
  render: state => {
    return _(`
      <div>
        ${state.taskData?.map(task => {
          return `<h1>${task.description}</h1>`
        }).join('')}
      </div>
    `)
  }
})

_('#taskList', taskList )

db.items.toArray().then(data => taskList.state.taskData = data)

const addItemToDb = async event => {
  event.preventDefault()

  await db.items.add({
    description: _('#taskInput').val(),
    isComplete: false
  })

  taskList.state.taskData = await db.items.toArray()
  _('#taskInput').val('')
}

const inputForm = document.querySelector('#inputForm')

inputForm.addEventListener('submit', addItemToDb)
