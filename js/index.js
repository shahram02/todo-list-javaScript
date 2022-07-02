// Search Input
const labelSearch = document.querySelector(".label__search-input");
const searchInput = document.querySelector(".search-input");

function addInputToDOM() {
  searchInput.classList.toggle("active__search-input");
}

labelSearch.addEventListener("click", addInputToDOM);
