function SeccionListaOfertas()
{
	
	this.main.id = 'ListaOfertas';

	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({width: app.ancho-20, height: app.alto-60})

	var titulo_seccion =  document.createElement('div')
	titulo_seccion.className = 'titulo_seccion'
	$(holder_blanco_secciones).append(titulo_seccion)


	var combo_deptos = document.createElement('select');
	combo_deptos.id = 'ListaOferta_combo_deptos'
	$(combo_deptos).bind('change', doChangeDepto)
	//$(combo_deptos).attr('disabled', true)
	for(var i=0; i< app.array_deptos.length; i++){

		var option =  document.createElement('option');
		option.value = (i+1)
		$(option).append(app.array_deptos[i])
		$(combo_deptos).append(option);

	}

	var holder = document.createElement('div')
	holder.id = 'ListaOfertas_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div id="ListaOferta_banner"></div><div id="ListaOferta_holder_combo_deptos"><div id="ListaOferta_txt_deptos">Departamento:</div></div><div id="ListaOfertasWrapper">')
	$(this.main).append(holder)

	var array_ids_encontrados;

	$(holder).css({width: app.ancho-40, height: app.alto-100});
	
	var categoria_seleccionada = -1;

	setTimeout(function (){
		$('#ListaOferta_holder_combo_deptos').append(combo_deptos);
		cargar_banner_oferta()
	}, 0)

	var btn_volver = new Boton2Frames("img/btn_volver_rojo.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnaOferta_btn_volver'
	$(holder_blanco_secciones).append(btn_volver.main)


	function doVolver(){
		app.secciones.go(app.secciones.seccionhomeofertas, 300)
	}

	this.get_array_ids_encontrados = function (){

		return array_ids_encontrados;
	}

	function cargar_banner_oferta(){
		
		 $.ajax({
				type: "GET",
				url: app.server + "json.get_banner.php",
				dataType: 'json',
				async : false
			}).success(function($json) {

				if($json!==false) {

					//$('#ListaOferta_banner').html('<img width="'+(app.ancho-40)+'" src="'+app.server+$json.banners_ofertas_url+'" /><div id="ListaOfertas_header_banner"><div id="ListaOfertas_header_banner_titulo_txt">Bases y Condiciones</div></div>')
					$('#ListaOferta_banner').html('<img width="'+(app.ancho-40)+'" src="http://santander.crudo.com.uy/'+$json.banners_ofertas_url+'" /><div id="ListaOfertas_header_banner"><div id="ListaOfertas_header_banner_titulo_txt">Bases y Condiciones</div></div>')
						setTimeout(function(){
							
							var btn_terms = new Boton2Frames("img/ofertas/btn_terms_banner.svg", 20, 40, function(){
								app.secciones.go(app.secciones.secciontermsbanner, 300, {id:$json.banners_ofertas_id})
							})
							btn_terms.main.id = 'ListaOfertas_btn_ver_terms'
							$('#ListaOfertas_header_banner').append(btn_terms.main)

						}, 0)
						

				}else $('#ListaOferta_banner').hide()
			});

	}

	this._set = function ($data){

		if(typeof($data) != 'undefined'){

			categoria_seleccionada = $data.id
			var nombre_cate = ''
			var tipos = (eval(app.json_db_tipo_ofertas))

			for(var i=0; i<tipos.length; i++){

				 if(tipos[i].ofertas_tipo_id == categoria_seleccionada){

				 	nombre_cate = tipos[i].ofertas_tipo_nombre

				 }
			}
			$(titulo_seccion).html('Descuentos / ' + nombre_cate)
			this.listar();

		}

	}
		

	function doChangeDepto(){

		app.depto_que_me_encuentro = ($(combo_deptos).val())
		app.secciones.seccionlistaofertas.listar();

	}
	
	this.listar =  function ($busqueda_obsoleta, $callback){
		
		var where = '';

		var busqueda = $.trim($('#Header_search').val())
		if(busqueda != '' && busqueda != 'Buscar...'){
			$(titulo_seccion).html('Descuentos')
			categoria_seleccionada = -1
			where += '  (ofertas_nombre LIKE "%' + busqueda + '%" OR ofertas_tags LIKE "%' + busqueda + '%") AND ';
		}
		if(categoria_seleccionada>-1){
			where += ' ofertas_ofertas_tipo_id='+categoria_seleccionada+' AND '
		}

			console.log('categoria_seleccionada: ' + categoria_seleccionada)

		$(combo_deptos).find('option[value="'+app.depto_que_me_encuentro+'"]').prop('selected', true)
		
		app.db.transaction(function (tx) {
			//alert("SELECT * FROM locales INNER JOIN ofertas ON locales_ofertas_id=ofertas_id WHERE "+where+"  locales_departamentos_id="+app.depto_que_me_encuentro+" AND ofertas_estado=1  GROUP BY locales_ofertas_id ");
			tx.executeSql("SELECT * FROM locales INNER JOIN ofertas ON locales_ofertas_id=ofertas_id WHERE "+where+"  locales_departamentos_id="+app.depto_que_me_encuentro+" AND ofertas_estado=1  GROUP BY locales_ofertas_id " , [], function (tx, resultado) {
		    	
		    	var cant_ofertas = resultado.rows.length;

		    	$(holder).find('#ListaOfertasWrapper').empty()
		    	
		    	if(cant_ofertas == 0){

		    		//btn_ver_en_mapa.habil(false)
		    		$(holder).find('#ListaOfertasWrapper').html('<div class="sin_resultados"><div>La busqueda no ha arrojado ningun resultado en descuentos.</div></div>')
		    		
		    	}else{
		    		//btn_ver_en_mapa.habil(true)
		    	}

		        array_ids_encontrados = new Array();
		        for(var i=0; i<cant_ofertas; i++){
					array_ids_encontrados.push(resultado.rows.item(i).ofertas_id);
					var _ItemListaOferta = new ItemListaOferta(resultado.rows.item(i));
					$(holder).find('#ListaOfertasWrapper').append(_ItemListaOferta.main)
		          
		        }

				if(typeof($callback)!='undefined') $callback(cant_ofertas);

		    })
		});

	}

}

SeccionListaOfertas.prototype = new Base_Seccion();
