// Search Input
const labelSearch = document.querySelector(".label__search-input");
const searchInput = document.querySelector(".search-input");

function addInputToDOM() {
  searchInput.classList.toggle("active__search-input");
}

labelSearch.addEventListener("click", addInputToDOM);

// Add Todo
const todoInput = document.getElementById("todo-input");
const todoButton = document.querySelector(".todo-button");
const todosContainer = document.querySelector(".todos-container");

function addTodo(e) {
  e.preventDefault();
  const MaxLength = 20;
  if (todoInput.value) {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    todo.innerHTML = `
      <li>
      ${todoInput.value.substring(0, MaxLength)}
      ${todoInput.value.length > MaxLength ? "..." : ""}
      </li>
      <div class="date__todo" >${new Date().toLocaleString("fa", {
        dateStyle: "short",
        timeStyle: "short",
      })}</div>
      <span><i class="far fa-trash-alt"></i> </span>
      <span> <i class="far fa-square-check"></i></span>`;
    todosContainer.appendChild(todo);
  }
  todoInput.value = "";
}

todoButton.addEventListener("click", addTodo);

// check Remove

function checkRemove(e) {
  const classLIst = [...e.target.classList];
  const item = e.target;
  if (classLIst[1] === "fa-trash-alt") {
    const todo = item.parentElement.parentElement;
    console.log(todo.classList);
    todo.remove();
  } else if (classLIst[1] === "fa-square-check") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");
    console.log(todo.className);
    //  console.log(todo.classList);
  }
}

todosContainer.addEventListener("click", checkRemove);
