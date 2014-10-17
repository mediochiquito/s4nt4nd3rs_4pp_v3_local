<?
include dirname(__FILE__) . '/_init.php';
	
echo '<root>';


	$rs_ofertas = mysql_query('SELECT * FROM ofertas ORDER BY ofertas_id ASC');
	echo '<ofertas><![CDATA[';
	$rows_ofertas = array();
	while($row_ofertas =  mysql_fetch_assoc($rs_ofertas)){
		 $rows_ofertas[] = $row_ofertas;
	}
	echo json_encode($rows_ofertas);
	echo ']]></ofertas>';


	$rs_locales = mysql_query('SELECT * FROM locales ORDER BY locales_id ASC');
	echo '<locales><![CDATA[';
	$rows_locales = array();
	while($row_locales =  mysql_fetch_assoc($rs_locales)){
		 $rows_locales[] = $row_locales;
	}
	echo json_encode($rows_locales);
	echo ']]></locales>';


	$rs_eventos = mysql_query('SELECT * FROM eventos_v3 WHERE eventos_estado=1 ORDER BY eventos_id ASC');
	echo '<eventos><![CDATA[';
	$rows_eventos = array();
	while($row_eventos =  mysql_fetch_assoc($rs_eventos)){
		 $rows_eventos[] = $row_eventos;
	}
	echo json_encode($rows_eventos);
	echo ']]></eventos>';


	$rs_datetime_eventos = mysql_query('SELECT * FROM datetime_eventos WHERE datetime_eventos_estado=1 ORDER BY datetime_eventos_id ASC');
	echo '<datetime_eventos><![CDATA[';
	$rows_datetime_eventos = array();
	while($row_datetime_eventos =  mysql_fetch_assoc($rs_datetime_eventos)){
		 $rows_datetime_eventos[] = $row_datetime_eventos;
	}
	echo json_encode($rows_datetime_eventos);
	echo ']]></datetime_eventos>';

?>


</root>