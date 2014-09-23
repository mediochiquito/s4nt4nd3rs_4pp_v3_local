<?
include dirname(__FILE__) . '/_init.php';


if(isset($_POST['desactivar'])){

	mysql_query("UPDATE push SET push_activa=0 WHERE push_token='" . $_POST['token'] . "'");

}else{

	$rs = @mysql_query("INSERT INTO push SET push_token='".$_POST['token']."',  
										 push_platform='".$_POST['plataform']."', 
										 push_fecha_hora_creado=NOW(),
										 push_activa=1");
	if(!$rs) {
		
		mysql_query("UPDATE push SET push_activa=1 WHERE push_token='" . $_POST['token'] . "'");
		
	}
	
}

if($no_return_set) echo '';
else echo '1';
