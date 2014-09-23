<?
include dirname(__FILE__) . '/_init.php';
$sync_value = $_GET['sync_value'];	
echo '<root>';
	
	echo "<!-- " .  date('Y-m-d H:i:s', ($sync_value)) . "  -->";
	
	
	echo '<sync_datetime_eventos>';

		$rs_datetime_eventos_del = mysql_query('SELECT datetime_eventos_id FROM datetime_eventos WHERE datetime_eventos_estado = -1 AND datetime_eventos_sync_value>"' . date('Y-m-d H:i:s', ($sync_value)) . '" ORDER BY datetime_eventos_id ASC LIMIT 100;');
		$rows_datetime_eventos_del = array();
		while($row_datetime_eventos_del =  mysql_fetch_object($rs_datetime_eventos_del)){
			array_push($rows_datetime_eventos_del, $row_datetime_eventos_del->datetime_eventos_id);
		}
		echo '<del><![CDATA[' . implode(',' , $rows_datetime_eventos_del) . ']]></del>';

		echo '<data><![CDATA[';
		$rs_datetime_eventos = mysql_query('SELECT * FROM datetime_eventos WHERE  datetime_eventos_estado = 1 AND datetime_eventos_sync_value>"' . date('Y-m-d H:i:s', ($sync_value)) . '" ORDER BY datetime_eventos_id ASC');
		$rows_datetime_eventos = array();
		while($row_datetime_eventos =  mysql_fetch_assoc($rs_datetime_eventos)){
			$rows_datetime_eventos[] = $row_datetime_eventos;
		}	
		echo json_encode($rows_datetime_eventos);
		echo ']]></data>';

	echo '</sync_datetime_eventos>';




	echo '<sync_eventos>';
		$rs_eventos_del = mysql_query('SELECT eventos_id FROM eventos_v3 WHERE eventos_estado = -1 AND eventos_sync_value>"' . date('Y-m-d H:i:s', ($sync_value)) . '" ORDER BY eventos_id ASC LIMIT 100;');
		$rows_eventos_del = array();
		while($row_eventos_del =  mysql_fetch_object($rs_eventos_del)){
			array_push($rows_eventos_del, $row_eventos_del->eventos_id);
		}
		echo '<del><![CDATA[' . implode(',' , $rows_eventos_del) . ']]></del>';

		echo '<data><![CDATA[';
		$rs_eventos = mysql_query('SELECT * FROM eventos_v3 WHERE eventos_estado = 1 AND eventos_sync_value>"' . date('Y-m-d H:i:s', ($sync_value)) . '" ORDER BY eventos_id ASC');
		$rows_eventos = array();
		while($row_eventos =  mysql_fetch_assoc($rs_eventos)){
			$rows_eventos[] = $row_eventos;
		}	
		echo json_encode($rows_eventos);
		echo ']]></data>';
	echo '</sync_eventos>';




	echo '<sync_ofertas>';
		$rs_ofertas_del = mysql_query('SELECT ofertas_id FROM ofertas WHERE ofertas_estado = -1 AND ofertas_sync_value>"' . date('Y-m-d H:i:s', ($sync_value)) . '" ORDER BY ofertas_id ASC');
		$rows_ofertas_del = array();
		while($row_ofertas_del =  mysql_fetch_object($rs_ofertas_del)){
			array_push($rows_ofertas_del, $row_ofertas_del->ofertas_id);
		}
		echo '<del><![CDATA[' . implode(',' , $rows_ofertas_del) . ']]></del>';

		echo '<data><![CDATA[';
		$rs_ofertas = mysql_query('SELECT * FROM ofertas WHERE ofertas_estado = 1 AND ofertas_sync_value>"' . date('Y-m-d H:i:s', ($sync_value)) . '" ORDER BY ofertas_id ASC');
		$rows_ofertas = array();
		while($row_ofertas =  mysql_fetch_assoc($rs_ofertas)){
			 $rows_ofertas[] = $row_ofertas;
		}
		echo json_encode($rows_ofertas);
		echo ']]></data>';
	echo '</sync_ofertas>';




	echo '<sync_locales>';
		$rs_locales_del = mysql_query('SELECT locales_id FROM locales WHERE locales_estado = -1 AND locales_sync_value>"' . date('Y-m-d H:i:s', ($sync_value)) . '" ORDER BY locales_id ASC');
		$rows_locales_del = array();
		while($row_locales_del =  mysql_fetch_object($rs_locales_del)){
			array_push($rows_locales_del, $row_locales_del->locales_id);
		}
		echo '<del><![CDATA[' . implode(',' , $rows_locales_del) . ']]></del>';

		echo '<data><![CDATA[';
		$rs_locales = mysql_query('SELECT * FROM locales WHERE locales_estado = 1 AND locales_sync_value>"' . date('Y-m-d H:i:s', ($sync_value)) . '" ORDER BY locales_id ASC');
		$rows_locales = array();
		while($row_locales =  mysql_fetch_assoc($rs_locales)){
			 $rows_locales[] = $row_locales;
		}
		echo json_encode($rows_locales);
		echo ']]></data>';
	echo '</sync_locales>';







echo '</root>';




?>
