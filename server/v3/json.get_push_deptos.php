<?
$no_return_set = true;
include dirname(__FILE__) . '/void.set_push_token.php';

$rs = mysql_query("SELECT push_id FROM push WHERE push_token='".$_POST['token']."' LIMIT 1");
$row=mysql_fetch_object($rs);
$id_push = $row->push_id;


$rs = mysql_query("SELECT * FROM push_deptos WHERE push_deptos_push_id='$id_push';");

while($row = mysql_fetch_object($rs)){

	$r[] = $row;

}

echo json_encode($r);
