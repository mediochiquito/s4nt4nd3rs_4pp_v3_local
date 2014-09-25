function ManagePush(){

	var self = this;
	var pushNotification;
	this.token = 'webtest';
	this.plataform = '';
	var _callback = null
	var _callback_error = null;

	this.registrar = function($callback, $callback_error){

	 	if(typeof($callback) != 'undefined') _callback = $callback;
	 	else _callback = null;


	 	if(typeof($callback_error) != 'undefined') _callback_error = $callback_error;
	 	else _callback_error = null;

		if(!app.is_phonegap()){
			sendToken()
			return;
		}
		
		pushNotification = window.plugins.pushNotification;

    	if ( device.platform == 'android' || device.platform == 'Android' )
		{
		    pushNotification.register(
		        successHandler,
		        errorHandler, {
		            "senderID":"888062220460",
		            "ecb":"app._ManagePush.onNotificationGCM"
		        });
		    self.plataform = 'android'
		 
		}
		else
		{

		    pushNotification.register(
		        tokenHandler,
		        errorHandler, {
		            "badge":"true",
		            "sound":"true",
		            "alert":"true",
		            "ecb":"app._ManagePush.onNotificationAPN"
		        });
		       self.plataform = 'ios'
		}
		
	}

	this.unregistrar = function (){
		
		try  {
	        pushNotification.unregister(
	        function(e) {
	            //unRegister Success!!!
	            //alert('unRegister Success');
	        }, 
	        function(e) {
	            //unRegister Failed!!!
	           // alert('unRegister Failed');
	        });
	    }
	    catch(err) {
	        alert(err.message);
	    }
		
	}


	function sendToken(){
		
		$.ajax({

			type: "POST",
			url: app.server + "void.set_push_token.php",
			dataType: 'text',
			cache: false, 
			data:{plataform: self.plataform, token:self.token},
			success:function(){

				 app.db.transaction(function (tx) {
					 tx.executeSql('UPDATE app SET push=?', [1]);
				 });



			}
		});	


		if(_callback != null) _callback();

	}

	function successHandler (result) {
	  
	}
	
	function errorHandler (error) {
		
	  	if(_callback_error != null) _callback_error();
	}

	function tokenHandler (result) {
		
 		self.token = result
		sendToken();
	}
	
	// iOS
	this.onNotificationAPN = function (event) {
	   
	    if ( event.alert )
	    {
	        objeto_recibido(event)
	    }

	    if ( event.sound )
	    {
	        var snd = new Media(event.sound);
	        snd.play();
	    }

	    if ( event.badge )
	    {
	        pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
	    }
	}

	// Android
	this.onNotificationGCM = function (e) {
	   
	    switch( e.event )
	    {
		    case 'registered':
		        if ( e.regid.length > 0 )
		        {
			          self.token =  e.regid
			          sendToken()
		        }
		    break;

		    case 'message':
		  		objeto_recibido(e.payload)

		    break;

		    case 'error':
		       app.alerta('ERROR -> MSG:' + e.msg);
		    break;

		    default:
		    	app.alerta('EVENT -> Unknown, an event was received and we do not know what it is');
		     
		 	   break;
		  }

	}


	function objeto_recibido($obj_push){

		if(typeof($obj_push.o) !='undefined'){
			app.redirigiendo_una_push = true
			if($obj_push.o > 0){
				app.redirect_push_object = {go: 'oferta', id:$obj_push.o, no_depto:true}
				
			}
		}

		if(typeof($obj_push.idevento) !='undefined'){
			if($obj_push.idevento > 0){
				app.redirigiendo_una_push = true
				app.redirect_push_object = {go: 'evento', id:$obj_push.idevento, no_depto:true}
				
				
			}
		}
	}
}



