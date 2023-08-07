var todoArr = []
var globerUser = "";
isEditing = false
var saveEditIndex;
var historyArr = []
// var editNo;

var currentDate = new Date
var hr = currentDate.getHours()
var min = currentDate.getMinutes()
// var currentTimeAdded = "Current time Added: " + hr +":"+ min
var currentTime = `${hr}:${min}`

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
        let todoProps = {inpTodo: todoInp, todoStatus: false, addTime: ("Current Time String:", currentTimeEdit)}
        // historyArr.push(currentDate)
        todoArr[saveEditIndex] = todoProps
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
      var currentTimeEdit = "Current time Added: " + currentTime
      let todoProps = {inpTodo: todoInp, todoStatus: false, addTime: currentTimeEdit}
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
      arraySpace += `<div class="shadow w-100  mx-auto my-3 py-2 text-success d-flex justify-content-between"><span>${"You completed task @ : "+currentTime}</span>${i+1}. ${todoArr[i].inpTodo} <span class="">Successfully Done</span><button class="btn btn-warning" onclick="deleteTodo(${i})">Delete Todo</button></div>`
    }else{
      arraySpace += `<div class="shadow w-100 mx-auto my-3 py-2 d-flex justify-content-between text-danger"><span>${"You add new Task @ : "+currentTime}</span><span>${i+1}. ${todoArr[i].inpTodo}  </span> <div><button onclick="markDone(${i})" class="btn btn-danger">Mark as done</button><button onclick="editTodo(${i})" class="btn btn-primary mx-2">Edit Todo</button></div></div>` 
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
const markDone = (index) =>{
  // alert("work")
  
  todoArr[index].todoStatus = true;
  // todoArr.length.slice(index) = todoArr 
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
  
  // let editIndex = todoArr.filter(e => e == todoArr.i)
  updateTodoBtn.innerHTML = "Update Edit"



  // todoArr == deleteInd;
  // console.log(editIndex);
}

const funCount = () =>{
  let pending = todoArr.filter(a => !a.todoStatus)
  // for the forloop 
  //pending = 0;
  //let i;
  // for(i = 0; i < todoArr.length; i++){
  //   if(!todoArr[i].todoStatus){
  //     pending += 1
  //   }
  // }
  if(pending.length == 0 && todoArr){
    document.getElementById("showCount").innerHTML = `<p>You have no pending task yet</p>`
  }else if(pending.length == 1 && todoArr){
    document.getElementById("showCount").innerHTML = `<p>You have ${pending.length} pending task</p>`
  }else if(pending.length > 1 && todoArr.length){
    // let pending;
    // document.getElementById("showCount").innerHTML = `<div class="disp-4">${(todoArr.length < 2? " You have " + todoArr.length + " task pending " : " You have " + todoArr.length + " tasks pending" )}  <span></span></div>` 
    // document.getElementById("showCount").innerHTML = `<div class="disp-4">${pending = todoArr.filter(a => !a.todoStatus)?" You have " + pending.length + " task pending " : todoArr.length < 2? " You have " + todoArr.length + " task pending " : " You have " + todoArr.length + " tasks pending" }  <span></span></div>` 
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
    //   <tr>
    //   <td>`${index+1}`</td>
    //   {/* <td>{item.addTime}</td> */}
    // </tr>
    
    ))
    document.getElementById("tBody").innerHTML =  todoContent
}
