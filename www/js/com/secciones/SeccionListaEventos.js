function SeccionListaEventos()
{

	this.main.id = 'ListaEventos';

	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({width: app.ancho-20, height: app.alto-60})

	var titulo_seccion =  document.createElement('div')
	titulo_seccion.className = 'titulo_seccion'
	$(holder_blanco_secciones).append(titulo_seccion);

	var btn_ver_en_mapa = new Boton('VER EN MAPA', doVerEnMapa);
	btn_ver_en_mapa.main.id = 'ListaEventos_btn_ver_en_mapa'
	$(this.main).append(btn_ver_en_mapa.main);

	$(btn_ver_en_mapa.main).css({'margin-left': -65, top: app.alto-75});

	var combo_deptos = document.createElement('select');
	combo_deptos.id = 'ListaEventos_combo_deptos'
	$(combo_deptos).bind('change', doChangeDepto)
	$(combo_deptos).attr('disabled', true)

	for(var i=0; i< app.array_deptos.length; i++){

			var option =  document.createElement('option');
				option.value = (i+1)
				$(option).append(app.array_deptos[i])
				$(combo_deptos).append(option);

	}

	var holder = document.createElement('div');
	holder.id = 'ListaEventos_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div id="ListaEventos_holder_combo_deptos"><div id="ListaEventos_txt_deptos">Departamento:</div></div><div id="ListaEventosWrapper"></div>')
	$(this.main).append(holder);

	var array_ids_encontrados;

	$(holder).css({width: app.ancho-40, height: app.alto-105});
	var categoria_seleccionada = -1;
	var fecha_a_buscar = -1;
	var ultimo_resultado = null
	var lista=null;

	setTimeout(function (){

		$('#ListaEventos_holder_combo_deptos').append(combo_deptos);

	}, 0);

	var btn_volver = new Boton2Frames("img/btn_volver_rojo.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnaOferta_btn_volver'
	$(holder_blanco_secciones).append(btn_volver.main)
	
	function doVolver(){

		app.secciones.go(app.secciones.seccionhomeeventos, 300);

	}



	this.get_array_ids_encontrados = function (){

		return array_ids_encontrados;
	}

	

	function doChangeDepto(){
		
		app.depto_que_me_encuentro = ($(combo_deptos).val())
		app.secciones.seccionlistaeventos.listar()

	}

	function doVerEnMapa(e){
		
		app.secciones.go(app.secciones.seccionmapa, 300, {desde_donde_viene:'lista_eventos'})
		
	}
	
	function getDateUruguayStringSinHora($fecha){

		var array_fecha = $fecha.split('-')
		
		return array_fecha[2]+' de '+ app.meses[array_fecha[1]-1]+' '+array_fecha[0];

	}

	this._set = function ($data){
		
		if(typeof($data) != 'undefined'){

			// buscando solo categoria
			if(typeof($data.id_categoria ) != 'undefined'){
			
				fecha_a_buscar = -1
				categoria_seleccionada = $data.id_categoria
				var nombre_cate = ''
				var tipos = (eval(app.json_db_tipo_categorias))
				for(var i=0; i<tipos.length; i++){

					 if(tipos[i].categorias_id == categoria_seleccionada){

					 	nombre_cate = tipos[i].categorias_nombre

					 }
				}

				$(titulo_seccion).html('Eventos / ' + nombre_cate)
				$(btn_ver_en_mapa.main).hide()
				$(holder).css({width: app.ancho-40, height: app.alto-105});
			}

			
			

			// buscando solo fecha
			if(typeof($data.fecha ) != 'undefined'){
				$(holder).css({width: app.ancho-40, height: app.alto-175});
				categoria_seleccionada = -1
				fecha_a_buscar = $data.fecha
				
				$(btn_ver_en_mapa.main).show()

			}



			this.listar()
		}else{

			$(titulo_seccion).html('Eventos');
		}
		



		$(combo_deptos).attr('disabled', false)
	}

	this.get_ultimo_resultado = function(){

		return ultimo_resultado;
	}

	this.listar =  function ($busqueda_obsoleta, $callback){
		
		var _date = new Date();
		var mes =  (_date.getMonth()+1)
		if(mes<10) mes = '0' + mes;
		var dia =  (_date.getDate())
		if(dia<10) dia = '0' + dia;

		var busqueda = $.trim($('#Header_search').val());
		
		var fecha_hasta_hoy = _date.getFullYear() + '-' + mes + '-' + dia + ' 00:00:00';

		$(combo_deptos).find('option[value="'+app.depto_que_me_encuentro+'"]').prop('selected', true)
		
		if(busqueda != '' && busqueda != 'Buscar...'){
			
			$(titulo_seccion).html('Eventos');
			categoria_seleccionada = -1
			fecha_a_buscar = -1;
		}


		var cat = '';
		if(categoria_seleccionada>-1){

			cat += ' eventos_categoria_id='+categoria_seleccionada+' AND ';
		}
		
		var fech_buscar = '';
		if(fecha_a_buscar!=-1){
			$(titulo_seccion).html('Eventos');
			fech_buscar += ' DATE(datetime_eventos_fecha_hora)="'+fecha_a_buscar+'" AND ';
		}

		var where = ' WHERE ' + cat +  fech_buscar + '   datetime_eventos_fecha_hora>="'+fecha_hasta_hoy+'" AND eventos_estado=1 AND datetime_eventos_estado=1 AND eventos_departamentos_id="'+app.depto_que_me_encuentro + '" ';
		if(busqueda != '' && busqueda != 'Buscar...'){
			where = ' WHERE (eventos_nombre LIKE "%' + busqueda + '%" OR eventos_tags LIKE "%' + busqueda + '%") AND eventos_estado=1 AND datetime_eventos_estado=1 AND eventos_departamentos_id="'+app.depto_que_me_encuentro+'" AND  datetime_eventos_fecha_hora>="'+fecha_hasta_hoy+'"';
		}
		
		app.db.transaction(function (tx) {

			tx.executeSql('SELECT *, MIN(datetime_eventos_fecha_hora) as fecha_menor, COUNT(*) as cantidad FROM eventos  INNER JOIN datetime_eventos ON datetime_eventos_eventos_id = eventos_id  '+where+' GROUP BY eventos_id ORDER BY fecha_menor ASC, eventos_nombre ASC' , [], function (tx, resultado) {		   	
			    	
			    	$(holder).find('#ListaEventosWrapper').empty();
			    	var cant_eventos = resultado.rows.length;

			    	$(holder).find('#ListaEventosWrapper').html('')
			    	var item_con_fecha = true
			    	if(fecha_a_buscar!=-1){
			    		item_con_fecha =  false
						$(holder).find('#ListaEventosWrapper').append('<div id="eventos_resultado_del_dia">'+getDateUruguayStringSinHora(fecha_a_buscar)+'</div>');
					
						if(cant_eventos==0)btn_ver_en_mapa.habil(false);
							else btn_ver_en_mapa.habil(true);
					}


			    	if(cant_eventos == 0){

			    		//btn_ver_en_mapa.habil(false)

			    		if(busqueda != '' && busqueda != 'Buscar...')
			    			$(holder).find('#ListaEventosWrapper').append('<div class="sin_resultados"><div>La busqueda no ha arrojado ningun resultado en eventos.</div></div>');
			    		else 
			    			$(holder).find('#ListaEventosWrapper').append('<div class="sin_resultados"><div>No hay eventos publicados por el momento.<br /><br />Te invitamos a que consultes la sección Descuentos.</div></div>');


			    	}else{
			    		//	btn_ver_en_mapa.habil(true)
			    		
			    	}
			    	
			    	
		    		array_ids_encontrados = new Array();
		    		for(var i=0; i<cant_eventos; i++){
		    				ultimo_resultado  = resultado
			    			array_ids_encontrados.push(resultado.rows.item(i).eventos_id)
							
							var _ItemListaEvento = new ItemListaEvento(resultado.rows.item(i), item_con_fecha);
							$(holder).find('#ListaEventosWrapper').append(_ItemListaEvento.main)
			          
			        }


			        if(item_con_fecha)  $('.ItemListaEvento_nombre').css('width', app.ancho-145);
			        else 				$('.ItemListaEvento_nombre').css('width', app.ancho-65);


				if(typeof($callback)!='undefined') $callback(cant_eventos);

		    })
		});

	}

}

SeccionListaEventos.prototype = new Base_Seccion();