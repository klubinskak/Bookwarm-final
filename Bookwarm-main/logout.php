<?php


session_start();
unset($_SESSION['email']);
$_SESSION['profileImage'] = './assets/profile-picture/avatar.jpg';
$userID = isset($_SESSION['userID']);

header("Location: login.php");
session_destroy();



?>

<script>
    alert(<?php echo $_SESSION['id']; ?>);
</script>
exit;