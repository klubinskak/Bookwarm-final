<?php 

include 'connection.php';



if($_POST['action'] == 'rating')
{
	echo "work";

	

	$stmt = $conn->prepare("INSERT INTO review_table (user_name, user_rating, user_review, tittle) VALUES (?, ?, ?, ?)");
    $stmt->bind_param('siss',  $user_name,  $rating_index, $user_review, $tittle);
	$user_name = $_POST['user_name'];
	$rating_index = $_POST['rating_index'];
	$user_review = $_POST['user_review'];
	$tittle = $_POST['tittle'];
    $stmt->execute();
	
}


?>