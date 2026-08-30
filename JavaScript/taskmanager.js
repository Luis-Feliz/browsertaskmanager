const taskInput = document.getElementById("task");
const catagoryInput = document.getElementById("catagory");
const addTaskButton = document.getElementById("add-task");
//const taskList;
//const taskList = document.getElementById("task-list");

function addColumn() {
    const table = document.getElementById("myTable");
    
    const task = taskInput.value;
    const catagory = catagoryInput.value;

    switch (catagory) {
    case Coding:
        
        const taskList = document.getElementById("task-list-c");
        const cellsNum = 0;

        break;
    case Music:
        const taskList = document.getElementById("task-list-mu");
        const cellsNum = 1;

        break;
    case Art:
        const taskList = document.getElementById("task-list-a");
        const cellsNum = 2;
        break;

    case Writing:
        const taskList = document.getElementById("task-list-w");
        const cellsNum = 3;
        
        break;
    case Misc:
        const taskList = document.getElementById("task-list-mi");
        const cellsNum = 4;
        break;
    default:
        break;
    }
    const cells = table.cells[cellsNum];
    
    //now add cells for table
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");

    taskItem.innerHTML =
    `
        <button class="mark-done">Mark Done</button>
        <button class="demo" onclick="location.href='Timer.html'">Main Page</button>
    
        <p>${task}</p>
    `;
    taskList.appendChild(taskItem);
}
/*
addTaskButton.addEventListener("click", () => {
    
    //const deadline = deadlineInput.value;
    
    
    */
    /*
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");

    taskItem.innerHTML =
    `
        <button class="mark-done">Mark Done</button>
        <button class="demo" onclick="location.href='Timer.html'">Main Page</button>
        <ul>
            <li>${taskInput}</li>
            <li>${catagoryInput}</li>
            <li>${addTaskButton}</li>
            <li>${taskItem}</li>
            <li>${catagory}</li>
            <li>${task}</li>
        </ul>
    `;
    taskList.appendChild(taskItem);

    taskInput.value = "";
    catagoryInput.value = "Coding";
    //deadlineInput.value = "";


    /*
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");

    taskItem.innerHTML =
    `
        <button class="mark-done">Mark Done</button>
        <button class="demo" onclick="location.href='Timer.html'">Main Page</button>
    
        <p>${task}</p>
    `;
    taskList.appendChild(taskItem);
    
});
*/

//This marks the completion of the task
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = "#f2f2f2";
        event.target.disabled = true;
    }
});