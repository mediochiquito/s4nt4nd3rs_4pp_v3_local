<?
include dirname(__FILE__) . '/_init.php';
$id_evento = $_POST['id_evento'];
$uid = $_POST['uid'];
$rs = mysql_query('INSERT INTO participaciones SET participaciones_eventos_id="' . $id_evento . '", 
												   participaciones_uid="' . $uid . '",
												   participaciones_fecha_hora = NOW()
												   ');

if($rs) die('1');
else die('Ya estás participando de este evento');
 ?>

