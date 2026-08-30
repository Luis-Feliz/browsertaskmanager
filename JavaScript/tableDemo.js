function populateTableColumns() {
  const newValue = "Updated Data";
  
  // 1. Select all columns sharing the class name
  const columns = document.querySelectorAll('#data-row .col-target');
  
  // 2. Loop through each column cell and set its content
  columns.forEach(column => {
    column.textContent = newValue;
  });
}