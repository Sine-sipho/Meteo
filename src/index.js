function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.getElementById("search-form-input");
  let city = document.getElementById("city");
  city.innerHTML =
    searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1);
  searchInput.value = "";
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
