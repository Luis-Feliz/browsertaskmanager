const { Client } = require('pg');

export default async function handler(request, response) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // 1. HANDLE EDITING / INSERTING DATA (POST Request)
    if (request.method === 'POST') {
      const { username } = request.body; // Expecting data from frontend
      
      if (!username) {
        return response.status(400).json({ error: 'Username is required' });
      }

      // Inserts a new user into a table named 'users'
      await client.query('INSERT INTO users (name) VALUES ($1);', [username]);
      return response.status(200).json({ success: true, message: 'User added successfully!' });
    }

    // 2. HANDLE DISPLAYING DATA (GET Request - Default)
    const result = await client.query('SELECT id, name FROM users;');
    return response.status(200).json(result.rows);

  } catch (error) {
    return response.status(500).json({ error: error.message });
  } finally {
    await client.end();
  }
}
