<?php

include ('connection.php');

//data from the form
$firstName = $_POST['first-name'];
$lastName = $_POST['last-name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$files = $_FILES['profileUpload'];
$profileImage = upload_profile("./assets/profile-picture", $files);


//sending data from input to the database
$sql = "INSERT INTO user VALUES (DEFAULT , '$firstName', '$lastName', '$email', '$password', '$profileImage', NOW())";

if (mysqli_query($conn, $sql)) {

    session_start();
    $_SESSION['userID'] = mysqli_insert_id($conn);


    header('location:login.php');
    exit();

} else {
    echo "ERROR";
    echo  mysqli_error($conn);

}

//image

function upload_profile($path, $file){
    $targetDir = $path;
    $default = "/avatar.jpg";

    $filename = basename($file['name']);
    $targetFilePath = $targetDir.$filename;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    if(!empty($filename)){
        // file format
        $allowType = array('jpg', 'png', 'gif', 'jpeg');
        if(in_array($fileType, $allowType)){
            // send file to the folder
            if(move_uploaded_file($file['tmp_name'], $targetFilePath)){
                return $targetFilePath;
            };
        }
    }

    //if user does not load picture return the default one

    return $path .$default;

}