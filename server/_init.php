<?php
	ob_start("ob_gzhandler");
	ignore_user_abort ( true );
	error_reporting( E_ALL ^ E_NOTICE);

	if($_SERVER['HTTP_HOST'] == '127.0.0.1' || $_SERVER['HTTP_HOST'] == '192.168.0.2' || $_SERVER['HTTP_HOST'] == 'localhost') 	
	{
		define("DB_HOST", "localhost");
		define("DB_USER", "root");
		define("DB_PASS", "");
		define("DB_NAME", "santanders");
		
	}else if($_SERVER['HTTP_HOST'] == '192.168.235.140:8888'){

		define("DB_HOST", "localhost:8888");
		define("DB_USER", "root");
		define("DB_PASS", "root");
		define("DB_NAME", "santanders");
		
	}else if($_SERVER['HTTP_HOST'] == 'dev.santander.crudo.com.uy'){
		
		define("DB_HOST", "localhost");
		define("DB_USER", "herna_mateo_dev");
		define("DB_PASS", "vespa.1");
		define("DB_NAME", "hernan_dev_santander");

	}else{

		define("DB_HOST", "localhost");
		define("DB_USER", "herna_mooto_prod");
		define("DB_PASS", "vespa");
		define("DB_NAME", "hernan_santander");
		
	}

    
//DATE
	if(function_exists("date_default_timezone_set") and function_exists("date_default_timezone_get"))
    	@date_default_timezone_set(@date_default_timezone_get());

//SQL

	$conexion_mysql = mysql_connect( DB_HOST, DB_USER, DB_PASS) or die('Could not connect to mysql server. ' . mysql_error() );
	mysql_select_db(DB_NAME) or die('Could not select database.' . DB_NAME);
	mysql_query("SET NAMES utf8");
