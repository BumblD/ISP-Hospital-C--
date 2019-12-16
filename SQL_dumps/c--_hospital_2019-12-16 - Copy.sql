-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2019 at 06:20 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c--_hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `asmenine_info`
--

CREATE TABLE `asmenine_info` (
  `asmens_kodas` decimal(20,0) NOT NULL,
  `vardas` varchar(255) NOT NULL,
  `pavarde` varchar(255) NOT NULL,
  `gimimo_data` date NOT NULL,
  `telefonas` varchar(255) DEFAULT NULL,
  `lytis` int(11) NOT NULL,
  `fk_VARTOTOJO_INFOid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `asmenine_info`
--

INSERT INTO `asmenine_info` (`asmens_kodas`, `vardas`, `pavarde`, `gimimo_data`, `telefonas`, `lytis`, `fk_VARTOTOJO_INFOid`) VALUES
('31111111111', 'Petras', 'Petrauskas', '1911-11-11', NULL, 1, 1),
('31211111111', 'Povilas', 'Povilaitis', '1912-11-11', NULL, 1, 2),
('31311111111', 'Simas', 'Simauskas', '1913-11-11', NULL, 1, 3),
('31411111111', 'Mykolas', 'Mykolauskas', '1914-11-11', NULL, 1, 4),
('31511111111', 'Kristina', 'Kristiniauskaite', '1915-11-11', NULL, 2, 5),
('31611111111', 'Loreta', 'Loretauskaite', '1916-11-11', NULL, 2, 6),
('31711111111', 'Mindaugas', 'Mindauskas', '1917-11-11', NULL, 1, 7),
('31811111111', 'Deividas', 'Deividauskas', '1918-11-11', NULL, 1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `gydytojai`
--

CREATE TABLE `gydytojai` (
  `id` int(11) NOT NULL,
  `laipsnis` varchar(255) DEFAULT NULL,
  `specializacija` int(11) NOT NULL,
  `fk_PERSONALO_DARBUOTOJAStabelio_numeris` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gydytojai`
--

INSERT INTO `gydytojai` (`id`, `laipsnis`, `specializacija`, `fk_PERSONALO_DARBUOTOJAStabelio_numeris`) VALUES
(3, NULL, 1, 1112),
(4, NULL, 1, 1113);

-- --------------------------------------------------------

--
-- Table structure for table `gydytojo_tipas`
--

CREATE TABLE `gydytojo_tipas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gydytojo_tipas`
--

INSERT INTO `gydytojo_tipas` (`id`, `name`) VALUES
(1, 'bendra'),
(2, 'oftolmologas'),
(3, 'lor'),
(4, 'traumatologas'),
(5, 'chirurgas'),
(6, 'kardiologas'),
(7, 'infektologas'),
(8, 'dermatologas'),
(9, 'odontologas');

-- --------------------------------------------------------

--
-- Table structure for table `israsytos_proceduros`
--

CREATE TABLE `israsytos_proceduros` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `kiekis` int(11) NOT NULL,
  `komentaras` varchar(255) DEFAULT NULL,
  `procedura` int(11) NOT NULL,
  `fk_GYDYTOJASid` int(11) NOT NULL,
  `fk_PATALPAnr` int(11) NOT NULL,
  `fk_PACIENTASid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `israsytos_proceduros`
--

INSERT INTO `israsytos_proceduros` (`id`, `data`, `kiekis`, `komentaras`, `procedura`, `fk_GYDYTOJASid`, `fk_PATALPAnr`, `fk_PACIENTASid`) VALUES
(1, '2019-11-11', 5, NULL, 1, 3, 101, 1),
(2, '2019-11-12', 10, NULL, 2, 3, 102, 1),
(3, '2019-11-13', 7, NULL, 1, 3, 101, 2),
(4, '2019-11-14', 3, NULL, 2, 4, 102, 3);

-- --------------------------------------------------------

--
-- Table structure for table `kraujo_grupe`
--

CREATE TABLE `kraujo_grupe` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kraujo_grupe`
--

INSERT INTO `kraujo_grupe` (`id`, `name`) VALUES
(1, '0'),
(2, 'A'),
(3, 'B'),
(4, 'AB');

-- --------------------------------------------------------

--
-- Table structure for table `lyties_tipas`
--

CREATE TABLE `lyties_tipas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `lyties_tipas`
--

INSERT INTO `lyties_tipas` (`id`, `name`) VALUES
(1, 'vyras'),
(2, 'moteris');

-- --------------------------------------------------------

--
-- Table structure for table `pacientai`
--

CREATE TABLE `pacientai` (
  `id` int(11) NOT NULL,
  `ugis` double DEFAULT NULL,
  `mase` double DEFAULT NULL,
  `kraujo_grupe` int(11) DEFAULT NULL,
  `rezus` tinyint(1) DEFAULT NULL,
  `fk_GYDYTOJASid` int(11) DEFAULT NULL,
  `fk_ASMENINE_INFOasmens_kodas` decimal(20,0) NOT NULL,
  `fk_PATALPAid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pacientai`
--

INSERT INTO `pacientai` (`id`, `ugis`, `mase`, `kraujo_grupe`, `rezus`, `fk_GYDYTOJASid`, `fk_ASMENINE_INFOasmens_kodas`, `fk_PATALPAid`) VALUES
(1, NULL, NULL, NULL, NULL, 3, '31111111111', NULL),
(2, NULL, NULL, NULL, NULL, 3, '31211111111', 104),
(3, NULL, NULL, NULL, NULL, 4, '31311111111', 104);

-- --------------------------------------------------------

--
-- Table structure for table `patalpos`
--

CREATE TABLE `patalpos` (
  `nr` int(11) NOT NULL,
  `plotas` double DEFAULT NULL,
  `vietu_sk` int(11) DEFAULT NULL,
  `tipas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patalpos`
--

INSERT INTO `patalpos` (`nr`, `plotas`, `vietu_sk`, `tipas`) VALUES
(101, 20, 1, 3),
(102, 1, 1, 3),
(103, 2, 2, 3),
(104, 3, 2, 3),
(123, 1, 5, 2),
(132, 132, 22, 2),
(1111, 11, 55, 1);

-- --------------------------------------------------------

--
-- Table structure for table `patalpos_tipas`
--

CREATE TABLE `patalpos_tipas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patalpos_tipas`
--

INSERT INTO `patalpos_tipas` (`id`, `name`) VALUES
(1, 'palata'),
(2, 'kabinetas'),
(3, 'laboratorija');

-- --------------------------------------------------------

--
-- Table structure for table `personalo_darbuotojai`
--

CREATE TABLE `personalo_darbuotojai` (
  `tabelio_numeris` int(11) NOT NULL,
  `fk_PATALPAnr` int(11) DEFAULT NULL,
  `fk_ASMENINE_INFOasmens_kodas` decimal(20,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `personalo_darbuotojai`
--

INSERT INTO `personalo_darbuotojai` (`tabelio_numeris`, `fk_PATALPAnr`, `fk_ASMENINE_INFOasmens_kodas`) VALUES
(1111, NULL, '31811111111'),
(1112, 132, '31511111111'),
(1113, NULL, '31611111111'),
(1114, NULL, '31711111111');

-- --------------------------------------------------------

--
-- Table structure for table `proceduros_tipas`
--

CREATE TABLE `proceduros_tipas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `patalpa_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `proceduros_tipas`
--

INSERT INTO `proceduros_tipas` (`id`, `name`, `patalpa_id`) VALUES
(1, 'masazas', '111;'),
(2, 'sildymas', '103;');

-- --------------------------------------------------------

--
-- Table structure for table `receptai`
--

CREATE TABLE `receptai` (
  `id` int(11) NOT NULL,
  `israsymo_data` date NOT NULL,
  `laikotarpis_d` int(11) NOT NULL,
  `doze_d` int(11) NOT NULL,
  `komentaras` varchar(255) DEFAULT NULL,
  `nuolaida` int(11) DEFAULT NULL,
  `fk_GYDYTOJASid` int(11) NOT NULL,
  `fk_VAISTASid` int(11) NOT NULL,
  `fk_PACIENTASid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `receptai`
--

INSERT INTO `receptai` (`id`, `israsymo_data`, `laikotarpis_d`, `doze_d`, `komentaras`, `nuolaida`, `fk_GYDYTOJASid`, `fk_VAISTASid`, `fk_PACIENTASid`) VALUES
(1, '2019-12-01', 10, 3, NULL, NULL, 3, 2, 1),
(2, '2019-12-02', 14, 2, NULL, NULL, 3, 4, 2),
(3, '2019-12-03', 5, 4, NULL, NULL, 4, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `rodikliai`
--

CREATE TABLE `rodikliai` (
  `id` int(11) NOT NULL,
  `pavadinimas` varchar(255) NOT NULL,
  `min` double DEFAULT NULL,
  `max` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rodikliai`
--

INSERT INTO `rodikliai` (`id`, `pavadinimas`, `min`, `max`) VALUES
(1, 'Hemoglobinas', 100, 200),
(2, 'Cukrus', 50, 90),
(3, 'Apimtis', 10, 15);

-- --------------------------------------------------------

--
-- Table structure for table `siuntimai`
--

CREATE TABLE `siuntimai` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `komentaras` varchar(255) DEFAULT NULL,
  `specialistas` int(11) NOT NULL,
  `fk_PACIENTASid` int(11) NOT NULL,
  `fk_GYDYTOJASid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `siuntimai`
--

INSERT INTO `siuntimai` (`id`, `data`, `komentaras`, `specialistas`, `fk_PACIENTASid`, `fk_GYDYTOJASid`) VALUES
(1, '2019-10-01', NULL, 5, 2, 3),
(2, '2019-10-02', NULL, 8, 1, 3),
(3, '2019-10-03', NULL, 7, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `tyrimai`
--

CREATE TABLE `tyrimai` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `komentaras` varchar(255) DEFAULT NULL,
  `tipas` int(11) NOT NULL,
  `fk_PACIENTASid` int(11) NOT NULL,
  `fk_GYDYTOJASid` int(11) NOT NULL,
  `fk_PATALPAnr` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tyrimai`
--

INSERT INTO `tyrimai` (`id`, `data`, `komentaras`, `tipas`, `fk_PACIENTASid`, `fk_GYDYTOJASid`, `fk_PATALPAnr`) VALUES
(1, '2019-09-01', NULL, 2, 1, 3, 103),
(2, '2019-09-02', NULL, 2, 2, 3, 103),
(3, '2019-09-03', NULL, 1, 2, 3, 104),
(4, '2019-09-04', NULL, 1, 3, 4, 104);

-- --------------------------------------------------------

--
-- Table structure for table `tyrimo_tipas`
--

CREATE TABLE `tyrimo_tipas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tyrimo_tipas`
--

INSERT INTO `tyrimo_tipas` (`id`, `name`) VALUES
(1, 'Sirdies echoskopija'),
(2, 'Bendrasis kraujo');

-- --------------------------------------------------------

--
-- Table structure for table `tyrimu_rezultatai`
--

CREATE TABLE `tyrimu_rezultatai` (
  `rodmuo` double NOT NULL,
  `komentaras` varchar(255) DEFAULT NULL,
  `fk_TYRIMASid_TYRIMAS` int(11) NOT NULL,
  `fk_RODIKLISid_RODIKLIS` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tyrimu_rezultatai`
--

INSERT INTO `tyrimu_rezultatai` (`rodmuo`, `komentaras`, `fk_TYRIMASid_TYRIMAS`, `fk_RODIKLISid_RODIKLIS`) VALUES
(150, NULL, 1, 1),
(40, NULL, 1, 2),
(90, NULL, 2, 1),
(70, NULL, 2, 2),
(17, NULL, 3, 3),
(13, NULL, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `vaistai`
--

CREATE TABLE `vaistai` (
  `id` int(11) NOT NULL,
  `pavadinimas` varchar(255) NOT NULL,
  `veiklioji_medziaga` varchar(255) NOT NULL,
  `stiprumas` varchar(255) NOT NULL,
  `aprasymas` varchar(255) NOT NULL,
  `receptinis` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vaistai`
--

INSERT INTO `vaistai` (`id`, `pavadinimas`, `veiklioji_medziaga`, `stiprumas`, `aprasymas`, `receptinis`) VALUES
(2, 'Pertusinas', 'Ciobrelis', '100 mg', 'Malsina kosuli', 0),
(3, 'Ibuprofenas', 'Ibuprofenas', '500 mg', 'Slopina skausma, malsina uzdegima', 0),
(4, 'Ospamoksas', 'Penicilinas', '400', 'Malsina bakterini uzdegima', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vartotojo_info`
--

CREATE TABLE `vartotojo_info` (
  `id` int(11) NOT NULL,
  `el_pastas` varchar(255) NOT NULL,
  `slaptazodis` varchar(255) NOT NULL,
  `tipas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vartotojo_info`
--

INSERT INTO `vartotojo_info` (`id`, `el_pastas`, `slaptazodis`, `tipas`) VALUES
(1, 'petras@gmail.com', 'password', 4),
(2, 'povilas@gmail.com', 'password', 4),
(3, 'simas@gmail.com', 'password', 4),
(4, 'admin@ligonine.lt', 'password', 1),
(5, 'kristina@ligonine.lt', 'password', 2),
(6, 'loreta@ligonine.lt', 'password', 2),
(7, 'mindaugas@ligonine.lt', 'password', 3),
(8, 'deividas@ligonine.lt', 'password', 3);

-- --------------------------------------------------------

--
-- Table structure for table `vartotojo_tipas`
--

CREATE TABLE `vartotojo_tipas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vartotojo_tipas`
--

INSERT INTO `vartotojo_tipas` (`id`, `name`) VALUES
(1, 'administratorius'),
(2, 'gydytojas'),
(3, 'laborantas'),
(4, 'pacientas');

-- --------------------------------------------------------

--
-- Table structure for table `vizitai`
--

CREATE TABLE `vizitai` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `laikas_val` int(11) NOT NULL,
  `laikas_min` int(11) NOT NULL,
  `nusiskundimas` varchar(255) DEFAULT NULL,
  `patvirtinimas` tinyint(1) NOT NULL,
  `fk_GYDYTOJASid` int(11) NOT NULL,
  `fk_PACIENTASid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vizitai`
--

INSERT INTO `vizitai` (`id`, `data`, `laikas_val`, `laikas_min`, `nusiskundimas`, `patvirtinimas`, `fk_GYDYTOJASid`, `fk_PACIENTASid`) VALUES
(1, '2020-01-01', 9, 15, NULL, 0, 3, 1),
(2, '2020-01-01', 9, 30, NULL, 1, 3, 2),
(3, '2020-01-02', 10, 45, NULL, 0, 4, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asmenine_info`
--
ALTER TABLE `asmenine_info`
  ADD PRIMARY KEY (`asmens_kodas`),
  ADD UNIQUE KEY `fk_VARTOTOJO_INFOid` (`fk_VARTOTOJO_INFOid`),
  ADD KEY `lytis` (`lytis`);

--
-- Indexes for table `gydytojai`
--
ALTER TABLE `gydytojai`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fk_PERSONALO_DARBUOTOJAStabelio_numeris` (`fk_PERSONALO_DARBUOTOJAStabelio_numeris`),
  ADD KEY `specializacija` (`specializacija`);

--
-- Indexes for table `gydytojo_tipas`
--
ALTER TABLE `gydytojo_tipas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `israsytos_proceduros`
--
ALTER TABLE `israsytos_proceduros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `procedura` (`procedura`),
  ADD KEY `skiria_p` (`fk_GYDYTOJASid`),
  ADD KEY `atlieka_p` (`fk_PATALPAnr`),
  ADD KEY `naudoja_p` (`fk_PACIENTASid`);

--
-- Indexes for table `kraujo_grupe`
--
ALTER TABLE `kraujo_grupe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lyties_tipas`
--
ALTER TABLE `lyties_tipas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pacientai`
--
ALTER TABLE `pacientai`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fk_ASMENINE_INFOasmens_kodas` (`fk_ASMENINE_INFOasmens_kodas`),
  ADD KEY `kraujo_grupe` (`kraujo_grupe`),
  ADD KEY `rupinasi` (`fk_GYDYTOJASid`),
  ADD KEY `pacientai_patalpos` (`fk_PATALPAid`);

--
-- Indexes for table `patalpos`
--
ALTER TABLE `patalpos`
  ADD PRIMARY KEY (`nr`),
  ADD KEY `tipas` (`tipas`);

--
-- Indexes for table `patalpos_tipas`
--
ALTER TABLE `patalpos_tipas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personalo_darbuotojai`
--
ALTER TABLE `personalo_darbuotojai`
  ADD PRIMARY KEY (`tabelio_numeris`),
  ADD UNIQUE KEY `fk_ASMENINE_INFOasmens_kodas` (`fk_ASMENINE_INFOasmens_kodas`),
  ADD KEY `skiriama_d` (`fk_PATALPAnr`);

--
-- Indexes for table `proceduros_tipas`
--
ALTER TABLE `proceduros_tipas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `receptai`
--
ALTER TABLE `receptai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `israso_r` (`fk_GYDYTOJASid`),
  ADD KEY `parduodamas_pagal` (`fk_VAISTASid`),
  ADD KEY `naudoja_r` (`fk_PACIENTASid`);

--
-- Indexes for table `rodikliai`
--
ALTER TABLE `rodikliai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `siuntimai`
--
ALTER TABLE `siuntimai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `specialistas` (`specialistas`),
  ADD KEY `naudoja_s` (`fk_PACIENTASid`),
  ADD KEY `israso_s` (`fk_GYDYTOJASid`);

--
-- Indexes for table `tyrimai`
--
ALTER TABLE `tyrimai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipas` (`tipas`),
  ADD KEY `naudoja_t` (`fk_PACIENTASid`),
  ADD KEY `skiria_t` (`fk_GYDYTOJASid`),
  ADD KEY `atlieka_t` (`fk_PATALPAnr`);

--
-- Indexes for table `tyrimo_tipas`
--
ALTER TABLE `tyrimo_tipas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tyrimu_rezultatai`
--
ALTER TABLE `tyrimu_rezultatai`
  ADD PRIMARY KEY (`fk_TYRIMASid_TYRIMAS`,`fk_RODIKLISid_RODIKLIS`),
  ADD KEY `vertina` (`fk_RODIKLISid_RODIKLIS`);

--
-- Indexes for table `vaistai`
--
ALTER TABLE `vaistai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vartotojo_info`
--
ALTER TABLE `vartotojo_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipas` (`tipas`);

--
-- Indexes for table `vartotojo_tipas`
--
ALTER TABLE `vartotojo_tipas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vizitai`
--
ALTER TABLE `vizitai`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tvirtina` (`fk_GYDYTOJASid`),
  ADD KEY `registruoja` (`fk_PACIENTASid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gydytojai`
--
ALTER TABLE `gydytojai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `israsytos_proceduros`
--
ALTER TABLE `israsytos_proceduros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pacientai`
--
ALTER TABLE `pacientai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `patalpos`
--
ALTER TABLE `patalpos`
  MODIFY `nr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1112;

--
-- AUTO_INCREMENT for table `personalo_darbuotojai`
--
ALTER TABLE `personalo_darbuotojai`
  MODIFY `tabelio_numeris` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1115;

--
-- AUTO_INCREMENT for table `proceduros_tipas`
--
ALTER TABLE `proceduros_tipas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `receptai`
--
ALTER TABLE `receptai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rodikliai`
--
ALTER TABLE `rodikliai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `siuntimai`
--
ALTER TABLE `siuntimai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tyrimai`
--
ALTER TABLE `tyrimai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vaistai`
--
ALTER TABLE `vaistai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vartotojo_info`
--
ALTER TABLE `vartotojo_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vizitai`
--
ALTER TABLE `vizitai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `asmenine_info`
--
ALTER TABLE `asmenine_info`
  ADD CONSTRAINT `asmenine_info_ibfk_1` FOREIGN KEY (`lytis`) REFERENCES `lyties_tipas` (`id`),
  ADD CONSTRAINT `suteikia_prieiga_prie` FOREIGN KEY (`fk_VARTOTOJO_INFOid`) REFERENCES `vartotojo_info` (`id`);

--
-- Constraints for table `pacientai`
--
ALTER TABLE `pacientai`
  ADD CONSTRAINT `pacientai_patalpos` FOREIGN KEY (`fk_PATALPAid`) REFERENCES `patalpos` (`nr`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
