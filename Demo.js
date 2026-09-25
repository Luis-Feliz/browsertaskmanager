

// 1. Mock Data: Replace this array with your actual SQL result set (JSON format)
        // Example representing a "SELECT id, name, role, department FROM employees" query
        async function getSQLQueryResult() {
            // Simulate an API call or database query
            return [
                { "id": 1, "name": "Alice Johnson", "role": "Software Engineer", "department": "Engineering" },
                { "id": 2, "name": "Bob Smith", "role": "Data Analyst", "department": "Analytics" },
                { "id": 3, "name": "Charlie Brown", "role": "Product Manager", "department": "Product" },
                { "id": 4, "name": "Diana Prince", "role": "Security Architect", "department": "Engineering" }
            ];
        }

        async function renderSQLTable() {
            const data = await getSQLQueryResult();
            const headerRow = document.getElementById('table-header');
            const tableBody = document.getElementById('table-body');

            // Handle empty dataset safely
            if (data.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="100%">No records found.</td></tr>';
                return;
            }

            // 2. Generate Table Headers dynamically based on SQL Column keys
            const columns = Object.keys(data[0]);
            headerRow.innerHTML = columns.map(col => `<th>${col.toUpperCase()}</th>`).join('');

            // 3. Generate Table Rows
            const rowsHtml = data.map(row => {
                // For each row object, map over the columns to get the values securely
                const cells = columns.map(col => `<td>${row[col] !== null ? row[col] : ''}</td>`).join('');
                return `<tr>${cells}</tr>`;
            }).join('');

            // 4. Inject into the DOM
            tableBody.innerHTML = rowsHtml;
        }

        // Initialize table generation on load
        renderSQLTable();