
function addRows() {
    // 1. Get the data from the input fields
    const valueToAdd = document.getElementById('inputValue').value;
    const numberOfRows = parseInt(document.getElementById('rowCount').value);
    
    // 2. Get a reference to the table body
    const tableBody = document.getElementById('myTable').getElementsByTagName('tbody')[0];

    // 3. Loop to create the specified number of rows
    for (let i = 0; i < numberOfRows; i++) {
        // Insert a new row at the very end of the table (-1)
        let newRow = tableBody.insertRow(-1); 

        // Insert cell 1 (Row index / Counter)
        let cell1 = newRow.insertCell(0);
        cell1.textContent = tableBody.rows.length; // Dynamic sequential ID

        // Insert cell 2 (The actual value)
        let cell2 = newRow.insertCell(1);
        cell2.textContent = valueToAdd; 
    }
}