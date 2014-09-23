<?
include dirname(__FILE__) . '/_init.php';

$rs = mysql_query('SELECT banners_ofertas_id,banners_ofertas_url FROM banners_ofertas WHERE banners_ofertas_estado=1 ORDER BY banners_ofertas_id DESC LIMIT 1');
$row = mysql_fetch_object($rs);
echo json_encode($row);
