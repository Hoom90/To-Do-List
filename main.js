const createBtn = document.getElementById("createBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");
const searchBox = document.getElementById("searchBox");
const listContainer = document.querySelector("ul");
const inputForm = document.getElementById("activity");

let tasks = readFromLocalStorage();

initiate();

createBtn.addEventListener("click", createForm);
closeBtn.addEventListener("click", closeForm);
saveBtn.addEventListener("click", saveForm);
searchBox.addEventListener("keyup", search);

//This Method is The First Function To Read To Fill 'tasks[]'
function initiate() {
  renderList(tasks);
}
//This Method is Called When Create Button is Clicked
function createForm(e) {
  let container = document.getElementById("modal");
  if (container.style.display == "block") container.style.display = "none";
  else container.style.display = "block";
}
//This Method is Called When Close Button is Clicked
function closeForm(e) {
  let container = document.getElementById("modal");
  container.style.display = "none";
}
//This Method is Called When Save Button is Clicked
function saveForm(e) {
  if (inputForm.value === "") return closeForm();

  const newTask = {
    id: Date.now(),
    data: inputForm.value,
    status: false,
  };

  const newTaskEl = createItem(newTask);

  listContainer.appendChild(newTaskEl);

  tasks.push(newTask);
  saveToLocalStorage(tasks);

  closeForm();
}





//This Method initiates Items in Main Page
function renderList(tasks) {
listContainer.replaceChildren()

  tasks.forEach((task) => {
    const newTaskEl = createItem(task);

    listContainer.appendChild(newTaskEl);
  });
}





//This Method Creates a New Item in Main Page
function createItem(item) {
  let li = document.createElement("li");
  let titleSpan = document.createElement("span");
  let deteleBtn = document.createElement("button");
  let img = document.createElement("img");

  li.setAttribute("id", `task-${item.id}`);

  titleSpan.textContent = item.data;

  deteleBtn.addEventListener("click", () => removeHandle(item.id));
  img.src = "img/x.png";
  deteleBtn.appendChild(img);

  titleSpan.addEventListener("click", () => {
    itemClick(item);
  });

  li.appendChild(titleSpan);
  li.appendChild(deteleBtn);

  return li;
}
//This Method Deletes Selected Item in Main Page
function removeHandle(id) {
  let filterdList = tasks.filter((task) => task.id !== id);

  tasks = filterdList;

  document.querySelector(`#task-${id}`).remove();

  saveToLocalStorage(filterdList);
}






//This Method is Called When Search-Box is Clicked
function search() {
  // Declare letiables
  const filterValue = searchBox.value

  let filterdList = tasks.filter((task) => task.data.search(filterValue) !== -1);

  renderList(filterdList)
}
//This Method Is For Clicked Item in Main Page
function itemClick(item) {
  if (item.status) {
    item.status = false;
    document.querySelector(`#task-${item.id}`).children[0].classList.remove("clicked");
  } else {
    item.status = true;
    document.querySelector(`#task-${item.id}`).children[0].classList.add("clicked");
  }
  saveToLocalStorage(tasks);
}






//This Method Saves To Storage
function saveToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//This Method Reads Data
function readFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");

  if (tasks) {
    return JSON.parse(tasks);
  } else {
    return [];
  }
}
