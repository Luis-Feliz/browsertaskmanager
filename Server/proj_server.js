const express = require('express');
const { Pool } = require('pg'); // Import the Postgres connection pool
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// PostgreSQL Connection Configuration
const pool = new Pool({
    user: 'postgres',          // Default PostgreSQL user
    host: 'localhost',          // Your local machine
    database: 'crim',
    password: '',  //
    port: 5432,                 // Default PostgreSQL port
});

// API Endpoint to fetch data
app.get('/api/data', async (req, res) => {
    try {
        // Execute query against PostgreSQL
        //const result = await pool.query('SELECT * FROM projects');

        // PostgreSQL returns rows inside the .rows property
        //res.json(result.rows); 
        const [projectResult, subtaskResult] = await Promise.all([
            pool.query('SELECT * FROM projects'),
            pool.query('SELECT * FROM subtasks')
        ]);

        // PostgreSQL returns rows inside the .rows property
        res.json({ projects: projectResult.rows, subtasks: subtaskResult.rows });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server database error');
    }
});

app.listen(port, () => console.log(`Postgres backend running on http://localhost:${port}`));
