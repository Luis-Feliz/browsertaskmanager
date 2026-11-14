//TODO:
// 1. Link this file to the main project database
// 2. Create Error Handling for when the database is not available
// 3. Make a progress bar on most recently used project
// 4. 
// 5. 


class MyHeader extends HTMLElement
{
    

    connectedCallback()
    {
        this.innerHTML = 
        `                
            <table style="width: 100%; background-color: gray; text-align: center; position: sticky; top: 0;">
            <th style= "text-align: left"><!-- 1 -->
                <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->
                <div id="main">
                    <div class="container" onclick="myFunction(this); toggleNav()">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                    </div>
                </div>
            </th>
            <th>
                <div id="mySidenav" class="sidenav">
                    <a href="../index.html">Home Page</a>
                    <a href="../Html/Projects.html">Projects</a>
                    <div class="line" style="background-color: white;"></div>
                    <div id="projectList" style="margin-top: 3px; height: 50%; overflow-y: auto;"></div>
                    <td style="height: 20%; text-align: left"><H1><u>Project Name</u></H1></td> 
                    <td> 10% </td>
                    <div style="background-color: gray;">box</div>
                </div>
            </th>
            <th style="text-align: right;">
                <button class="demo" onclick="location.href='../Html/New_Project.html'" style="text-align: justify;"> New Project</button>
            </th>
            </table>
        `
    }
}

customElements.define('my-header', MyHeader);
var i = 0;
async function fetchPostgresData() {
    if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 10;
        var id = setInterval(frame, 10);
        function frame() {
        if (width >= 100) {
            clearInterval(id);
            i = 0;
        } else {
            width++;
            elem.style.width = width + "%";
            elem.innerHTML = width + "%";
        }
        }
    }
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();

        const Sidenav = document.getElementById('projectList');
        
        data.projects.forEach(row => {
          let numerator = 0;
          let denominator = 0;
          data.subtasks.forEach(subrow => {
            if (subrow.proj_id == row.id) {
              // You can perform any additional logic here if needed
              denominator += 1;
              if (subrow.complete == true) {
                numerator += 1;
              }
            }
          });          
          const completedTasks = (numerator / denominator) * 100;
          Sidenav.innerHTML += `
            <tr>
              <td style="height: 20%; text-align: left"><H1><u><a href="../Html/SubTask.html?projectId=${row.id}">${row.name}</u></H1></td> 
              <td style="width: 20%; height: 100%; border: 1px solid black">${numerator} / ${denominator} = ${completedTasks.toFixed(2)}%</td>
            </tr>
          `;
        });
      } 
      catch (error) {
          console.error('Error fetching data from API:', error);
      }
}
fetchPostgresData();
