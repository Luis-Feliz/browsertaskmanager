const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// PostgreSQL Connection Configuration
const pool = new Pool({
    user: 'postgres',          // Default PostgreSQL user
    host: 'localhost',          // Your local machine
    database: 'demodb',
    password: '',  //
    port: 5432,                 // Default PostgreSQL port
});

// POST endpoint to handle form submission
app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body; // Extract data from HTML input
    
    // Insert into database using a parameterized query for safety
    const query = 'INSERT INTO todos VALUES (\$1, \$2, \$3) RETURNING *';
    const values = [req.body.ids, req.body.stat1, req.body.stat2];
    const result = await pool.query(query, values);
    
    res.status(201).json({ 
      message: 'Data saved successfully!', 
      data: result.rows[0] 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
