// Get the current time values
const currentHour = document.getElementById('hr').innerHTML;
const currentMinute = document.getElementById('min').innerHTML;
const currentSecond = document.getElementById('sec').innerHTML;



let startBtn = document.getElementById('start');    //assign variable via Start ID
let stopBtn = document.getElementById('stop');      //assign variable via Stop ID
let resetBtn = document.getElementById('reset');    //assign variable via Reset ID
let submitBtn = document.getElementById('submit');  //assign variable via Submit ID
let hour = 0;
let minute = 0;
let second = 0;
let count = 0;


// Parse the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('projectId'); //number to compare with proj_id to determine what tasks to show
const receivedNumber = urlParams.get('subId'); //number to compare with proj_id to determine what tasks to show

async function fetchPostgresData() {
    try {
        
        const output = await fetch('http://localhost:3000/api/data');
        const data = await output.json();


        // Data dependent on the projectId and subId parameters
        data.subtasks.forEach(row => {
            if(projectId == row.proj_id && receivedNumber == row.id) { //only show tasks that match the project number
                const titleElement = document.getElementById("title");
                if (titleElement) {
                    titleElement.innerHTML = `
                        Name: ${row.name} <br>
                        Description: ${row.description}<br>
                        Catagory: ${row.catagory}<br>
                        Target: ${row.target}<br>
                        Complete: ${row.complete}<br>
                        Subtask Time: ${row.sub_time.hours}h ${row.sub_time.minutes}m ${row.sub_time.seconds}s<br>
                    `; //change title to subtask name
                }
            }                
        });
    } 
    catch (error) {
        console.error('Error fetching data from API:', error);
    }
}
fetchPostgresData();

startBtn.addEventListener('click', function () {
    timer = true;
    stopWatch();
});

stopBtn.addEventListener('click', function () {
    timer = false;
});

resetBtn.addEventListener('click', function () {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('count').innerHTML = "00";
});

const buttons = document.getElementById('userTime'); // Assuming the form has an ID of 'container'
const responseMsg = document.getElementById('responseMsg');

buttons.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent standard page reload

    const currentHour = document.getElementById('hr').innerHTML;
    const currentMinute = document.getElementById('min').innerHTML;
    const currentSecond = document.getElementById('sec').innerHTML;
    
    responseMsg.textContent = `Current Time: ${currentHour}h ${currentMinute}m ${currentSecond}s`;

    try {
        const input = await fetch('http://localhost:3050/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: 'timer', hours: currentHour, minutes: currentMinute, seconds: currentSecond , projid: projectId, sub_id: receivedNumber}) // Send the time data as JSON
        });
        
        const result = await input.json();

        if (input.ok) {
            responseMsg.style.color = 'green';
            responseMsg.textContent = result.message;
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



document.addEventListener('keydown', function(event) {
    if (event.key === 'q' || event.key === 'Q') { //Identify which key will be held as Shortcut
        event.preventDefault(); // Stop default browser behaviors if necessary
        document.getElementById('start').click(); // Simulate a click | all identified by ID
    }
    else if(event.key === 'w' || event.key === 'W'){
        event.preventDefault(); // Stop default browser behaviors if necessary
        document.getElementById('stop').click(); // Simulate a click | all identified by ID
    }
});

function stopWatch() {
    if (timer) {
        count++;

        if (count == 100) {
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let hrString = hour;
        let minString = minute;
        let secString = second;
        let countString = count;

        if (hour < 10) {
            hrString = "0" + hrString;
        }

        if (minute < 10) {
            minString = "0" + minString;
        }

        if (second < 10) {
            secString = "0" + secString;
        }

        if (count < 10) {
            countString = "0" + countString;
        }

        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);
    }
}