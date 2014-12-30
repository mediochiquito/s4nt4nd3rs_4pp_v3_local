function SeccionMisCodigos()
{
	
	this.main.id = 'SeccionMisCodigos';

	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({width: app.ancho-20, height: app.alto-60})

	var titulo_seccion =  document.createElement('div')
	titulo_seccion.className = 'titulo_seccion'
	$(holder_blanco_secciones).append(titulo_seccion)

	var combo_deptos = document.createElement('select');
	combo_deptos.id = 'SeccionMisCodigos_combo_deptos'
	$(combo_deptos).bind('change', doChangeDepto)
	$(combo_deptos).attr('disabled', true)
	
	for(var i=0; i< app.array_deptos.length; i++){
		
		var option =  document.createElement('option');
		option.value = (i+1)
		$(option).append(app.array_deptos[i])
		$(combo_deptos).append(option);
		
	}

	var holder = document.createElement('div')
	holder.id = 'SeccionMisCodigos_holder'
	holder.className = 'Tabs_holder'
	$(holder).append('<div id="SeccionMisCodigos_holder_combo_deptos"><div id="SeccionMisCodigos_txt_deptos">Departamento:</div></div><div id="MisCodigosWrapper"></div>')
	$(this.main).append(holder)

	
	$(holder).css({width: app.ancho-40, height: app.alto-100});
	
	var categoria_seleccionada = -1;

	setTimeout(function (){
		$('#SeccionMisCodigos_holder_combo_deptos').append(combo_deptos);
		
	}, 0)

	var btn_volver = new Boton2Frames("img/btn_volver_rojo.svg", 25, 50, doVolver)
	btn_volver.main.id = 'SeccionMisCodigos_btn_volver'
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
	
		$(titulo_seccion).html('Mis códigos de promoción')
		this.listar();
		$(combo_deptos).attr('disabled', false)

	}
		

	function doChangeDepto(){

		app.depto_que_me_encuentro = ($(combo_deptos).val())
		app.secciones.seccionmiscodigos.listar();

	}
	
	this.listar =  function ($busqueda_obsoleta, $callback){
		

		$(combo_deptos).find('option[value="'+app.depto_que_me_encuentro+'"]').prop('selected', true)

		app.db.transaction(function (tx) {
			
				tx.executeSql("SELECT * FROM codes WHERE codes_depto="+app.depto_que_me_encuentro+"  GROUP BY codes_promo_id ORDER BY codes_ini ASC, codes_id ASC" , [], function (tx, resultado) {
		    	
		    	var cant_Codigos = resultado.rows.length;
		    
		    	$(holder).find('#MisCodigosWrapper').empty()
		    	
		    	if(cant_Codigos == 0){

		    		$(holder).find('#MisCodigosWrapper').html('<div class="sin_resultados"><div>Aun no tienes ningún código en este departamento.</div></div>')
		    		
		    	}

		     
		        for(var i=0; i<cant_Codigos; i++){
					
					var _ItemMisCodigos = new ItemMisCodigos(resultado.rows.item(i));
					$(holder).find('#MisCodigosWrapper').append(_ItemMisCodigos.main)
		          
		        }

				if(typeof($callback)!='undefined') $callback(cant_Codigos);

		    })
		});

/*
		
		$(holder).find('#SeccionMisCodigosWrapper').empty()
		for(var promo in app.json_Codigos){
			
			if(app.json_Codigos[promo].depto == app.depto_que_me_encuentro){
				
				//for(var i=0; i<5;i++){
					var _ItemMisCodigos = new ItemMisCodigos(app.json_Codigos[promo]);
					$(holder).find('#SeccionMisCodigosWrapper').append(_ItemMisCodigos.main)
				//}
			}
				
		          
		}
		
*/
	}

}

SeccionMisCodigos.prototype = new Base_Seccion();
