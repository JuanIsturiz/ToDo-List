//Constants for HTML elements
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("add-todo-button");
const todosList = document.getElementsByClassName("todos-list");
const todosSelect = document.getElementById("todos-select");
const clearAll = document.getElementById("clear-all");


//Initiated array where todos are going to be saved
let todos = [];

//checks if theres any todos in local storage and displays them on page
checkLocalTodos();

//add todo event listener and handler function
todoButton.addEventListener("click", addTodo);

function addTodo(e) {
  e.preventDefault();
  const input = todoInput.value.trim();

  //check if todos are duplicated or empty
  if (!(input.length > 0)) {
    return alert("Please add some text to the todo.");
  }
  const checker = todos.some(todo => todo === input);
  if (checker) {
    alert("This todo already exists.");
    return todoInput.value = "";
  }
  //created Div
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("todo-div");

  //created li and append it to the Div
  const toDoLi = document.createElement("li");
  toDoLi.classList.add("todo-item");
  toDoLi.innerText = input;
  toDoDiv.appendChild(toDoLi);

  //created checked button and append it to the Div
  const checkTodoButton = document.createElement("button");
  checkTodoButton.classList.add("check-button");
  checkTodoButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  toDoDiv.appendChild(checkTodoButton);

  //created delete button and append it to the Div
  const deleteTodoButton = document.createElement("button");
  deleteTodoButton.classList.add("delete-button");
  deleteTodoButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  toDoDiv.appendChild(deleteTodoButton);

  //append toDoDiv to todosList and clears value of input
  todosList[0].appendChild(toDoDiv);
  todos.push(input);
  setLocalTodos(todos);

  todoInput.value = "";

  //buttons event listener and handler function
  toDoDiv.addEventListener("click", buttonAction);
  function buttonAction(e) {
    const index = todos.indexOf(e.target.parentNode.childNodes[0].innerText);

    //checks todo and deletes it from local storage if checked
    if (e.target.classList[0] === "check-button") {
      toDoDiv.classList.toggle("checked");
      if (toDoDiv.classList[1] === "checked") {
        todos.splice(index, 1);
        setLocalTodos(todos);
        if (todos.length === 0) {
          localStorage.clear();
        }
      } else {
        todos.splice(index, 0, input);
        setLocalTodos(todos);
      }
    }

    //deletes todo from page and local storage
    if (e.target.classList[0] === "delete-button") {
      toDoDiv.classList.add("removed");
      setTimeout(() => e.target.parentElement.remove(), 300);
      todos.splice(index, 1);
      if (todos.length === 0) {
        localStorage.clear();
      } else {
        localStorage.setItem("todos", JSON.stringify(todos));
      }

      // removed select from the form
      if (todosList[0].childNodes.length === 1) {
        setTimeout(() => todosSelect.classList.toggle("hidden"), 300);
        setTimeout(() => clearAll.classList.toggle("hidden"), 300);
      }
    }
  }

  //added select to the form
  if (todosList[0].childNodes.length === 1) {
    todosSelect.classList.toggle("hidden");
    clearAll.classList.toggle("hidden");
  }

}

//select event listener and handler function
todosSelect.addEventListener("click", filterTodo);
function filterTodo(e) {

  //added switch to every todo
  const todosInsideList = todosList[0].childNodes;
  todosInsideList.forEach(todo => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "checked":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "unchecked":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  })
}

//clear all event listener and handler function
clearAll.addEventListener("click", deleteAll);
function deleteAll() {
  const length = todosList[0].childNodes.length;
  todosList[0].childNodes.forEach(child => child.classList.add("removed"));
  setTimeout(() => {
    for (let i = 0; i < length; i++) {
      todosList[0].childNodes[0].remove();
    }
    todos = [];
    clearAll.classList.toggle("hidden");
    todosSelect.classList.toggle("hidden");
  }, 300);
  localStorage.clear();
}

//checks if theres any todos in local storage and displays them on page
function checkLocalTodos() {
  if (localStorage.getItem("todos") !== null) {
    todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach(todo => {
      //created Div
      const toDoDiv = document.createElement("div");
      toDoDiv.classList.add("todo-div");

      //created li and append it to the Div
      const toDoLi = document.createElement("li");
      toDoLi.classList.add("todo-item");
      toDoLi.innerText = todo;
      toDoDiv.appendChild(toDoLi);

      //created checked button and append it to the Div
      const checkTodoButton = document.createElement("button");
      checkTodoButton.classList.add("check-button");
      checkTodoButton.innerHTML = '<i class="fa-solid fa-check"></i>';
      toDoDiv.appendChild(checkTodoButton);

      //created delete button and append it to the Div
      const deleteTodoButton = document.createElement("button");
      deleteTodoButton.classList.add("delete-button");
      deleteTodoButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      toDoDiv.appendChild(deleteTodoButton);

      //append toDoDiv to todosList and clears value of input
      todosList[0].appendChild(toDoDiv);

      //buttons event listener and handler function
      toDoDiv.addEventListener("click", buttonAction);
      function buttonAction(e) {
        const index = todos.indexOf(todo);

        //checks todo and deletes it from local storage if checked
        if (e.target.classList[0] === "check-button") {
          toDoDiv.classList.toggle("checked");
          if (toDoDiv.classList[1] === "checked") {
            todos.splice(index, 1);
            setLocalTodos(todos);
            if (todos.length === 0) {
              localStorage.clear();
            }
          } else {
            todos.push(todo);
            setLocalTodos(todos);
          }
        }

        //deletes todo from page and local storage
        if (e.target.classList[0] === "delete-button") {
          toDoDiv.classList.add("removed");
          setTimeout(() => e.target.parentElement.remove(), 300);
          todos.splice(index, 1);
          if (todos.length === 0) {
            localStorage.clear();
          } else {
            localStorage.setItem("todos", JSON.stringify(todos));
          }

          // removed select from the form
          if (todosList[0].childNodes.length === 1) {
            setTimeout(() => todosSelect.classList.toggle("hidden"), 300);
            setTimeout(() => clearAll.classList.toggle("hidden"), 300);
          }
        }
      }

      //added select to the form
      if (todosList[0].childNodes.length === 1) {
        todosSelect.classList.toggle("hidden");
        clearAll.classList.toggle("hidden");
      }
    })
  }
}

//saves todos to local storage
function setLocalTodos(todosToSet) {
  localStorage.setItem("todos", JSON.stringify(todosToSet));
}