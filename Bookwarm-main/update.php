<?php include 'header.php';
?>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700;900&display=swap');
    *{
        box-sizing: border-box;
    }
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
    .form-control{
        width: 400px;
    }
    #btn{
        margin-left: 250px;
    }
</style>
<div class="container">
    <form class="mx-3 my-3" action= "" method="POST">
    <h1>Update user</h1>
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
        <label for="email" class="col-sm-2 col-form-label">E-mail</label>
        <div class="col-sm-10">
        <input type="email" class="form-control" name="email" id="email" placeholder="E-mail">
        </div>
    </div>
    <div class="form-group row">
        <div class="col-sm-10">
        <button type="submit" id="btn" name= "update"class="btn btn-primary">Update</button>
        </div>
    </div>
    </form>
</container>

<?php 
    include 'connection.php';
    if (isset($_POST['update'])){
        $id = $_GET['updateid'];
        $fname = $_POST['fname'];
        $lname = $_POST['lname'];
        $email = $_POST['email'];

        $query = "UPDATE user SET firstName='$fname', lastName='$lname', email='$email' WHERE userID=$id";
        $query_run = mysqli_query($conn, $query);

        if($query_run){
            echo '<script type="text/javascript"> alert("Updated") </script>';
        } else{
            echo '<script type="text/javascript"> alert("Something went wrong") </script>';
            echo $conn;
        }
    }
?>
<?php 
    include 'footer.php'
?>