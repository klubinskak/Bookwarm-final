<?php 
require_once 'connection.php';

/* SQL query to get results from database */
$sql = "SELECT user_name, user_rating, user_review, tittle FROM review_table ";
$result = $conn->query($sql);
/* If there are results from database push to result array */
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($result_array, $row);
    }
}
/* send a JSON encded array*/
header('Content-type: application/json');
echo json_encode($result_array);

$sql = $conn->query("SELECT SUM(user_rating) AS total FROM review_table");
    $rData = $sql->fetch_array();
    $total = $rData['total'];

?>