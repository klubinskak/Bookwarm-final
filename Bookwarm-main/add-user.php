<?php include 'header.php';
?>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700;900&display=swap');
    body{
        font-family: Montserrat, "Roboto", "Noto", sans-serif;
    }
    h1{
        font-weight: 700;
        text-align: center;
        margin-bottom: 20px;
    }
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
<div class="container">
    <form class="mx-3 my-3" action= "" method="GET">
    <h1>Create user</h1>
    <div class="form-group row">
        <label for="fname" class="col-sm-2 col-form-label">First Name</label>
        <div class="col-sm-10">
        <input type="text"class="form-control" name="fname" id="fname" placeholder="First Name">
        </div>
    </div>
    <div class="form-group row">
        <label for="text" class="col-sm-2 col-form-label">Last Name</label>
        <div class="col-sm-10">
        <input type="text" class="form-control" name="lname" id="lname" placeholder="Last Name">
        </div>
    </div>
    <div class="form-group row">
        <label for="text" class="col-sm-2 col-form-label">E-mail</label>
        <div class="col-sm-10 mb-2">
        <input type="email" class="form-control" name="email" id="email" placeholder="E-mail">
        </div>
    </div>
    <div class="form-group row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" name ="password" id="inputPassword" placeholder="Password">
    </div>
    <div class="form-group row">
        <div class="col-sm-10">
        <button type="submit" name="create" id="btn" class="btn btn-primary mt-3" style="margin-left: 310px;">Submit</button>
        </div>
    </div>
    </form>

<?php 
    include 'connection.php';
    if (isset($_GET['create'])){
        $firstName = $_GET['fname'];
        $lastName = $_GET['lname'];
        $email = $_GET['email'];
        $password = $_GET['password'];
        $profile_Image = "./assets/profile-picture";

        $query = "INSERT INTO user (firstName, lastName, email, password, profileImage,`registerDate`) VALUES ('$firstName', '$lastName', '$email', '$password','$profile_Image', NOW())";
        $query_run = mysqli_query($conn, $query);

        if($query_run){
            header("refresh:0.5;url=admin-dashboard.php" );
            echo '<script type="text/javascript"> alert("Sucessfully added user!") </script>';
        } else{
            echo '<script type="text/javascript"> alert("Something went wrong") </script>';
            echo mysqli_error($conn);
        }
    }
?>
<?php 
    include 'footer.php'
?>