-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Servidor: localhost:8889
-- Tiempo de generación: 29-12-2014 a las 22:48:03
-- Versión del servidor: 5.5.38
-- Versión de PHP: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `santanders`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promos`
--

CREATE TABLE `promos` (
`promos_id` smallint(5) unsigned NOT NULL,
  `promos_img` int(11) NOT NULL,
  `promos_lugar` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `promos_desctipcion` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `promos_vigencia_ini` date NOT NULL,
  `promos_vigencia_fin` date NOT NULL,
  `promos_condiciones` text COLLATE utf8_unicode_ci NOT NULL,
  `promos_activa` tinyint(1) NOT NULL,
  `promos_fecha_hora_crado` datetime NOT NULL,
  `promos_departamentos_id` tinyint(2) unsigned NOT NULL,
  `promos_header_img` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `promos`
--

INSERT INTO `promos` (`promos_id`, `promos_img`, `promos_lugar`, `promos_desctipcion`, `promos_vigencia_ini`, `promos_vigencia_fin`, `promos_condiciones`, `promos_activa`, `promos_fecha_hora_crado`, `promos_departamentos_id`, `promos_header_img`) VALUES
(1, 0, 'casa 1', 'sada ds d  dsad aasd sa dsad', '2014-12-22', '2014-12-31', 'sada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsad', 1, '0000-00-00 00:00:00', 9, ''),
(2, 0, 'casa 2', 'sada ds d  dsad aasd sa dsad', '2014-12-15', '2014-12-31', 'sada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsad', 1, '0000-00-00 00:00:00', 9, ''),
(3, 0, 'casa 3', 'En Farmashop, te llevás 2  cremas y presentando tu código, la segunda es gratis!', '2014-12-01', '2014-12-16', 'sada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsad', 1, '0000-00-00 00:00:00', 9, 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xaf1/v/t1.0-9/35907_10150852108982897_183499466_n.jpg?oh=b22185f20ef4ab573e0fe19027ad98bd&oe=553BDF99&__gda__=1425847624_587b2e68a7f06e0c75f4016d71f51c69'),
(4, 0, 'casa 4', 'sada ds d  dsad aasd sa dsad', '2014-12-22', '2014-12-31', 'sada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsad', 1, '0000-00-00 00:00:00', 9, ''),
(5, 0, 'casa 5', 'sada ds d  dsad aasd sa dsad', '2014-12-30', '2014-12-31', 'sada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsadsada ds d  dsad aasd sa dsad', 1, '0000-00-00 00:00:00', 9, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promos_code`
--

CREATE TABLE `promos_code` (
`promos_code_id` smallint(5) unsigned NOT NULL,
  `promos_code_uid` bigint(20) unsigned NOT NULL,
  `promos_code_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `promos_code_fecha_usado` datetime NOT NULL,
  `promos_code_fecha_creado` datetime NOT NULL,
  `promos_code_promos_id` smallint(5) unsigned NOT NULL,
  `promos_code_post_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `promos_code`
--

INSERT INTO `promos_code` (`promos_code_id`, `promos_code_uid`, `promos_code_code`, `promos_code_fecha_usado`, `promos_code_fecha_creado`, `promos_code_promos_id`, `promos_code_post_id`) VALUES
(1, 0, '7B0DSW26', '0000-00-00 00:00:00', '2014-12-29 19:23:57', 2, 'asdasdsa_asdsadsad_1111'),
(2, 0, 'LFM0DEI9', '0000-00-00 00:00:00', '2014-12-29 19:27:42', 4, 'asdasdsa_asdsadsad_1111'),
(3, 0, 'T3U8SKDY', '0000-00-00 00:00:00', '2014-12-29 19:29:38', 1, 'asdasdsa_asdsadsad_1111'),
(4, 0, 'DY2EN60V', '0000-00-00 00:00:00', '2014-12-29 19:29:50', 5, 'asdasdsa_asdsadsad_1111'),
(5, 1, 'Z9MHZEKW', '0000-00-00 00:00:00', '2014-12-29 19:30:09', 2, 'asdasdsa_asdsadsad_1111');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promos_locales`
--

CREATE TABLE `promos_locales` (
`promos_locales` smallint(5) unsigned NOT NULL,
  `promos_locales_localidad` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `promos_locales_tel` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `promos_locales_dir` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `promos_locales_lat` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `promos_locales_lon` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `promos_locales_creado` datetime NOT NULL,
  `promos_locales_promos_id` smallint(5) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `promos_locales`
--

INSERT INTO `promos_locales` (`promos_locales`, `promos_locales_localidad`, `promos_locales_tel`, `promos_locales_dir`, `promos_locales_lat`, `promos_locales_lon`, `promos_locales_creado`, `promos_locales_promos_id`) VALUES
(1, 'Prado', '324234234 234', 'Rafoo 124123', '-34.342432', '58.324234', '0000-00-00 00:00:00', 2),
(2, 'Prado 21', '324234234 234', 'Rafoo 124123', '-34.834237', '-56.027554', '0000-00-00 00:00:00', 2),
(3, 'Prado 31', '34324 234', 'Ra33 oo 124123', '-36.342432', '58.324234', '0000-00-00 00:00:00', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `promos`
--
ALTER TABLE `promos`
 ADD PRIMARY KEY (`promos_id`), ADD KEY `promos_departamentos_id` (`promos_departamentos_id`);

--
-- Indices de la tabla `promos_code`
--
ALTER TABLE `promos_code`
 ADD PRIMARY KEY (`promos_code_id`), ADD UNIQUE KEY `promos_code_code` (`promos_code_code`), ADD UNIQUE KEY `promos_code_uid` (`promos_code_uid`,`promos_code_promos_id`), ADD KEY `promos_code_promos_id` (`promos_code_promos_id`);

--
-- Indices de la tabla `promos_locales`
--
ALTER TABLE `promos_locales`
 ADD PRIMARY KEY (`promos_locales`), ADD KEY `promos_locales_promo_id` (`promos_locales_promos_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `promos`
--
ALTER TABLE `promos`
MODIFY `promos_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `promos_code`
--
ALTER TABLE `promos_code`
MODIFY `promos_code_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `promos_locales`
--
ALTER TABLE `promos_locales`
MODIFY `promos_locales` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `promos`
--
ALTER TABLE `promos`
ADD CONSTRAINT `promos_ibfk_1` FOREIGN KEY (`promos_departamentos_id`) REFERENCES `departamentos` (`departamentos_id`);

--
-- Filtros para la tabla `promos_code`
--
ALTER TABLE `promos_code`
ADD CONSTRAINT `promos_code_ibfk_1` FOREIGN KEY (`promos_code_promos_id`) REFERENCES `promos` (`promos_id`);

--
-- Filtros para la tabla `promos_locales`
--
ALTER TABLE `promos_locales`
ADD CONSTRAINT `promos_locales_ibfk_1` FOREIGN KEY (`promos_locales_promos_id`) REFERENCES `promos` (`promos_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
