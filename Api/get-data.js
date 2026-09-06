const { Client } = require('pg');

export default async function handler(request, response) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    
    const result = await client.query('SELECT * FROM users;');
    
    // 👇 CATCH 1: Log to your Vercel Backend Console to see raw database arrays
    console.log("RAW DB ROWS FETCHED:", result.rows);

    if (!result.rows || result.rows.length === 0) {
      console.warn("Database connected, but the table is completely EMPTY.");
    }

    // Return the JSON data
    return response.status(200).json(result.rows);

  } catch (error) {
    // 👇 CATCH 2: Log connection or query crashes explicitly
    console.error("DATABASE CONNECTION/QUERY CRASHED:", error.message);
    return response.status(500).json({ error: "Failed to read database", details: error.message });
  } finally {
    await client.end();
  }
}
