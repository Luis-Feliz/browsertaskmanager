const userForm = document.getElementById('userForm');
const usernameInput = document.getElementById('usernameInput');
const userList = document.getElementById('userList');

// --- FUNCTION 1: FETCH AND DISPLAY DATA ---
async function displayDatabaseRecords() {
  try {
    // Fetches from your Vercel API endpoint
    const response = await fetch('/api/get-data');
    const users = await response.json();

    // Clear the loading message
    userList.innerHTML = '';

    // Loop through rows and add them to the page
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `ID: ${user.id} | Name: ${user.name}`;
      userList.appendChild(li);
    });

  } catch (error) {
    userList.innerHTML = '<li>Error loading database records</li>';
    console.error(error);
  }
}

// --- FUNCTION 2: EDIT / SUBMIT NEW DATA ---
userForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevents the page from refreshing

  const newName = usernameInput.value;

  try {
    const response = await fetch('/api/get-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: newName }), // Sends the typed name
    });

    if (response.ok) {
      usernameInput.value = ''; // Clear the input field
      displayDatabaseRecords(); // Refresh the list automatically to show changes
    } else {
      alert('Failed to save to database');
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
});

// Run this automatically as soon as the page opens
displayDatabaseRecords();
