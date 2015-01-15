function Facebook(){

	var self = this;
	
	this.init = function(){

		/*FB.init({
			  appId: '381248932009498',
			  nativeInterface: CDV.FB,
			  useCachedDialogs: false
		});
*/
	}


	this.conectar = function($callback){

		 app.cargando(true, 'Conectando con Facebook...');

		 setTimeout(function (){
		 	app.cargando(false);
		 }, 3000);

		 facebookConnectPlugin.getLoginStatus(function (userData){

		 	if(userData.status == 'connected'){

		 		
		 								   
 				app.usuario.uid = userData.authResponse.userID;
 				app.usuario.access_token = userData.authResponse.accessToken;


 				if(String(app.usuario.uid) == 'null'){

 					
 					app.cargando(true);

 					$.ajax({
				
						type: "GET",
						url: "https://graph.facebook.com/v2.2/me?fields=id&access_token="+app.usuario.access_token,
						dataType: 'json'

					}).success(function(json) {

						app.cargando(false);

						if(typeof(json.id) != 'undefined'){

							app.usuario.uid = json.id;
							$callback();

						}else{

							facebookConnectPlugin.login(["public_profile"],
		    	
						    	function (userData) {

								 	app.usuario.uid = userData.authResponse.userID;
								    facebookConnectPlugin.getAccessToken(function(token) {
								        app.usuario.access_token = token;
								    }, function(err) {  });
								    $callback();
								},

						    	function (error) { app.alerta("No se pudo conectar tu cuenta de Facebook. Por favor intentalo nuevamente.") }

							);

						}
						
					});

 				}else{

 					$callback();

 				}


		 	}else{


		 		facebookConnectPlugin.login(["public_profile"],
		    	
			    	function (userData) {

					 	app.usuario.uid = userData.authResponse.userID;
					    facebookConnectPlugin.getAccessToken(function(token) {
					        app.usuario.access_token = token;
					    }, function(err) {  });
					    $callback();
					},

			    	function (error) { app.alerta("No se pudo conectar tu cuenta de Facebook. Por favor intentalo nuevamente.") }

				); 
	    

		 	}

		 }, function(){});

		
	}

	
}