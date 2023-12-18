 "use strict";

const todoList = [];

class TodoItem {
done = false;
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
};

const findTodoItemIndex = function findTodoItemIndex(id) {
  return todoList.findIndex(item => item.id = id);
  };

const addNewTodoItem = function addNewTodoItem(text) {
  todoList.push(new TodoItem(text));
};

// addNewTodoItem('dfcgvbhjnk');
// console.log(todoList);

const removeTodoItem = function removeTodoItem(id) {
const idx = findTodoItemIndex(id);
if (idx >= 0) {
  todoList.splice(idx, 1);
}
};

const toggleTodoDone = function toggleTodoDone(id) {
  const idx = findTodoItemIndex(id);
  if (idx >= 0) {
    const oldTodoItem = todoList[idx];                                // помилка десь в коді
    const newTodoItem = {...oldTodoItem, done: !oldTodoItem.done};
    todoList.splice(idx, 1, newTodoItem);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  const $form = document.getElementById('todo');
  const $todoList = document.getElementById('todo-list');

  const render = function render() {
    $todoList.innerHTML = todoList.map(todoItem => {
      return `<li class="list__item" data-id="${todoItem.id}">${todoItem.text}<input type="checkbox" ${todoItem.done ? checked : ''}></input></li>`
    }).join('');
  };

  const onFormSubmit = function onFormSubmit(e) {
    e.preventDefault();
    const text = new FormData($form).get('text');
    addNewTodoItem(text);
    $form.reset();
    render();
    console.log(todoList)
  };

  const toggle = function toggle(e) {
    const {id} = e.target.parentElement.dataset;
    toggleTodoDone(Number(id));
    render();
  };

  $form.addEventListener('submit', onFormSubmit);
  $todoList.addEventListener('change', toggle);
});


