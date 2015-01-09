function SeccionUnaPromo()
{
	
	this.main.id = 'UnaPromo';
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({width: app.ancho-20, height: app.alto-60})

	var titulo_seccion =  document.createElement('div')
	titulo_seccion.className = 'titulo_seccion'
	$(holder_blanco_secciones).append(titulo_seccion)

	var holder = document.createElement('div')
	holder.id = 'UnaPromo_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-120});

	var img = new Image()
	img.id = 'SeccionUnaPromo_img'
	$(holder).find('>div').append(img)

	var hoy = new Image();
	hoy.id =  'UnaPromo_hoy';
	hoy.src = 'img/hoy.svg';
	$(holder).find('>div').append(hoy);

	var header_titulo =  document.createElement('div')
	header_titulo.id = 'UnaPromo_header_titulo'

	$(holder).find('>div').append(header_titulo)

	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'UnaPromo_titulo_txt'
	$(header_titulo).append(titulo_txt)


	var desc_txt =  document.createElement('div')
	desc_txt.id = 'UnaPromo_desc_txt'
	$(holder).find('>div').append(desc_txt)
	
	var titulo_vigencia =  document.createElement('div')
	titulo_vigencia.className = 'box label_negrira';
	$(titulo_vigencia).html('Vigencia')
	$(holder).find('>div').append(titulo_vigencia)

	var txt_vigencia =  document.createElement('div')
	txt_vigencia.className = 'box label_normal'
	$(holder).find('>div').append(txt_vigencia);
	

	var titulo_condiciones =  document.createElement('div')
	titulo_condiciones.className = 'box label_negrira'
	$(titulo_condiciones).html('Condiciones')
	$(holder).find('>div').append(titulo_condiciones)

	var txt_condiciones =  document.createElement('div')
	txt_condiciones.className = 'UnaPromo_condiciones_cerrada box label_normal'
	
	$(holder).find('>div').append(txt_condiciones);
	
	var condiciones_abiertas = false

	var holder_btn_mas_condiciones =  document.createElement('div');
	holder_btn_mas_condiciones.id = 'UnaPromo_holder_btn_mas_condiciones';
	$(holder).find('>div').append(holder_btn_mas_condiciones);


	var open_close_condiciones = new Image();
	open_close_condiciones.id =  'UnaPromo_open_close_condiciones';
	open_close_condiciones.src = 'img/promos/open_close_condiciones.png';
	$(holder_btn_mas_condiciones).append(open_close_condiciones);

	
	$(holder_btn_mas_condiciones).bind('click', doOpenCloseCondiciones)

	var holder_data =  document.createElement('div')
	holder_data.id = 'UnaPromo_holder_data'
	$(holder).find('>div').append(holder_data)

	var holder_footer =  document.createElement('div')
	holder_footer.id = 'UnaPromo_holder_footer'
	$(holder).find('>div').append(holder_footer)

	var btn_compartir = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;COMPARTIR", doCompartir, 'BotonAzul')
	btn_compartir.main.id = 'UnaPromo_btn_compartir'
	$(holder_footer).append(btn_compartir.main)

	var btn_volver = new Boton2Frames("img/btn_volver_rojo.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnaPromo_btn_volver'
	$(holder_blanco_secciones).append(btn_volver.main)

	$(titulo_seccion).html('Promociones');

	var obj;

	function doVolver(){

		
		app.secciones.go(app.secciones.seccionlistapromos, 300)
	}
	
	function doOpenCloseCondiciones(){

		if(condiciones_abiertas){
			$(txt_condiciones).removeClass('UnaPromo_condiciones_abierta')
			$(txt_condiciones).addClass('UnaPromo_condiciones_cerrada')
			$(holder_btn_mas_condiciones).css('margin-top', -31)
			condiciones_abiertas=false
			$(open_close_condiciones).transition({rotate:0})

		}else{
			$(txt_condiciones).removeClass('UnaPromo_condiciones_cerrada')
			$(txt_condiciones).addClass('UnaPromo_condiciones_abierta')
			$(holder_btn_mas_condiciones).css('margin-top', 0)
			condiciones_abiertas=true
			$(open_close_condiciones).transition({rotate:180})			
		}

	}


	function guardar_promo($post_id){

		app.cargando(true)
		$.ajax({
				type: "GET",
				url: app.server + "promos.php",
				data:{

						method:'crear_codigo',
						uid: app.usuario.uid,
						at: app.usuario.access_token,
						post_id:$post_id,
						promo_id:obj.row.id

						},

				dataType: 'json',
				cache:false, 
				success: function($json) {

					app.crearTabla_Codes(function (tx, resultado){

							app.insertarUnCode($json, tx)

							app.secciones.go(app.secciones.seccionuncodigo, 300, {desde:'una_promo', code: $json.promos_code_code, lugar: $json.promos_lugar});

							app.cargando(false);


					})

				},

				error: function() {
					app.alert('Ocurrio un error al enviar el código.');
					app.cargando(true)
				}
		});

		
	}	


	function doCompartir(){
			
		if(app.is_phonegap()){

			  var params = {
                    method: 'feed',
                    name:  obj.row.lugar,
                    link: 'http://www.ideasparahoy.com.uy',
                    picture: 'http://santander.crudo.com.uy/icon.png',
                    caption: 'http://www.ideasparahoy.com.uy/',
	           		description: 'COmpartiendo una promo. Loren Ipsum  Loren Ipsum  Loren Ipsum  Loren Ipsum  Loren Ipsum  Loren Ipsum  Loren Ipsum  Loren Ipsum  Loren Ipsum  Loren Ipsum.'
                  };

			app._Facebook.conectar(function(){
		       	 facebookConnectPlugin.showDialog(params,
	                function (result) {
	                   
	                   	guardar_promo(result.post_id);
	                    
	                   
	                },
		            function (e) {
		               
		            }
		        );
			})

		}	else{

			 	guardar_promo('web');

		}	


      
              
	}

	this._set = function ($obj){

		if(typeof($obj)== 'undefined') return;

		obj = $obj

		$(holder_data).empty();

	//	try{
			$(titulo_txt).html($obj.row.lugar);
	//	}catch(e){}
		

		if(!app.hay_internet()){
			app.alerta('Debes estar conectado a internet para ver esta promoción.');
			app.secciones.go(app.secciones.seccionhome, 300)
			return
		}

		app.cargando(true, 'Cargando promoción...');

		$.ajax({
				type: "GET", 
				url: app.server + "promos.php", 
				data:{method:'get_una_promos', id:$obj.row.id, depto:app.depto_que_me_encuentro}, 
				dataType: 'json', 
				cache:false, 
				success: function($json) {
					
					if($obj.type == 0) $(hoy).show();
					else $(hoy).hide();

					if(app.hay_internet() && $json.promos_header_img!='')
						img.src = $json.promos_header_img;
					else
						img.src = 'img/promos/header_default.jpg';

					$(titulo_txt).html($json.promos_ugar);
					$(img).css('width', app.ancho-40);
					$(desc_txt).html($json.promos_descripcion)
					$(txt_condiciones).html($json.promos_condiciones)
					$(txt_vigencia).html(formatear_fecha($json.promos_vigencia_ini) + ' - ' + formatear_fecha($json.promos_vigencia_fin))

						var ini = new Date($json.promos_vigencia_ini + ' 00:00:00')

						var now = new Date()

						var ahora = new Date(now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate() + ' 00:00:00');


						if(ini.getTime()>ahora.getTime()){
							btn_compartir.habil(false)
						}else{
								btn_compartir.habil(true)
						}


					$(holder_data).empty();

					if($json.array_locales != null){

						var cant_locales = $json.array_locales.length;
		    			var array_locales = new Array();

				        for(var i=0; i<cant_locales; i++){
				        	
				        	if(app.posicion_global != ''){
				        		
			        			var d = distance(app.posicion_global.coords.latitude, app.posicion_global.coords.longitude, 
			        							 $json.array_locales[i].promos_locales_lat,  $json.array_locales[i].promos_locales_lon, 'K')

				        		array_locales.push([parseFloat(d), $json.array_locales[i]]);

				        	}else{

								var itemlocal = new ItemLocalPromo($json.array_locales[i], false,i);
					        	$(holder_data).append(itemlocal.main)
					        	//if(cant_locales==1) itemlocal._click()
				        	}
							
				        }
				        
				        if(app.posicion_global!=''){
				        	
					        array_locales.sort(function(a,b) { return a[0] - b[0]; });

					        for(var u=0; u<array_locales.length; u++){
								var itemlocal = new ItemLocalPromo(array_locales[u][1], true, u);
					        	$(holder_data).append(itemlocal.main)

					        	//if(cant_locales==1) itemlocal._click()

					        }   
				    	}

					}
					

					app.cargando(false);

				},
				error: function() {
					app.alert('Ocurrio un error al cargar la promocion.')
				}
			});

	}


	function formatear_fecha($mysql){

		var a = $mysql.split('-');
		return a[2] + '/' + a[1] + '/'+ a[0]
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

SeccionUnaPromo.prototype = new Base_Seccion();
