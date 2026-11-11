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
            //TODO//
            // code nessisary to calculate the completion percentage

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
            const subtaskId = req.body.id; // Extract data from HTML input
            const finishSubtaskTEXT = `
                UPDATE subtasks
                SET complete = TRUE
                WHERE id = \$1
            `;
            //TODO//
            // code nessisary to calculate the completion percentage
            console.log(`Received finish request for Subtask ID: ${subtaskId}`);
            try {
                await pool.query(finishSubtaskTEXT, [subtaskId]);                
                res.status(200).json({ success: true, message: "Subtask marked as finished." });
            } catch (err) {
                console.error("Database Error:", err); // Log the actual error for debugging
                res.status(500).json({ success: false, message: "Database error." });
            }
            break;
        case 'finishproject':
            const projectId = req.body.id; // Extract data from HTML input
            const queryTEXTproj = `
                UPDATE projects
                SET finished = TRUE 
                WHERE id = \$1
            `;
            const queryTEXTsub = `
                UPDATE subtasks
                SET complete = TRUE 
                WHERE proj_id = \$1
            `;
            console.log(`Received final data for project & subtask ID: ${projectId}`);
            try {
                await pool.query(queryTEXTproj, [projectId]);
                await pool.query(queryTEXTsub, [projectId]);
                res.status(200).json({ success: true, message: "Time updated successfully." });
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
        case 'editproject':
            const { id, editName, editDescription } = req.body; // Extract data from HTML input
            const editTEXTproj = `
                UPDATE projects
                SET name = \$1, description = \$2
                WHERE id = \$3
            `;
            console.log(`Received edit data: ${editName}, ${editDescription} for Project ID: ${id}`);
            try {
                await pool.query(editTEXTproj, [editName, editDescription, id]);
                res.status(200).json({ success: true, message: "Project updated successfully." });
            } catch (err) {
                console.error("Database Error:", err); // Log the actual error for debugging
                res.status(500).json({ success: false, message: "Database error." });
            }
            break;
        case 'editsubproject':
            const { subId, editsubName, editsubDescription } = req.body; // Extract data from HTML input
            const editTEXTsub = `
                UPDATE subtasks
                SET name = \$1, description = \$2
                WHERE id = \$3
            `;
            console.log(`Received edit data: ${editsubName}, ${editsubDescription} for Subtask ID: ${subId}`);
            try {
                await pool.query(editTEXTsub, [editsubName, editsubDescription, subId]);
                res.status(200).json({ success: true, message: "Subtask updated successfully." });
            } catch (err) {
                console.error("Database Error:", err); // Log the actual error for debugging
                res.status(500).json({ success: false, message: "Database error." });
            }
            break;
        case 'deleteproject':
            const projId = req.body.id; // Extract data from HTML input
            const projDelTEXT = `
                DELETE FROM projects 
                WHERE id =\$1;
            `;
            const projDelTEXT2 = `
                DELETE FROM subtasks 
                WHERE proj_id =\$1;
            `;
            console.log(`Received id data: ${projId} commencing deletion of project and associated subtasks`);
            try {
                await pool.query(projDelTEXT, [projId]);
                await pool.query(projDelTEXT2, [projId]);
                res.status(200).json({ success: true, message: "Deletion updated successfully." });
            } catch (err) {
                console.error("Database Error:", err); // Log the actual error for debugging
                res.status(500).json({ success: false, message: "Database error." });
            }
            break;
        case 'deletesubproject':
            const delSubtaskId = req.body.id; // Extract data from HTML input
            const subDelTEXT = `
                DELETE FROM subtasks 
                WHERE id =\$1;
            `;
            console.log(`Received id data: ${delSubtaskId} commencing deletion of subtask`);
            try {
                await pool.query(subDelTEXT, [delSubtaskId]);
                res.status(200).json({ success: true, message: "Deletion updated successfully." });
            } catch (err) {
                console.error("Database Error:", err); // Log the actual error for debugging
                res.status(500).json({ success: false, message: "Database error." });
            }
            break;
        default:
            res.status(400).json({ success: false, message: "Invalid title." });
    }   
    
});

app.listen(port, () => console.log(`Postgres backend running on http://localhost:${port}`));
