const { Pool } = require('pg'); //

// Configure the connection pool
const pool = new Pool({
    user: 'postgres',          // Default PostgreSQL user
    host: 'localhost',          // Your local machine
    database: 'demodb',
    password: '',  //
    port: 5432,                 // Default PostgreSQL port
});

async function queryDB() {
    try {
        // Test connection by running a simple query
        const res = await pool.query('SELECT NOW()');
        console.log("Connected to PostgreSQL! Current time:", res.rows[0]);
        
        // Example table query
        const data = await pool.query('SELECT * FROM todos');
        console.log(data.rows);
    } catch (err) {
        console.error("Database connection error:", err);
    } finally {
        await pool.end(); // Close the pool when the app shuts down
    }
}

queryDB();
