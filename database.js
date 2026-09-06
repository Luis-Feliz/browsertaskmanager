const {createpool} = require('mysql');

const pool = createpool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Demo_DB'
});

pool.query('SELECT * FROM TestDemo', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    else{
        return console.log('Query results:', results);
    }
});