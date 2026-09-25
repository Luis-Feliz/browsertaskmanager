// Function to fetch data from the server API
async function loadUsers() {
    try {
        const response = await fetch('/api/users'); // Requests data from our Node server
        const users = await response.json(); // Parses the JSON data

        const listElement = document.getElementById('user-list');
        listElement.innerHTML = ''; // Clear the "Loading..." text

        // Loop through each user row and append it to the HTML list
        users.forEach(user => {
            const li = document.createElement('li');
            
            // Adjust 'user.name' and 'user.email' to match your database column names
            li.textContent = `${user.name} - (${user.email})`; 
            
            listElement.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('user-list').textContent = 'Failed to load data.';
    }
}

// Run the function when the page loads
loadUsers();
