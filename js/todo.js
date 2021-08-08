const todoForm = document.getElementById('todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.getElementById('todo-list');

let toDos = [];

const TODOS_KEY = 'todos';

function deleteTodo(e) {
    const li = e.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveTodo();
}

function doneTodo(e) {
    const li = e.target.parentElement;
    toDos.forEach(item => {
        if(item.id === parseInt(li.id)) {
            if(item.done === false) {
                item.done = true;
            } else {
                item.done = false;
            }
        }
    })
    saveTodo();
    addDoneClass();
}

function addDoneClass() {
    const doneList = toDos.filter(toDo => toDo.done === true);
    const dontList = toDos.filter(toDo => toDo.done === false);
    doneList.forEach(item => {
        const targetId = document.getElementById(item.id);
        if(targetId !== null) {
            targetId.classList.add('done');
        }
    })
    dontList.forEach(item => {
        const targetId = document.getElementById(item.id);
        if(targetId !== null) {
            targetId.classList.remove('done');
        }
    })
}

function paintTodo(newTodo) {
    const li = document.createElement('li');
    li.id = newTodo.id;
    const checkbox = document.createElement('span');
    checkbox.className = 'checkbox';
    checkbox.addEventListener('click', doneTodo);
    const span = document.createElement('span');
    span.className = 'text';
    span.innerText = newTodo.text;
    span.addEventListener('click', doneTodo);
    const button = document.createElement('button');
    button.innerText = '❌';
    button.addEventListener('click', deleteTodo);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
    addDoneClass();
}

function saveTodo() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function onTodoSubmit(e) {
    e.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = '';
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
        done: false
    }
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodo();
}

todoForm.addEventListener('submit', onTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    toDos = parsedTodos;
    toDos.forEach(item => paintTodo(item));
}
