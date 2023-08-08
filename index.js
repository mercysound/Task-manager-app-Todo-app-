var todoArr = []
var globerUser = "";
isEditing = false
var saveEditIndex;
var historyArr = []
// var editNo;
// var userName = prompt("What is your name") 

var currentDate = new Date
var hr = currentDate.getHours()
var min = currentDate.getMinutes()
// var currentTimeAdded = "Current time Added: " + hr +":"+ min
var currentTime = `${hr}:${min}`
var currentTimeEdit = "Current time Edited: " + currentTime

// let editArray

const getTodoLocal = () =>{
  let getLocal = localStorage.getItem("todoList");
// isEditing = false
if(getLocal){
  todoArr = JSON.parse(getLocal)
}else{
  todoArr = []
}
showTodo()
}

const addTodo = () => {
  if(isEditing){
    let confirmEdit = confirm(`are you sure to save edit todo no:  ${editNo+1}`)
    if(confirmEdit == true){
      if(document.getElementById("inpTodo").value == ""){
        alert("input your to to continue")
      }else{
        // var currentTimeAdded = hr +":"+ min;
        let todoInp = document.getElementById("inpTodo").value
        // var currentDate = new Date
        // var hr = currentDate.getHours()
        // var min = currentDate.getMinutes()
        // var currentTimeAdded = "Current time Added: " + hr +":"+ min
        var currentTimeEdit = "Current time Edited: " + currentTime
        // var currentTimeEdit = "Current time Edited: " + currentTime
        let todoProps = {inpTodo: todoInp, todoStatus: false, saveArry: false, addTime: currentTimeEdit}
        // historyArr.push(currentDate)
        // todoArr[saveEditIndex] = todoProps
        document.getElementById("inpTodo").value = ""
        document.getElementById("inpTodo").focus()
        updateTodoBtn.innerHTML = "Add Todo"
        historyArr.push(todoProps)
        
        isEditing = false
      }
    }
  }else{
    // alert("here i")
    if(document.getElementById("inpTodo").value == ""){
      alert("input your to to continue")
    }else{
      let todoInp = document.getElementById("inpTodo").value
      var currentTimeEdit = "Time added: " + currentTime
      let todoProps = {inpTodo: todoInp, todoStatus: false, saveArry: false,addTime: currentTimeEdit}
      todoArr.push(todoProps)
      document.getElementById("inpTodo").value = ""
      document.getElementById("inpTodo").focus()
      updateLocalsto()
      historyArr.push(todoProps)
    }
    
  }
  
  // console.log(todoArr); 
  // document.getElementById("dispTodo").innerHTML += `
  //   <div class="p-2 shadow w-25 my-2 mx-auto">${todoInp}</div> <button class="btn btn-danger">Edit</button>
  // ` 
  showTodo()
  updateLocalsto()
}
const showTodo = () =>{
  // var currentTime = hr +":"+ min;
  let arraySpace = ""
  for(let i = 0; i < todoArr.length; i++){
    if(todoArr[i].todoStatus){
      arraySpace += `<div class="shadow w-100 fs-5 mx-auto my-3 py-2 text-info  d-flex justify-content-between"><span class="text-warning me-5">${"Task done @ "+currentTime}<span class="text-success fw-bold mx-5 fs-3">${i+1}. ${todoArr[i].inpTodo}</span></span> <span class="text-success fw-bolder">Successfully Done <button class=" text-light btn btn-outline-warning" onclick="deleteTodo(${i})">Delete Todo</button></span></div>`
    }else{
      arraySpace += `<div class="shadow w-100 fs-5 mx-auto my-3 py-2 d-flex justify-content-between text-danger "><span class="text-warning">${"Task added @ "+currentTime} <span class="mx-5 fs-3 fw-bolder">${i+1}. ${todoArr[i].inpTodo} </span></span><div><button onclick="markDone(${i})" class=" text-light btn btn-outline-danger">Mark as done</button><button onclick="editTodo(${i})" class="text-light btn btn-outline-primary mx-2">Edit Todo</button></div></div>` 
    }
    // else{
    // arraySpace += `<div class="shadow w-50 mx-auto text-primary my-2 py-2">${todoArr[i].inpTodo}</div>` 
 
    // }
  }
  document.getElementById("dispTodo").innerHTML = arraySpace
  funCount();
  todoHistory()
}
const deleteTodo = (i) =>{
  let  validConfir = confirm("Are you sure to delete no " + `"${i+1}"` + " Todo task")
  if(validConfir == true){
    let filterTodoArr = todoArr.filter((item, index) => (index != i))
 
  // console.log(filterTodoArr);
  todoArr = filterTodoArr
  showTodo()
  updateLocalsto()
  }

}
var saveArry = []
const markDone = (index) =>{
 
  // alert("work")
  
  todoArr[index].todoStatus = true;
  // todoArr[index].saveArry = true;
  var currentTimeMark = "Mark done: " + currentTime
  todoArr[index].addTime = currentTimeMark
  historyArr.push(todoArr[index] = todoArr[index])
  showTodo()
  funCount()
  updateLocalsto()
  // todoArr[index]
  // console.log(todoArr[index]);
  
}

const clearTodo = () =>{
  // alert("work")
  let clearTodoconfirm = confirm("Are you sure to clear all Todo")
  if(clearTodoconfirm == true){
    todoArr.length = 0;
     document.getElementById("inpTodo").value = ""
     document.getElementById("inpTodo").focus()
     updateTodoBtn.innerHTML = "Add Todo"
    showTodo()
    updateLocalsto()
  }
}
const editTodo = (i) =>{
  // alert("work")
  editNo = todoArr.findIndex(e => e == todoArr[i])
  console.log(editNo);
  editArray = todoArr[i]
  document.getElementById("inpTodo").value = editArray.inpTodo
  document.getElementById("inpTodo").focus()

  saveEditIndex = (i)
  isEditing = true
  updateTodoBtn.innerHTML = "Update Edit"
}

const funCount = () =>{
  let pending = todoArr.filter(a => !a.todoStatus)
  if(pending.length == 0 && todoArr){
    document.getElementById("showCount").innerHTML = `<p>You have no pending task yet</p>`
  }else if(pending.length == 1 && todoArr){
    document.getElementById("showCount").innerHTML = `<p>You have ${pending.length} pending task</p>`
  }else if(pending.length > 1 && todoArr.length){
    document.getElementById("showCount").innerHTML = `<p>You have ${pending.length} pending tasks</p>`
  }
  // console.log(todoArr.length);
}
const updateLocalsto = () =>{
  localStorage.setItem("todoList", JSON.stringify(todoArr))
}

const todoHistory = () =>{
  let todoContent = ""
   historyArr.map((item, index) => (
    todoContent +=`
      <tr>
        <td>${index+1}</td>
        <td>${item.inpTodo}</td>
        <td>${item.addTime}</td>
      </tr>
    `
    ))
    document.getElementById("tBody").innerHTML =  todoContent
}
