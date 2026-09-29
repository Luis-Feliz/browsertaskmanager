async function fetchPostgresData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();
        
        const tableBody = document.getElementById('data-table-body');
        tableBody.innerHTML = ''; 

        data.forEach(row => {
            const tr = document.createElement('tr');
            
            // Note: Postgres fields default to lowercase unless explicitly forced otherwise
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.stat1}</td>
                <td>${row.stat2}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching data from API:', error);
    }
}

fetchPostgresData();
