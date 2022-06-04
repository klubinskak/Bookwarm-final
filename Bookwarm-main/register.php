<?php
    include ('header.php');
?>

    <section id="register">
        <nav class="navbar nav">
            <a href="register.php"><img src="./image/logo.png" width="150px" height="150px" alt=""></a>
        </nav>
        <div class="row ml-5 m-0">
            <div class="col-lg-4 offset-lg-1">
                <div class="text-center pb-5">
                    <p class="p-1 m-0 font-poppins text-white-50">START FOR FREE</p>
                    <h1 class="login-title text-white">Create new account.</h1>
                    <span class="font-poppins text-white-50">Already A Member? <a href="login.php">Log in</a></span>
                </div>
                <div class="upload-profile-image d-flex justify-content-center pb-5">
                    <div class="text-center">
                        <div class="d-flex justify-content-center">
                            <img class="camera-icon" src="./image/camera.png" alt="camera">
                        </div>
                        <img src="./image/avatar.jpg" style="width: 200px; height: 200px" class="img rounded-circle" alt="profile">
                        <small class="form-text text-white-50">Choose Image</small>
                        <input type="file" form="reg-form" class="form-control-file" name="profileUpload" id="upload-profile">
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <form action="register-process.php" method="post" enctype="multipart/form-data" id="reg-form">
                        <div class="form-row">
                            <div class="col">
                                <input type="text" value="<?php if(isset($_POST['firstName'])) echo $_POST['firstName'];  ?>" name="first-name" id="firstName" class="form-control" placeholder="First Name">
                            </div>
                            <div class="col">
                                <input type="text" value="<?php if(isset($_POST['LastName'])) echo $_POST['LastName'];  ?>" name="last-name" id="last-name" class="form-control" placeholder="Last Name">
                            </div>
                        </div>

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

                        <div class="form-row my-4">
                            <div class="col">
                                <input type="password" required name="confirm_pwd" id="confirm-password" class="form-control" placeholder="Confirm Password*">
                                <small id="error" class="text-danger"></small>
                            </div>
                        </div>

                        <div class="form-check form-check-inline">
                            <input type="checkbox" name="agreement" class="form-check-input" required>
                            <label for="agreement" class="form-check-label font-poppins text-white-50">I agree <a href="#">term, conditions, and policy </a>* </label>
                        </div>

                        <div class="submit-btn text-center my-5">
                            <button type="submit" onclick="confirmPassword(event)" class="btn btn-dark rounded-pill text-white px-5 registerBtn" id="registerBtn" style="height: 50px;">Create account</button>
                        </div>


                    </form>
                </div>
            </div>
        </div>
    </section>


<?php
    include ('footer.php');
?>
