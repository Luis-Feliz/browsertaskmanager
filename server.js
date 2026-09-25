const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = 3000;

// 1. Configure the connection pool (from your Option 2 setup)
const pool = new Pool({
    user: 'postgres',          // Default PostgreSQL user
    host: 'localhost',          // Your local machine
    database: 'demodb',
    password: '',  //
    port: 5432,
});

// 2. Serve static frontend files (HTML/JS) from a folder named "public"
app.use(express.static('public'));

// 3. Create an API endpoint that fetches data from PostgreSQL
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        res.json(result.rows); // Send the database rows as JSON data
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
