let input = document.querySelector('input')
let root = document.querySelector('ul')

let alldata = JSON.parse(localStorage.getItem('todo') || [])
let value

// addTodo
function handleInput(e) {
  value = e.target.value
  if (e.keyCode === 13 && value !== '') {
    alldata.push({
      name: value,
      isDone: false,
    })
    localStorage.setItem('todo', JSON.stringify(alldata))
    createUi()
  }
}

function handleToogle(e) {
  let id = e.target.dataset.id
  alldata[id].isDone = !alldata[id].isDone
  if ((alldata[id].isDone = true)) {
    e.target.nextSibling.classList.add('outline')
  }
}
// handle delete
function handleDelete(e) {
  let smallid = e.target.dataset.id

  alldata.splice(smallid, 1)
  localStorage.setItem('todo', JSON.stringify(alldata))
  createUi()
}

// createUi
function createUi() {
  root.innerHTML = ''
  alldata.forEach((elm, index) => {
    let li = document.createElement('li')
    let checkInput = document.createElement('input')
    checkInput.classList.add('checkbox')
    checkInput.setAttribute('type', 'checkbox')
    checkInput.setAttribute('data-id', index)
    checkInput.addEventListener('input', handleToogle)
    let label = document.createElement('label')
    label.innerText = elm.name
    input.value = ''
    label.setAttribute('data-id', index)
    let small = document.createElement('small')
    small.innerText = '❌'
    small.setAttribute('data-id', index)
    li.append(checkInput, label, small)
    root.append(li)
    small.addEventListener('click', handleDelete)
  })
}
createUi()
input.addEventListener('keyup', handleInput)
