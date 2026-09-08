async function displayDatabaseRecords() {
  const userList = document.getElementById('userList');
  
  try {
    const response = await fetch('/api/get-data');
    
    // CATCH 3: Check if the server responded with an error code (e.g., 500 or 404)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with status ${response.status}: ${errorText}`);
    }

    // CATCH 4: Verify if the response is actually valid JSON
    let users;
    try {
      users = await response.json();
    } catch (jsonError) {
      throw new Error("The backend sent a response, but it was NOT valid JSON text.");
    }

    // CATCH 5: Ensure the JSON parsed into an array (Postgres rows match as an array)
    console.log("FRONTEND RECEIVED VALID JSON:", users);
    
    if (!Array.isArray(users)) {
      throw new Error("JSON data received, but it is not formatted as an Array list.");
    }

    // Clear loading text and render elements if all catches pass safely
    userList.innerHTML = '';
    if (users.length === 0) {
      userList.innerHTML = '<li>Database connected, but no records found!</li>';
      return;
    }

    users.forEach(user => {
      const li = document.createElement('li');
      // Adjust keys (like .id or .name) depending on your table columns
      li.textContent = JSON.stringify(user); 
      userList.appendChild(li);
    });

  } catch (error) {
    // CATCH 6: Visually output the exact error directly onto your web page for easy reading
    console.error("Frontend verification failed:", error);
    userList.innerHTML = `<li style="color: red; font-weight: bold;"> Error reading JSON: ${error.message}</li>`;
  }
}

displayDatabaseRecords();
