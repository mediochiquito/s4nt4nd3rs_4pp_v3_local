function SeccionHomeOfertas()
{

	this.main.id = 'SeccionHomeOfertas';
	this.main.className = 'SeccionHomeScrollPane'
	$(this.main).css({height: app.alto - 50})
	this.ocultar(0);

	var tipos = (eval(app.json_db_tipo_ofertas))

	var holder_banner =  document.createElement('div');
	holder_banner.id = 'SeccionHomeOfertas_holder_banner'
	$(this.main).append(holder_banner)

	var holder_grid =  document.createElement('div');
	holder_grid.className = 'SeccionHomeScrollPane_holdergrid'
	$(this.main).append(holder_grid)

	var btn_que_hay_cerca = new BotonNormalDashboard('¿QUE HAY CERCA DE AQUÍ?', doQueHayAqui)
	btn_que_hay_cerca.main.id = 'SeccionHomeOfertas_que_hay_cerca'
	$(holder_grid).append(btn_que_hay_cerca.main)


	var en_col = 0;
	var en_fila = 0;

	for(var i=0; i<tipos.length; i++){

		if(en_col>2){
			en_col = 0;
			en_fila++;
		}

		var btn = new BotonDashboard('ofertas/'+tipos[i].ofertas_tipo_id, tipos[i].ofertas_tipo_nombre, function($data){
			app.secciones.go(app.secciones.seccionlistaofertas, 300, {id: $data});
		});

		btn.data = tipos[i].ofertas_tipo_id;

		$(btn.main).css('top', (100* en_fila)+60);
		$(btn.main).css('left', 90* en_col);
		$(holder_grid).append(btn.main)
		en_col++
	}
	$(holder_grid).css('height', (100* en_fila)+180);


	
	cargar_banner_oferta()
	
	this._set =  function(){
		app.header.borrar_busqueda()
	}

	function doQueHayAqui(){

		app.secciones.go(app.secciones.seccionmapa, 300, {desde_donde_viene:'home_ofertas', solo_ver:'ofertas'})
		
	}

	function cargar_banner_oferta(){
		
		 $.ajax({
				type: "GET",
				url: app.server + "json.get_banner.php",
				dataType: 'json',
				async : false
			}).success(function($json) {

				if($json!==false) {
					
					$(holder_banner).html('<img width="'+(app.ancho-40)+'" src="http://santander.crudo.com.uy/'+$json.banners_ofertas_url+'" />')			
				//	$(holder_banner).html('<img width="'+(app.ancho-40)+'" src="'+app.server+$json.banners_ofertas_url+'" />')
						
						//
					/*	setTimeout(function(){
							var btn_terms = new Boton2Frames("img/ofertas/btn_terms_banner.svg", 20, 40, function(){

								app.secciones.go(app.secciones.secciontermsbanner, 300, {id:$json.banners_ofertas_id})
							})
							btn_terms.main.id = 'ListaOfertas_btn_ver_terms'
							$('#ListaOfertas_header_banner').append(btn_terms.main)

						}, 0)*/
						

				}else $('#ListaOferta_banner').hide()
			});

	}




	function doVerDescuentos(){

		app.secciones.go(app.secciones.seccionhomeofertas);

	}

	function doVerEventos(){
		//app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'eventos'});
	}



}

SeccionHomeOfertas.prototype = new Base_Seccion();