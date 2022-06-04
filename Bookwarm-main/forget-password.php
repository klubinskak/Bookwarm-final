<?php

include ('header.php');
?>


    <section id="register" style="height: 100vh;">
        <nav class="navbar nav">
            <a href="register.php"><img src="./image/logo.png" width="150px" height="150px" alt=""></a>
        </nav>
        <div class="row ml-5 m-0 py-5">
            <div class="col-lg-4 offset-lg-1">
                <div class="text-center pb-5">
                    <h1 class="login-title text-white">Reset password.</h1>
                    <h1 id="send"></h1>
                    <p class="p-1 m-0 font-poppins text-white-50 py-2">Welcome! Please enter your details.</p>
                </div>
                <div class="d-flex justify-content-center">
                    <form id="reg-form">
                        <div class="form-row my-4 ">
                            <div class="col">
                                <input type="email" required name="email" id="email" class="form-control" placeholder="Email*">
                            </div>
                        </div>
                        <div class="text-center my-5">
                            <button class="btn btn-dark rounded-pill text-white px-5 py-3" style="width:230px; height: 60px;"><a href="reset.php" style="text-decoration:none; color: white;">Reset password</a></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>



<?php
    include ('footer.php');
?>