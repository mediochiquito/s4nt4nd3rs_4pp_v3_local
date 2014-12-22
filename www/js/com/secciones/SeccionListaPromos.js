function SeccionListaPromos()
{
	
	this.main.id = 'ListaPromos';

	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({width: app.ancho-20, height: app.alto-60})

	var titulo_seccion =  document.createElement('div')
	titulo_seccion.className = 'titulo_seccion'
	$(holder_blanco_secciones).append(titulo_seccion)


	var combo_deptos = document.createElement('select');
	combo_deptos.id = 'ListaPromos_combo_deptos'
	$(combo_deptos).bind('change', doChangeDepto)
	$(combo_deptos).attr('disabled', true)
	for(var i=0; i< app.array_deptos.length; i++){

		var option =  document.createElement('option');
		option.value = (i+1)
		$(option).append(app.array_deptos[i])
		$(combo_deptos).append(option);

	}

	var holder = document.createElement('div')
	holder.id = 'ListaPromos_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div id="ListaPromos_holder_combo_deptos"><div id="ListaPromos_txt_deptos">Departamento:</div></div><div id="ListaPromosWrapper">')
	$(this.main).append(holder)

	var array_ids_encontrados;

	$(holder).css({width: app.ancho-40, height: app.alto-100});
	
	var categoria_seleccionada = -1;

	setTimeout(function (){
		$('#ListaPromos_holder_combo_deptos').append(combo_deptos);
		
	}, 0)

	var btn_volver = new Boton2Frames("img/btn_volver_rojo.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnaOferta_btn_volver'
	$(holder_blanco_secciones).append(btn_volver.main)

	var _self = this

	$(document).bind('cerrando_menu', function(){
		if($(_self.main).css('opacity')==1) $(combo_deptos).attr('disabled', false)
	})

	function doVolver(){
		app.secciones.go(app.secciones.seccionhome, 300)
	}

	this._remove = function(){
		$(combo_deptos).attr('disabled', true)
	}

	this._set = function ($data){
	
		$(titulo_seccion).html('Promociones')
		this.listar();
		$(combo_deptos).attr('disabled', false)

	}
		

	function doChangeDepto(){

		app.depto_que_me_encuentro = ($(combo_deptos).val())
		app.secciones.seccionlistapromos.listar();

	}
	
	this.listar =  function ($busqueda_obsoleta, $callback){
		
		

		$(combo_deptos).find('option[value="'+app.depto_que_me_encuentro+'"]').prop('selected', true)
		$(holder).find('#ListaPromosWrapper').empty()
		for(var promo in app.json_promos){
			
			if(app.json_promos[promo].depto == app.depto_que_me_encuentro){
				//for(var i=0; i<5;i++){
					var _ItemListaPromos = new ItemListaPromos(app.json_promos[promo]);
					$(holder).find('#ListaPromosWrapper').append(_ItemListaPromos.main)
				//}
			}
				
		          
		}


		/*app.db.transaction(function (tx) {
			
			//alert("SELECT * FROM locales INNER JOIN ofertas ON locales_ofertas_id=ofertas_id WHERE "+where+"  locales_departamentos_id="+app.depto_que_me_encuentro+" AND ofertas_estado=1  GROUP BY locales_ofertas_id ");
			tx.executeSql("SELECT * FROM locales INNER JOIN ofertas ON locales_ofertas_id=ofertas_id WHERE "+where+"  locales_departamentos_id="+app.depto_que_me_encuentro+" AND ofertas_estado=1  GROUP BY locales_ofertas_id " , [], function (tx, resultado) {
		    	
		    	var cant_ofertas = resultado.rows.length;

		    	$(holder).find('#ListaPromosWrapper').empty()
		    	
		    	if(cant_ofertas == 0){

		    		//btn_ver_en_mapa.habil(false)
		    		$(holder).find('#ListaPromosWrapper').html('<div class="sin_resultados"><div>No contamos con descuentos para esta categoría en este departamento. Intentá con otra categoría u otra ubicación.</div></div>')
		    		
		    	}else{
		    		//btn_ver_en_mapa.habil(true)
		    	}

		        array_ids_encontrados = new Array();
		        for(var i=0; i<cant_ofertas; i++){
					var _ItemListaOferta = new ItemListaOferta(resultado.rows.item(i));
					$(holder).find('#ListaPromosWrapper').append(_ItemListaOferta.main)
		          
		        }

				if(typeof($callback)!='undefined') $callback(cant_ofertas);

		    })
		});*/

	}

}

SeccionListaPromos.prototype = new Base_Seccion();
