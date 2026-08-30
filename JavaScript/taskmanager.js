const taskInput = document.getElementById("task");
const catagoryInput = document.getElementById("catagory");
const addTaskButton = document.getElementById("add-task");
//const taskList;
//const taskList = document.getElementById("task-list");
addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const catagory = catagoryInput.value;
    //const deadline = deadlineInput.value;
    /*
    switch (catagory) {
    case Coding:
        
        const taskList = document.getElementById("task-list-c");
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
        break;
    case Music:
        const taskList = document.getElementById("task-list-mu");
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
        break;
    case Art:
        const taskList = document.getElementById("task-list-a");
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
        break;
    case Writing:
        const taskList = document.getElementById("task-list-w");
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
        break;
    case Misc:
        const taskList = document.getElementById("task-list-mi");
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
        break;
    default:
        console.log("Coding ran");
        break;
    }
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
    */
});


//This marks the completion of the task
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = "#f2f2f2";
        event.target.disabled = true;
    }
});