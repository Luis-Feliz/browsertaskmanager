const express = require('express');
const { Pool } = require('pg'); // Import the Postgres connection pool
const cors = require('cors');

const app = express();
app.use(cors());

// PostgreSQL Connection Configuration
const pool = new Pool({
    user: 'postgres',          // Default PostgreSQL user
    host: 'localhost',          // Your local machine
    database: 'demodb',
    password: '',  //
    port: 5432,                 // Default PostgreSQL port
});

// API Endpoint to fetch data
app.get('/api/data', async (req, res) => {
    try {
        // Execute query against PostgreSQL
        const result = await pool.query('SELECT id, stat1, stat2 FROM todos'); // Replace 'todos' with your actual table name

        // PostgreSQL returns rows inside the .rows property
        res.json(result.rows); 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server database error');
    }
});

app.listen(3000, () => console.log('Postgres backend running on http://localhost:3000'));
