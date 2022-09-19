<?php
require_once 'db.php';

////Общее кол-во записей
$query = mysqli_query($connect, "SELECT COUNT(*) as 'total' FROM `test_task_data`");
$row = mysqli_fetch_assoc($query);

echo json_encode($row, JSON_UNESCAPED_UNICODE);



?>