<?
include dirname(__FILE__) . '/_init.php';
$sync_value = $_GET['sync_value'];

$metodo =  mysql_real_escape_string($_GET['method']);

switch($metodo){


	case 'get_list_promos':

			$rs_pomos = mysql_query('SELECT promos_locales_promos_id as id, promos_lugar as lugar, promos_locales_departamentos_id as depto  FROM promos_locales 
									 INNER JOIN promos ON promos_locales_promos_id=promos_id  
									 WHERE promos_activa = 1 AND   
								  	 promos_vigencia_fin < DATE(NOW())  GROUP BY id,depto  ORDER BY promos_vigencia_ini ASC');

			while($row_pomos =  mysql_fetch_object($rs_pomos)){
				$row_pomos->type= -1;
				$r[] = $row_pomos;
			}

			$rs_pomos = mysql_query('SELECT promos_locales_promos_id as id, promos_lugar as lugar, promos_locales_departamentos_id as depto  FROM promos_locales 
									 INNER JOIN promos ON promos_locales_promos_id=promos_id  
									 WHERE promos_activa = 1 AND  promos_vigencia_ini <= DATE(NOW()) AND promos_vigencia_fin >= DATE(NOW())
									 GROUP BY id,depto 
									 ORDER BY promos_vigencia_ini ASC ');

			while($row_pomos =  mysql_fetch_object($rs_pomos)){
				$row_pomos->type= 0;
				$r[] = $row_pomos;
			}

			$rs_pomos = mysql_query('SELECT promos_locales_promos_id as id, promos_lugar as lugar, promos_locales_departamentos_id as depto  FROM promos_locales 
									 INNER JOIN promos ON promos_locales_promos_id=promos_id  
									 WHERE promos_activa = 1 AND  
									promos_vigencia_ini > DATE(NOW()) GROUP BY id,depto 
																	  ORDER BY promos_vigencia_ini ASC ');
			while($row_pomos =  mysql_fetch_object($rs_pomos)){
				$row_pomos->type= 1;
				$r[] = $row_pomos;
			}

			echo json_encode($r);


	break;



	case 'get_una_promos':

			$id =  mysql_real_escape_string($_GET['id']);
			$depto =  mysql_real_escape_string($_GET['depto']);
			$rs_pomos = mysql_query('SELECT *  FROM promos WHERE promos_id = "'. $id .'" ;');
			$row_pomos =  mysql_fetch_object($rs_pomos);

			$rs_locales = mysql_query('SELECT * FROM  promos_locales WHERE promos_locales_departamentos_id="'.$depto.'" AND  promos_locales_promos_id=' . $id);
			while($row_locales =  mysql_fetch_object($rs_locales)){
				$l[] = $row_locales;
			}
			$row_pomos->array_locales = $l;


			echo json_encode($row_pomos);


		break;


	case 'get_todas_mis_promos':

		$ids = ($_GET['ids']);

		$ids_unicos = array_unique($ids );
		
		$bucle = 0;
		$where = '';
		foreach ($ids_unicos as $id) {

			if($bucle>0) $where .= ' OR promos_code_id='.$id;
			else $where = ' promos_code_id='.$id;

			$bucle++;
		}	
	
		$rs = mysql_query('SELECT promos_code.*, promos.promos_id, promos.promos_activa, promos.promos_lugar, promos.promos_vigencia_ini, promos.promos_vigencia_fin FROM promos_code INNER JOIN promos ON promos_code_promos_id=promos_id WHERE  (' . $where . ')');

		while($row =  mysql_fetch_object($rs)){
			$l[] = $row;
		}
		echo json_encode($l);

		break;


	case 'crear_codigo':
			
		$uid =  mysql_real_escape_string($_GET['uid']);
		$at =  mysql_real_escape_string($_GET['at']);
		$post_id =  mysql_real_escape_string($_GET['post_id']);
		$promo_id =  mysql_real_escape_string($_GET['promo_id']);

		$array_post = explode('_', $post_id);
		if($uid==0) $uid = $array_post[0];

		// verifico si ya existe el codigo para ese usario:
		$rs = mysql_query('SELECT promos_code.*, promos.promos_id, promos.promos_activa, promos.promos_lugar, promos.promos_vigencia_ini, promos.promos_vigencia_fin FROM promos_code INNER JOIN promos ON promos_code_promos_id=promos_id WHERE promos_code_uid="' . $uid . '" AND promos_code_promos_id="' . $promo_id . '" LIMIT 1;');
		if(mysql_num_rows($rs)==1){
			echo json_encode(mysql_fetch_object($rs));
			exit;
		}else{
			
			generar_codigo($uid, $post_id, $promo_id);
		}

		break;


	}


	function generar_codigo($uid, $post_id, $promo_id){

		$code = getToken(8);
	
		$rs = mysql_query('SELECT promos_code_code FROM promos_code WHERE promos_code_code="' . $code . '";');
		if(mysql_num_rows($rs)==1){

			generar_codigo($uid, $post_id, $promo_id);
			return;

		}else{
				
				$rs = mysql_query('INSERT INTO promos_code SET 	
														promos_code_code="' . $code . '", 
														promos_code_uid = "' . $uid . '", 
														promos_code_post_id = "' . $post_id . '",
														promos_code_promos_id = "' . $promo_id . '",
														promos_code_fecha_creado=NOW()

													  ;');

				$rs = mysql_query('SELECT  promos_code.*, promos.promos_id, promos.promos_activa, promos.promos_lugar, promos.promos_vigencia_ini, promos.promos_vigencia_fin 

									 FROM promos_code INNER JOIN promos ON promos_code_promos_id=promos_id
									  WHERE 

									  promos_code_id="' . mysql_insert_id() . '" LIMIT 1;');

				echo json_encode(mysql_fetch_object($rs));
				exit;

		}

	}


	function crypto_rand_secure($min, $max) {
		        $range = $max - $min;
		        if ($range < 0) return $min; // not so random...
		        $log = log($range, 2);
		        $bytes = (int) ($log / 8) + 1; // length in bytes
		        $bits = (int) $log + 1; // length in bits
		        $filter = (int) (1 << $bits) - 1; // set all lower bits to 1
		        do {
		            $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
		            $rnd = $rnd & $filter; // discard irrelevant bits
		        } while ($rnd >= $range);
		        return $min + $rnd;
		}

		function getToken($length){
		    $token = "";
		    $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//		    $codeAlphabet.= "abcdefghijklmnopqrstuvwxyz";
		    $codeAlphabet.= "0123456789";
		    for($i=0;$i<$length;$i++){
		        $token .= $codeAlphabet[crypto_rand_secure(0,strlen($codeAlphabet))];
		    }
		    return $token;
		}

?>
