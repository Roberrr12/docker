<?php
$host = 'db';
$db   = 'php';
$user = 'phpuser';
$pass = 'phppassword';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

try {
    $pdo = new PDO($dsn, $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo "<h1>Conexión a MySQL exitosa</h1>";

    // Ejemplo simple de consulta
    $stmt = $pdo->query("SELECT NOW() as fecha");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "Fecha actual en la DB: " . $row['fecha'];

} catch (PDOException $e) {
    echo "Error al conectar a MySQL: " . $e->getMessage();
}
echo "Prueba PHP funcionando";

?>
