<?php
session_start();

include('get-user-data.php');

$user = array();

echo isset($_SESSION['userID']);


if (isset($_SESSION['userID'])) {
  require('connection.php');
}
?>


<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
  <!--fonts-->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:500,600,900&display=swap" rel="stylesheet" />
  <script src="https://kit.fontawesome.com/b839d31854.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="./dashboard.css">
  <title>Dashboard</title>
</head>

<body>
  <nav class="navbar fixed-top navbar-dark bg-dark">
    <div class="container-fluid">
      <a href="admin-dashboard.php" class="navbar-brand logo py-2">BOOKWARM</a>
      <form class="d-flex ms-auto my-2 mx-3">
        <!--search-->
        <input class="form-control" type="search" placeholder="Search books.." id="search-box" aria-label="Search">
        <button class="btn btn-light" id="search" type="button"><i class="bi bi-search"></i></button>
      </form>
      <!--dropdown-->
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="bi bi-person-circle"></i>
        </button>
        <div class="dropdown-menu dropdown-menu-left dropdown-menu-dark dropdown-menu-lg-start" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">Your Library</a>
          <li>
            <hr class="dropdown-divider">
          </li>
          <a class="dropdown-item" href="logout.php">Log out</a>
        </div>
      </div>
  </nav>
  <!-- card --->
  <div class="offcanvas bg-dark sidebar-nav offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header ">
      <div class="user-display">
        <img src="./image/avatar.jpg" class="profile-picture" alt="">
        <h4 class="name"> Welcome, admin <p style="color:white; display:none;"><?php echo isset($_SESSION['userID']) ?></p>
        </h4>
      </div>
    </div>
    <div class="offcanvas-body">
      <div class="dropdown mt-3">
        <div class="sidebar-content">
          <ul>
            <li>
              <a class="sidebar-li current" href="#search-box"><span class="icon"><i class="fas fa-search"></i></span>Search</a>
            </li>
            <li>
              <a class="sidebar-li current" id="users"><span class="icon"><i class="fa fa-user" aria-hidden="true"></i></span>Users</a>
            </li>
            <li>
              <a class="sidebar-li current" id="bookshelf" href="#"><span class="icon"><i class="fas fa-book-open"></i></span>Your library</a>
            </li>
            <li class="subhead">LIBRARY</li>
            <li>
              <a class="sidebar-li current category-btn" id="fiction" href="#"><span class="icon"><i class="fas fa-user-astronaut"></i></span>Fiction</a>
            </li>
            <li>
              <a class="sidebar-li current category-btn" id="poetry" href="#"><span class="icon"><i class="fas fa-pen-nib"></i></span>Poetry</a>
            </li>
            <li>
              <a class="sidebar-li current category-btn" id="fantasy" href="#"><span class="icon"><i class="fas fa-broom"></i></span>Fantasy</a>
            </li>
            <li>
              <a class="sidebar-li current category-btn" id="romance" href="#"><span class="icon"><i class="fas fa-heart"></i></span> Romance</a>
            </li>
            <li>
              <a class="sidebar-li current category-btn" id="food" href="#"><span class="icon"><i class="fas fa-utensils"></i></span> Food
              </a>
            </li>
            <li>
              <a class="sidebar-li current category-btn" id="history" href="#"><span class="icon"><i class="fas fa-landmark"></i></span>History
              </a>
            </li>
            <li>
              <a class="sidebar-li current category-btn" href="#"><span class="icon"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="results book-card" id="results"></div>
  <!-- card category -->
  <div class="category-card">
    <h1 class="hide-cards books-header" id="type"></h1>
    <div class="fiction-cards" id="fiction-cards">
    </div>
  </div>
  <!--Daily Top -->
  <div class="top-today" id="top-today">
    <div class="d-flex justify-content-between">
      <h1 class="books-header">Top Books Today </h1>
    </div>
    <!--first card-->
    <div class="d-flex justify-content-around">
      <div class="card my-4" style="width: 18rem;">
        <div class="card-body " id="card-body">
        </div>
      </div>
      <!--scd card-->
      <div class="card my-4" style="width: 18rem;">
        <div class="card-body" id="second-card">
        </div>
      </div>
      <!--third card-->
      <div class="card my-4" style="width: 18rem;">
        <div class="third-card" id="third-card">
        </div>
      </div>
    </div>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
  <script src="app.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>

</html>