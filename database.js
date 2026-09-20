async function fetchDatabaseValues() {
  const userList = document.getElementById('userList');
  try {
      // 1. Fetch data from your backend PHP script
      const response = await fetch('api.php');
      
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // 2. Parse JSON response
      const items = await response.json();
      
      // 3. Output values safely to the DOM
      const container = document.getElementById('userList');
      container.innerHTML = ''; // Clear any loading placeholders

      items.forEach(item => {
          const li = document.createElement('li');
          // textContent prevents XSS injection vulnerabilities
          li.textContent = `${item.name}`; 
          container.appendChild(li);
      });

  } catch (error) {
      console.error('Fetch error:', error);
      document.getElementById('userList').textContent = 'Failed to load data...';
  }
}

// Initialize data loading on page load
fetchDatabaseValues();