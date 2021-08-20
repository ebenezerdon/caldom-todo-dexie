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
          return `
            <div class="row">
              <div class="col s3">
                <label>
                  <input
                    type="checkbox"
                    ${task.isComplete && 'checked'}
                  />
                  <span class="black-text">${task.description}</span>
                </label>
              </div>
              <i class="col s2 material-icons delete-button">
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

  await db.items.add({
    description: _('#taskInput').val(),
    isComplete: false
  })

  taskList.state.taskData = await db.items.reverse().toArray()
  _('#taskInput').val('')
}

const inputForm = document.querySelector('#inputForm')

inputForm.addEventListener('submit', addItemToDb)
