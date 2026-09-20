const mysql = require('mysql2');

// 1. Create the database connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Your SQL username
  password: 'password', // Your SQL password
  database: 'my_database'
});

// 2. Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected successfully as id ' + connection.threadId);
});

// 3. Execute the SQL query and log output
const queryText = 'SELECT id, name, email FROM users';

connection.query(queryText, (err, results, fields) => {
  if (err) {
    console.error('An error occurred while executing the query:', err);
    return;
  }

  // The 'results' parameter contains the data rows as an array of JSON objects
  console.log('--- Raw SQL Output Data ---');
  console.log(results); 

  console.log('\---- Formatted Row-by-Row Output ---');
  results.forEach(row => {
    console.log(`ID: ${row.id} | Name: ${row.name} | Email: ${row.email}`);
  });

  // 4. Always close the connection when finished
  connection.end();
});
