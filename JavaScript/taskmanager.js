const taskInput = document.getElementById("task");
const catagoryInput = document.getElementById("catagory");
// const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
// Parse the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const receivedNumber = urlParams.get('projectId');
const finishForm = document.getElementById("finish-form");
        
// Display it on the page
document.getElementById('project-number').innerText = receivedNumber;


async function fetchPostgresData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();

        // Parse the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const receivedNumber = urlParams.get('projectId'); //number to compare with proj_id to determine what tasks to show
        
        data.subtasks.forEach(row => {
            if(receivedNumber == row.proj_id) { //only show tasks that match the project number
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
                `   <form id="finish-form" method="POST">
                        <button class="mark-done">Mark Done</button>
                    </form>
                    <button class="demo" onclick="location.href='../Html/Timer.html?subId=${row.id}&projectId=${row.proj_id}'">Start Subtask: ${row.id}</button>
                    <p>${row.name}</p>        
                `;
                taskList.appendChild(taskItem);    
            }                
        });
    } 
    catch (error) {
        console.error('Error fetching data from API:', error);
    }
}
fetchPostgresData();


// Event listener for the "Add Task" button
addTaskButton.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent standard page reload
    //make value as done. increment project finish by 1 and flip the boolean 

    try {
        const input = await fetch('http://localhost:3050/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: 'newsubtask', name: name, catagory: catagory, description: description, proj_id: projectId}) // Send the time data as JSON
        });
        const result = await input.json();

        if (input.ok) {
            responseMsg.style.color = 'green';
            responseMsg.textContent = result.message + "Refresh the page to see the new subtask.";
        } else {
            responseMsg.style.color = 'red';
            responseMsg.textContent = 'result.message: ' + result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        responseMsg.style.color = 'red';
        responseMsg.textContent = 'Could not connect to the server. ' + error.stack;
    }  
});

// Event listener for the "Add Task" button
finish-form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent standard page reload

    try {
        const input = await fetch('http://localhost:3050/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: 'finishsubtask', name: name, catagory: catagory, description: description, proj_id: projectId}) // Send the time data as JSON
        });
        const result = await input.json();

        if (input.ok) {
            responseMsg.style.color = 'green';
            responseMsg.textContent = result.message + "Refresh the page to see the new subtask.";
        } else {
            responseMsg.style.color = 'red';
            responseMsg.textContent = 'result.message: ' + result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        responseMsg.style.color = 'red';
        responseMsg.textContent = 'Could not connect to the server. ' + error.stack;
    }  
});



//This marks the completion of the task
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = "#f2f2f2";
        event.target.disabled = true;
    }
});



// addTaskButton.addEventListener("click", () => {
//     const task = taskInput.value;
//     const catagory = catagoryInput.value;

//     switch (catagory) {
//         case "Coding":
//             taskList = document.getElementById("task-list");
//             break;
//         case "Writing":
//             taskList = document.getElementById("task-list1");
//             break;
//         case "Music":
//             taskList = document.getElementById("task-list2");
//             break;
//         case "Art":
//             taskList = document.getElementById("task-list3");
//             break;
//         case "Misc":
//             taskList = document.getElementById("task-list4");
//             break;
//         default:
//             console.error("Unknown category:", catagory);
//     }   

//     const taskItem = document.createElement("div");
//     taskItem.classList.add("task");

//     taskItem.innerHTML =
//     `   
//         <button class="mark-done">Mark Done</button>
//         <button class="demo" onclick="location.href='Timer.html'">Start Subtask</button>
//         <p>${task}</p>        
//     `;
//     taskList.appendChild(taskItem);
    
//     taskInput.value = "";
//     catagoryInput.value = "Coding";

// });