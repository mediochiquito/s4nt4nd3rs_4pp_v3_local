<?
class Push{

	//ANDROID
	var $apiKey = "AIzaSyDllM585-vFe4q8L-cI4-wntJ_jrcZvHHM";

	
	// IOS
	var $apns;
	var $apns_url = 'gateway.push.apple.com';
	var $apns_cert = 'apns-prod.pem';
	var $apns_port = 2195;
	var $stream_context;
	
	
	
	function __construct(){
		
		$this->stream_context = stream_context_create();
		stream_context_set_option($this->stream_context, 'ssl', 'local_cert', $this->apns_cert);
		$this->apns = stream_socket_client('ssl://' . $this->apns_url . ':' . $this->apns_port, $error, $error_string, 2, STREAM_CLIENT_CONNECT, $this->stream_context);
		
	}
	
	
	public function enviar_push_ios($token, $titulo, $mensaje, $idevento=0, $idoferta=0){
		
		$payload = array();
		$payload['aps'] = array('idevento' => $idevento,'o' => $idoferta, 'alert' => $mensaje, 'badge' => intval(0), 'sound' => 'default');
		$payload = json_encode($payload);

		$apns_message = chr(0) . chr(0) . chr(32) . pack('H*', str_replace(' ', '', $token)) . chr(0) . chr(strlen($payload)) . $payload;
		fwrite($this->apns, $apns_message);

	}
	
	
	public function enviar_push_android($token, $titulo, $mensaje, $idevento=0, $idoferta=0){   
	
	
			$headers = array("Content-Type:" . "application/json", "Authorization:" . "key=" . $this->apiKey);
			$data = array(
				'data' => array('idevento' => $idevento,'o' => $idoferta, 'message' => $mensaje, 'title' => $titulo),
				'registration_ids' => array($token)
			);
		 
			$ch = curl_init();
		 
			curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers ); 
			curl_setopt( $ch, CURLOPT_URL, "https://android.googleapis.com/gcm/send" );
			curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 0 );
			curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, 0 );
			curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
			curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode($data) );
		 
			$response = curl_exec($ch);
			curl_close($ch);
		 
			return $response;

		}
	
	
	
	public function _close(){
		
		@socket_close($this->apns);
		@fclose($this->apns);
		
	}
	
	
}


$p = new Push();
$p->enviar_push_ios('2842f7860c6d8b8e1229c2a7a462e6a70cf1dc314c264887c40b5addd29df11c', 'Titulo',  'Desc desc', 4433, 0);

//$p->enviar_push_android('APA91bEfeVXrv932FAcWubC228JD6CyjHmpKX6eTm_QMf2E7phYz45ZNI1TXe_2pn7X60K_7LtbIYaccsbSJmRAjg3s-_52CACUNEsp-FbxmZFhpZ-CexukJcobzSsBba_CsxHIhpcT_je_35SH4jT-wjlPvtnFs_LsQqIJkxB4jtKi6VaIV6ow', 'Titulo', 'Desc desc', 4433);

