<?php

/////////////////////////////////////////////////////////
//////                                             //////
//////                CRUDO MEDIA                  //////
//////           CRD FRAMEWORK APP v1.2            //////
//////                 27/08/2012                  //////
//////                                             //////
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//////             CONFIGURACION APP               //////
/////////////////////////////////////////////////////////

// path inclusion IMGs, JSs, SWFs, etc.
$_PUBLIC_SOURCE = "http://repository.crudo.com.uy/1.2";

// path inclusion PHPs, etc.
$_PRIVATE_SOURCE = "../repository/1.2/";

// test?
$_TEST = true;

// lang
$_DEFAULT_LANG = "es-ES";

// título
$_SITE_TITLE = "Santander Descuentos y Eventos";

// keywords por defecto
$_DEFAULT_KEYWORDS = "";

// template por defecto
$_DEFAULT_TMP = "default.php";

// path de instalacion
$_DEFAULT_DIR = "";

// directorio secciones
$_SECTION_DIR = "_app/sections/";

// excepciones HTML
$_HTML_EXCEPTIONS_INCLUDE = array(
	"_app/includes/Events/Events.php",
	"_app/includes/Discounts/Discounts.php",
	"_app/includes/Banners/Banners.php"
);
$_HTML_EXCEPTIONS = array(
	array(
		"headers",
		"/^files\/images\/headers\/[0-9]+/",
		"Events::headerImages"
	),
	array(
		"banners",
		"/^files\/images\/banners\/[0-9]+/",
		"Banners::bannerImages"
	)
);

/////////////////////////////////////////////////////////
//////                 START APP                   //////
/////////////////////////////////////////////////////////

include_once "{$_PRIVATE_SOURCE}_app/includes/appStart.php";

?>