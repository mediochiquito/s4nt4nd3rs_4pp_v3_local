<?
include dirname(__FILE__) . '/void.set_push_token.php';

$rs = mysql_query("SELECT push_id FROM push WHERE push_token='".$_POST['token']."' LIMIT 1");

$row=mysql_fetch_object($rs);

$id_push = $row->push_id;

mysql_query("DELETE FROM push_deptos WHERE push_deptos_push_id='$id_push';");

foreach ($_POST['o'] as $key => $value) {
	
	if($value['e']=='true'){

		mysql_query("INSERT INTO push_deptos SET 
													push_deptos_push_id='$id_push', 
													push_deptos_type='eventos',
													push_deptos_departamentos_id='".($key+1)."', 
													push_deptos_fecha_hora=NOW() 
													");

	}
	
	if($value['o']=='true'){

		mysql_query("INSERT INTO push_deptos SET 
													push_deptos_push_id='$id_push', 
													push_deptos_type='ofertas',
													push_deptos_departamentos_id='".($key+1)."', 
													push_deptos_fecha_hora=NOW() 
													");

	}


}


die('|1');
