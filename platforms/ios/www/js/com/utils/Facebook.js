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

		 }, function(){})



		
		// facebookConnectPlugin.logout(function (){
 
			
		// }, function (error) { 

		// 	// //app.alerta("" + error) 
		// 	// facebookConnectPlugin.login(["public_profile"],
		    	
		//  //    	function (userData) {

		// 	// 	    //alert("2 UserInfo: " + JSON.stringify(userData));
		// 	// 	 	app.usuario.uid = userData.authResponse.userID;
		// 	// 	    facebookConnectPlugin.getAccessToken(function(token) {
		// 	// 	        app.usuario.access_token = token;
		// 	// 	        $callback();
		// 	// 	    }, function(err) {
		// 	// 	        app.alerta("No se pudo obtener el toke de usuario");
		// 	// 	    });
		// 	// 	},

		//  //    	function (error) { app.alerta("No se pudo conectar tu cuenta de Facebook. Por favor intentalo nuevamente.") }

		// 	// ); 
	    
		// })

		 

		
	}

	
}