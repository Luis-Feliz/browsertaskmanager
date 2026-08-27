class MyHeader extends HTMLElement
{
    connectedCallback()
    {
        this.innerHTML = 
        `    
            <script>
            function myFunction(x) {
            x.classList.toggle("change");
            }
            function toggleNav() {
            var element = document.getElementById("mySidenav");
                /*if the element is open close it*/  
                if (document.getElementById("mySidenav").style.width == "250px") {
                document.getElementById("mySidenav").style.width = "0";
                document.getElementById("main").style.marginLeft = "0";
                } else {
                /*if element closed, open it*/
                document.getElementById("mySidenav").style.width = "250px";
                document.getElementById("main").style.marginLeft = "250px";
                }
            }
            /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
            function openNav() {
                document.getElementById("mySidenav").style.width = "250px";
                document.getElementById("main").style.marginLeft = "250px";
            }
        
            /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
            function closeNav() {
                document.getElementById("mySidenav").style.width = "0";
                document.getElementById("main").style.marginLeft = "0";
            }
            </script>
            
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
                
                <div id="mySidenav" class="sidenav">
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a>
                </div>
            </th>
            <th style="text-align: right;">
                <button class="demo" onclick="" style="text-align: justify;"> New Project</button>
            </th>
            </table>
        `
    }
}

