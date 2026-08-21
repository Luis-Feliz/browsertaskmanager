class MyHeader extends HTMLElement
{
    connectedCallback()
    {
        this.innerHTML = 
        `   
            <table>
                    <th>
                        <div class="button">
                            <!-- <a href="index.html" class="button">Home Page</a> -->
                            <a href = "/#Home" class="button">Home</a>
                        </div>
                    </th>  <!-- 1 -->
                    <th>
                        <div class="button">
                            <!-- <a href="index.html" class="button">Skills</a> -->
                            <a href = "/#Skills" class="button">Skills</a>
                        </div>
                    </th>  <!-- 2 -->
                    <th>
                        <div class="dropdown" class = "button">
                            
                        <a href = "/#Portfolio" class="button"><button class="dropbtn">Portfolio</button></a>
                            <div class="dropdown-content">
                                <a href="GamingProject.html">Gaming Projects</a>
                                <a href="CodingProject.html">Coding Projects</a>
                                <a href="ArtProject.html">Art Projects</a>
                                <a href="MusicProject.html">Music Projects</a>
                                <a href="Future.html">Future Projects</a>
                            </div>
                        </div>
                    </th>  <!-- 3 -->
                    <th>
                        <div class="button">
                            <!-- <a href="AboutMe.html" class="button">About Me</a> -->
                            <a href = "/#About" class="button">About Me </a>
                        </div>             
                    </th>  <!-- 4 -->
                    
                    <th>
                        <div class="button">
                        <a href = "/#Contact" class="button">Contact Me</a>
                        </div>
                    </th>  
                    
                    <!-- 5 -->
            </table>
        `
    }
}

customElements.define('my-header', MyHeader);
