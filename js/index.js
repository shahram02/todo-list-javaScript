// Search Input
const labelSearch = document.querySelector(".label__search-input");
const searchInput = document.querySelector(".search-input");
const searchContainer = document.querySelector(".search__container");

function addInputToDOM() {
  searchInput.classList.toggle("active__search-input");
}

labelSearch.addEventListener("click", addInputToDOM);

// Add Todo
const todoInput = document.getElementById("todo-input");
const todoButton = document.querySelector(".todo-button");
const todosContainer = document.querySelector(".todos-container");

function addTodo() {
  const date = new Date().toISOString();
  const MaxLength = 20;
  if (todoInput.value) {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    todo.innerHTML = `
      <li>
      ${todoInput.value.substring(0, MaxLength)}
      ${todoInput.value.length > MaxLength ? "..." : ""}
      </li>
      <div class="date__todo" >${new Date(date).toLocaleString("fa", {
        dateStyle: "short",
        timeStyle: "short",
      })}</div>
      <span><i class="far fa-trash-alt"></i> </span>
      <span> <i class="far fa-square-check"></i></span>`;
    todosContainer.appendChild(todo);
  }
  savedTodos(todoInput.value, date);
  todoInput.value = "";
}

todoButton.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

// check Remove

function checkRemove(e) {
  const classLIst = [...e.target.classList];
  const item = e.target;
  if (classLIst[1] === "fa-trash-alt") {
    const todo = item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  } else if (classLIst[1] === "fa-square-check") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
    //  console.log(todo.className);
    //  console.log(todo.classList);
  }
}

todosContainer.addEventListener("click", checkRemove);

// FilterTodos
const filterOption = document.querySelector(".filter-todos");

function filterTodos(e) {
  const valueOption = e.target.value;
  const todos = [...todosContainer.childNodes];
  todos.forEach((todo) => {
    console.log(todo);
    switch (valueOption) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.className == "todo completed") {
          console.log(todo);
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.className !== "todo completed") {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
filterOption.addEventListener("click", filterTodos);

// Storage
function savedTodos(todo, date) {
  const savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.push({ todo, date });
  localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getTodosInStorage() {
  const savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  savedTodos.forEach((todoSave) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.innerHTML = `
          <li>
          ${todoSave.todo}
          </li>
          <div class="date__todo" >${new Date(todoSave.date).toLocaleString(
            "fa",
            {
              dateStyle: "short",
              timeStyle: "short",
            }
          )}</div>
          <span><i class="far fa-trash-alt"></i> </span>
          <span> <i class="far fa-square-check"></i></span>`;
    todosContainer.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  console.log(todo.children[0].innerText);
  const savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  const filteeredTodos = savedTodos.filter(
    (t) => t.todo !== todo.children[0].innerText
  );
  localStorage.setItem("todos", JSON.stringify(filteeredTodos));
}

document.addEventListener("DOMContentLoaded", () => {
  getTodosInStorage();
});
