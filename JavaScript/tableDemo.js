function updateSpecificColumn() {
  // 1. Get the table
  const table = document.getElementById("myTable");
  
  // 2. Target the specific row (e.g., row index 1 is the first data row)
  const row = table.rows[1];
  
  // 3. Target the specific column cell (index 1 is Column 2)
  row.cells[1].innerText = "Updated!"; 
}