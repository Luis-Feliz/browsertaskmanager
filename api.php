<?php
// api.php
header('Content-Type: application/json');

// 1. Database Configuration
$host     = 'localhost';
$db       = 'Demo_DB';
$user     = 'postgres';
$password = 'Sander2247@';

$dsn = "mysql:host=$host;dbname=$db";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    // 2. Connect to Database
    $pdo = new PDO($dsn, $user, $password, $options);
    
    // 3. Execute Query
    $stmt = $pdo->query('SELECT id, name FROM testdemo');
    $data = $stmt->fetchAll();
    
    // 4. Output as JSON
    echo json_encode(['data' => $data]);

} catch (\PDOException $e) {
    // Handle error gracefully without exposing raw database exceptions to the client
    http_response_code(500);
    echo json_encode(['error' => 'Database connection or query failed']);
}
