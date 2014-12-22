<?
include dirname(__FILE__) . '/_init.php';

$rs_eventos = mysql_query('SELECT MAX(eventos_sync_value) as sync_value FROM eventos_v3 LIMIT 1');
$row_eventos = mysql_fetch_object($rs_eventos);
$max_sync_eventos =  strtotime($row_eventos->sync_value);

$rs_ofertas = mysql_query('SELECT MAX(ofertas_sync_value) as sync_value FROM ofertas LIMIT 1');
$row_ofertas = mysql_fetch_object($rs_ofertas);
$max_sync_ofertas =  strtotime($row_ofertas->sync_value);

$rs_locales = mysql_query('SELECT MAX(locales_sync_value) as sync_value FROM locales LIMIT 1');
$row_locales = mysql_fetch_object($rs_locales);
$max_sync_locales =  strtotime($row_locales->sync_value);


$rs_datetime_eventos = mysql_query('SELECT MAX(datetime_eventos_sync_value) as sync_value FROM datetime_eventos LIMIT 1');
$row_datetime_eventos = mysql_fetch_object($rs_datetime_eventos);
$max_sync_datetime_eventos =  strtotime($row_datetime_eventos->sync_value);


$sync_value = $max_sync_eventos;
if($max_sync_ofertas > $sync_value) $sync_value = $max_sync_ofertas;
if($max_sync_locales > $sync_value) $sync_value = $max_sync_locales;
if($max_sync_datetime_eventos > $sync_value) $sync_value = $max_sync_datetime_eventos;

echo $sync_value; 


?>