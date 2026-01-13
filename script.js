
let todos = []
todos.length==0?document.getElementById("listOfItems").style.display="none":document.getElementById("listOfItems").style.display="block"
    document.getElementById("updateBtn").style.display="none"
    let globalId = ''

// if(todos)document.getElementById("main-table").style.display="none"
function handleTodos(event) {
    event.preventDefault()
    const name = document.getElementById("inputName").value
    const quantity = +document.getElementById("inputQuantity").value
    const price = document.getElementById("inputPrice").value
    if (name == '' || quantity == '' || price == '') {
        return
    }
    const checkNameExist = todos.map(todo => {
        if (todo.name == name) {
            return { ...todo, quantity: todo.quantity + quantity }
        }
        todos.push({
            name: name,
            quantity: quantity,
            price: price/quantity,
            id: Math.floor(Math.random() * 10000000),
        })
        return todo
    })
    todos = [...checkNameExist]
    console.log(todos.filter(todo => todo.name == name).length == 0)
    if (todos.filter(todo => todo.name == name).length == 0) {
        todos.push({
            name: name,
            quantity: quantity,
            price: price/quantity,
            id: Math.floor(Math.random() * 10000000),
        })
    }
    document.getElementById("inputName").value=''
    document.getElementById("inputQuantity").value=''
    document.getElementById("inputPrice").value=''
    updateList()
}
//////////////////////// Edit Todo List //////////////////////////////////////
const editToDo = (id) => {

    console.log(id)
    document.getElementById("addBtn").style.display="none"
    document.getElementById("updateBtn").style.display="block"
    const inputName = document.getElementById("inputName")
    const inputQuantity = document.getElementById("inputQuantity")
    const inputPrice = document.getElementById("inputPrice")

    let findAndUpdate = todos.filter(todo=>todo.id==id)

    inputName.value=findAndUpdate[0].name
    inputQuantity.value=findAndUpdate[0].quantity
    inputPrice.value=findAndUpdate[0].price * findAndUpdate[0].quantity  
    globalId=id;
}

const updateTodoData=(event)=>{
    event.preventDefault()
    const name = document.getElementById("inputName").value
    const quantity = +document.getElementById("inputQuantity").value
    const price = +document.getElementById("inputPrice").value
    const updateTodo = todos.map(todo => {
        if (todo.id == globalId) {
            if (name == '' || quantity == '' || price == '') {
                return todo;
            }
            else{
                return { ...todo, name: name, quantity: +quantity, price: +price/+quantity }
            }
        }
        return todo
    })
    todos = [...updateTodo]
    document.getElementById("addBtn").style.display="block"
    document.getElementById("updateBtn").style.display="none"
    document.getElementById("inputName").value=''
    document.getElementById("inputQuantity").value=''
    document.getElementById("inputPrice").value=''
    updateList()
}
///////////////////// Delete Todo Item /////////////////////////////////////////
const deleteToDo = (id) => {
    let todoDelete = todos.filter(todo => todo.id != id)
    todos = [...todoDelete]
    document.getElementById("inputName").value=''
    document.getElementById("inputQuantity").value=''
    document.getElementById("inputPrice").value=''
    document.getElementById("addBtn").style.display="block"
    document.getElementById("updateBtn").style.display="none"
    updateList()
}

////////////////////////////Update todo list /////////////////////////////////////////
let totals = 0
let total = todos.map(todo=>{
    return (totals = totals+ todo.price*todo.quantity)
})
console.log(totals)
const updateList = () => {
todos.length==0?document.getElementById("listOfItems").style.display="none":document.getElementById("listOfItems").style.display="block"
    let data = todos.map(todo => {
        // <th>${todo.id}</th>
        return (`<tr>
        <td class="text-center">${todo.name}</td>
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