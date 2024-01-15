# To-Do Додаток на JavaScript + Parcel

1. **Огляд коду:**
   - Код написаний на чистому JavaScript з використанням сучасних стандартів (ES6+).
   - Використала класи для створення об'єктів `TodoItem`, `TodoList`, та `TodoListDom`.
   - Використала бібліотеку `uuid` для генерації унікальних ідентифікаторів для кожного завдання.

2. **Створення та керування елеметами списку:**
   - Визначела інтерфейс класу `TodoItem` з властивістю `done`, яка вказує на стан завдання.
   - В класі `TodoList` реалізувала методи для додавання (`add`), видалення (`remove`) та перемикання (`toggle`) стану завдань.

3. **Дизайн та UX:**
   - Використала класи для стилізації елементів списку та позначення їх стану (вибране, нове).
   - Вивела чекбокси та кнопки видалення для кращого користувацького досвіду.

4. **Інтерактивність та Pop-up:**
   - Додала можливість позначення завдань як виконані, видалення та з'явлення pop-up для підтвердження видалення.
   - Зробила код для обробників подій для керування взаємодією з користувачем.

8. **Збирання та запуск проекту:**
   - Використала інструмент `Parcel` для збирання та локального запуску проекту.

**Запуск проекту локально:**
1. Клонуйте репозиторій: `git clone https://github.com/dashechkaya/todo.git`
2. Встановіть залежності: `npm install`
3. Запустіть проект: `npm start`
