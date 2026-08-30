const taskInput = document.getElementById("task");
const catagoryInput = document.getElementById("catagory");
//const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
//const taskList;
const taskList = document.getElementById("task-list");
addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const catagory = catagoryInput.value;
    //const deadline = deadlineInput.value;
    /*
    if (task.trim() === "" || deadline === "") {
        alert("Please select an upcoming date for the deadline.")
        return; // Don't add task if task or deadline is empty
    }

    const selectedDate = new Date(deadline); // assign html date onto variable
    const currentDate = new Date(); // assign today's date onto variable

    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return; // Don't add task if deadline is not in the future
    }
    */
    switch (catagoryInput) {
    case Coding:
        console.log("Coding ran");
        const taskList = document.getElementById("task-list-c");
        break;
    case Music:
        console.log("Coding ran");
        const taskList = document.getElementById("task-list-mu");
        break;
    case Art:
        console.log("Coding ran");
        const taskList = document.getElementById("task-list-a");
        break;
    case Writing:
        console.log("Coding ran");
        const taskList = document.getElementById("task-list-w");
        break;
    case Misc:
        console.log("Coding ran");
        const taskList = document.getElementById("task-list-mi");
        break;
    default:
        console.log("Coding ran");
        break;
}*/
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");

    taskItem.innerHTML =
    `
        <button class="mark-done">Mark Done</button>
        <button class="demo" onclick="location.href='Timer.html'">Main Page</button>
        <p>${catagory}</p>
        <p>${task}</p>
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