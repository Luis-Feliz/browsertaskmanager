const taskInput = document.getElementById("task");
const catagoryInput = document.getElementById("catagory");
// const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");


async function fetchPostgresData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();

        const listContainer = document.getElementById("task-test");

        data.subtasks.forEach(row => {
            const task = row.name;
            //const taskItem = row.task;
            switch (row.catagory) {
                case "Coding":
                taskList = document.getElementById("task-list");
                break;
                case "Writing":
                taskList = document.getElementById("task-list1");
                break;
                case "Music":
                taskList = document.getElementById("task-list2");
                break;
                case "Art":
                taskList = document.getElementById("task-list3");
                break;
                case "Misc":
                taskList = document.getElementById("task-list4");
                break;
                default:
                console.error("Unknown category:", row.catagory);
            }
            const taskItem = document.createElement("div");
            taskItem.classList.add("task");

            taskItem.innerHTML =
            `   
                <button class="mark-done">Mark Done</button>
                <button class="demo" onclick="location.href='Timer.html'">Main Page</button>
                <p>${row.name}</p>        
            `;
            taskList.appendChild(taskItem);                    
        });
    } 
    catch (error) {
        console.error('Error fetching data from API:', error);
    }
}
fetchPostgresData();

addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const catagory = catagoryInput.value;

    switch (catagory) {
        case "Coding":
            taskList = document.getElementById("task-list");
            break;
        case "Writing":
            taskList = document.getElementById("task-list1");
            break;
        case "Music":
            taskList = document.getElementById("task-list2");
            break;
        case "Art":
            taskList = document.getElementById("task-list3");
            break;
        case "Misc":
            taskList = document.getElementById("task-list4");
            break;
        default:
            console.error("Unknown category:", catagory);
    }   

    const taskItem = document.createElement("div");
    taskItem.classList.add("task");

    taskItem.innerHTML =
    `   
        <button class="mark-done">Mark Done</button>
        <button class="demo" onclick="location.href='Timer.html'">Main Page</button>
        <p>${task}</p>        
    `;
    taskList.appendChild(taskItem);
    
    taskInput.value = "";
    catagoryInput.value = "Coding";
    // deadlineInput.value = "";
});


//This marks the completion of the task
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = "#f2f2f2";
        event.target.disabled = true;
    }
});