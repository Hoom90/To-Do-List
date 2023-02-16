const createBtn = document.getElementById("createBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");
const searchBox = document.getElementById("searchBox");

const tasks = [];
initiate();

createBtn.addEventListener("click", createForm);
closeBtn.addEventListener("click", closeForm);
saveBtn.addEventListener("click", saveForm);
searchBox.addEventListener("keyup",search);

//This Method is The First Function To Read To Fill 'tasks[]' 
function initiate() {
  if (tasks.length == 0) {
    for (var i = 0; i < getLocalStorageLength(); i++) {
      tasks.push(readFromLocalStorage(i))
    }
    initiateList(tasks);
    return;
  }
}
//This Method is Called When Create Button is Clicked
function createForm(e) {
  var container = document.getElementById("modal");
  if(container.style.display == "block") container.style.display = "none"; 
  else container.style.display = "block"
}
//This Method is Called When Close Button is Clicked
function closeForm(e) {
  var container = document.getElementById("modal");
  container.style.display = "none";
}
//This Method is Called When Save Button is Clicked
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
//This Method Saves To Storage
function saveToLocalStorage(tasks, counter) {
  localStorage.setItem("activity" + counter, JSON.stringify(tasks[counter]));
  initiate();
}
//This Method Reads Data
function readFromLocalStorage(counter) {
  if (getLocalStorageLength == 0) return;
  else return JSON.parse(localStorage.getItem("activity" + counter));
}
//This Method Reads Storage Length Data
function getLocalStorageLength() {
  return localStorage.length;
}
//This Method Updates The List Of Items In To-Do Lists
function updateList(index) {
  var listContainer = document.querySelector("ul")
  createItem(listContainer,index)
}

function initiateList(){
  var listContainer = document.querySelector("ul");
  if (!localStorage.length == 0) {
    for (var i = 0; i < tasks.length; i++) {
      createItem(listContainer,i)
    }
  }
}

function createItem(listContainer,index){
  var li = document.createElement("li")
  var a = document.createElement("a")
  a.textContent = tasks[index]
  a.setAttribute('onclick','itemClick(this)')
  li.appendChild(a)
  listContainer.appendChild(li)
}
//This Method is Called When Search-Box is Clicked
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

function itemClick(listItem){
  if(listItem.className == "clicked") listItem.className =""
  else listItem.className = "clicked"
}