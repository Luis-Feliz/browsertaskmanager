const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
//const port = 3000;
const port = 3050;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// PostgreSQL Connection Configuration
const pool = new Pool({
    user: 'postgres',          // Default PostgreSQL user
    host: 'localhost',          // Your local machine
    database: 'crim',
    password: '',  //
    port: 5432,                 // Default PostgreSQL port
});

// POST endpoint to handle form submission
app.post('/api/users', async (req, res) => {

    const title = req.body.title; // Extract the title from the request body
    switch (title) {
        case 'newproject':
            const { newname, newdescription } = req.body; // Extract data from HTML input
            const projectTEXT = `
                INSERT INTO projects (name, description)
                VALUES (\$1, \$2)
            `;
            console.log(`Received project data: ${newname}, ${newdescription}`);
            try {
                await pool.query(projectTEXT, [newname, newdescription]);
                res.status(200).json({ success: true, message: "Project added successfully." });
            } catch (err) {
                console.error("Database Error:", err); // Log the actual error for debugging
                res.status(500).json({ success: false, message: "Database error." });
            }
            break;




            
        case 'newsubtask':
            const { name, catagory, description, proj_id } = req.body; // Extract data from HTML input
            const subtaskTEXT = `
                INSERT INTO subtasks (proj_id, name, catagory, description)
                VALUES (\$1, \$2, \$3, \$4)
            `;
            console.log(`Received subtask data: ${name}, ${catagory}, ${description} for Project ID: ${proj_id}`);
            try {
                await pool.query(subtaskTEXT, [proj_id, name, catagory, description]);
                res.status(200).json({ success: true, message: "Subtask added successfully." });
            } catch (err) {
                console.error("Database Error:", err); // Log the actual error for debugging
                res.status(500).json({ success: false, message: "Database error." });
            }
            break;

        case 'finishsubtask':
            const { subtaskId } = req.body; // Extract data from HTML input
            const finishSubtaskTEXT = `
                UPDATE subtasks
                SET is_finished = TRUE
                WHERE id = \$1
            `;
            console.log(`Received finish request for Subtask ID: ${subtaskId}`);
            try {
                await pool.query(finishSubtaskTEXT, [subtaskId]);
                res.status(200).json({ success: true, message: "Subtask marked as finished." });
            } catch (err) {
                console.error("Database Error:", err); // Log the actual error for debugging
                res.status(500).json({ success: false, message: "Database error." });
            }
            break;


        case 'timer':
            const { hours, minutes, seconds, projid, sub_id } = req.body; // Extract data from HTML input
            const queryTEXT = `
                UPDATE projects
                SET proj_time = proj_time + (\$1 || ' hours ' || \$2 || ' minutes ' || \$3 || ' seconds')::INTERVAL 
                WHERE id = \$4
            `;
            const queryTEXT2 = `
                UPDATE subtasks
                SET sub_time = sub_time + (\$1 || ' hours ' || \$2 || ' minutes ' || \$3 || ' seconds')::INTERVAL 
                WHERE id = \$4
            `;
            console.log(`Received time data: ${hours}h ${minutes}m ${seconds}s for Project ID: ${projid}, Subtask ID: ${sub_id}`);
            try {
                await pool.query(queryTEXT, [hours || 0, minutes || 0, seconds || 0, projid]);
                await pool.query(queryTEXT2, [hours || 0, minutes || 0, seconds || 0, sub_id]);
                res.status(200).json({ success: true, message: "Time updated successfully." });
            } catch (err) {
                console.error("Database Error:", err); // Log the actual error for debugging
                res.status(500).json({ success: false, message: "Database error." });
            }
            break;
        default:
            res.status(400).json({ success: false, message: "Invalid title." });
    }   
    
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
