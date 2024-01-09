 "use strict";

class TodoItem {
  done = false;
  
  constructor(text) {
    this.id = Date.now();
    this.text = text;
  }
};

class TodoLList {
  data = [];

  #findTodoItemIndex(id) {
    return this.data.findIndex(item => item.id === id);
  }

  add(text) {
    this.data.push(new TodoItem(text));
  }

  remove(id) {
    const idx = this.#findTodoItemIndex(id);
    if (idx >= 0) {
      this.data.splice(idx, 1);
    }
  }

  toggle(id) {
    const idx = this.#findTodoItemIndex(id);
    if (idx >= 0) {
      const oldTodoItem = this.data[idx];      
      const newTodoItem = { ...oldTodoItem, done: !oldTodoItem.done };
      this.data.splice(idx, 1, newTodoItem);
    }
  }
}

class TodoListDom extends TodoLList {
  constructor() {
    super()
    this.$form = document.getElementById('todo');
    this.$todoList = document.getElementById('todo-list');

    this.$form.addEventListener('submit', this.#onFormSubmit);
    this.$todoList.addEventListener('change', this.#onTodoItemToogle);
    this.$deleteButton.addEventListener('click', this.popupOpenClose);
    this.$deleteListYes.addEventListener('click', this.remove);
    this.$deleteListNo.addEventListener('click', this.popupOpenClose);     // раз в мене так багато одного і тож коду на різні кліки - чи можна їх об'єднати?
    this.$popupClose.addEventListener('click', this.popupOpenClose);
  }

  #getTodoItemTemplate(todoItem) {
    return `<li class="list__item" data-id="${todoItem.id}"><span class="list__text">${todoItem.text}</span>
      <label class="list__checkbox-label"><input class="list__checkbox-input" type="checkbox" ${todoItem.done ? 'checked' : ''} tabindex="0"><span class="list__checkbox-button"><svg class="list__checkbox-icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0791 3.08754C12.307 3.31535 12.307 3.68469 12.0791 3.9125L5.66248 10.3292C5.43467 10.557 5.06533 10.557 4.83752 10.3292L1.92085 7.4125C1.69305 7.18469 1.69305 6.81535 1.92085 6.58754C2.14866 6.35974 2.51801 6.35974 2.74581 6.58754L5.25 9.09173L11.2542 3.08754C11.482 2.85974 11.8513 2.85974 12.0791 3.08754Z"/>
      </svg></span></label>
      <button class="list__delete-button" type="button">
        <svg class="list__delete-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.196 20.021 5 19.55 5 19V6C4.71667 6 4.479 5.90433 4.287 5.713C4.09567 5.521 4 5.28333 4 5C4 4.71667 4.09567 4.479 4.287 4.287C4.479 4.09567 4.71667 4 5 4H9C9 3.71667 9.096 3.479 9.288 3.287C9.47933 3.09567 9.71667 3 10 3H14C14.2833 3 14.521 3.09567 14.713 3.287C14.9043 3.479 15 3.71667 15 4H19C19.2833 4 19.5207 4.09567 19.712 4.287C19.904 4.479 20 4.71667 20 5C20 5.28333 19.904 5.521 19.712 5.713C19.5207 5.90433 19.2833 6 19 6V19C19 19.55 18.8043 20.021 18.413 20.413C18.021 20.8043 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.096 16.5207 9.288 16.712C9.47933 16.904 9.71667 17 10 17C10.2833 17 10.521 16.904 10.713 16.712C10.9043 16.5207 11 16.2833 11 16V9C11 8.71667 10.9043 8.479 10.713 8.287C10.521 8.09567 10.2833 8 10 8C9.71667 8 9.47933 8.09567 9.288 8.287C9.096 8.479 9 8.71667 9 9V16ZM13 16C13 16.2833 13.096 16.5207 13.288 16.712C13.4793 16.904 13.7167 17 14 17C14.2833 17 14.521 16.904 14.713 16.712C14.9043 16.5207 15 16.2833 15 16V9C15 8.71667 14.9043 8.479 14.713 8.287C14.521 8.09567 14.2833 8 14 8C13.7167 8 13.4793 8.09567 13.288 8.287C13.096 8.479 13 8.71667 13 9V16Z"/>
        </svg>
      </button>
    </li>`
  }

  render() {
    this.$todoList.innerHTML = this.data.map(this.#getTodoItemTemplate).join('');
  }

  #getListElementButtons() {                                        // дістаю елементи коли створиться елемент списку (спрацює функція #onFormSubmit)
    this.$listElement = document.querySelector('.list__item');
    this.$deleteButton = document.querySelector('.list__delete-button');
    this.$checkboxInput = document.querySelector('.list__checkbox-input');
    this.$popup = document.getElementById('popup');
    this.$popupClose = document.getElementById('popup-close');
    this.$deleteListNo = document.getElementById('delete-list-no');
    this.$deleteListYes = document.getElementById('delete-list-yes');
    console.log(this.$listElement);
  }

  pickListElement() {
    if(this.$checkboxInput.checked) {                     // не працює бо не робочий чекбокс
      this.$listElement.style.backgroundColor = '#D7DCFF';
    }
  }

  timerDifferentColor() {
    this.$listElement.style.backgroundColor = '#ECFFFA';
  }

  timerDeffoultColor() {
    this.$listElement.style.backgroundColor = '#fff';     // стилі не працюють - не повертається колір ще працює тільки один раз - на одному елеметі списку 
  }

  popupOpenClose = () => {
    this.$popup.classList.toggle('popup');         // те саме - нічого не працює(((
    // this.$popup.style.display = 'block';       // стилі не працюють (слухач вісить на кнопці на 48 рядку)
  }

  #onFormSubmit = (e) => {
    const form = e.target;
    e.preventDefault();
    const text = new FormData(form).get('text');
    if (text.trim()) {
      this.add(text);
      form.reset();
      this.render();
      this.#getListElementButtons();
      this.timerDifferentColor();
      setTimeout(this.timerDeffoultColor, 10000);
    };
  }

  #onTodoItemToogle = (e) => {
    const {id} = e.target.parentElement.dataset;
    this.toggle(Number(id));
    this.render();
  }

}

window.addEventListener('DOMContentLoaded', () => {
  const todoApp = new TodoListDom();
});



// ---------------------------------------------------------------------
// const todoList = [];

// const findTodoItemIndex = function findTodoItemIndex(id) {
//   return todoList.findIndex(item => item.id === id);
//   };

// const addNewTodoItem = function addNewTodoItem(text) {
//   todoList.push(new TodoItem(text));
// };

// const removeTodoItem = function removeTodoItem(id) {
// const idx = findTodoItemIndex(id);
// if (idx >= 0) {
//   todoList.splice(idx, 1);
// }
// };

// const toggleTodoDone = function toggleTodoDone(id) {
//   const idx = findTodoItemIndex(id);
//   if (idx >= 0) {
//     const oldTodoItem = todoList[idx];
//     const newTodoItem = { ...oldTodoItem, done: !oldTodoItem.done };
//     todoList.splice(idx, 1, newTodoItem);
//   }
// };

// window.addEventListener('DOMContentLoaded', () => {

  // const $form = document.getElementById('todo');
  // const $todoList = document.getElementById('todo-list');

  // const render = function render() {
  //   $todoList.innerHTML = todoList.map(todoItem => {
  //     return `<li class="list__item" data-id="${todoItem.id}">${todoItem.text}<input class="list__checkbox-input" type="checkbox" ${todoItem.done ? 'checked' : ''}></input></li>`
  //   }).join('');
  //   console.log(todoList);
  // };

  // const onFormSubmit = function onFormSubmit(e) {
  //   e.preventDefault();
  //   const text = new FormData($form).get('text');
  //   if (text.trim()) {
  //     addNewTodoItem(text);
  //     $form.reset();
  //     render();
  //   };
  // };

  // const toggle = function toggle(e) {
  //   const {id} = e.target.parentElement.dataset;
  //   toggleTodoDone(Number(id));
  //   render();
  // };

  // $form.addEventListener('submit', onFormSubmit);
  // $todoList.addEventListener('change', toggle);
// });


