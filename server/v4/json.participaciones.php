<?
include dirname(__FILE__) . '/_init.php';
$id_evento = $_POST['id_evento'];
$rs = mysql_query('SELECT * FROM participaciones WHERE participaciones_eventos_id="' . $id_evento . '" ORDER BY participaciones_id DESC');

        

        $rows = array();
        while($row =  mysql_fetch_assoc($rs)){
                 $rows[] = $row;
        }
        echo json_encode($rows);
 ?>

