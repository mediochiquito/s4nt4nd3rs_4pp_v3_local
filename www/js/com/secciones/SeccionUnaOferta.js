function SeccionUnaOferta()
{
	this.main.id = 'UnaOferta';
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({width: app.ancho-20, height: app.alto-60})

	var titulo_seccion =  document.createElement('div')
	titulo_seccion.className = 'titulo_seccion'
	$(holder_blanco_secciones).append(titulo_seccion)

	var holder = document.createElement('div')
	holder.id = 'UnaOferta_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-120});

	var img = new Image()
	img.id = 'SeccionUnaOferta_img'
	$(holder).find('>div').append(img)

	var hoy = new Image();
	hoy.id =  'UnaOferta_hoy';
	hoy.src = 'img/hoy.svg';
	$(holder).find('>div').append(hoy);
	

	var header_titulo =  document.createElement('div')
	header_titulo.id = 'UnaOferta_header_titulo'
	$(holder).find('>div').append(header_titulo)
	
	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'UnaOferta_titulo_txt'
	$(header_titulo).append(titulo_txt)

	var holder_data =  document.createElement('div')
	holder_data.id = 'UnaOferta_holder_data'
	$(holder).find('>div').append(holder_data)

	var holder_footer =  document.createElement('div')
	holder_footer.id = 'UnaOferta_holder_footer'
	$(holder).find('>div').append(holder_footer)

	var btn_compartir = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;COMPARTIR", doCompartir, 'BotonAzul')
	btn_compartir.main.id = 'UnaOferta_btn_compartir'
	$(holder_footer).append(btn_compartir.main)

	var btn_volver = new Boton2Frames("img/btn_volver_rojo.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnaOferta_btn_volver'
	$(holder_blanco_secciones).append(btn_volver.main)


	var obj;

	function doVolver(){
		if(obj.viene_de_push)
			app.secciones.go(app.secciones.seccionhome, 300);
		else
		app.secciones.go(app.secciones.seccionlistaofertas, 300)
	}
	
	
	function doCompartir(){

              var params = {
                    method: 'feed',
                    name:  obj.row.ofertas_nombre,
                    link: 'http://www.ideasparahoy.com.uy',
                    picture: 'http://santander.crudo.com.uy/icon.png',
                    caption: 'http://www.ideasparahoy.com.uy/',
	           		description: 'Encontré este descuento con la app "Ideas para hoy" de Banco Santander. Descargala GRATIS en www.ideasparahoy.com.uy y enterate de todos los beneficios que tenés con tus tarjetas Santander.'
                  };

		app._Facebook.conectar(function(){
	       	 facebookConnectPlugin.showDialog(params,
                function (result) {
                    app.alerta("Has compartido esta oferta."); 
                },
	            function (e) {
	               
	            }
	        );
		})
                
	}

	this._set = function ($obj){

		if(typeof($obj)== 'undefined') return;
		obj = $obj;

			
			var nombre_cate = ''
			var tipos = (eval(app.json_db_tipo_ofertas))
			for(var i=0; i<tipos.length; i++){

				 if($obj.row.ofertas_ofertas_tipo_id == tipos[i].ofertas_tipo_id){

				 	nombre_cate = tipos[i].ofertas_tipo_nombre

				 }
			}
			$(titulo_seccion).html('Descuentos / ' + nombre_cate)


		img.src = 'img/fotos_header_ofertas/' + $obj.row.ofertas_ofertas_tipo_id + '.jpg';
		$(img).css('width', app.ancho-40);

		$(titulo_txt).html($obj.row.ofertas_nombre);
		$(holder_data).empty();
		
		app.db.transaction(function (tx) {

			tx.executeSql("SELECT * FROM locales WHERE locales_estado=1 AND locales_ofertas_id="+$obj.row.ofertas_id+" AND locales_departamentos_id="+app.depto_que_me_encuentro , [], function (tx, resulato_locales) {
		    	
		    	var cant_locales = resulato_locales.rows.length;
		    	var array_locales = new Array();

		        for(var i=0; i<cant_locales; i++){
		        	
		        	if(app.posicion_global!=''){
		        		
	        			var d = distance(app.posicion_global.coords.latitude, app.posicion_global.coords.longitude, resulato_locales.rows.item(i).locales_lat, resulato_locales.rows.item(i).locales_lon, 'K')
		        		array_locales.push([parseFloat(d), resulato_locales.rows.item(i)]);

		        	}else{
						var itemlocal = new ItemLocal(resulato_locales.rows.item(i), false);
			        	$(holder_data).append(itemlocal.main)
			        	if(cant_locales==1) itemlocal._click()
		        	}
					
		        }
		        
		        if(app.posicion_global!=''){
		        	
			        array_locales.sort(function(a,b) { return a[0] - b[0]; });

			        for(var u=0; u<array_locales.length; u++){
						var itemlocal = new ItemLocal(array_locales[u][1], true);
			        	$(holder_data).append(itemlocal.main)

			        	if(cant_locales==1) itemlocal._click()

			        }   
		    	}





		    });

		}, app.db_errorGeneral);

	}



	function distance(lat1, lon1, lat2, lon2, unit) {
		var radlat1 = Math.PI * lat1/180
		var radlat2 = Math.PI * lat2/180
		var radlon1 = Math.PI * lon1/180
		var radlon2 = Math.PI * lon2/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist
	}      

}

SeccionUnaOferta.prototype = new Base_Seccion();
