const form = document.getElementById('task-form');

function renderTasks(todos){
    const todocontainer = document.getElementById('task-list');
    todocontainer.innerHTML = "";
    for(let todo of todos){
        const div = document.createElement('div');
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.width = "100%";
    div.innerHTML = `<h1>Todo List</h1> <h4>${todo.name}</h4> <div id = ${todo._id}><button id = "update">${todo.status?"Undo":"Complete"}</button> <button id = "delete">Delete</button></div>`;
    todocontainer.prepend(div);
    }
}


form.addEventListener('submit', async(e) =>{
    e.preventDefault();
    const input = e.target.children[0];
    const task = input.value;
    const response = await axios.post("http://localhost:3000/users/create",{name:task, status:false});
    console.log(response);
    input.value = "";
    getTodo();
})


const todocontainer = document.getElementById('task-list');
async function getTodo() {
    let res = await axios.get("http://localhost:3000/users/all");
    let todos = res.data.tasks;

    renderTasks(todos);
}


getTodo();



const filterContainer = document.getElementById('filter-buttons');

filterContainer.addEventListener('click', async(e) => {
    // console.log(e.target.id);
    const filter = e.target.id;
    const filterbtns = filterContainer.children;
    if(filter === "all-btn") {
        filterTodos("all");
        e.target.className = "active";
        filterbtns[1].className = "";
        filterbtns[2].className = "";
    }
    else if(filter === "completed-btn") {
        filterTodos("completed");
        e.target.className = "active";
        filterbtns[0].className = "";
        filterbtns[2].className = "";
    }
    else if(filter === "pending-btn") {
        filterTodos("pending"); // This will now correctly filter false status
        e.target.className = "active";
        filterbtns[0].className = "";
        filterbtns[1].className = "";
    }
});



async function filterTodos(filter) {
    const res = await axios.get(`http://localhost:3000/users/filter`,{
        params:{
            status: filter  // Changed from 'filter: filter' to 'status: filter'
        }
    });
    renderTasks(res.data.tasks);
}


    
async function updateTodo(id) {
    const response = await axios.put(`http://localhost:3000/users/update/${id}`);
}

async function deleteTodo(id) {
    const response = await axios.delete(`http://localhost:3000/users/delete/${id}`);
}

todocontainer.addEventListener('click', async(e) => {
    const btnId = e.target.id;
    // console.log(e.target.parentElement);
    const todoId = e.target.parentElement.id;
    
    if(btnId == "update" ){
        updateTodo(todoId);
        getTodo();
    }
    if(btnId == "delete"){
        deleteTodo(todoId);
        getTodo();
    }

});

const clearCompletedBtn = document.getElementById('clear-completed');

clearCompletedBtn.addEventListener('click', async () => {
    try {
        const result = await axios.delete("http://localhost:3000/users/clear");
        console.log(result.data.message);
        getTodo(); // Refresh UI
    } catch (error) {
        console.error("Error clearing completed tasks:", error);
    }
});