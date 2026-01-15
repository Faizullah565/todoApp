let parseData = JSON.parse(localStorage.getItem("todoListData"))
let todos = []
todos = [...parseData]
parseData ? document.getElementById("listOfItems").style.display = "none" : document.getElementById("listOfItems").style.display = "block"
document.getElementById("updateBtn").style.display = "none"
let globalId = ''

////////////////////////////Update todo list /////////////////////////////////////////
const updateList = () => {
    todos.length == 0 ? document.getElementById("listOfItems").style.display = "none" : document.getElementById("listOfItems").style.display = "block"
    let data = todos.map(todo => {
        return (`<tr>
            <td class="text-center">${todo.name.charAt(0).toUpperCase() + todo.name.slice(1)}</td>
            <td class="text-center">${todo.quantity}</td>
            <td class="text-center">${(todo.price * todo.quantity / todo.quantity)}</td>
        <td class="text-center">${todo.price * todo.quantity}</td>
        <td class="text-center">
        <button type="button" class="btn btn-primary editDelete" onclick="editToDo(${todo.id})"><i class='fas fa-edit' style='font-size:18px'></i></button>
        </td>
        <td class="text-center ">
        <button type="button" class="btn btn-danger editDelete" onclick="deleteToDo(${todo.id})"><i class='far fa-trash-alt' style='font-size:20px'></i></button>
        </td>
        </tr>`)

    });
    document.getElementById("table-body").innerHTML = (data.join(""))
}
updateList()
// /////////////////////// Add todo Items

function handleTodos(event) {
    event.preventDefault()
    const name = document.getElementById("inputName").value
    const quantity = +document.getElementById("inputQuantity").value
    const price = document.getElementById("inputPrice").value
    if (name == '' || quantity == '' || price == '') {
        return
    }
    const checkNameExist = todos.map(todo => {
        if (todo.name.toLowerCase() == name.toLowerCase()) {
            return { ...todo, quantity: todo.quantity + quantity }
        }
        todos.push({
            name: name.toLowerCase(),
            quantity: quantity,
            price: price / quantity,
            id: Math.floor(Math.random() * 10000000),
        })
        return todo
    })
    todos = [...checkNameExist]
    if (todos.filter(todo => todo.name == name).length == 0) {
        todos.push({
            name: name.toLowerCase(),
            quantity: quantity,
            price: price / quantity,
            id: Math.floor(Math.random() * 10000000),
        })
    }
    localStorage.setItem("todoListData", JSON.stringify(todos))
    clearForm();
}
//////////////////////// Edit Todo List //////////////////////////////////////
const editToDo = (id) => {
    document.getElementById("addBtn").style.display = "none"
    document.getElementById("updateBtn").style.display = "block"
    const inputName = document.getElementById("inputName")
    const inputQuantity = document.getElementById("inputQuantity")
    const inputPrice = document.getElementById("inputPrice")
    let findAndUpdate = todos.filter(todo => todo.id == id)
    inputName.value = findAndUpdate[0].name.charAt(0).toUpperCase() + findAndUpdate[0].name.slice(1)
    inputQuantity.value = findAndUpdate[0].quantity
    inputPrice.value = findAndUpdate[0].price * findAndUpdate[0].quantity
    globalId = id;
}
// /////////////////  Update Todo Item //////////////////
const updateTodoData = (event) => {
    event.preventDefault()
    const name = document.getElementById("inputName").value
    const quantity = +document.getElementById("inputQuantity").value
    const price = +document.getElementById("inputPrice").value
    const updateTodo = todos.map(todo => {
        if (todo.id == globalId) {
            if (name == '' || quantity == '' || price == '') {
                return todo;
            }
            else {
                return { ...todo, name: name.toLowerCase(), quantity: +quantity, price: +price / +quantity }
            }
        }
        return todo
    })
    todos = [...updateTodo]
    localStorage.removeItem("todoListData")
    localStorage.setItem("todoListData", JSON.stringify(todos))
    let parseData = JSON.parse(localStorage.getItem("todoListData"))
    todos = [...parseData]
    clearForm()
}
///////////////////// Delete Todo Item /////////////////////////////////////////
const deleteToDo = (id) => {
    let todoDelete = todos.filter(todo => todo.id != id)
    // let showAlert = document.createElement("p")
    // showAlert.id="showAlert"
    // showAlert.className="showAlert"
    // console.log(showAlert)
    // document.getElementById("mainContainer").appendChild(showAlert)
    todos = [...todoDelete]
    localStorage.removeItem("todoListData")
    localStorage.setItem("todoListData", JSON.stringify(todos))
    let parseData = JSON.parse(localStorage.getItem("todoListData"))
    todos = [...parseData]
    clearForm();
}

const clearForm=()=>{
document.getElementById("inputName").value = ''
    document.getElementById("inputQuantity").value = ''
    document.getElementById("inputPrice").value = ''
    document.getElementById("addBtn").style.display = "block"
    document.getElementById("updateBtn").style.display = "none"
    updateList();
}