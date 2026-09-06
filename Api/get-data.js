const { Client } = require('pg');

export default async function handler(request, response) {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL, // Set this in your Vercel Dashboard
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW();');
    return response.status(200).json(result.rows);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  } finally {
    await client.end();
  }
}