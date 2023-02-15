const createBtn = document.getElementById("createBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");
const searchBox = document.getElementById("searchBox");
const listItem = document.getElementById("listItem");

const tasks = [];
initiate();

createBtn.addEventListener("click", createForm);
closeBtn.addEventListener("click", closeForm);
saveBtn.addEventListener("click", saveForm);
searchBox.addEventListener("keyup",search);
listItem.addEventListener("click",itemClick);

function initiate() {
  if (tasks.length == 0) {
    for (var i = 0; i < getLocalStorageLength(); i++) {
      tasks.push(readFromLocalStorage(i))
    }
    initiateList();
    return;
  }
}

function createForm(e) {
  var container = document.getElementById("modal");
  if(container.style.display == "block") container.style.display = "none"; 
  else container.style.display = "block"
}

function closeForm(e) {
  var container = document.getElementById("modal");
  container.style.display = "none";
}

function saveForm(e) {
  var activityNameData = document.getElementById("activity").value;
  if (activityNameData === "") return;
  else {
    tasks.push(activityNameData);
    saveToLocalStorage(tasks, tasks.length - 1);
    updateList(tasks.length - 1);
  }
  closeForm()
}

function saveToLocalStorage(tasks, counter) {
  localStorage.setItem("activity" + counter, JSON.stringify(tasks[counter]));
  initiate();
}

function readFromLocalStorage(counter) {
  if (getLocalStorageLength == 0) return;
  else return JSON.parse(localStorage.getItem("activity" + counter));
}

function getLocalStorageLength() {
  return localStorage.length;
}

function updateList(index) {
  var listContainer = document.querySelector("ul")
  var li = document.createElement("li")
  var a = document.createElement("a")
  a.textContent = tasks[index]
  a.setAttribute('id','listItem')
  li.appendChild(a)
  listContainer.appendChild(li)
}

function initiateList(){
  var listContainer = document.querySelector("ul");
  if (!localStorage.length == 0) {
    for (var i = 0; i < tasks.length; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.textContent = tasks[i];
      a.href = "#"
      li.appendChild(a);
      listContainer.appendChild(li);
    }
  }
}

function search() {
  // Declare variables
  var filter, ul, li, a, i, txtValue;
  filter = searchBox.value.toUpperCase();
  ul = document.querySelector("main");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}