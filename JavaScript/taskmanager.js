const taskInput = document.getElementById("task");
const catagoryInput = document.getElementById("catagory");
// const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const projName = document.getElementById("nameProj");
const projDes = document.getElementById("desProj");

const finishForm = document.getElementsByClassName("finish-form");
let taskList = document.getElementById("task");

// Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const receivedNumber = urlParams.get('projectId');
        
// Display the received number in the span element
document.getElementById('project-number').textContent = `Project ID: ${receivedNumber}`;


async function fetchPostgresData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();
        data.projects.forEach(row => {
            if(receivedNumber == row.id) { //only show tasks that match the project number        
                projName.innerHTML = row.name; 
                projDes.innerHTML = row.description;                 
            }    
        });
        data.subtasks.forEach(row => {
            if(receivedNumber == row.proj_id) { //only show tasks that match the project number
                if (!row.complete){
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

                    taskItem.innerHTML =`
                        <table class="task">
                            <tr>
                                <td>Name:</td>
                                <td id = "subtaskName_${row.id}">${row.name}</td>
                                <td><button id = "noshow1_${row.id}"; onclick = "editSubtask(${row.id}, '${row.name}', '${row.description}')"> edit button </button></td>
                            </tr>
                            <tr>
                                <td style="display: flex; align-items: flex-start;">Description:</td>
                                <td id = "subtaskDes_${row.id}">${row.description}</td>
                                <td> <button id = "noshow2_${row.id}"; onclick = "deleteSubtask(${row.id})">delete button</button></td>
                            </tr>
                            <tr>
                                <td style="width: 50%;" id = "subtaskButton_${row.id}">
                                    <button onclick = "finishSubtask(${row.id})">Mark Done: ${row.id}</button>
                                </td>
                                <td style="width: 50%;">
                                    <button id = "noshow3_${row.id}"; onclick="location.href='../Html/Timer.html?subId=${row.id}&projectId=${row.proj_id}'">Start Subtask: ${row.id}</button>
                                </td>
                            </tr>
                        </table>          
                    `;
                    taskList.appendChild(taskItem);   
                }
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
    const subName = document.getElementById('task').value;
    const subCat = document.getElementById('catagory').value;
    const subDes = document.getElementById('description').value;
    try {
        const input = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: 'newsubtask', proj_id: receivedNumber, name: subName, catagory: subCat, description: subDes}) // Send the time data as JSON
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

async function finishSubtask(subtaskID) {
    try {
        const input = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: 'finishsubtask', id: +subtaskID}) // Send the time data as JSON
        });
        const result = await input.json();

        if (input.ok) {
            responseMsg.style.color = 'green';
            responseMsg.textContent = result.message + "Project in Id #" + subtaskID + " has been marked completed";
        } else {
            responseMsg.style.color = 'red';
            responseMsg.textContent = 'result.message: ' + result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        responseMsg.style.color = 'red';
        responseMsg.textContent = 'Could not connect to the server. ' + error.stack;
    }  
}

async function editSubtask(subtaskID, oldName, oldDes) {
    // Implement the logic to edit a subtask here
    const projectName = document.getElementById(`subtaskName_${subtaskID}`);
    const projectDes = document.getElementById(`subtaskDes_${subtaskID}`);
    const buttonDiv = document.getElementById(`subtaskButton_${subtaskID}`);
    const noshowButton1 = document.getElementById(`noshow1_${subtaskID}`);
    const noshowButton2 = document.getElementById(`noshow2_${subtaskID}`);
    const noshowButton3 = document.getElementById(`noshow3_${subtaskID}`);
    noshowButton1.style.display = 'none'; // Hide the "edit" button
    noshowButton2.style.display = 'none'; // Hide the "edit" button
    noshowButton3.style.display = 'none'; // Hide the "edit" button
      
    projectName.innerHTML = `<input id="projectNameInput" placeholder="Old name value is: ${oldName}" />`
    projectDes.innerHTML = `<input type = "text" id="projectDesInput" placeholder="Old des value is: ${oldDes}" />`
    buttonDiv.innerHTML = `<button onclick ="editSubtask2(${subtaskID}, '${oldName}', '${oldDes}')">Submit</button>`
}
async function editSubtask2(subtaskID, oldName, oldDes) {
    // Implement the logic to edit a subtask here
    const projectNameInput = document.getElementById('projectNameInput');
    const projectDesInput = document.getElementById('projectDesInput');

    const newProjectName = projectNameInput.value;
    const newProjectDes = projectDesInput.value;
      
      if (!projectNameInput.value && !projectDesInput.value) {
        responseMsg.style.color = 'red';
        responseMsg.textContent = 'Please fill at least one of the field.';
        return;
      }
      else if (!projectNameInput.value) {
        try {
          const input = await fetch('http://localhost:3000/api/users', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({title: 'editsubproject', subId: +subtaskID, editsubName: oldName, editsubDescription: newProjectDes}) // Send the time data as JSON
          });
          const result = await input.json();
          window.location.reload();
        } catch (error) {
          console.error('Error:', error);
          responseMsg.style.color = 'red';
          responseMsg.textContent = 'Could not connect to the server. ' + error.stack;
        }
      }
      else if (!projectDesInput.value) {
        try {
          const input = await fetch('http://localhost:3000/api/users', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({title: 'editsubproject', subId: +subtaskID, editsubName: newProjectName, editsubDescription: oldDes}) // Send the time data as JSON
          });
          const result = await input.json();
          window.location.reload();
        } catch (error) {
          console.error('Error:', error);
          responseMsg.style.color = 'red';
          responseMsg.textContent = 'Could not connect to the server. ' + error.stack;
        }
      }
      else {
        try {
          const input = await fetch('http://localhost:3000/api/users', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({title: 'editsubproject', subId: +subtaskID, editsubName: newProjectName, editsubDescription: newProjectDes}) // Send the time data as JSON
          });
          const result = await input.json();
          window.location.reload();
        } catch (error) {
          console.error('Error:', error);
          responseMsg.style.color = 'red';
          responseMsg.textContent = 'Could not connect to the server. ' + error.stack;
        }  
      }
    }
async function deleteSubtask(subtaskID) {
    // Implement the logic to delete a subtask here
    const userConfirmed = window.confirm("Are you sure you want to delete this SubTask? This action cannot be undone.");
      if (userConfirmed) {
        try {
          const input = await fetch('http://localhost:3000/api/users', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({title: 'deletesubproject', id: +subtaskID}) // Send the time data as JSON
          });
          const result = await input.json();

          if (input.ok) {
              responseMsg.style.color = 'green';
              responseMsg.textContent = result.message + "SubTask with Id #" + subtaskID + " has been deleted";
          } else {
              responseMsg.style.color = 'red';
              responseMsg.textContent = 'result.message: ' + result.message;
          }
        } catch (error) {
          console.error('Error:', error);
          responseMsg.style.color = 'red';
          responseMsg.textContent = 'Could not connect to the server. ' + error.stack;
        }  
      }
    }

// // Event listener for the "Add Task" button
// finishForm.addEventListener('mark-done', async (e) => {
//     e.preventDefault(); // Prevent standard page reload

//     responseMsg.textContent = 'finish form button has been pressed';
//     // try {
//     //     const input = await fetch('http://localhost:3000/api/users', {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify({title: 'finishsubtask', id: receivedNumber}) // Send the time data as JSON
//     //     });
//     //     const result = await input.json();

//     //     if (input.ok) {
//     //         responseMsg.style.color = 'green';
//     //         responseMsg.textContent = result.message + "Refresh the page to see the new subtask.";
//     //     } else {
//     //         responseMsg.style.color = 'red';
//     //         responseMsg.textContent = 'result.message: ' + result.message;
//     //     }
//     // } catch (error) {
//     //     console.error('Error:', error);
//     //     responseMsg.style.color = 'red';
//     //     responseMsg.textContent = 'Could not connect to the server. ' + error.stack;
//     // }  
// });



// //This marks the completion of the task
// finishForm.addEventListener("click", (event) => {
//     if (event.target.classList.contains("mark-done")) {
//         const taskItem = event.target.parentElement;
//         taskItem.style.backgroundColor = "#f2f2f2";
//         event.target.disabled = true;
//     }
// });



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