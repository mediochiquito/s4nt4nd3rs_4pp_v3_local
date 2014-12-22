<?
include dirname(__FILE__) . '/_init.php';
$rs = mysql_query('SELECT banners_ofertas_terms FROM banners_ofertas WHERE banners_ofertas_id="'.$_GET["id"].'" LIMIT 1');
$row = mysql_fetch_object($rs);
echo $row->banners_ofertas_terms;
