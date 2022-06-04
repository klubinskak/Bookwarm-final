<?php

session_start();
include ('header.php');
include_once('get-user-data.php');
?>

<?php
    $user = array();
    require ('connection.php');

    if(isset($_SESSION['userID'])){
        $user = get_user_data($conn, $_SESSION['userID']);
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        require ('login-process.php');
    }
    
?>

    <section id="register">
        <nav class="navbar nav">
            <a href="register.php"><img src="./image/logo.png" width="150px" height="150px" alt=""></a>
        </nav>
        <div class="row ml-5 m-0">
            <div class="col-lg-4 offset-lg-1">
                <div class="text-center pb-5">
                    <h1 class="login-title text-white">Sign in.</h1>
                    <p class="p-1 m-0 font-poppins text-white-50">Welcome back! Please enter your details.</p>
                </div>
                <div class="upload-profile-image d-flex justify-content-center pb-5">
                    <div class="text-center">
                        <div class="d-flex justify-content-center">
                            <img class="camera-icon" src="./image/camera.png" alt="camera">
                        </div>
                        <img src=<?php echo isset($user['profileImage']) ? $user['profileImage']: "./assets/profile-picture/avatar.jpg" ; ?> style="width: 200px; height: 200px" class="img rounded-circle" alt="profile">
                        <small class="form-text text-white-50">Choose Image</small>
                        <input type="file" form="reg-form" class="form-control-file" name="profileUpload" id="upload-profile">
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <form action="login.php" method="post" enctype="multipart/form-data" id="reg-form">
                        <div class="form-row my-4">
                            <div class="col">
                                <input type="email" value="<?php if(isset($_POST['email'])) echo $_POST['email'];  ?>" required name="email" id="email" class="form-control" placeholder="Email*">
                            </div>
                        </div>

                        <div class="form-row my-4">
                            <div class="col">
                                <input type="password" required name="password" id="password" class="form-control" placeholder="Password*">
                            </div>
                        </div>
                        <small id="messages" class="text-danger"></small>
                        <div class="form-inline pr-3">
                            <input type="checkbox" name="agreement" class="form-check-input">
                            <label for="agreement" class="form-check-label pr-3 font-poppins text-white-50">Remember me</label>
                            <a href="forget-password.php">Forgot password</a>
                        </div>

                        <div class="submit-btn text-center my-5">
                            <button type="submit" onclick="confirmPassword(event)" id="submit-log" class="btn btn-dark  rounded-pill text-white px-5 py-3" style="width:180px;">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>


<?php
    include ('footer.php');
?>