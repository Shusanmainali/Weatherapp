-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2025 at 06:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prototype2testing`
--

-- --------------------------------------------------------

--
-- Table structure for table `weather`
--

CREATE TABLE `weather` (
  `id` int(11) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `humidity` float NOT NULL,
  `wind` float NOT NULL,
  `pressure` float NOT NULL,
  `temp` float NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weather`
--

INSERT INTO `weather` (`id`, `city`, `humidity`, `wind`, `pressure`, `temp`, `timestamp`) VALUES
(6, 'Gadsden', 54, 3.6, 1034, -4.99, '2025-01-22 16:18:11'),
(7, 'kathmandu', 54, 2.57, 1015, 12.12, '2025-01-22 16:26:30'),
(8, 'Gadsden', 73, 0, 1030, -5.99, '2025-01-23 02:55:27'),
(9, 'kathmandu', 66, 1.03, 1015, 9.12, '2025-01-23 02:56:19'),
(10, 'JANAKPUR', 57, 1.44, 1015, 16.52, '2025-01-23 02:56:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
