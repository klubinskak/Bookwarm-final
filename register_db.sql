-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 05, 2022 at 12:11 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `register_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookshelf`
--

CREATE TABLE `bookshelf` (
  `id` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `tittle` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `thumbnail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookshelf`
--

INSERT INTO `bookshelf` (`id`, `userID`, `tittle`, `category`, `thumbnail`) VALUES
(13, 11, 'Manwhore +1', 'Read', 'http://books.google.com/books/content?id=ZlERCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(14, 11, 'Manwhore +1', 'I want to read', 'http://books.google.com/books/content?id=ZlERCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(15, 11, 'Manwhore +1', 'Read', 'http://books.google.com/books/content?id=ZlERCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(16, 11, 'Fantasy Books', 'I want to read', 'http://books.google.com/books/content?id=cBzdDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(17, 11, 'The Plague', 'I want to read', 'http://books.google.com/books/content?id=KVGd-NabpW0C&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
(18, 11, 'Girl, Alone (An Ella Dark FBI Suspense Thriller—Book 1)', 'I want to read', 'http://books.google.com/books/content?id=Gh0JEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(19, 11, 'Venom', 'I want to buy', 'http://books.google.com/books/content?id=eXM0lAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
(20, 5, 'The Selected Poems of Wang Wei', 'I want to buy', 'http://books.google.com/books/content?id=XVBYBfIEmyMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(21, 5, 'Three Books', 'I want to read', 'http://books.google.com/books/content?id=laWM4GlA5EoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(22, 5, 'Self Publishing Handbook: The Quick and Easy Way to Publish Books', 'I want to read', 'http://books.google.com/books/content?id=HZg5CgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(23, 5, 'Learn French Now! For Every Kid | A Children', 'I want to buy', 'http://books.google.com/books/content?id=Fwk7DgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(24, 5, 'Book-song', 'Read', 'http://books.google.com/books/content?id=u-QpAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(25, 12, 'Stalin', 'I want to read', 'http://books.google.com/books/content?id=yjNZEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
(26, 12, 'Last Chance Books', 'Read', 'http://books.google.com/books/content?id=tB_BzQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'),
(27, 12, 'Simple Gifts', 'I want to buy', 'http://books.google.com/books/content?id=_y8kwT-j3sUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(28, 12, 'Manwhore +1', 'I want to buy', 'http://books.google.com/books/content?id=ZlERCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(29, 12, 'The Art of Criticism', 'I want to read', 'http://books.google.com/books/content?id=GWWRdWh1L9IC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'),
(30, 12, 'Venom', 'Read', 'http://books.google.com/books/content?id=eXM0lAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api');

-- --------------------------------------------------------

--
-- Table structure for table `review_table`
--

CREATE TABLE `review_table` (
  `review_id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `user_rating` int(1) NOT NULL,
  `user_review` text NOT NULL,
  `datetime` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `tittle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review_table`
--

INSERT INTO `review_table` (`review_id`, `user_name`, `user_rating`, `user_review`, `datetime`, `tittle`) VALUES
(1, 'Klaudia', 5, 'Good', '2022-03-26 23:17:04', 'Simple Gifts'),
(2, 'Klaudia', 5, '5/5', '2022-05-30 20:28:08', 'Ovid'),
(3, 'Klaudia', 5, '5', '2022-05-30 20:28:34', 'Ovid'),
(4, 'Klaudia', 5, '5', '2022-05-30 20:28:44', 'The Fantastic Flying Books of Mr. Morris Lessmore'),
(5, 'klaudia', 5, '5', '2022-05-30 20:28:57', 'Last Chance Books'),
(6, 'Klaudia', 5, '5', '2022-06-02 21:43:45', 'The Fantastic Flying Books of Mr. Morris Lessmore'),
(7, 'Klaudia', 5, '5', '2022-06-02 21:43:48', 'The Fantastic Flying Books of Mr. Morris Lessmore'),
(8, 'Klaudia', 3, '3/5', '2022-06-02 21:44:00', 'The Earthsea'),
(9, 'Klaudia', 5, '5/5', '2022-06-02 22:25:31', 'Meant to Be'),
(10, 'Klaudia', 3, '3/5', '2022-06-02 22:25:42', 'Villette');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(20) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `registerDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `firstName`, `lastName`, `email`, `password`, `profileImage`, `registerDate`) VALUES
(2, 'admin', 'admin', 'admin@gmail.com', '$2y$10$s5Vy3RX6LLVr5UvbnLCLUOTC81vea1oqwmz8CI.rOVDzF1Spo3Ffm', './assets/profile-picture/avatar.jpg', '2022-03-26 23:07:53'),
(3, 'Anna', 'Kowalska', 'annakowalska@gmail.com', '$2y$10$V9raaDvg1EMGcHr0YDXQguJRWLltMr4kes1UkJZohwcMif0/3Chpq', './assets/profile-picture1618094698051.jpeg', '2022-03-27 21:15:57'),
(4, 'klaudia', 'Kowalska', 'klaudia@gmail.com', '$2y$10$vucketaSa1rPF5BlCT2s1e9caycI3/AsEa7WCR7RsP54ZGTuv45lq', './assets/profile-picture/avatar.jpg', '2022-05-30 20:22:48'),
(5, 'Klaudia', 'Klubinska', 'klaudiak@gmail.com', '$2y$10$shSa8zl3WEapLd/dcMiiFuZmO69MEYgb0rGvO3pX1Mcqz5KF98NsS', './assets/profile-picture/avatar.jpg', '2022-06-02 21:27:01'),
(6, 'Klaudia', 'Klubinska', 'klaudiakk@gmail.com', '$2y$10$LhUU0XgJ8lZMdhxi.8Vg7OwoyDZBzxvsSB5HOBmi0Q8tPmAYbYzLa', './assets/profile-picture/avatar.jpg', '2022-06-02 21:30:49'),
(7, 'Klaudia', 'Klubinska', 'klaudiak13@gmail.com', '$2y$10$SW9lJfehaxQOp.wtbpQZbOsAivB3ScXfLwb22MJbe6X4ldc0tqOdS', './assets/profile-picture/avatar.jpg', '2022-06-02 21:31:25'),
(9, 'Klaudia', 'Klubinska', 'klubinskaklaudia19@gmail.com', '$2y$10$CJug2HynaVF4pFWqmrXOwu3jxtemBz/VMKkZA.7dfqQc6dmSnu6rq', './assets/profile-pictureavatar.jpg', '2022-06-02 21:37:35'),
(10, 'Klaudia', 'Klubinska', 'klubinskaklaudia27@gmail.com', '$2y$10$Ua8.IZ/2GNNFPgkn5RhZzudVMa.rPnKzQgLt.yY5QT9DOpGsJUCpG', './assets/profile-pictureavatar.jpg', '2022-06-02 21:41:24'),
(11, 'Klaudia', 'Klubinska', 'kklubinska@gmail.com', '$2y$10$0f/e0fPPb6VuLLUg6PxUvel9wb8CBhyinlOIQuH7Pq5XnuvzKxzQi', './assets/profile-pictureavatar.jpg', '2022-06-02 21:43:12'),
(12, 'Klaudia', 'Klubińska', 'klubinskaklaudia21@gmail.com', '$2y$10$Qp/otAdqXOr09Zwp8WVi/O4zf44nujxnZTxhuZMJ1irpJRksBpWcS', './assets/profile-pictureavatar.jpg', '2022-06-02 22:24:51'),
(13, 'Joanna', 'Kowalska', 'jkowalska@gmail.com', '123', './assets/profile-picture', '2022-06-02 22:27:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookshelf`
--
ALTER TABLE `bookshelf`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review_table`
--
ALTER TABLE `review_table`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookshelf`
--
ALTER TABLE `bookshelf`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `review_table`
--
ALTER TABLE `review_table`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
