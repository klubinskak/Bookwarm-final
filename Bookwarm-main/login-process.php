<?php 



$error = array();

$email = $_POST['email'];

if(empty($email)){
    $error[] = 'Email can not be empty!';
}

$password = $_POST['password'];

if(empty($password)){
    $error[] = 'Password can not be empty!';
}

if(empty($error)){

    // query

    $query = "SELECT userID, firstName, lastName, email, password, profileImage FROM user WHERE email=?";
    $q = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($q, $query);

    mysqli_stmt_bind_param($q, 's', $email);
    mysqli_stmt_execute($q);

    // store result

    $result = mysqli_stmt_get_result($q);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);


    //admin log-in 
    $adminEmail = 'admin@gmail.com';
    $adminPassword = 'admin';

    // if($password = $adminPassword && $email = $adminEmail){
    //     header('location:admin-dashboard.php');
    // } else{
    //     echo "error";
    //     mysqli_error($conn);
    // }

    //check if password match and user exist
    if(!empty($row)){
        // checking password
        // unhasing password
        if(password_verify($password, $row['password'])){
            //when user correctly log in set user id
            session_start();
            // checking if person who is logging in is a user or a admin and depends of the results header to right location
            $_SESSION['userID'] = $row['userID'];
            if ($email == $adminEmail){
                header('location: admin-dashboard.php');
            } else{
                header('location: user-dashboard.php');
            }
            exit();
        } 
        else {
            echo "You are not a member";
            echo " <script language='javascript'>
            var message = document.getElementById('messages');
            message.textContent = 'error';
            </script>";

        }
    } else {
        echo "Please fill out!";
        
    }


}