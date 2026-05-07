-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 07, 2026 at 09:41 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel13DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-4f365c282e7cfdda55b09b38dbb8fdd4', 'i:1;', 1778138788),
('laravel-cache-4f365c282e7cfdda55b09b38dbb8fdd4:timer', 'i:1778138788;', 1778138788),
('laravel-cache-666a00e9cf977d420d7d41ab802ce296', 'i:1;', 1778138894),
('laravel-cache-666a00e9cf977d420d7d41ab802ce296:timer', 'i:1778138894;', 1778138894);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(2, 2, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(3, 3, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(4, 4, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(5, 5, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(6, 6, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(7, 7, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(8, 8, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(9, 9, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(10, 10, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(11, 11, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(12, 12, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(13, 13, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(14, 14, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(15, 15, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(16, 16, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(17, 17, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(18, 18, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(19, 19, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(20, 20, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(21, 21, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(22, 22, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(23, 23, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(24, 24, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(25, 25, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(26, 26, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(27, 27, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(28, 28, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(29, 29, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(30, 30, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(31, 32, '2026-05-06 20:28:18', '2026-05-06 20:28:18'),
(32, 33, '2026-05-06 22:02:15', '2026-05-06 22:02:15'),
(33, 31, '2026-05-06 23:26:08', '2026-05-06 23:26:08');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cart_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(3, 2, 46, 3, '1918.53', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(4, 3, 12, 1, '2117.33', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(5, 3, 27, 1, '1194.65', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(6, 3, 59, 2, '1923.36', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(7, 4, 4, 3, '2343.32', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(8, 4, 34, 1, '2180.95', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(9, 4, 35, 3, '1809.48', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(10, 5, 19, 3, '1761.08', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(11, 6, 37, 2, '2490.68', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(12, 7, 12, 3, '2117.33', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(13, 7, 26, 1, '965.76', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(15, 7, 63, 3, '489.07', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(16, 8, 32, 1, '1417.87', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(17, 8, 72, 1, '245.39', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(18, 9, 4, 3, '2343.32', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(19, 9, 19, 2, '1761.08', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(20, 9, 50, 3, '2139.38', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(21, 10, 49, 3, '1535.96', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(22, 10, 56, 1, '1472.34', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(24, 11, 7, 3, '1607.50', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(25, 12, 14, 3, '866.93', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(26, 12, 35, 3, '1809.48', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(28, 12, 67, 2, '1518.56', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(29, 13, 4, 1, '2343.32', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(30, 13, 33, 1, '792.26', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(31, 13, 56, 3, '1472.34', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(32, 14, 12, 3, '2117.33', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(33, 14, 21, 3, '253.41', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(34, 14, 48, 1, '1361.01', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(35, 14, 60, 1, '126.42', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(36, 15, 11, 3, '2105.43', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(38, 16, 70, 2, '490.07', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(40, 17, 46, 3, '1918.53', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(41, 17, 75, 3, '937.64', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(42, 18, 79, 2, '181.21', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(43, 19, 30, 3, '1839.06', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(44, 19, 39, 2, '1275.69', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(45, 19, 48, 3, '1361.01', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(46, 19, 74, 3, '1675.84', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(47, 20, 37, 3, '2490.68', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(48, 21, 10, 2, '217.11', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(49, 21, 37, 1, '2490.68', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(50, 22, 60, 1, '126.42', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(52, 23, 27, 1, '1194.65', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(53, 23, 68, 2, '1453.24', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(54, 24, 19, 1, '1761.08', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(55, 24, 30, 3, '1839.06', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(56, 25, 6, 3, '1962.36', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(57, 25, 50, 3, '2139.38', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(58, 26, 11, 1, '2105.43', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(59, 26, 59, 3, '1923.36', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(60, 26, 75, 1, '937.64', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(61, 27, 22, 3, '422.91', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(63, 27, 73, 1, '603.67', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(64, 28, 18, 3, '2270.60', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(65, 29, 23, 2, '295.39', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(66, 29, 79, 2, '181.21', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(67, 30, 13, 2, '1218.37', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(68, 30, 60, 3, '126.42', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(71, 1, 6, 1, '1962.36', '2026-05-06 19:39:17', '2026-05-06 19:39:17'),
(83, 31, 19, 1, '1761.08', '2026-05-06 21:54:17', '2026-05-06 21:54:17'),
(87, 33, 1, 1, '459.29', '2026-05-06 23:26:08', '2026-05-06 23:26:08');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `image`, `parent_id`, `created_at`, `updated_at`) VALUES
(1, 'Living Room', 'living-room', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop', NULL, '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(2, 'Sofas', 'sofas-83', 'https://plus.unsplash.com/premium_photo-1681449856688-2abd99ab5a73?w=400&h=300&fit=crop', 1, '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(3, 'Armchairs', 'armchairs-60', 'https://plus.unsplash.com/premium_photo-1705169612592-32610774a5d0?w=400&h=300&fit=crop', 1, '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(4, 'Coffee Tables', 'coffee-tables-87', 'https://plus.unsplash.com/premium_photo-1668472274328-cd239ae3586f?w=400&h=300&fit=crop', 1, '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(5, 'TV Consoles', 'tv-consoles-70', 'https://plus.unsplash.com/premium_photo-1681236323432-3df82be0c1b0?w=400&h=300&fit=crop', 1, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(6, 'Bookshelves', 'bookshelves-90', 'https://images.unsplash.com/photo-1543248939-4296e1fea89b?w=400&h=300&fit=crop', 1, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(7, 'Bedroom', 'bedroom', 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=300&fit=crop', NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(8, 'Beds', 'beds-83', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop', 7, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(9, 'Mattresses', 'mattresses-2', NULL, 7, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(10, 'Wardrobes', 'wardrobes-89', NULL, 7, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(11, 'Nightstands', 'nightstands-72', NULL, 7, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(12, 'Dressers', 'dressers-22', NULL, 7, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(13, 'Dining', 'dining', NULL, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(14, 'Dining Tables', 'dining-tables-96', NULL, 13, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(15, 'Dining Chairs', 'dining-chairs-56', NULL, 13, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(16, 'Dining Benches', 'dining-benches-29', NULL, 13, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(17, 'Bar Stools', 'bar-stools-72', NULL, 13, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(18, 'Office', 'office', NULL, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(19, 'Desks', 'desks-87', NULL, 18, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(20, 'Office Chairs', 'office-chairs-79', NULL, 18, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(21, 'Filing Cabinets', 'filing-cabinets-31', NULL, 18, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(22, 'Bookshelves', 'bookshelves-75', NULL, 18, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(23, 'Outdoor', 'outdoor', NULL, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(24, 'Patio Sets', 'patio-sets-52', NULL, 23, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(25, 'Garden Chairs', 'garden-chairs-54', NULL, 23, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(26, 'Outdoor Tables', 'outdoor-tables-64', NULL, 23, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(27, 'Loungers', 'loungers-39', NULL, 23, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(28, 'Kids Room', 'kids-room', NULL, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(29, 'Bunk Beds', 'bunk-beds-93', NULL, 28, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(30, 'Kids Chairs', 'kids-chairs-46', NULL, 28, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(31, 'Study Desks', 'study-desks-29', NULL, 28, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(32, 'Storage', 'storage-64', NULL, 28, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(33, 'Kitchen', 'kitchen', NULL, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(34, 'Kitchen Islands', 'kitchen-islands-73', NULL, 33, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(35, 'Pot Racks', 'pot-racks-45', NULL, 33, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(36, 'Bar Stools', 'bar-stools-99', NULL, 33, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(37, 'Bathroom', 'bathroom', NULL, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(38, 'Vanity Cabinets', 'vanity-cabinets-96', NULL, 37, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(39, 'Storage Cabinets', 'storage-cabinets-80', NULL, 37, '2026-05-05 17:13:57', '2026-05-05 17:13:57');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_01_01_000010_create_categories_table', 1),
(5, '2025_01_01_000011_create_products_table', 1),
(6, '2025_01_01_000012_create_product_images_table', 1),
(7, '2025_01_01_000013_create_carts_table', 1),
(8, '2025_01_01_000014_create_cart_items_table', 1),
(9, '2025_01_01_000015_create_wishlists_table', 1),
(10, '2025_01_01_000016_create_orders_table', 1),
(11, '2025_01_01_000017_create_order_items_table', 1),
(12, '2025_01_01_000018_create_payments_table', 1),
(13, '2025_01_01_000019_create_reviews_table', 1),
(14, '2025_05_06_000001_add_image_to_categories_table', 1),
(16, '2025_08_14_170933_add_two_factor_columns_to_users_table', 2),
(17, '2026_05_06_074735_add_checkout_fields_to_orders_table', 3),
(18, '2026_05_06_082712_make_user_id_nullable_in_orders_table', 4),
(19, '2026_05_07_070806_create_settings_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `billing_data` json DEFAULT NULL,
  `shipping_data` json DEFAULT NULL,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  `shipping_cost` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `shipping_address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_number`, `user_id`, `billing_data`, `shipping_data`, `payment_method`, `subtotal`, `shipping_cost`, `total`, `total_amount`, `status`, `shipping_address`, `created_at`, `updated_at`) VALUES
(1, 'ORD-69FAF3540E050', 1, NULL, NULL, NULL, NULL, NULL, NULL, '4568.56', 'cancelled', '6969 Hartmann Ridge Suite 637\nMayhaven, OH 68003-2559', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(2, 'ORD-69FAF3540FD04', 1, NULL, NULL, NULL, NULL, NULL, NULL, '3996.80', 'pending', '3994 Adriel Gateway\nEast Billyton, DE 80443', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(3, 'ORD-69FAF3540FFB5', 1, NULL, NULL, NULL, NULL, NULL, NULL, '9357.08', 'paid', '2938 Mikayla Burg Suite 763\nAmelyview, WA 03726-7789', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(4, 'ORD-69FAF354101EB', 2, NULL, NULL, NULL, NULL, NULL, NULL, '7793.41', 'cancelled', '2691 Mariana Ferry Apt. 100\nAbdullahborough, FL 13458', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(5, 'ORD-69FAF354103BE', 2, NULL, NULL, NULL, NULL, NULL, NULL, '4374.43', 'shipped', '19819 Ella Locks\nNorth Elton, MD 25056', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(6, 'ORD-69FAF3541058F', 2, NULL, NULL, NULL, NULL, NULL, NULL, '2832.35', 'shipped', '8013 Nickolas Stravenue Apt. 939\nEast Hoytside, NV 24406-0093', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(7, 'ORD-69FAF35410764', 3, NULL, NULL, NULL, NULL, NULL, NULL, '6362.24', 'cancelled', '106 Muller Light\nPort Naomibury, PA 10098-6006', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(8, 'ORD-69FAF35410910', 4, NULL, NULL, NULL, NULL, NULL, NULL, '2212.42', 'shipped', '93763 Elmira Dale\nAlexandrineburgh, MT 96149-9886', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(9, 'ORD-69FAF35410AB7', 4, NULL, NULL, NULL, NULL, NULL, NULL, '4510.06', 'pending', '171 Loma Camp Apt. 925\nBashirianport, WV 50784-7698', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(10, 'ORD-69FAF35410C5C', 4, NULL, NULL, NULL, NULL, NULL, NULL, '1923.36', 'shipped', '29531 Tyshawn Field Apt. 590\nMorissetteborough, SD 82353', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(11, 'ORD-69FAF35410E45', 5, NULL, NULL, NULL, NULL, NULL, NULL, '5273.40', 'paid', '88963 Laurianne Port\nWeberside, ID 44904', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(12, 'ORD-69FAF354110A3', 6, NULL, NULL, NULL, NULL, NULL, NULL, '7646.38', 'paid', '15507 Ewald Drive\nNorth Preciousview, MD 28137', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(13, 'ORD-69FAF35411320', 6, NULL, NULL, NULL, NULL, NULL, NULL, '6578.85', 'paid', '2702 Schroeder Street Suite 124\nSouth Vicente, KY 64574', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(14, 'ORD-69FAF35411598', 6, NULL, NULL, NULL, NULL, NULL, NULL, '10583.80', 'paid', '346 June Lodge\nSouth Reina, MA 33839-6506', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(15, 'ORD-69FAF3541182E', 7, NULL, NULL, NULL, NULL, NULL, NULL, '5703.82', 'shipped', '30857 Lyla Passage Suite 240\nPort Edwardoton, IN 03522-1349', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(16, 'ORD-69FAF354119F2', 7, NULL, NULL, NULL, NULL, NULL, NULL, '3433.82', 'delivered', '1432 Quigley Harbors Apt. 599\nBertramborough, KS 62489-6595', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(17, 'ORD-69FAF35411D8E', 7, NULL, NULL, NULL, NULL, NULL, NULL, '4738.45', 'delivered', '93358 Turcotte Gateway\nNathanielport, CA 87102-4349', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(18, 'ORD-69FAF35411F85', 8, NULL, NULL, NULL, NULL, NULL, NULL, '2778.88', 'pending', '108 Gibson Trail\nRunolfssonton, CA 06444-5464', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(19, 'ORD-69FAF354121AC', 8, NULL, NULL, NULL, NULL, NULL, NULL, '3572.42', 'cancelled', '93688 Bartell Greens\nLake Fernechester, NJ 84839', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(20, 'ORD-69FAF354123BB', 8, NULL, NULL, NULL, NULL, NULL, NULL, '11022.68', 'pending', '522 Stokes Summit\nRempelside, NH 63082', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(21, 'ORD-69FAF354125A2', 9, NULL, NULL, NULL, NULL, NULL, NULL, '7263.58', 'shipped', '674 Vergie Keys Suite 749\nNew Ferne, TX 86163', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(22, 'ORD-69FAF354127C8', 9, NULL, NULL, NULL, NULL, NULL, NULL, '778.02', 'pending', '7295 Ondricka Keys\nMarcochester, AK 49927-1250', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(23, 'ORD-69FAF35412A40', 9, NULL, NULL, NULL, NULL, NULL, NULL, '2490.68', 'shipped', '55128 Toy Station\nPort Graciebury, MD 82829', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(24, 'ORD-69FAF35412D55', 10, NULL, NULL, NULL, NULL, NULL, NULL, '3058.63', 'cancelled', '30361 Steuber Field\nPort Allison, ID 39250-0926', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(25, 'ORD-69FAF35413156', 10, NULL, NULL, NULL, NULL, NULL, NULL, '3527.52', 'shipped', '2748 Gislason Ridges Apt. 918\nNew Daren, WV 07004-6373', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(26, 'ORD-69FAF3541360C', 10, NULL, NULL, NULL, NULL, NULL, NULL, '1839.06', 'cancelled', '2751 O\'Connell Isle\nNew Una, NV 25143-9306', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(27, 'ORD-69FAF354138BB', 11, NULL, NULL, NULL, NULL, NULL, NULL, '7367.41', 'delivered', '237 Pfannerstill Club Apt. 786\nEmmittstad, WY 49800', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(28, 'ORD-69FAF35413AF9', 11, NULL, NULL, NULL, NULL, NULL, NULL, '6772.96', 'pending', '636 Bonnie Locks Suite 535\nOttisbury, KS 90333-9414', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(29, 'ORD-69FAF35413D6A', 11, NULL, NULL, NULL, NULL, NULL, NULL, '3800.75', 'delivered', '95641 Coby Club Apt. 964\nPadbergview, SC 02691', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(30, 'ORD-69FAF35413FD0', 12, NULL, NULL, NULL, NULL, NULL, NULL, '4243.02', 'paid', '459 Elvie Harbor Suite 771\nEast Thad, NE 83731', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(31, 'ORD-69FAF35414249', 12, NULL, NULL, NULL, NULL, NULL, NULL, '6762.87', 'delivered', '330 Stephany Hollow Suite 313\nWest Ian, AL 17722-7965', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(32, 'ORD-69FAF354144C1', 13, NULL, NULL, NULL, NULL, NULL, NULL, '6079.77', 'delivered', '18099 Mann Fall Suite 621\nNew Emilianoville, LA 49722-2319', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(33, 'ORD-69FAF35414771', 13, NULL, NULL, NULL, NULL, NULL, NULL, '1150.10', 'pending', '333 Cole Road\nWuckertberg, VA 42321-0621', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(34, 'ORD-69FAF354149DC', 13, NULL, NULL, NULL, NULL, NULL, NULL, '3477.94', 'pending', '588 Isadore Field Apt. 567\nKilbackmouth, KS 42942', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(35, 'ORD-69FAF35414C72', 14, NULL, NULL, NULL, NULL, NULL, NULL, '1396.93', 'delivered', '74226 Maude Club Apt. 972\nWest Woodrow, ND 64440-1416', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(36, 'ORD-69FAF35414F19', 14, NULL, NULL, NULL, NULL, NULL, NULL, '2745.89', 'cancelled', '24177 Jazmin Expressway Apt. 745\nWest Drewborough, NH 82009-6097', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(37, 'ORD-69FAF35415140', 14, NULL, NULL, NULL, NULL, NULL, NULL, '4361.90', 'delivered', '44406 Bogan Alley Suite 039\nGwendolynton, ME 28767-8283', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(38, 'ORD-69FAF354153CB', 15, NULL, NULL, NULL, NULL, NULL, NULL, '1584.52', 'paid', '642 Bogan Squares Apt. 319\nWillbury, OK 32592', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(39, 'ORD-69FAF354155D1', 15, NULL, NULL, NULL, NULL, NULL, NULL, '7343.05', 'shipped', '2695 Maureen Shore Apt. 208\nSouth Ruthland, AL 22220', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(40, 'ORD-69FAF354157D7', 15, NULL, NULL, NULL, NULL, NULL, NULL, '3659.01', 'pending', '34152 Jamaal Flats Apt. 809\nDallasstad, NH 17939-6344', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(41, 'ORD-69FAF354159BA', 16, NULL, NULL, NULL, NULL, NULL, NULL, '5465.55', 'cancelled', '871 Jolie Stream Apt. 229\nIsacfurt, DC 76344', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(42, 'ORD-69FAF35415BC0', 16, NULL, NULL, NULL, NULL, NULL, NULL, '1845.58', 'cancelled', '52007 Leola Mountain Apt. 850\nLake Markus, NJ 68704-0890', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(43, 'ORD-69FAF35415DE0', 16, NULL, NULL, NULL, NULL, NULL, NULL, '4396.87', 'paid', '275 Pfeffer Drive\nHarryside, MA 66269-8844', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(44, 'ORD-69FAF35415FE5', 17, NULL, NULL, NULL, NULL, NULL, NULL, '4682.88', 'cancelled', '310 Hammes Islands Suite 994\nJulianfort, MO 89702-9184', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(45, 'ORD-69FAF354161F0', 17, NULL, NULL, NULL, NULL, NULL, NULL, '10223.48', 'cancelled', '701 Keebler Passage Suite 934\nWolfffurt, GA 75875-0703', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(46, 'ORD-69FAF354163FD', 17, NULL, NULL, NULL, NULL, NULL, NULL, '5990.18', 'paid', '72118 Rosalinda Burgs\nGileston, MS 63766', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(47, 'ORD-69FAF354165DC', 18, NULL, NULL, NULL, NULL, NULL, NULL, '4909.22', 'paid', '3384 Percival Center Suite 864\nLake Virgieside, AR 57625', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(48, 'ORD-69FAF354167AA', 19, NULL, NULL, NULL, NULL, NULL, NULL, '126.42', 'shipped', '115 Hahn Ville Apt. 397\nJovanyhaven, MT 43478-6876', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(49, 'ORD-69FAF35416982', 20, NULL, NULL, NULL, NULL, NULL, NULL, '2640.55', 'shipped', '932 Clifford Corners Apt. 348\nEast Harmonymouth, VT 34064-4740', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(50, 'ORD-69FAF35416BAE', 20, NULL, NULL, NULL, NULL, NULL, NULL, '5024.48', 'shipped', '40776 Mills Shores Suite 513\nEast Devanborough, PA 02988-4403', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(51, 'ORD-69FAF35416DB4', 21, NULL, NULL, NULL, NULL, NULL, NULL, '2352.40', 'delivered', '6703 Ferry Squares Suite 689\nLake Vernaville, SD 88685-2473', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(52, 'ORD-69FAF354170E7', 21, NULL, NULL, NULL, NULL, NULL, NULL, '5372.10', 'paid', '90041 Esperanza Islands\nEast Eleonore, NE 92039', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(53, 'ORD-69FAF354172D8', 21, NULL, NULL, NULL, NULL, NULL, NULL, '490.07', 'delivered', '109 Emerson Track Apt. 456\nEast Deron, FL 83006', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(54, 'ORD-69FAF354174C0', 22, NULL, NULL, NULL, NULL, NULL, NULL, '6074.18', 'shipped', '44621 Alessandro Pike Suite 000\nKertzmannville, DE 60269-7177', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(55, 'ORD-69FAF354176A9', 22, NULL, NULL, NULL, NULL, NULL, NULL, '4079.20', 'delivered', '53738 Gustave Corners\nStoltenbergton, LA 28175-9323', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(56, 'ORD-69FAF35417892', 23, NULL, NULL, NULL, NULL, NULL, NULL, '357.94', 'shipped', '89770 Maribel Street Apt. 307\nNorth Alia, MN 29660-5941', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(57, 'ORD-69FAF35417B82', 23, NULL, NULL, NULL, NULL, NULL, NULL, '6871.86', 'shipped', '6492 Anderson Forges Apt. 487\nCormierstad, WA 60502-5427', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(58, 'ORD-69FAF35417E57', 23, NULL, NULL, NULL, NULL, NULL, NULL, '9311.87', 'paid', '8792 Lavada Field Apt. 275\nLake Marianeland, ID 62766-4725', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(59, 'ORD-69FAF354180FD', 24, NULL, NULL, NULL, NULL, NULL, NULL, '5507.54', 'delivered', '8794 Retha Square\nNataliaborough, DE 07330', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(60, 'ORD-69FAF354182EF', 24, NULL, NULL, NULL, NULL, NULL, NULL, '7276.40', 'delivered', '30980 Frami Fall Suite 238\nAhmadmouth, WY 86200-6891', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(61, 'ORD-69FAF354184E7', 24, NULL, NULL, NULL, NULL, NULL, NULL, '4174.78', 'delivered', '21263 Helene Roads\nNew Kiera, WA 60570-2667', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(62, 'ORD-69FAF35418701', 25, NULL, NULL, NULL, NULL, NULL, NULL, '4381.18', 'delivered', '7879 Ziemann Port\nWest Sylvester, ND 42237', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(63, 'ORD-69FAF3541895E', 26, NULL, NULL, NULL, NULL, NULL, NULL, '448.51', 'delivered', '33373 Tierra Path\nRobertsberg, NJ 63589', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(64, 'ORD-69FAF35418C50', 26, NULL, NULL, NULL, NULL, NULL, NULL, '8011.84', 'delivered', '268 Mohammed Parkways Apt. 063\nSouth Eddie, AZ 14677', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(65, 'ORD-69FAF35418F09', 26, NULL, NULL, NULL, NULL, NULL, NULL, '4024.60', 'delivered', '92256 Lee Shoals\nJuvenalfurt, OH 42717', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(66, 'ORD-69FAF35419203', 27, NULL, NULL, NULL, NULL, NULL, NULL, '6552.44', 'pending', '99639 Eli Common Suite 907\nGuadalupeview, MT 27586-6231', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(67, 'ORD-69FAF35419506', 27, NULL, NULL, NULL, NULL, NULL, NULL, '492.08', 'paid', '179 Antone Rapid Apt. 284\nFinnchester, ME 88870', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(68, 'ORD-69FAF35419724', 28, NULL, NULL, NULL, NULL, NULL, NULL, '9451.42', 'delivered', '633 Larkin Road\nLuettgenstad, AL 37627-3028', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(69, 'ORD-69FAF35419A03', 29, NULL, NULL, NULL, NULL, NULL, NULL, '4904.10', 'delivered', '48702 Kemmer Forges Apt. 380\nNorth Rosario, NC 30232', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(70, 'ORD-69FAF35419C5F', 29, NULL, NULL, NULL, NULL, NULL, NULL, '7084.74', 'pending', '202 Greg Prairie\nWest Caterina, DE 10589-1880', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(71, 'ORD-69FAF35419E8B', 30, NULL, NULL, NULL, NULL, NULL, NULL, '6412.18', 'delivered', '9043 Trantow Lane\nEast Coltenside, VA 32464-8939', '2026-05-05 17:13:57', '2026-05-05 23:52:52'),
(76, 'ORD-69FBE0A4570A4', 1, '{\"email\": \"marlin.bartell@example.net\", \"phone\": \"46456456\", \"last_name\": \"Farrel\", \"first_name\": \"Demarco\"}', '{\"city\": \"asdf\", \"method\": \"delivery\", \"address\": \"asdf\", \"postal_code\": \"453345\"}', 'credit_card', '459.29', '50.00', '509.29', '509.29', 'pending', 'asdf, asdf, 453345', '2026-05-06 16:45:24', '2026-05-06 16:45:24'),
(77, 'ORD-69FC026853CB3', 1, '{\"email\": \"marlin.bartell@example.net\", \"phone\": \"345345435\", \"last_name\": \"Farrell\", \"first_name\": \"Demarco\"}', '{\"city\": \"olongao city\", \"method\": \"delivery\", \"address\": \"New Cabalan\", \"postal_code\": \"2200\"}', 'cash', '459.64', '50.00', '509.64', '459.64', 'shipped', 'New Cabalan, olongao city, 2200', '2026-05-06 19:09:28', '2026-05-06 19:16:06'),
(78, 'ORD-69FC14FFB5C0D', 32, '{\"email\": \"clydey@gmail.com\", \"phone\": \"424234234\", \"last_name\": \"Ednalan\", \"first_name\": \"Clydey\"}', '{\"city\": \"Olongapo City\", \"method\": \"delivery\", \"address\": \"New Cabalan\", \"postal_code\": \"123123\"}', 'cash', '459.29', '50.00', '509.29', '459.29', 'paid', 'New Cabalan, Olongapo City, 123123', '2026-05-06 20:28:47', '2026-05-06 20:32:38'),
(79, 'ORD-69FC1ACAAA888', 32, '{\"email\": \"clydey@gmail.com\", \"phone\": \"34234234\", \"last_name\": \"Ednalan\", \"first_name\": \"Clydey\"}', '{\"city\": \"Olongapo Cit\", \"method\": \"delivery\", \"address\": \"New Cabalan\", \"postal_code\": \"200\"}', 'credit_card', '1607.50', '0.00', '1607.50', '1607.50', 'paid', 'New Cabalan, Olongapo Cit, 200', '2026-05-06 20:53:30', '2026-05-06 20:53:30'),
(89, 'ORD-69FC286D3451F', 32, '{\"email\": \"clydey@gmail.com\", \"phone\": \"345345345\", \"last_name\": \"Ednalan\", \"first_name\": \"Clydey\"}', '{\"city\": \"Olongapo City\", \"method\": \"delivery\", \"address\": \"New Cabalan\", \"postal_code\": \"34234\"}', 'stripe', '459.29', '50.00', '509.29', '509.29', 'paid', 'New Cabalan, Olongapo City, 34234', '2026-05-06 21:51:41', '2026-05-06 21:51:41'),
(90, 'ORD-69FC2B1C07FE8', 33, '{\"email\": \"catlin@gmail.com\", \"phone\": \"345345345\", \"last_name\": \"Ednalan\", \"first_name\": \"Catlin\"}', '{\"city\": \"Olongapo City\", \"method\": \"delivery\", \"address\": \"New Cabalan\", \"postal_code\": \"2200\"}', 'cash', '1371.67', '0.00', '1371.67', '1371.67', 'shipped', 'New Cabalan, Olongapo City, 2200', '2026-05-06 22:03:08', '2026-05-06 22:05:33'),
(91, 'ORD-69FC2C31E6603', 33, '{\"email\": \"catlin@gmail.com\", \"phone\": \"435345345\", \"last_name\": \"Ednalan\", \"first_name\": \"Catlin\"}', '{\"city\": \"Olongapo City\", \"method\": \"delivery\", \"address\": \"New Cabalan\", \"postal_code\": \"2200\"}', 'stripe', '459.29', '50.00', '509.29', '509.29', 'paid', 'New Cabalan, Olongapo City, 2200', '2026-05-06 22:07:45', '2026-05-06 22:07:45'),
(92, 'ORD-69FC3F27B7F0B', 33, '{\"email\": \"catlin@gmail.com\", \"phone\": \"435345\", \"last_name\": \"Ednalan\", \"first_name\": \"Catlin\"}', '{\"city\": \"Olongapo City\", \"method\": \"delivery\", \"address\": \"New Cabalan\", \"postal_code\": \"2200\"}', 'stripe', '2117.33', '0.00', '2117.33', '2117.33', 'paid', 'New Cabalan, Olongapo City, 2200', '2026-05-06 23:28:39', '2026-05-06 23:28:39');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(1, 1, 9, 2, '1298.94', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(3, 2, 7, 1, '1607.50', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(4, 2, 27, 2, '1194.65', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(5, 3, 13, 2, '1218.37', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(6, 3, 67, 2, '1518.56', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(7, 3, 71, 2, '1941.61', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(8, 4, 32, 2, '1417.87', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(9, 4, 36, 1, '1605.99', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(10, 4, 74, 2, '1675.84', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(11, 5, 40, 1, '508.00', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(12, 5, 74, 1, '1675.84', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(13, 5, 76, 1, '2190.59', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(14, 6, 14, 1, '866.93', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(15, 6, 29, 2, '982.71', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(16, 7, 20, 1, '861.60', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(17, 7, 35, 1, '1809.48', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(18, 7, 51, 2, '1845.58', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(19, 8, 47, 1, '2212.42', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(21, 9, 75, 1, '937.64', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(22, 10, 59, 1, '1923.36', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(23, 11, 39, 2, '1275.69', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(24, 11, 48, 2, '1361.01', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(25, 12, 9, 2, '1298.94', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(26, 12, 45, 1, '623.66', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(27, 12, 47, 2, '2212.42', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(28, 13, 25, 2, '2247.46', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(29, 13, 38, 1, '2083.93', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(30, 14, 11, 2, '2105.43', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(31, 14, 52, 2, '2224.79', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(32, 14, 59, 1, '1923.36', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(33, 15, 38, 2, '2083.93', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(34, 15, 49, 1, '1535.96', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(35, 16, 28, 2, '1716.91', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(36, 17, 11, 1, '2105.43', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(38, 17, 62, 1, '246.04', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(39, 18, 32, 1, '1417.87', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(40, 18, 48, 1, '1361.01', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(42, 20, 11, 2, '2105.43', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(43, 20, 47, 2, '2212.42', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(45, 21, 51, 2, '1845.58', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(47, 22, 3, 2, '210.04', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(48, 22, 65, 1, '357.94', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(49, 23, 37, 1, '2490.68', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(50, 24, 13, 2, '1218.37', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(51, 24, 61, 1, '621.89', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(52, 25, 13, 1, '1218.37', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(54, 25, 63, 2, '489.07', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(55, 26, 30, 1, '1839.06', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(56, 27, 8, 1, '1371.67', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(57, 27, 12, 2, '2117.33', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(58, 27, 19, 1, '1761.08', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(59, 28, 7, 1, '1607.50', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(60, 28, 52, 2, '2224.79', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(61, 28, 65, 2, '357.94', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(62, 29, 4, 1, '2343.32', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(64, 29, 60, 1, '126.42', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(65, 30, 18, 1, '2270.60', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(66, 30, 24, 1, '992.28', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(67, 30, 70, 2, '490.07', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(68, 31, 28, 1, '1716.91', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(69, 31, 54, 1, '272.00', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(71, 32, 13, 1, '1218.37', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(72, 32, 48, 2, '1361.01', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(73, 32, 50, 1, '2139.38', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(74, 33, 10, 2, '217.11', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(75, 33, 65, 2, '357.94', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(76, 34, 18, 1, '2270.60', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(77, 34, 73, 2, '603.67', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(78, 35, 1, 1, '459.29', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(79, 35, 75, 1, '937.64', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(80, 36, 45, 1, '623.66', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(81, 36, 67, 1, '1518.56', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(82, 36, 73, 1, '603.67', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(83, 37, 34, 2, '2180.95', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(84, 38, 33, 2, '792.26', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(85, 39, 29, 2, '982.71', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(87, 39, 73, 1, '603.67', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(88, 40, 61, 1, '621.89', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(89, 40, 67, 2, '1518.56', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(90, 41, 38, 1, '2083.93', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(91, 41, 44, 2, '1444.77', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(92, 41, 62, 2, '246.04', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(93, 42, 51, 1, '1845.58', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(94, 43, 38, 2, '2083.93', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(95, 43, 55, 1, '229.01', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(96, 44, 22, 2, '422.91', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(97, 44, 46, 2, '1918.53', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(98, 45, 25, 1, '2247.46', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(99, 45, 49, 2, '1535.96', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(102, 46, 45, 1, '623.66', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(103, 46, 76, 2, '2190.59', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(104, 47, 16, 1, '459.64', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(105, 47, 52, 2, '2224.79', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(106, 48, 60, 1, '126.42', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(107, 49, 10, 1, '217.11', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(108, 49, 29, 2, '982.71', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(109, 49, 55, 2, '229.01', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(110, 50, 7, 2, '1607.50', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(111, 50, 35, 1, '1809.48', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(112, 51, 21, 2, '253.41', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(113, 51, 51, 1, '1845.58', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(114, 52, 6, 2, '1962.36', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(115, 52, 13, 1, '1218.37', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(116, 52, 55, 1, '229.01', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(117, 53, 70, 1, '490.07', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(118, 54, 45, 2, '623.66', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(119, 54, 59, 2, '1923.36', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(120, 54, 70, 2, '490.07', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(121, 55, 12, 1, '2117.33', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(122, 55, 28, 1, '1716.91', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(123, 55, 78, 2, '122.48', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(124, 56, 65, 1, '357.94', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(125, 57, 37, 1, '2490.68', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(126, 57, 76, 2, '2190.59', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(127, 58, 34, 2, '2180.95', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(128, 58, 35, 2, '1809.48', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(130, 59, 18, 1, '2270.60', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(131, 59, 44, 2, '1444.77', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(132, 59, 64, 2, '173.70', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(133, 60, 6, 2, '1962.36', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(134, 60, 74, 2, '1675.84', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(135, 61, 6, 1, '1962.36', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(136, 61, 47, 1, '2212.42', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(137, 62, 76, 2, '2190.59', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(139, 64, 32, 2, '1417.87', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(140, 64, 54, 1, '272.00', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(142, 65, 23, 2, '295.39', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(143, 65, 28, 2, '1716.91', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(144, 66, 23, 1, '295.39', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(145, 66, 37, 2, '2490.68', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(146, 66, 39, 1, '1275.69', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(147, 67, 62, 2, '246.04', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(148, 68, 47, 2, '2212.42', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(149, 68, 78, 1, '122.48', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(152, 70, 5, 2, '2303.62', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(154, 70, 21, 2, '253.41', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(155, 71, 51, 1, '1845.58', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(156, 71, 63, 2, '489.07', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(157, 71, 66, 2, '1794.23', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(163, 76, 1, 1, '459.29', '2026-05-06 16:45:24', '2026-05-06 16:45:24'),
(165, 77, 16, 1, '459.64', '2026-05-06 19:16:06', '2026-05-06 19:16:06'),
(168, 78, 1, 1, '459.29', '2026-05-06 20:32:38', '2026-05-06 20:32:38'),
(169, 79, 7, 1, '1607.50', '2026-05-06 20:53:30', '2026-05-06 20:53:30'),
(176, 89, 1, 1, '459.29', '2026-05-06 21:51:41', '2026-05-06 21:51:41'),
(178, 90, 8, 1, '1371.67', '2026-05-06 22:05:33', '2026-05-06 22:05:33'),
(179, 91, 1, 1, '459.29', '2026-05-06 22:07:45', '2026-05-06 22:07:45'),
(180, 92, 12, 1, '2117.33', '2026-05-06 23:28:39', '2026-05-06 23:28:39');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `payment_method` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `payment_method`, `transaction_id`, `amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, 'paypal', 'txn_03ce2d73-0254-4a19-ab31-240e1d773456', '9357.08', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(2, 5, 'stripe', 'txn_3675cebc-56ef-47fb-8342-1d39570c2294', '4374.43', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(3, 6, 'paypal', 'txn_d00e721e-d9a0-4463-8c02-ed6ed6a3f54b', '2832.35', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(4, 8, 'paypal', 'txn_de0dce81-422d-4604-9121-5ac338fc7320', '2212.42', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(5, 10, 'paypal', 'txn_73bf12ca-45c6-4613-9c47-ae6b0dccfaf9', '1923.36', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(6, 11, 'stripe', 'txn_9f126c6d-2eee-48e9-a5eb-5163130f4a0b', '5273.40', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(7, 12, 'stripe', 'txn_18d20199-2aa7-4bcc-a3c6-9591052d01ca', '7646.38', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(8, 13, 'paypal', 'txn_3133b6cb-be8f-4469-99f9-35b302d5db38', '6578.85', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(9, 14, 'paypal', 'txn_750b4897-a821-4e35-a78d-5a48308cc30b', '10583.80', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(10, 15, 'paypal', 'txn_258ab4e4-9c52-4c7e-939b-91ee846126ec', '5703.82', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(11, 16, 'paypal', 'txn_921d00a3-69bf-420b-9144-056884eaaabe', '3433.82', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(12, 17, 'paypal', 'txn_91c35f4d-1bed-45e8-9d6e-39852e5d3fcc', '4738.45', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(13, 21, 'stripe', 'txn_9f10429d-cca4-4ffe-883d-0fb3b66189d1', '7263.58', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(14, 23, 'paypal', 'txn_035b88bd-dfc5-4e66-91ea-1e2e2b9fece7', '2490.68', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(15, 25, 'paypal', 'txn_0a1bf54c-2210-46a4-8cc3-b784e940926b', '3527.52', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(16, 27, 'paypal', 'txn_ed815776-923f-4e9b-86ac-ef258bbe39f0', '7367.41', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(17, 29, 'paypal', 'txn_b1307933-7bb9-4011-a46e-119036d5f944', '3800.75', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(18, 30, 'stripe', 'txn_48064d58-b04a-4528-8d1d-112654c59ad6', '4243.02', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(19, 31, 'stripe', 'txn_ac84576d-e6c9-42fb-954a-e55160124c59', '6762.87', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(20, 32, 'paypal', 'txn_9f14c157-a9f4-40b4-be9d-428e556344b8', '6079.77', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(21, 35, 'stripe', 'txn_2ef4199b-070e-43d5-b8dc-b349848f743f', '1396.93', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(22, 37, 'paypal', 'txn_5703efa7-6a2a-42ec-b8c1-c15c6ce5c847', '4361.90', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(23, 38, 'paypal', 'txn_e8eea12a-4f0d-4aa2-9eb0-9b931730af72', '1584.52', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(24, 39, 'paypal', 'txn_ffd25c93-35b7-4855-acac-672299c0fd77', '7343.05', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(25, 43, 'paypal', 'txn_25a14cd2-84e8-43df-8181-d17131004ed3', '4396.87', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(26, 46, 'stripe', 'txn_9e1d13e7-cfa2-4545-884e-e6ddfd5ff97f', '5990.18', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(27, 47, 'paypal', 'txn_bf208190-b73c-4d0b-9143-45f68f4061d4', '4909.22', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(28, 48, 'stripe', 'txn_2726f5e6-c7e1-4c35-947f-e32ef81ff69d', '126.42', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(29, 49, 'paypal', 'txn_7b4d2dfd-53ff-4598-8a94-f4be5ef7eb67', '2640.55', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(30, 50, 'paypal', 'txn_649b1c56-9573-4954-a314-8dab0622e3ea', '5024.48', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(31, 51, 'stripe', 'txn_aad801c9-c28e-4ca1-84ad-a1c7a93f5378', '2352.40', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(32, 52, 'paypal', 'txn_22341383-c5aa-414d-afbe-44ab46ae8efd', '5372.10', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(33, 53, 'stripe', 'txn_1c223205-46d8-4ae2-a926-2130a7afe7eb', '490.07', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(34, 54, 'paypal', 'txn_f4409437-70af-486a-8508-b2a8b8f584c6', '6074.18', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(35, 55, 'stripe', 'txn_1406f507-da0e-4f01-be82-3876b9c71786', '4079.20', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(36, 56, 'stripe', 'txn_274016cc-6288-4e4b-b30a-72a49efb2cb0', '357.94', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(37, 57, 'paypal', 'txn_350843d3-2ba4-4e0e-b3d8-b493ca639c19', '6871.86', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(38, 58, 'paypal', 'txn_58100b9c-c0aa-43ae-a053-2696548cc752', '9311.87', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(39, 59, 'paypal', 'txn_79a100e1-7ea9-4022-aab1-364064893eb4', '5507.54', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(40, 60, 'paypal', 'txn_30d96124-429a-4452-aa5e-99643c2de44b', '7276.40', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(41, 61, 'stripe', 'txn_43c9611c-c867-494f-9c90-9b3407a74b08', '4174.78', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(42, 62, 'stripe', 'txn_45c42295-0ce6-4d79-b69d-51c4251b657d', '4381.18', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(43, 63, 'stripe', 'txn_99e9859b-e095-47d2-9599-0f1bc886f7f0', '448.51', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(44, 64, 'stripe', 'txn_19105209-07c8-4992-9728-464261b9e98a', '8011.84', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(45, 65, 'paypal', 'txn_f29b62f7-b492-4585-ac60-0449716e9d3a', '4024.60', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(46, 67, 'paypal', 'txn_1489267e-51d6-4d6b-8cc5-9d98e205c5b2', '492.08', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(47, 68, 'stripe', 'txn_ab4bdedb-51f2-4350-896b-95572518e293', '9451.42', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(48, 69, 'stripe', 'txn_5bfa2d02-b016-4bec-8b1a-ce18dde49888', '4904.10', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(49, 71, 'paypal', 'txn_3e4ddf4f-214f-4525-afa6-97484d21ef36', '6412.18', 'completed', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(59, 89, 'stripe', 'pi_3TUKqWCXbPPKAWay1uHLKFx0', '509.29', 'completed', '2026-05-06 21:51:41', '2026-05-06 21:51:41'),
(60, 90, 'cash', 'TXN-69FC2B1C0FECE', '1371.67', 'pending', '2026-05-06 22:03:08', '2026-05-06 22:03:08'),
(61, 91, 'stripe', 'pi_3TUL64CXbPPKAWay0iNIrkNW', '509.29', 'completed', '2026-05-06 22:07:45', '2026-05-06 22:07:45'),
(62, 92, 'stripe', 'pi_3TUMMMCXbPPKAWay0RSpz9V5', '2117.33', 'completed', '2026-05-06 23:28:39', '2026-05-06 23:28:39');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `description`, `price`, `stock`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Pot Rack Rustic', 'pot-rack-rustic-5413', 'Ut ab dolor dolores sint ut. Aliquam fugiat in praesentium enim et est. Ducimus id temporibus cumque mollitia porro autem ullam. Ut voluptas voluptatem quo sint nihil corporis.\n\nEius eveniet ipsam autem cumque vitae officia minus quae. Voluptas vel sit eos voluptas qui. Voluptatum qui ad quod.', '459.29', 97, 3, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(2, 'Bunk Bed Rustic', 'bunk-bed-rustic-1316', 'Quo ratione minima similique in sint. Non accusantium non distinctio quia alias corrupti quia atque. Voluptate esse id autem optio.\n\nImpedit officiis suscipit corrupti magnam. A placeat nihil iste incidunt dicta. Nostrum ea error consequatur sit. Dolor voluptates eos dolor reprehenderit.', '1998.49', 18, 38, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(3, 'Office Chair Ergonomic Minimalist', 'office-chair-ergonomic-minimalist-9114', 'Laudantium numquam ipsum a sit commodi sed libero. Et inventore et qui architecto odit eum. Odio earum qui sint sequi.\n\nAliquam aut minima eveniet inventore eum officiis nostrum. Repudiandae laborum exercitationem mollitia itaque. Voluptas et vitae voluptatibus voluptas. Sint numquam quasi officia quaerat soluta sed.', '210.04', 0, 16, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(4, 'Dining Chairs Set Contemporary', 'dining-chairs-set-contemporary-8435', 'Nulla magni porro aut repudiandae. Impedit iste unde debitis velit facere qui. Quo vel nisi nisi earum ex est. Tempore est sint voluptatibus quos repudiandae.\n\nIncidunt quia quis sit quo laborum quasi sint. Quo sed laboriosam qui dolores sunt laborum dolores. Quidem est tempora quia aut.', '2343.32', 2, 10, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(5, 'Bunk Bed Farmhouse', 'bunk-bed-farmhouse-6996', 'Sint officiis molestiae praesentium placeat. Aut quam sint quia sit officiis. Sapiente sit ea facilis neque voluptatem ut. Facilis aut natus quos recusandae provident ducimus.\n\nAut laboriosam ullam saepe. Porro sunt vel commodi deleniti autem libero error.', '2303.62', 62, 8, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(6, 'Modern Fabric Sofa Minimalist', 'modern-fabric-sofa-minimalist-4633', 'Et quae sequi sint eaque aut rerum illo. Deleniti et similique veniam omnis consequatur et. Autem ut iusto vitae qui ut.\n\nQui et facilis fugit quia cumque. Consequatur aspernatur et aperiam enim et deleniti ea. Est dolor deleniti ex quos illum.', '1962.36', 3, 26, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(7, 'Leather Armchair Scandinavian', 'leather-armchair-scandinavian-7574', 'Quod excepturi eos est ut et. Quis nulla omnis repellat tempora sit blanditiis et.\n\nConsequuntur qui architecto omnis iure voluptatem molestias. Quis quam sed cum non omnis. Non velit architecto unde saepe.', '1607.50', 37, 26, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(8, 'Outdoor Lounge Chair Farmhouse', 'outdoor-lounge-chair-farmhouse-4916', 'Possimus repudiandae accusantium eius sit et aut. Dicta totam inventore nulla est necessitatibus. Eum ducimus delectus mollitia atque possimus quis. Totam dicta ut qui laudantium saepe provident.\n\nNostrum asperiores laborum voluptatibus. Voluptatem id sit aspernatur blanditiis adipisci sed. Vel dolores aut aut est perspiciatis qui amet. Ut necessitatibus aut omnis rem.', '1371.67', 56, 28, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(9, 'Adirondack Chair Minimalist', 'adirondack-chair-minimalist-5430', 'Non sint excepturi hic. Voluptate aliquam qui voluptates. Voluptates eligendi ut tempora aspernatur eligendi est optio asperiores. Magnam libero quisquam sit laudantium nihil.\n\nSit non quaerat animi sit. Necessitatibus aut hic et dolores. Accusamus cupiditate sed aliquam explicabo corrupti iure. Cum vitae ea maxime voluptas maxime quis.', '1298.94', 17, 5, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(10, 'Mirror Frame Farmhouse', 'mirror-frame-farmhouse-3495', 'Veniam nemo deleniti enim quod magni rem suscipit. Quaerat nihil qui exercitationem eos consequatur. Porro nulla consequatur facilis dolore velit esse aut. Cupiditate nobis nobis recusandae porro ex aliquid quia cumque.\n\nQuo et aspernatur et praesentium. Sed laborum deserunt inventore est ipsum. Quaerat et quia et nihil dolor repellat dolor ut. At qui fuga libero quia. Cumque id dolore eveniet aut a.', '217.11', 19, 14, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(11, 'Leather Armchair Industrial', 'leather-armchair-industrial-1105', 'Itaque quam magni ea error. Esse voluptates ullam dolor est velit fugit ipsam. Impedit quidem quia consequatur debitis. Ea cum dolor deserunt ut sit.\n\nEius consequatur saepe qui excepturi. Quia ad natus assumenda corporis.', '2105.43', 15, 30, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(12, 'Pot Rack Traditional', 'pot-rack-traditional-9239', 'Qui omnis blanditiis tenetur accusantium dicta. Quibusdam architecto deleniti aut eius. Reprehenderit dicta earum vitae itaque suscipit. Illo modi qui veniam vitae officiis eum sit. Fuga soluta aut sit ab hic excepturi earum.\n\nIure qui voluptas eos voluptates similique. Sit aut enim natus ea. Quo aut ipsam non placeat natus. Possimus laudantium voluptas minus velit quod dolor at.', '2117.33', 8, 38, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(13, 'Console Table Scandinavian', 'console-table-scandinavian-1305', 'Cupiditate atque sit consequatur pariatur ut. Ad vel tempore rerum dolorum vel. Magni blanditiis dignissimos omnis non blanditiis rerum consequatur odio. Ullam inventore ut voluptatibus quod.\n\nRem tenetur sunt ex aspernatur ut blanditiis sint necessitatibus. Et aut sint voluptas. Recusandae ea dignissimos voluptas. Eligendi at perferendis omnis nemo rerum. Numquam ea non iure.', '1218.37', 72, 24, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(14, 'Storage Ottoman Vintage', 'storage-ottoman-vintage-4178', 'Excepturi earum quia aut expedita rerum et commodi quia. Qui doloribus dicta ipsam. Labore ab soluta sed. Fuga voluptatem vitae culpa et culpa distinctio aperiam nisi.\n\nEum praesentium optio unde non eius ipsam. Ipsam facilis suscipit accusamus et. Fuga sed sed recusandae libero et ea.', '866.93', 36, 38, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(16, 'Bar Stool Farmhouse', 'bar-stool-farmhouse-5320', 'Ut eligendi sunt qui quisquam quidem. In itaque quis nemo facere.\n\nAutem voluptate mollitia sit et quae aliquid cum expedita. Ea non omnis autem sit voluptatibus occaecati quidem. Corporis vero tenetur praesentium consequatur molestias ut voluptate.', '459.64', 50, 3, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(17, 'Desk with Drawers Rustic', 'desk-with-drawers-rustic-5818', 'Reiciendis nobis dolores delectus non. Possimus officia et qui aliquam voluptas. Dolores voluptatum ut iste non doloribus. Rem vitae asperiores ut consequatur.\n\nAb qui corrupti odit. Ex saepe quia nihil ipsum et. Rem fuga iste inventore quia molestias.', '370.83', 56, 29, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(18, 'Outdoor Lounge Chair Rustic', 'outdoor-lounge-chair-rustic-1590', 'Dolore nam voluptatibus ut sed maiores possimus. Distinctio beatae beatae sed qui magni totam et. Quas impedit aspernatur voluptas magni qui corrupti. Et necessitatibus sunt in excepturi facilis qui eum.\n\nEa fugit id ab neque. Alias ea reiciendis accusantium ea deleniti ipsa quod tenetur. Aut aut nulla rem.', '2270.60', 37, 11, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(19, 'Room Divider Industrial', 'room-divider-industrial-3248', 'Amet voluptate quia voluptatem ullam incidunt. Aut esse occaecati et exercitationem fugit deserunt vitae. Doloremque rerum quis delectus occaecati quaerat est.\n\nCumque non excepturi ipsum vero. Minus aperiam labore tempore officiis sed odio et. Quo dolor iure adipisci nihil assumenda. Quis cupiditate dolores dolores.', '1761.08', 27, 3, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(20, 'King Size Bed Frame Traditional', 'king-size-bed-frame-traditional-8944', 'Suscipit et et magnam magni ut sapiente omnis. Asperiores provident beatae ipsa sapiente et. Voluptas quo error ullam cumque molestias qui ex et.\n\nNobis libero qui odit officiis consequatur. Aut est quod est. Similique explicabo quae doloribus molestiae dolore reiciendis. Et non dolorem quos.', '861.60', 21, 9, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(21, 'Dresser Drawers Classic', 'dresser-drawers-classic-1461', 'Distinctio minima magnam vero perspiciatis possimus ut dignissimos ut. Perspiciatis ea est aspernatur cupiditate reiciendis voluptatum expedita. Enim magni quo et illo qui sed. Est vero neque et natus qui repellat quo.\n\nMaiores veritatis ullam aliquid incidunt possimus quis. Necessitatibus ipsam sunt eaque velit reiciendis consequatur ut. Accusamus alias saepe eaque eveniet in itaque vel. Sed est neque autem et in.', '253.41', 82, 35, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(22, 'Dining Bench Farmhouse', 'dining-bench-farmhouse-8316', 'Dolor accusantium dolore laboriosam quam. Eligendi ipsam quo aut tempore. Necessitatibus similique provident dolore repellat sequi eaque modi. Voluptatem voluptatem et necessitatibus maxime et.\n\nQuidem accusantium est assumenda dolorem est. Excepturi quo enim similique laborum distinctio natus. Velit dolores perspiciatis et non dolore. Consequatur et illo ducimus.', '422.91', 23, 21, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(23, 'Adirondack Chair Contemporary', 'adirondack-chair-contemporary', 'Sit aliquam eligendi aut magnam at impedit atque. Dolor eos ut molestiae nostrum.\n\nVoluptatem sit quisquam quis vel atque nulla. Eaque possimus beatae dolorem.', '295.39', 100, 29, '2026-05-05 17:13:57', '2026-05-06 04:38:40'),
(24, 'Oak Dining Table Modern', 'oak-dining-table-modern', 'Adipisci est soluta nihil. Explicabo qui blanditiis consequatur perferendis asperiores error. Voluptas quo et ducimus eveniet. Quae consequatur natus quia ad est eaque.\n\nMaxime dolor aut iusto nihil minus. Sit corporis saepe molestiae sapiente. Temporibus excepturi qui illo quos suscipit enim quis. Reiciendis explicabo voluptatem et quia velit incidunt. Ut delectus non sed eligendi et hic omnis.', '992.28', 61, 32, '2026-05-05 17:13:57', '2026-05-06 04:38:52'),
(25, 'Modern Fabric Sofa Vintage', 'modern-fabric-sofa-vintage', 'Quia deserunt doloribus id optio. Labore tempora eos dignissimos ad tenetur quaerat laborum. Repellat quo et dolores harum culpa quaerat.\n\nVoluptas et nesciunt voluptas. Ducimus reiciendis quis omnis omnis optio. Ut blanditiis omnis reprehenderit qui soluta assumenda omnis.', '2247.46', 81, 21, '2026-05-05 17:13:57', '2026-05-06 04:39:02'),
(26, 'Storage Ottoman Farmhouse', 'storage-ottoman-farmhouse', 'Ut qui nostrum quis. Possimus fugit et et suscipit vel. Corrupti nam nostrum provident. Facilis qui quidem occaecati voluptatem laudantium mollitia. Nihil cumque accusamus illo unde.\n\nEt qui dolorum doloremque pariatur hic maiores. Ea nemo consequuntur sit aut nam nobis. Sunt eos quis in quasi porro aut atque asperiores.', '965.76', 53, 30, '2026-05-05 17:13:57', '2026-05-06 04:39:11'),
(27, 'Modern Fabric Sofa Scandinavian', 'modern-fabric-sofa-scandinavian', 'Saepe sint deserunt voluptates ea. Eius autem autem natus sunt accusantium. Culpa distinctio modi aut praesentium magnam unde aut animi. Vel mollitia accusantium architecto corporis expedita magni. Fugit numquam et eaque molestiae illo odit nisi.\n\nEt vitae repellendus perferendis. Doloremque repellendus ipsam et animi. Non nulla aut earum quia fugit. Impedit vero ullam illum perspiciatis.', '1194.65', 41, 23, '2026-05-05 17:13:57', '2026-05-06 04:39:21'),
(28, 'Oak Dining Table Industrial', 'oak-dining-table-industrial', 'Amet eos iusto quidem nesciunt. Et nihil sint ut consectetur aperiam eum nemo. Deleniti libero nam a et non necessitatibus enim.\n\nAdipisci quis et quae magnam exercitationem deserunt. Tempore quaerat eaque non quia. Facere hic ea quia voluptate quis voluptas illo aut.', '1716.91', 73, 15, '2026-05-05 17:13:57', '2026-05-06 04:39:32'),
(29, 'Modern Fabric Sofa Traditional', 'modern-fabric-sofa-traditional', 'Ipsa eum enim sit dolor necessitatibus. Sunt est voluptatem illo et magni. Dolor officiis et labore earum veniam.\n\nMagnam velit et nesciunt voluptatibus doloremque quas nihil commodi. Omnis perferendis modi neque adipisci illo. Sunt fugit voluptates et vero temporibus sit nostrum. A quas qui voluptates iste fugit adipisci.', '982.71', 20, 2, '2026-05-05 17:13:57', '2026-05-06 04:39:41'),
(30, 'Kitchen Island Traditional', 'kitchen-island-traditional', 'Labore reiciendis nisi omnis quisquam quas ipsa harum. Labore recusandae minima corrupti quo et omnis qui. Inventore dolor eveniet animi tenetur. Iure corporis molestias commodi est et ipsam harum.\n\nLaudantium autem dolore esse. Id deleniti qui aut ab reprehenderit a. Porro sed nemo ut.', '1839.06', 78, 8, '2026-05-05 17:13:57', '2026-05-06 04:39:53'),
(31, 'Bunk Bed Minimalist', 'bunk-bed-minimalist', 'Necessitatibus saepe velit eveniet libero. Repellendus aspernatur magnam consequuntur sed saepe. Distinctio quia aperiam voluptatem quia qui. Numquam qui libero omnis minima voluptates.\n\nEt quo tempora repudiandae perspiciatis aut voluptatibus. Vel dolor a omnis quo aut est molestias. Aut quia quas quia officia omnis ratione.', '2043.16', 8, 22, '2026-05-05 17:13:57', '2026-05-06 04:40:03'),
(32, 'Recliner Chair Vintage', 'recliner-chair-vintage', 'Quia pariatur quasi voluptatem suscipit tempore deleniti est. Unde odit deleniti dolore tempora sit blanditiis. Omnis ut sunt aut neque quis.\n\nUt molestiae in a mollitia. Accusamus fugiat dolores quas doloribus qui. Occaecati aliquam nemo voluptatem autem veritatis ea. Accusantium earum molestiae atque tempora.', '1417.87', 91, 13, '2026-05-05 17:13:57', '2026-05-06 04:40:16'),
(33, 'Dining Bench Classic', 'dining-bench-classic', 'Iste earum saepe incidunt qui laudantium modi illum. Illo est nisi sit omnis tenetur culpa. Et aliquid fugiat corrupti fugiat. Quisquam voluptatem cum perferendis quis.\n\nOfficia quia et laudantium eos voluptas unde. Dolor molestiae dolorem dolores est. Possimus sequi ut voluptatum quia.', '792.26', 14, 9, '2026-05-05 17:13:57', '2026-05-06 04:40:24'),
(34, 'Wardrobe Cabinet Industrial', 'wardrobe-cabinet-industrial', 'Voluptas expedita doloremque error et totam voluptatem qui. Quos rerum consequatur quos quis omnis ea dolorum illo. Non esse aut aspernatur totam esse corrupti ea.\n\nMagni qui velit quod voluptates et sed amet. Qui aut exercitationem nostrum sequi.', '2180.95', 78, 8, '2026-05-05 17:13:57', '2026-05-06 04:40:34'),
(35, 'Mirror Frame Industrial', 'mirror-frame-industrial', 'Asperiores quasi molestiae laudantium sint. Commodi nemo omnis at rerum et blanditiis voluptatibus porro. Explicabo qui debitis eius iure eos.\n\nNon tempora nesciunt praesentium officia. Suscipit unde nostrum laudantium magni non qui. Accusamus aliquid occaecati suscipit neque.', '1809.48', 30, 34, '2026-05-05 17:13:57', '2026-05-06 04:40:42'),
(36, 'Trundle Bed Industrial', 'trundle-bed-industrial', 'Repellat tempore aspernatur qui repudiandae qui. Est dolore officiis explicabo ad corporis est. Quia atque in eos nihil.\n\nCorporis quidem unde perferendis cupiditate voluptatum voluptatum a. Autem ad et vitae alias eveniet sed et. Itaque necessitatibus veritatis saepe sed et. Sit est accusamus voluptas. Voluptas aliquid animi consequatur voluptatem dolorem consequatur.', '1605.99', 80, 5, '2026-05-05 17:13:57', '2026-05-06 04:40:51'),
(37, 'Vanity Cabinet Farmhouse', 'vanity-cabinet-farmhouse', 'Explicabo velit est molestias minus non tempore id. Sed tenetur quos neque alias aspernatur necessitatibus. Voluptatem aut dolorem voluptates voluptatem et at sunt. Laudantium dolor consequatur illo porro et.\n\nSed quod et quae dignissimos. Ut adipisci consequatur odio et corrupti.', '2490.68', 37, 14, '2026-05-05 17:13:57', '2026-05-06 04:40:59'),
(38, 'Kitchen Island Industrial', 'kitchen-island-industrial', 'Eos nesciunt omnis eaque et voluptates nihil. Et aspernatur id eum dolorum ducimus quam et neque. Dolor aut nostrum non iure. Ipsa necessitatibus corporis incidunt.\n\nNon nulla dicta enim. Quibusdam sed id ut corrupti. Id dicta labore quia quod. Deleniti et perspiciatis consequatur non dignissimos laboriosam.', '2083.93', 85, 23, '2026-05-05 17:13:57', '2026-05-06 04:41:08'),
(39, 'Mirror Frame Contemporary', 'mirror-frame-contemporary', 'Consectetur error et est tempora et est laudantium. Voluptas ea consequatur vero est. Provident illum sunt et deleniti sequi quae voluptatem. Repudiandae nostrum aut molestias veritatis in aut.\n\nTotam quia omnis excepturi eligendi ex sit. Omnis occaecati voluptates illo sint dolores vero. Velit nihil et consectetur.', '1275.69', 37, 39, '2026-05-05 17:13:57', '2026-05-06 04:41:15'),
(40, 'Plant Stand Scandinavian', 'plant-stand-scandinavian', 'Dolorum minima provident officiis consectetur dignissimos consectetur ad. Nobis amet numquam quasi corrupti recusandae officia sed. Repellat exercitationem voluptatum fugiat vero voluptate illo cum blanditiis. Ullam ab suscipit animi necessitatibus at ullam voluptatem.\n\nRepellendus commodi assumenda ab consequatur enim. Eligendi optio eaque enim sit nam. Tempore dicta voluptas enim ut. Quidem ab autem commodi alias eum eius rerum.', '508.00', 28, 38, '2026-05-05 17:13:57', '2026-05-06 04:41:24'),
(41, 'Wooden Bookshelf Classic', 'wooden-bookshelf-classic', 'Eos quidem quaerat deserunt fuga vero. Nobis quibusdam incidunt qui magni ut quia. Eum qui expedita harum aliquid maiores nisi delectus. Dolor quos quos praesentium enim eius.\n\nMaiores sed rerum voluptatem dolor natus sint repellat. Harum labore itaque facilis deleniti. Id fuga et earum consectetur.', '2413.87', 9, 11, '2026-05-05 17:13:57', '2026-05-06 04:41:33'),
(44, 'Mirror Frame Classic', 'mirror-frame-classic', 'Est esse iure rerum quo quos est quasi. Debitis et nemo quo optio porro corrupti aperiam non. Expedita eos maxime nesciunt totam itaque tempora. Dolorem consequatur ipsum praesentium omnis occaecati ut.\n\nId consequatur et illo deserunt repellendus neque omnis. Earum omnis quo dolorem laudantium dolor ut. Reprehenderit molestiae omnis voluptatum optio officia. Quisquam dolorem unde excepturi recusandae consequatur autem architecto est. Nostrum sunt quia accusantium dolorum.', '1444.77', 84, 13, '2026-05-05 17:13:57', '2026-05-06 04:41:44'),
(45, 'Garden Patio Set Minimalist', 'garden-patio-set-minimalist', 'Omnis quo consequatur velit hic. Aut facere eum molestiae vel quia. Omnis ut voluptate deleniti temporibus unde qui cupiditate non.\n\nOptio perferendis laborum autem officia blanditiis corporis optio. Est ex in magnam ex eos qui corrupti. Aut vel aliquam delectus incidunt nesciunt repellat ex.', '623.66', 55, 25, '2026-05-05 17:13:57', '2026-05-06 04:41:53'),
(46, 'Vanity Cabinet Traditional', 'vanity-cabinet-traditional', 'Et quis tempora voluptas enim ut impedit. Nihil itaque ut nihil laborum. Aut explicabo molestias ex ullam consequuntur. Eos fugiat est et enim qui eligendi. Provident hic sunt explicabo modi.\n\nNumquam mollitia perferendis dolor sed laborum in consequatur. Voluptatem blanditiis et qui eligendi. Aliquam tenetur cumque perspiciatis similique quia et. Qui omnis accusantium autem autem et placeat fugiat. Ut velit placeat aliquam voluptas commodi aut nostrum.', '1918.53', 42, 2, '2026-05-05 17:13:57', '2026-05-06 04:42:04'),
(47, 'Pot Rack Modern', 'pot-rack-modern', 'Aliquid ab ad nesciunt odio voluptas quia. Recusandae consequatur rerum rerum. Dignissimos tempora pariatur est molestiae qui nemo dolores et.\n\nTotam quod totam ad corporis. Qui omnis consequatur nihil temporibus enim. Magni tenetur sapiente sit et.', '2212.42', 36, 20, '2026-05-05 17:13:57', '2026-05-06 04:42:12'),
(48, 'Sectional Sofa Industrial', 'sectional-sofa-industrial', 'Inventore beatae ut blanditiis vel sed repellat. Aspernatur qui aut placeat pariatur dolorem. Veritatis est doloribus placeat dolorem sed placeat possimus quaerat. Deleniti enim eum et libero hic suscipit quis sit. Quis nobis vitae sapiente et id nobis saepe.\n\nQuasi ab aliquam explicabo. Inventore sapiente debitis unde molestias. Quis sit corrupti voluptas delectus aperiam veniam doloremque reprehenderit. Dignissimos officiis asperiores minima quos ullam.', '1361.01', 12, 29, '2026-05-05 17:13:57', '2026-05-06 04:42:22'),
(49, 'King Size Bed Frame Contemporary', 'king-size-bed-frame-contemporary', 'Placeat aut doloribus consequatur qui. Atque amet adipisci ut excepturi ea eos sapiente enim. Qui esse tempore ullam. Minus minus provident neque eos unde tempore nostrum. Atque vero ut sit explicabo quia dolor modi culpa.\n\nQuod doloremque id dolor. Optio sit dicta voluptas error qui placeat. Ut eos repellendus assumenda.', '1535.96', 93, 4, '2026-05-05 17:13:57', '2026-05-06 04:42:31'),
(50, 'Vanity Cabinet Classic', 'vanity-cabinet-classic', 'Accusantium consequatur sed vel ut beatae dolorem aut. Reiciendis natus dolores quos velit harum perspiciatis. Nihil quia animi corporis.\n\nIusto facilis numquam ex eius. Nam maiores odit est magni excepturi. Occaecati aut illum veritatis ducimus hic sint quis. Perspiciatis nisi id et ea.', '2139.38', 24, 13, '2026-05-05 17:13:57', '2026-05-06 04:42:39'),
(51, 'Dining Chairs Set Traditional', 'dining-chairs-set-traditional', 'Qui dolorum sequi ad. Aut ut cupiditate doloribus maxime suscipit. Dolores dolorem sed placeat ut molestias sed accusamus dolores. Illum aut praesentium recusandae porro dolorem maxime qui eius.\n\nEt repellat omnis consectetur reprehenderit laboriosam quaerat. Sint sed nesciunt ipsa error itaque nam aut ea. Est est magnam enim voluptatem et voluptates. Occaecati iste aut officiis.', '1845.58', 26, 26, '2026-05-05 17:13:57', '2026-05-06 04:42:47'),
(52, 'Bunk Bed Contemporary', 'bunk-bed-contemporary', 'Est laudantium nostrum nihil sed. Dolores aliquam minima dolores tempore maiores. Aut magni laboriosam et at quia atque. Ipsam eos expedita doloribus voluptas quo est illo.\n\nRecusandae non accusamus aspernatur et accusamus voluptates ipsam. Consectetur ut doloremque aperiam omnis deleniti sed iste. Vel dolor aut ipsa sit.', '2224.79', 27, 37, '2026-05-05 17:13:57', '2026-05-06 04:42:55'),
(54, 'King Size Bed Frame Contemporary', 'king-size-bed-frame-contemporary-1499', 'Vel consequatur non vel qui similique. Autem nisi voluptas voluptates et laborum ex dolorem. Dolore dolor consequatur deserunt possimus maxime atque hic.\n\nVeniam ab laudantium est repudiandae unde expedita. Adipisci porro aut ipsa beatae provident eos. At dolor ea facilis aut minima. Aut eveniet dignissimos rerum blanditiis officiis velit.', '272.00', 22, 27, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(55, 'Bar Stool Vintage', 'bar-stool-vintage', 'Molestias non fuga a est debitis unde eum. Et dignissimos voluptatem ut aut modi. Aut libero rem dolorem accusamus. Sequi deleniti minus modi mollitia ducimus.\n\nPerspiciatis ipsam officia aut atque ad culpa. Odio nobis ut velit aut. Velit pariatur ex ut est.', '229.01', 84, 14, '2026-05-05 17:13:57', '2026-05-06 04:43:46'),
(56, 'Wooden Bookshelf Modern', 'wooden-bookshelf-modern', 'Eligendi hic repellat corporis sapiente quasi. Perferendis voluptatem veniam modi eum sed ratione.\n\nEst et cumque autem ut veniam nobis. Sequi mollitia laborum molestiae blanditiis sed. Deleniti ut placeat sed assumenda numquam beatae non. Aliquid voluptatibus provident consequatur.', '1472.34', 59, 13, '2026-05-05 17:13:57', '2026-05-06 04:43:55'),
(57, 'Modern Fabric Sofa Farmhouse', 'modern-fabric-sofa-farmhouse', 'Porro quia id in autem ullam mollitia quisquam. Iure quo beatae aut inventore iste facilis amet. Nemo in necessitatibus repudiandae nulla quas aut sunt. Sunt nobis sint recusandae porro.\n\nNemo voluptate voluptatem officiis autem nisi mollitia. Saepe ducimus eum illo corporis dolorum. Qui voluptate cum odit officiis ut qui. Maiores excepturi quae in error expedita optio.', '2260.80', 59, 12, '2026-05-05 17:13:57', '2026-05-06 04:44:03'),
(59, 'Pot Rack Contemporary', 'pot-rack-contemporary', 'Quas architecto dolorem ducimus explicabo soluta enim minus. Rerum sunt error accusamus repellendus et. Numquam quas modi architecto dolorum voluptatem enim. Aut totam inventore quis dolorem quasi animi rem.\n\nEt pariatur et quos ipsa accusantium aperiam. Praesentium id temporibus qui dolorem qui.', '1923.36', 2, 25, '2026-05-05 17:13:57', '2026-05-06 04:44:14'),
(60, 'Oak Dining Table Contemporary', 'oak-dining-table-contemporary', 'Suscipit impedit tenetur nemo est repellendus tempora impedit. Ad in adipisci quia corrupti quod. Quisquam vel culpa perferendis consequuntur sed tempora pariatur. Temporibus est reprehenderit id aperiam ut.\n\nVoluptas autem repellat veniam magnam minus. Consectetur voluptatibus mollitia ea sequi accusantium est. Magnam quaerat omnis doloribus pariatur cupiditate qui.', '126.42', 68, 29, '2026-05-05 17:13:57', '2026-05-06 04:44:21'),
(61, 'Leather Armchair Classic', 'leather-armchair-classic', 'Delectus dolor cupiditate vel eos molestiae quia. Nostrum assumenda commodi qui pariatur minus labore. Est est occaecati optio qui unde sunt dolores.\n\nAt odit consequatur optio cumque rerum delectus. Enim sint aut vel delectus ducimus laboriosam. Officiis architecto quo nesciunt et explicabo consequuntur. Rem id aspernatur ut qui sunt.', '621.89', 27, 25, '2026-05-05 17:13:57', '2026-05-06 04:44:30'),
(62, 'Coffee Table Set Modern', 'coffee-table-set-modern', 'Labore amet vero quis est distinctio consequuntur. Magni molestias est est eaque voluptates rerum omnis autem. In libero est eaque laudantium odio magni inventore. Id dolor pariatur aliquid sunt.\n\nExpedita voluptatem mollitia occaecati vitae enim. Reprehenderit omnis blanditiis dolore.', '246.04', 8, 27, '2026-05-05 17:13:57', '2026-05-06 04:44:38'),
(63, 'Vanity Cabinet Scandinavian', 'vanity-cabinet-scandinavian', 'Sint ut ipsam quo sapiente. Quos quae sequi nesciunt cumque sed sint ab. Est cumque accusantium cum. Iste rerum dolor quia id ea ut aut.\n\nVel quisquam ullam voluptatum optio itaque. Aut autem ut molestias et voluptas. Repellendus dolorem odio fuga molestiae enim voluptatem.', '489.07', 91, 29, '2026-05-05 17:13:57', '2026-05-06 04:44:47'),
(64, 'Room Divider Minimalist', 'room-divider-minimalist', 'Nostrum veritatis sit sed non quibusdam et earum aut. Ut voluptatem adipisci rem magni ut sed autem. Nisi aliquid et voluptatem et. Ut dolorum quasi magnam quis sint ut.\n\nSit itaque ullam est asperiores inventore cum quibusdam. Repellat et sunt voluptatibus aut quam. Nostrum aspernatur id eum ut soluta. Corrupti eum rerum repellat est expedita consequatur alias.', '173.70', 97, 31, '2026-05-05 17:13:57', '2026-05-06 04:44:54'),
(65, 'Side Table Farmhouse', 'side-table-farmhouse', 'Dicta itaque in animi explicabo. Consequatur id est et reprehenderit vel animi ab. Maxime voluptas nesciunt quo quia iste. Alias esse est quibusdam sint veniam optio est.\n\nFuga est occaecati velit quo sunt autem adipisci est. Nihil rerum nemo est omnis et. Dolorum rerum repudiandae ipsa voluptatem perspiciatis est assumenda cupiditate. Delectus voluptate recusandae quis voluptatum alias ipsa eos. Molestias nisi dolor qui rerum voluptas et eos.', '357.94', 78, 38, '2026-05-05 17:13:57', '2026-05-06 04:45:03'),
(66, 'King Size Bed Frame Classic', 'king-size-bed-frame-classic', 'A esse sit tempore voluptatem dignissimos. Labore voluptates quasi minus. Harum qui tempore et provident ipsam.\n\nOccaecati et dolorem rerum alias. Quia unde similique harum aut. Molestiae sed earum dignissimos magnam magni aliquid. Asperiores distinctio sed voluptates omnis omnis est earum.', '1794.23', 58, 36, '2026-05-05 17:13:57', '2026-05-06 04:45:12'),
(67, 'Office Chair Ergonomic Farmhouse', 'office-chair-ergonomic-farmhouse', 'Aliquam quibusdam omnis est officiis fugit doloribus mollitia. Quibusdam sed porro illo dicta saepe quia. Inventore occaecati sit natus assumenda iste officiis. Aliquam vel qui aliquid quisquam pariatur voluptatem inventore.\n\nEveniet voluptas praesentium qui veritatis dolorem tempore dolorem. Officia deserunt reprehenderit odio perspiciatis quia. Laboriosam necessitatibus officiis necessitatibus ipsa.', '1518.56', 23, 31, '2026-05-05 17:13:57', '2026-05-06 04:45:24'),
(68, 'Pot Rack Classic', 'pot-rack-classic', 'Consequatur dolores doloribus quod et ut omnis sequi. Illum velit omnis earum fugit est labore. Eaque nihil commodi aut at sit in. Dolorem quam asperiores qui voluptatibus eius ut sint.\n\nQuasi voluptates quaerat beatae qui reiciendis iste ut. Voluptatum qui tempora vel dolorem. Autem illum itaque soluta minus qui.', '1453.24', 56, 32, '2026-05-05 17:13:57', '2026-05-06 04:45:34'),
(70, 'Outdoor Lounge Chair Modern', 'outdoor-lounge-chair-modern', 'Eum adipisci quia quos iste tempore id. Aliquam omnis eum officia officia quae suscipit. Voluptatem voluptas nesciunt quam explicabo deleniti. Id vero magni a soluta aliquid quas.\n\nIncidunt cumque aut quia sunt. Animi dolores iste aspernatur vero suscipit aut enim. Eveniet rerum nostrum explicabo repellat vel. Praesentium quae soluta quia amet numquam doloribus.', '490.07', 82, 19, '2026-05-05 17:13:57', '2026-05-06 04:45:41'),
(71, 'King Size Bed Frame Modern', 'king-size-bed-frame-modern', 'Soluta animi et voluptatem deserunt et est. Nostrum incidunt non ipsa quidem.\n\nRem earum voluptatem libero eligendi dolor et sit. Eligendi debitis ipsam blanditiis molestiae fuga voluptatem. Blanditiis totam placeat sit vero ut qui itaque eaque. Qui natus quidem voluptatem consequuntur dolorem assumenda temporibus at.', '1941.61', 23, 25, '2026-05-05 17:13:57', '2026-05-06 04:45:49'),
(72, 'Oak Dining Table Classic', 'oak-dining-table-classic', 'Debitis ipsum autem cumque. Quae ut ut illo vel quasi mollitia nihil. Rerum ut ut nostrum maxime qui temporibus quos.\n\nUt quos et id dicta consectetur fugiat. Nam vero impedit ratione sit unde. Reiciendis qui ut nisi possimus rerum ipsa ut.', '245.39', 89, 22, '2026-05-05 17:13:57', '2026-05-06 04:45:58'),
(73, 'Desk with Drawers Minimalist', 'desk-with-drawers-minimalist', 'Soluta vitae corporis omnis ut incidunt ab exercitationem reiciendis. Totam sunt harum dolores dolor quos repellendus. Enim excepturi minima ducimus sunt impedit.\n\nNon sed est libero repudiandae esse omnis. Illo veritatis voluptas voluptates laborum et adipisci ipsa. Architecto deleniti perferendis alias nihil perferendis. Dolorem quibusdam error velit.', '603.67', 7, 29, '2026-05-05 17:13:57', '2026-05-06 04:46:06'),
(74, 'TV Console Industrial', 'tv-console-industrial', 'Aspernatur et optio aut praesentium et. Ea quia quaerat quidem debitis ipsa minima officiis veniam. Quisquam reiciendis quae dolorum aperiam facilis velit.\n\nTotam illum ut dolores accusamus repudiandae omnis ut. Veniam sint consequatur maiores ipsam in eos veniam. Quia a repudiandae maxime iusto officia eos quia magni. Eum neque ipsum non explicabo tenetur dolore possimus.', '1675.84', 88, 5, '2026-05-05 17:13:57', '2026-05-06 04:46:15'),
(75, 'Outdoor Lounge Chair Traditional', 'outdoor-lounge-chair-traditional', 'Eligendi ut quis voluptates eaque quia. Illum ducimus enim quidem temporibus aut rem. Quaerat consectetur provident rerum similique sint placeat.\n\nMollitia aut magnam veritatis repudiandae asperiores omnis libero nisi. Natus iste quibusdam doloremque officia et sunt. Voluptas fugit qui rerum sunt et odio rerum. Autem error et qui.', '937.64', 70, 15, '2026-05-05 17:13:57', '2026-05-06 04:46:25'),
(76, 'Leather Armchair Farmhouse', 'leather-armchair-farmhouse', 'Iusto quis sit nihil eos dolorum doloremque. Assumenda quam odio iusto nulla corrupti debitis. Non aut recusandae debitis dolorem. At laudantium nihil maxime et in laboriosam.\n\nQuas eius qui quam dolores. Impedit aut quo sit sunt. Qui est pariatur et asperiores quam.', '2190.59', 35, 14, '2026-05-05 17:13:57', '2026-05-06 04:46:32'),
(78, 'Dining Chairs Set Minimalist', 'dining-chairs-set-minimalist', 'Doloremque fuga sunt qui sit aspernatur mollitia. Voluptas voluptates tempore assumenda earum cumque. Aut voluptate voluptatem non fugiat corrupti sunt.\n\nVoluptatem ut cupiditate nihil quis deleniti nihil sint. Laborum impedit sunt sit repudiandae voluptate molestiae quidem. Reprehenderit vel qui ut enim.', '122.48', 80, 2, '2026-05-05 17:13:57', '2026-05-06 04:46:41'),
(79, 'Storage Ottoman Industrial', 'storage-ottoman-industrial', 'Eaque ut rem amet dolor est quisquam id. Qui nulla omnis voluptate quis non sunt quia. Sunt voluptatem non qui culpa. Eveniet est est ipsa nulla quo.\n\nVel deserunt est molestias fuga illum iure voluptatem explicabo. Dolores dolore quae rerum.', '181.21', 35, 35, '2026-05-05 17:13:57', '2026-05-06 04:46:51');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_path`, `created_at`, `updated_at`) VALUES
(1, 1, 'products/06icAkAp8QSjxdQRdTcYiNlHC9Him4DhyuOBo2te.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(2, 1, 'products/0FYtY4m8JCnci9M55qHk5IUzp4bS1mVIbyqB2YKD.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(3, 1, 'products/0idTmFpUZ43hYRbRZNyw1mYm9Tpl029OMQoFZ1TU.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(4, 2, 'products/0shIH6915hPElBGzaxG7eZjI1iKtV6ScXlsMUB35.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(5, 2, 'products/1q9pJ8pIgLO8JX3kwCYJJInMAw1AUyUlb0yFP9Mc.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(6, 2, 'products/22VtZG2rRDXCClFQL4LM2PfBufTM7frMCWtkXGTc.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(7, 2, 'products/29TVV1x5BshSoLoVRZEOKqsRs0RJ7W4pUtDHqwXA.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(8, 3, 'products/2IgLflV8bkHLjTQjX4yp78GWAr8Z58y7O7QDnB41.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(9, 3, 'products/2p1ULvvViJ6Lpg3AZkW4QVmKsldfH8DrBQGmnWo9.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(10, 3, 'products/2rjryZGXg9z3X0NvF6y64eH1yEliiGeMTNmhI4Tl.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(11, 3, 'products/2shJ8RfqMQo8viFbIUD3utce9JUG1njwK1HWTz3n.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(12, 3, 'products/3UoWY1iYuoC9WHxGXgtwpmmOs2OO244xynZp6amA.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(13, 4, 'products/3Z4nlcnIsFabIInUV8b6qx0gkTcU8WeaBjleg32N.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(14, 4, 'products/3i0hhgWCqisqeyDrRnIE6nJWmXPX4vF3TyFR0Hw8.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(15, 4, 'products/5PifOdPewXgXwZEBkaeh7ZN26yBtYEKSoSGLy0LU.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(16, 5, 'products/5jhXFUW8KleW9IE5EctAupCUGQfzuulxmWErdyWD.png', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(17, 5, 'products/9XLkxghCFEPrrYbDRbNoFx7jFw4G3HSgIiWldany.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(18, 5, 'products/9nawDQ6Zb7BgbSlhqWNSwoQFxKMdhHLmsPCDruFl.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(19, 5, 'products/9rwUg5dwAZGUHM6DeKrdm6Gmq94XegRsGpcnsm4p.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(20, 5, 'products/CQGhi8pecD94i7OmZwWmVU4Zp6JFVoGV05NekC5J.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(21, 6, 'products/DSBZHQu3Rtgn5sjQSHeb6dTaskTo3LyF8poRQKlj.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(22, 6, 'products/FE10x2D4ZzWIP9KRquIreRKaxLLWvj4jSPLziMT6.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(23, 6, 'products/FnUWgej67OsvGPPsARxHBALn2CeRgCqXVFOLDOpu.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(24, 7, 'products/FyMUCTsU83ghXo9edrNBuAkr6fec8dxH4Vw6CgRR.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(25, 7, 'products/GaFbVRJ7jdJM4GxAT1TZcZT4zNweJyDWiQpKcU0b.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(26, 7, 'products/HDgneGRpJw7RaS1MR6rABxlXZtfViL9O45ZeSOFQ.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(27, 8, 'products/HMDyGKktfod0XhJI05438xjn9qmUTAM5s3qQXEY5.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(28, 8, 'products/HyBxIETwjwzSHvtgbeVvwTiWh64v9ykrJONSkZrl.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(29, 8, 'products/I6r1NusUG7QGrcEilDoSHL0icCPPTwCw7i6e2hO8.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(30, 9, 'products/IsfzrNcYDLBzDR5AHG2cBvjSO5LfnFyipcfHFXc8.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(31, 9, 'products/Kl5iJGSWY4Q70L1b8u9layuEsLDNQukxkpRj1Hxi.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(32, 9, 'products/KxZsmOAHeDFF4vQdy0T5zXZOp3DfK6R657uBTrrX.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(33, 9, 'products/LF0SGBIkLkXBGJF8IB9ua30t8F0qOR7KTPAsjwwF.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(34, 9, 'products/LLZNaIG1qc0LNJdUB6JkZeNvb8mOxvFTmnzu5AjN.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(35, 10, 'products/MHtrz5rJLIpZScdQfkGxyuiRz0doCF3HaqrF3LQl.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(36, 10, 'products/Mg1FtznISD1peozXFJXgiNXwaRBXoLYVsAcTti4A.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(37, 10, 'products/NOVeKCusZjXEnSN9ttZ6BuadOk6QZZBQj1euHoKF.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(38, 10, 'products/NPUpoBrKt3kREcggojENy2P7ffXL6rZUXo1tEuwX.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(39, 10, 'products/O6cDGlbnCI0Nn7UkUHHw7xhhqUKBLaPzITJy6hYZ.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(40, 11, 'products/OlBfPkZqKf5buAgXcuwR3tDWo0NRS0WFzze3qsCT.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(41, 11, 'products/QZzfFdtxKHNee1BM3iJHiUk8tH6jVjXUHdnzYVlU.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(42, 12, 'products/SKfBzq5Vijw7nMFEJn7LlQbecPrtjzVlIDEJADAh.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(43, 12, 'products/T46qq0JBKxahFZU5k6LdhDWMrGTHf71Cu6C9XEWv.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(44, 12, 'products/TJqKgdEVSDcceqk6dcjmjuyZOelnmw1WjxGlN42w.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(45, 12, 'products/TdGGg4SwU4RamBSxyXPhvLLoOzuFDLZE64vB4T5w.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(46, 13, 'products/TjU2RiCa2BxYFSIQl2DcYBm1V9zeW4LndVXetbJf.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(47, 13, 'products/VNVryfbbN8TCVoF3fhuz9seUxQBfZ1GCdDIuWlNX.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(48, 13, 'products/VakXfVMhx3diRzVb6RuIrxzXyPARqtV3ms0utDEp.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(49, 13, 'products/Y8i4s0l488buQV65he6HW3bnahF8fjX5w3IZJZ4I.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(50, 14, 'products/YIdurhGVXP32nGtqOLU9gnZENvzBQuS2XcmDFYuI.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(51, 14, 'products/cQGtk0jbcko1rUsyW9Ryn0Nqxo1KJSo8pYkrvuTl.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(56, 16, 'products/g4465PMbLBURraZdPVZajITy6LoSZ08BB7GaK0a5.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(57, 16, 'products/gYLYdCiMZPzud969VtFvOoe0fOYyCvn1eJrZhEx9.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(58, 16, 'products/hac47tZdKw4ve86FbSacn2JZzKxvL2YBdiLh4bNZ.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(59, 17, 'products/kE6Dv3vcWcZZZ4t58Imimu8diwYfS7lxxvzTnHhs.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(60, 17, 'products/m2V30NLN4h7dv7CdgG0M1rQ8QeBVh6FLr11ZYenK.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(61, 17, 'products/n1VXiWRpzZiQqobHqA3mht9iKgURKyN2OayvtM9q.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(62, 18, 'products/n6a4WBO2X0UdtW7NqfFdGarMOGvmTRdcYYs0Tev3.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(63, 18, 'products/nNbIgFYWsc39sqOd9P15Q3UljYSwmKjYgYkI4vUT.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(64, 18, 'products/owCLWBSGkFbhRIe5W1fCkTD44dFNJ8qBAVbW2mMo.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(65, 18, 'products/owNUemSmUSnIYikscbgMNMizr1m1AVC86DRPRD4e.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(66, 18, 'products/oyzOjZwzCDXBOzppetP5zH2WEkpjvqgjSOpa3Eq3.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(67, 19, 'products/pObHrNaAXhHx69MdwVx1sT3vW35wAKF3IHokcD21.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(68, 19, 'products/qsGjyZhyyQD5sTlt9tCDMLyjqIBQL5ZGc7r8wGBP.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(69, 19, 'products/rYp1WbRC2AyZbFukMEIiuKuVhS7sbFy3LPQeM7vj.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(70, 20, 'products/sap233gttXS4C1Jg6ymaeWE31C0XOfcI9lL3FfWf.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(71, 20, 'products/sqwsqfor1C4JybRlUIR1nxZNhZi5XNum1XXVa4DQ.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(72, 20, 'products/veJm9Nbc4GjU2ttFrN8QtycdN2b6S8FZ4vyvaoKO.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(73, 20, 'products/wYmGiWF9I2OfgEi1JPXemjJTw4pN7S71p2JgzYF3.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(74, 21, 'products/wkz2UD8zIzYlScbIM70vQqe26ZcoJ2TykfGMPMlD.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(75, 21, 'products/xJuLC054FyC5fDisRMUpgiDlqkDbpbA2stcPDe9r.webp', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(76, 22, 'products/xhXmHTzpUKXlokZJAHHxT8HCvKkyVRVXaUUGgudW.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(77, 22, 'products/yTmhD8ej7UcBPfJJq4lLoVVMO5ZZmYxpBbzNbU5Q.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59'),
(78, 22, 'products/z9J6X8ZkBubDUtRA8SYC9P3JA1FnWcDOhSs7MoHj.jpg', '2026-05-05 17:13:57', '2026-05-05 17:13:59');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`, `updated_at`) VALUES
(1, 10, 1, 4, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(2, 26, 1, 4, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(3, 3, 2, 4, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(4, 9, 2, 5, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(5, 13, 2, 3, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(6, 15, 2, 3, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(7, 1, 3, 5, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(8, 3, 3, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(9, 5, 3, 5, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(10, 7, 3, 5, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(11, 6, 4, 4, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(12, 10, 4, 3, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(13, 16, 4, 3, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(14, 18, 4, 4, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(15, 12, 5, 3, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(16, 26, 5, 5, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(17, 1, 6, 4, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-06 18:57:05'),
(18, 3, 6, 3, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(19, 28, 6, 5, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(20, 6, 7, 5, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(21, 19, 7, 4, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(22, 2, 8, 3, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(23, 10, 8, 5, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(24, 24, 8, 5, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(25, 11, 9, 4, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(26, 12, 9, 5, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(27, 17, 9, 4, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(28, 6, 10, 4, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(29, 18, 10, 5, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(30, 27, 10, 5, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(31, 2, 12, 5, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(32, 8, 12, 4, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(33, 10, 12, 5, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(34, 12, 12, 4, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(35, 13, 13, 5, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(36, 15, 13, 5, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(42, 4, 16, 3, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(43, 26, 16, 5, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(44, 27, 16, 5, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(45, 7, 17, 4, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(46, 2, 18, 4, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(47, 13, 18, 4, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(48, 18, 18, 4, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(49, 8, 19, 5, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(50, 12, 19, 3, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(51, 23, 19, 3, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(52, 27, 19, 3, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(53, 4, 21, 5, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(54, 8, 21, 4, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(55, 14, 21, 4, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(56, 4, 22, 5, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(57, 17, 22, 4, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(58, 21, 22, 3, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(59, 27, 22, 3, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(60, 29, 22, 3, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(61, 2, 23, 5, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(62, 20, 23, 3, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(63, 30, 23, 5, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(64, 11, 24, 4, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(65, 21, 24, 5, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(66, 8, 26, 4, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(67, 14, 26, 4, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(68, 25, 26, 3, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(69, 26, 26, 4, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(70, 2, 28, 4, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(71, 9, 28, 5, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(72, 25, 28, 5, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(74, 10, 30, 5, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(75, 15, 30, 3, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(76, 24, 30, 5, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(77, 7, 31, 5, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(78, 24, 31, 5, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(79, 2, 32, 4, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(80, 7, 32, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(81, 11, 32, 5, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(82, 14, 32, 3, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(83, 21, 32, 3, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(84, 4, 33, 5, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(85, 7, 33, 5, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(86, 8, 33, 3, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(87, 11, 33, 4, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(88, 16, 33, 5, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(90, 8, 34, 4, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(91, 12, 34, 3, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(92, 23, 34, 4, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(93, 2, 36, 5, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(94, 8, 37, 3, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(95, 28, 37, 5, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(97, 8, 38, 5, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(98, 30, 38, 3, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(99, 2, 39, 4, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(100, 9, 39, 4, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(101, 11, 39, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(102, 6, 40, 3, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(103, 8, 40, 4, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(104, 15, 40, 5, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(105, 4, 41, 3, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(106, 17, 41, 3, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(109, 4, 44, 5, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(110, 11, 44, 3, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(111, 15, 44, 5, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(112, 26, 44, 4, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(113, 27, 44, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(114, 2, 46, 5, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(115, 4, 46, 4, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(116, 11, 46, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(117, 14, 46, 5, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(118, 26, 46, 5, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(119, 19, 47, 3, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(120, 2, 48, 5, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(121, 14, 49, 4, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(122, 25, 50, 3, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(123, 2, 51, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(124, 15, 51, 4, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(125, 22, 51, 3, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(126, 27, 51, 3, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(127, 21, 52, 5, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(128, 2, 54, 4, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(129, 4, 54, 4, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(130, 15, 54, 5, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(131, 28, 54, 4, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(132, 13, 55, 5, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(133, 14, 55, 3, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(134, 25, 55, 3, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(135, 28, 55, 5, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(136, 8, 56, 4, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(139, 2, 59, 4, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(140, 10, 59, 5, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(141, 27, 59, 5, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(142, 13, 60, 4, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(143, 16, 60, 4, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(144, 20, 60, 5, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(145, 22, 60, 5, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(146, 6, 61, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(147, 28, 61, 4, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(149, 28, 62, 4, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(150, 7, 64, 4, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(151, 16, 64, 4, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(152, 4, 65, 5, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(153, 19, 65, 5, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(154, 25, 65, 4, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(155, 26, 65, 5, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(156, 9, 66, 3, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(157, 18, 66, 4, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(158, 19, 66, 5, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(159, 20, 66, 5, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(160, 2, 67, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(161, 16, 67, 3, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(162, 23, 67, 3, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(163, 29, 67, 3, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(164, 21, 68, 3, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(166, 6, 70, 5, 'Better than expected!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(167, 10, 70, 3, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(168, 22, 70, 4, 'Very satisfied.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(169, 23, 70, 3, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(170, 12, 71, 5, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(171, 14, 71, 5, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(172, 16, 71, 5, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(173, 25, 71, 4, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(174, 29, 71, 5, 'Exactly as pictured.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(175, 17, 72, 4, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(176, 26, 72, 5, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(177, 28, 72, 4, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(178, 3, 74, 3, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(179, 4, 74, 3, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(180, 7, 74, 5, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(181, 20, 74, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(182, 28, 74, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(183, 17, 76, 4, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(184, 18, 76, 5, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(185, 30, 76, 3, 'Great quality and comfortable!', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(191, 11, 78, 3, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(192, 12, 78, 4, 'Highly recommend.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(193, 16, 78, 4, 'Perfect fit for our home.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(194, 30, 78, 4, 'Good value for money.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(195, 3, 79, 3, 'Assembly was easy.', '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(196, 7, 79, 3, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(197, 16, 79, 3, NULL, '2026-05-05 17:13:57', '2026-05-05 17:13:57'),
(198, 1, 13, 2, 'poor product', '2026-05-06 19:06:48', '2026-05-06 19:06:48'),
(199, 32, 1, 4, 'Great product', '2026-05-06 20:33:03', '2026-05-06 20:33:26'),
(200, 33, 1, 4, 'Greate product', '2026-05-06 22:12:05', '2026-05-06 22:12:05');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1qS2TNYDdqsGonEmVAO4hScwdERctfk0T6XmpfVn', 31, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ5a3BZVnR2T1N3REZVWE9FU2psNDBDVmp2YW1sQXBVRWZpV051RVdJIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJ1cmwiOltdLCJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI6MzEsIl9wcmV2aW91cyI6eyJ1cmwiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYWRtaW5cL2Rhc2hib2FyZCIsInJvdXRlIjoiYWRtaW4uZGFzaGJvYXJkIn19', 1778140527),
('Lj3cJgc4lbodh6tQxlALezF2AKViesQA4Hwmg6hA', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJvNUM2Mk5MZHpxd3ZJYTJjcnFSQ3J1UWhIbVNNMUdkSVVCcU9ETlp4IiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1778139017),
('mO41lsJZaPnVfQ1hZhXdc4uMBbfYvaUgtzOC0v89', 1, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 OPR/130.0.0.0', 'eyJfdG9rZW4iOiJOTTlYdzhJQjdmeUFYUHEycHBXenhVY2NBVUY2N0NNUFI2ZlFTZkpNIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJfcHJldmlvdXMiOnsidXJsIjoiaHR0cDpcL1wvMTI3LjAuMC4xOjgwMDAiLCJyb3V0ZSI6ImhvbWUifSwidXJsIjpbXSwibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiOjF9', 1778135636);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `group`, `value`, `created_at`, `updated_at`) VALUES
(3, 'stripe_webhook_secret', 'payment', NULL, NULL, '2026-05-06 23:26:31'),
(4, 'stripe_status', 'payment', 'active', NULL, '2026-05-06 23:26:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','customer') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Demarco Farrell', 'marlin.bartell@example.net', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'ZCBTEdwspenMzRlhVOKcaQEMPkxCL72GgYIxbgvuSMkSXxgEKDQv5A3dwHVT', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(2, 'Dr. Bobby Dietrich II', 'korbin.haley@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'ixftyi1p22', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(3, 'Leanna Cormier', 'schimmel.stone@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'EMfX10I1m2', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(4, 'Maegan Price', 'keon33@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'Rb6LIDMGSY', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(5, 'Ms. Macie Sauer', 'hamill.felipa@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'yl9be7GLIu', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(6, 'Dr. Alvena Armstrong DVM', 'hermiston.rahsaan@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'fkQQc3JQm4', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(7, 'Damien Beatty', 'anna81@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'CXw6LhmK4h', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(8, 'Lori Bradtke', 'vhettinger@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'X8cA2C94wS', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(9, 'Carli Kerluke', 'padberg.clint@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'wkSAvBveTc', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(10, 'Rita Tremblay', 'keara.schinner@example.net', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'ZAsS8Xccbj', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(11, 'Dewayne Koch I', 'esta.emard@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'NHX2ZeCDh0', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(12, 'Lauryn Hill I', 'mayer.brody@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'GTFaww9u9T', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(13, 'Dr. Serena Erdman IV', 'breanne87@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'KHggIr5VSg', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(14, 'Gabriel Moen DVM', 'mbraun@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'v7qjlTUSDc', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(15, 'Dr. Jaiden Miller PhD', 'bauch.kane@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'ZsL07Ma63T', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(16, 'Dr. Sheila Rowe', 'orie08@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', '0mF6q9VjUH', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(17, 'Sanford Beier', 'louie45@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'GxfXqfSK0h', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(18, 'Kimberly Hamill', 'anabel42@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'Oz7awGKWSH', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(19, 'Torey Carter', 'harris.ally@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'PrYG1VBDme', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(20, 'Aaliyah Hammes', 'herzog.cornelius@example.net', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'Gzx7lZmJJO', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(21, 'Boyd Ernser', 'littel.emilia@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'xu5O2HcT1J', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(22, 'Stewart Runte', 'prosacco.mervin@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'Sr7pD0OK1V', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(23, 'Darion Beer', 'purdy.anderson@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'rcZhSJZOub', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(24, 'Josiah Lowe', 'fredy.cartwright@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'UcHngN4toT', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(25, 'Loy Adams DVM', 'wrohan@example.net', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'Psn0UQ40J3', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(26, 'Dr. Earnest Kemmer I', 'marquardt.chadd@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'Ulh0FzWKoR', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(27, 'Dr. Opal Hudson I', 'walsh.cydney@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'wJpBbLz947', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(28, 'Pearlie Howe', 'arippin@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'hPh6s6ghjm', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(29, 'Wilton Smitham', 'candace.gaylord@example.org', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'RlOSIoE6PI', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(30, 'Miss Clarissa Mayer', 'karolann.roob@example.com', '2026-05-05 17:13:56', '$2y$12$yFq9A65QCeLzQT4/uFChq.VCtjSSVRYmMsUYb78bZCmbc5Z5WvZ6m', NULL, NULL, NULL, 'customer', 'Q7RtgSpjrV', '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(31, 'Admin User', 'admin@furnitureshop.com', NULL, '$2y$12$j20GSGYcLyiMnvXTyZ0Sweek6rduGX5TyNb7PwAtYkBkuz2kt6KQO', NULL, NULL, NULL, 'admin', NULL, '2026-05-05 17:13:56', '2026-05-05 17:13:56'),
(32, 'Clydey Ednalan', 'clydey@gmail.com', NULL, '$2y$12$YKv9DXdF5XF8p842WDc7P.nhF7PQZwYBnN9SUNZz8uFA.IbvGQbSy', NULL, NULL, NULL, 'customer', NULL, '2026-05-06 20:27:09', '2026-05-06 20:27:09'),
(33, 'Catlin Ednalan', 'catlin@gmail.com', NULL, '$2y$12$xV0DHNgc7DMeu3/5wUMzOuXhCaCjVRAn80fuLakydMB6Gmz8nvvZq', NULL, NULL, NULL, 'customer', NULL, '2026-05-06 22:01:33', '2026-05-06 22:01:33');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `user_id`, `product_id`, `created_at`, `updated_at`) VALUES
(106, 1, 1, '2026-05-06 18:44:33', '2026-05-06 18:44:33'),
(107, 1, 16, '2026-05-06 18:48:47', '2026-05-06 18:48:47'),
(108, 32, 1, '2026-05-06 20:27:40', '2026-05-06 20:27:40'),
(109, 32, 2, '2026-05-06 20:28:06', '2026-05-06 20:28:06'),
(110, 33, 2, '2026-05-06 22:05:45', '2026-05-06 22:05:45'),
(111, 33, 12, '2026-05-06 22:06:31', '2026-05-06 22:06:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_cart_id_foreign` (`cart_id`),
  ADD KEY `cart_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_order_id_foreign` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_product_id_foreign` (`product_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`),
  ADD KEY `reviews_product_id_foreign` (`product_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wishlists_user_id_foreign` (`user_id`),
  ADD KEY `wishlists_product_id_foreign` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlists_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
