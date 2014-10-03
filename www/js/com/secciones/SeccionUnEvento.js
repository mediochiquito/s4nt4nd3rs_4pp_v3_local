function SeccionUnEvento()
{
	
	this.main.id = 'UnEvento';

	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({width: app.ancho-20, height: app.alto-60})

	var titulo_seccion =  document.createElement('div')
	titulo_seccion.className = 'titulo_seccion'
	
	$(holder_blanco_secciones).append(titulo_seccion)

	var holder = document.createElement('div')
	holder.id = 'UnEvento_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)

	$(holder).css({width: app.ancho-40, height: app.alto-120});

	var img = new Image()
	img.id = 'SeccionUnEvento_img'
	$(holder).find('>div').append(img)
	
	var header_titulo =  document.createElement('div')
	header_titulo.id = 'UnEvento_header_titulo'
	$(holder).find('>div').append(header_titulo)

	var fecha_txt =  document.createElement('div')
	fecha_txt.id = 'UnEvento_fecha_txt'
	$(header_titulo).append(fecha_txt)
	//$(fecha_txt).css('width', app.ancho);


	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'UnEvento_titulo_txt'
	$(header_titulo).append(titulo_txt)
	//$(titulo_txt).css('width', app.ancho-140)

	var holder_data =  document.createElement('div')
	holder_data.id = 'UnEvento_holder_data'
	$(holder).find('>div').append(holder_data)


	var holder_footer =  document.createElement('div')
	holder_footer.id = 'UnEvento_holder_footer'
	$(holder).find('>div').append(holder_footer)

	var btn_compartir = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;COMPARTIR", doCompartir, 'BotonAzul')
	btn_compartir.main.id = 'UnEvento_btn_compartir'
	$(holder_footer).append(btn_compartir.main)

	var btn_participar = new Boton("<img src='img/fb.svg' width='20' />&nbsp;&nbsp;ASISTIR", doParticipar, 'BotonAzul')
	btn_participar.main.id = 'UnEvento_btn_participar'
	$(holder_footer).append(btn_participar.main)


	var holder_participaciones =  document.createElement('div')
	holder_participaciones.id = 'UnEvento_holder_participaciones'

	var btn_volver = new Boton2Frames("img/btn_volver_rojo.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnaOferta_btn_volver'
	$(holder_blanco_secciones).append(btn_volver.main)



	var hoy = new Image();
	hoy.id =  'UnaOferta_hoy';
	hoy.src = 'img/hoy.svg';
	$(holder).find('>div').append(hoy);

 	$(holder_participaciones).append('<div id="UnEvento_txt_tambien_participan">También participan de este Evento:</div><div id="UnEvento_holder_usuarios_fb"></div>')
 	$(holder).find('>div').append(holder_participaciones)

	/*var is;
	var scroll_set =  false;*/
	var obj;

	function doVolver(){
		if(obj.viene_de_push)
			app.secciones.go(app.secciones.seccionhome, 300);
		else
			app.secciones.go(app.secciones.seccionlistaeventos, 300);
	}
	
	function doVerEnMapa(){
		app.secciones.go(app.secciones.seccionmapa, 300, {desde_donde_viene:'un_evento', row_evento:obj.row});
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

	function addRegistro($label, $data){

		$(holder_data).append('<div class="UnEvento_reg"><div class="UnEvento_label">'+ $label+
							  '</div><div class="UnEvento_data" ><div>'+ $data+
							  '</div></div><br style="clear:both" /></div>');
	}

	function doParticipar(){
		
		if(!app.hay_internet()) {
			app.alerta('Debes conectarte a internet para marcar la participación.')
			return;
		}
			
		app._Facebook.conectar(function(){
			participo_de_este_evento(function($bool){

				if($bool) {

					app.alerta('Ya estás participando de este evento.')
					btn_participar.habil(false);
					return;

				}else{

					app.cargando(true, 'Enviando participacion...')
					$.ajax({

		                type: "POST",
		                url: app.server + "set_participar.php",
		                dataType: 'text',
		                cache: false, 

		                data:{id_evento: obj.row.eventos_id, uid: app.usuario.uid},

		                success: function($data) {
			                	
			                	if($data == '1'){
			                		
			                	}else{
			                		app.alerta($data)
			                	}

		                		app.db.transaction(function (tx) {

									tx.executeSql('INSERT INTO participaciones (participaciones_id_evento, participaciones_uid) VALUES (?,?)', 
												  [String(obj.row.eventos_id), String(app.usuario.uid)]
												  );

									app.cargando(false)
		                			btn_participar.habil(false);

		                			var params = {
										            method: 'feed',
										            name: obj.row.eventos_nombre,
										            link: 'http://www.ideasparahoy.com.uy',
									                picture: 'http://santander.crudo.com.uy/icon.png',
										            caption: obj.row.eventos_lugar,
										            description: 'Voy a ir a este evento que encontré con la app "Ideas para hoy" de Banco Santander, ¿te sumás? Descargá la app GRATIS en www.ideasparahoy.com.uy y enterate de todos los recitales, fiestas, eventos culturales y mucho más.'
									                  
										        };

										        facebookConnectPlugin.showDialog(params,
									                function (result) {
									                    app.alerta("Has compartido este evento."); 
									                },
										            function (e) {
										               
										            }
										        );


									 
								},  app.db_errorGeneral);

		                	
		                },
		                error: function(){ 
		                    app.cargando(false)
		                }
			        });


				}

			})

	  		
		}) 
		       

	}


	function participo_de_este_evento($callback){
		
		app.db.transaction(function (tx) {
			
			tx.executeSql("SELECT * FROM participaciones WHERE participaciones_id_evento="+obj.row.eventos_id+" AND participaciones_uid="+app.usuario.uid+"" , [], function (tx, resultado) {
		    	
		    	if(resultado.rows.length > 0){

		    		$callback(true);

		    	}else{

		    		$callback(false);

		    	}

		    });

		},  app.db_errorGeneral);

	}


	function doCompartir(){
			

	  		var params = {
	            method: 'feed',
	            name: obj.row.eventos_nombre,
	            link: 'http://www.ideasparahoy.com.uy',
                picture: 'http://santander.crudo.com.uy/icon.png',
	            caption: obj.row.eventos_lugar,
	            description: 'Encontré este evento con la app "Ideas para hoy" de Banco Santander. Descargala GRATIS en www.ideasparahoy.com.uy y enterate de todos los recitales, fiestas, eventos culturales y mucho más.'
                  
	        };

	        facebookConnectPlugin.showDialog(params,
                function (result) {
                    app.alerta("Has compartido este evento."); 
                },
	            function (e) {
	               
	            }
	        );

	
                
	}

	function este_evento_es_hoy(){

		var array_fecha_hora = obj.row.fecha_menor.split(' ')
		var array_fecha =array_fecha_hora[0].split('-')

		var d = new Date();
		var hoy = new Date(d.getFullYear(),d.getMonth(), d.getDate())
		var dia_evento = new Date(Number(array_fecha[0]), Number(array_fecha[1])-1, Number(array_fecha[2]));
		
		if(hoy.getTime() == dia_evento.getTime()) return true;
		else return false;

	}
	

	function getDateUruguay($fecha_hora){

		var array_fecha_hora = $fecha_hora.split(' ')
		var array_fecha =array_fecha_hora[0].split('-')
		var array_hora =array_fecha_hora[1].split(':')

		return array_fecha[2]+'/'+array_fecha[1]+'/'+array_fecha[0] + ' ' +  array_hora[0] + ':' +  array_hora[1]  +  'hs.'

	}
	
	function getDateUruguayString($fecha_hora){

		var array_fecha_hora = $fecha_hora.split(' ')
		var array_fecha =array_fecha_hora[0].split('-')
		var array_hora =array_fecha_hora[1].split(':')

		return array_fecha[2]+' de '+ app.meses[array_fecha[1]-1]+' '+array_fecha[0] + ', ' +  array_hora[0] + ':' +  array_hora[1]  +  'hs.'

	}
	

	this._set = function ($obj){

		if(typeof($obj)== 'undefined') return;


		obj = $obj;

			var nombre_cate = ''
			var tipos = (eval(app.json_db_tipo_categorias))
			for(var i=0; i<tipos.length; i++){

				 if($obj.row.eventos_categoria_id == tipos[i].categorias_id){

				 	nombre_cate = tipos[i].categorias_nombre

				 }
			}
			$(titulo_seccion).html('Eventos / ' + nombre_cate)




		if(app.hay_internet() && $obj.row.eventos_header_img!='')
			img.src =  $obj.row.eventos_header_img;
		else
			img.src = 'img/fotos_header_eventos/' + $obj.row.eventos_categoria_id + '.jpg';
		

		
		$(img).css('width', app.ancho-40);
		
		if(este_evento_es_hoy()) $(hoy).show();
		else  $(hoy).hide();



	

		$(fecha_txt).html(getDateUruguayString($obj.row.fecha_menor));
		$(titulo_txt).html($obj.row.eventos_nombre);
		$(holder_data).empty()


		var disancia =  document.createElement('div')
		disancia.className = 'UnEvento_disancia'
		$(holder_data).append(disancia)

		var btn_ver_en_mapa = new Boton2Frames("img/eventos/marker_lineas.svg", 25, 50, doVerEnMapa)
		btn_ver_en_mapa.main.id = 'UnEvento_btn_ver_en_mapa'
		$(holder_data).append(btn_ver_en_mapa.main)



		if(app.posicion_global!=''){

			$(disancia).html(distance(app.posicion_global.coords.latitude, app.posicion_global.coords.longitude, $obj.row.eventos_lat, $obj.row.eventos_lon, 'K').toFixed(2)+' KM.')
		
		}

		//addRegistro('Categoría', app.categorias_eventos[$obj.row.eventos_categoria_id-1])
		//addRegistro('Fecha', getDateUruguay($obj.row.fecha_menor))
		addRegistro('Lugar', $obj.row.eventos_lugar)
		addRegistro('Descripción', $obj.row.eventos_desc)
		


		app.db.transaction(function (tx) {
			

			tx.executeSql("SELECT * FROM datetime_eventos WHERE datetime_eventos_eventos_id="+obj.row.eventos_id+" AND datetime_eventos_fecha_hora>'"+obj.row.fecha_menor+"' ORDER BY datetime_eventos_fecha_hora ASC " , [], function (tx, resultado) {
		    	
		    	var cant_eventos = resultado.rows.length;
		    	var fehcas = '';
		    	for(var i=0; i<cant_eventos; i++){
		    			
		    		fehcas += '- ' + getDateUruguayString(resultado.rows.item(i).datetime_eventos_fecha_hora) + ' <br />';
			            
			    }

		    	if(resultado.rows.length > 0){

		    		addRegistro('Otras fechas', fehcas)
		

		    	}

		    });

		},  app.db_errorGeneral);



		//addRegistro('fechas', $obj.row.eventos_desc)



		
		participo_de_este_evento(function($bool){

			if($bool) btn_participar.habil(false);
			else btn_participar.habil(true);

		})


		$('#UnEvento_holder_usuarios_fb').empty()
        $('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Obteniendo participaciones...</div>')

        cargar_participantes($obj);

	}

	function cargar_participantes($obj){

		 $.ajax({

                type: "POST",
                url: app.server + "json.participaciones.php",
                dataType: 'json',
                cache: false, 
                data:{id_evento: $obj.row.eventos_id},

                success: function($json) {
                		$('#UnEvento_holder_usuarios_fb').html('');
                        for(var i in $json){

                                $('#UnEvento_holder_usuarios_fb').append('<img src="http://graph.facebook.com/'+$json[i].participaciones_uid+'/picture">')

                        }
                        if($json.length == 0) $('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Aun no hay participantes en este evento.</div>')

                        $('#UnEvento_holder_usuarios_fb').append('<br style="clear:both" />');
                       	//is.refresh()
                },
                error: function(){ 
                        $('#UnEvento_holder_usuarios_fb').html('<div id="UnEvento_mensaje_participantes">Ocurrio un error al obtener los participantes</div>');
                       // is.refresh()
                }
        });        
	}



}

SeccionUnEvento.prototype = new Base_Seccion();