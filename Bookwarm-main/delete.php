<?php
    include 'connection.php';
    if (isset ($_GET['deleteid'])){
        $id = $_GET['deleteid'];
        $sql= "DELETE FROM user WHERE userID= '$id' ";
        $result = mysqli_query($conn, $sql);
        if ($result){
            echo "Successful deleted user";
        } else{
            echo "Something went wrong";
            echo mysqli_close($conn);
        }
    }
?>