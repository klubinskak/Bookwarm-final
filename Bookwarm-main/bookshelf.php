<?php 


include ('get-user-data.php');
session_start();

require ('connection.php');



if($_POST['action'] == 'toRead'){
                $userId = $_SESSION['userID'];
                $tittle = $_POST["tittle"];
                $category = "I want to read";
                $thumbnail = $_POST['thumbnail'];
                $stmt = $conn->prepare("INSERT INTO bookshelf (id, userID, tittle, category, thumbnail) VALUES (NULL,?,?,?,?)");
                $stmt->bind_param('ssss', $userId,  $tittle, $category, $thumbnail);
                $stmt->execute();
            }

        

if($_POST['action'] == 'read'){
            $userId = $_SESSION['userID'];
            $tittle = $_POST["tittle"];
            $category = "Read";
            $thumbnail = $_POST['thumbnail'];
            $stmt = $conn->prepare("INSERT INTO bookshelf (id, userID, tittle, category, thumbnail) VALUES (NULL,?,?,?,?)");
            $stmt->bind_param('ssss', $userId,  $tittle, $category, $thumbnail);
            $stmt->execute();
}

if($_POST['action'] == 'buy'){
    $userId = $_SESSION['userID'];
    $tittle = $_POST["tittle"];
    $category = "I want to buy";
    $thumbnail = $_POST['thumbnail'];
    $stmt = $conn->prepare("INSERT INTO bookshelf (id, userID, tittle, category, thumbnail) VALUES (NULL,?,?,?,?)");
    $stmt->bind_param('ssss', $userId,  $tittle, $category, $thumbnail);
    $stmt->execute();
}

?>
