function SeccionHomeEventos()
{

	this.main.id = 'SeccionHomeEventos';
	this.main.className = 'SeccionHomeScrollPane'
	$(this.main).css({height: app.alto - 50})
	this.ocultar(0);

	var tipos = (eval(app.json_db_tipo_categorias))

	var img= new Image()
		img.src = 'img/eventos/que_hay_para_hacer.png'
		img.id = 'SeccionHomeEventos_banner_que_hay_para_hacer'
		$(this.main).append(img)

	var holder_grid =  document.createElement('div');
	holder_grid.className = 'SeccionHomeScrollPane_holdergrid'
	$(this.main).append(holder_grid)

	var btn_eventos_hoy = new BotonNormalDashboard('VER EVENTOS PARA HOY', doEventosHoy)
	btn_eventos_hoy.main.id = 'SeccionHomeEventos_eventos_hoy'
	$(holder_grid).append(btn_eventos_hoy.main)


	var en_col = 0;
	var en_fila = 0;

		for(var i=0; i<tipos.length; i++){

			if(en_col>2){
				en_col = 0;
				en_fila++;
			}

			var btn = new BotonDashboard('categorias/' + tipos[i].categorias_id, tipos[i].categorias_nombre, function($data){
				app.secciones.go(app.secciones.seccionlistaeventos, 300, {id_categoria: $data});
			});

			btn.data = tipos[i].categorias_id;

			$(btn.main).css('top', (90* en_fila)+60);
			$(btn.main).css('left', 90* en_col);
			$(holder_grid).append(btn.main)
			en_col++;

		}

		var btn = new BotonDashboard('categorias/cale', 'Calendario', function(){

			var options = {
			   date: new Date(),
			   allowOldDates:false,
			   mode : 'date',
			   allowFutureDates : true
			};
						
			datePicker.show(options, function(date){
			  
			  var _date = new Date(date)
			  app.secciones.go(app.secciones.seccionlistaeventos, 300, {fecha: ( _date.getFullYear() + '-' + (_date.getMonth()+1) + '-' + _date.getDate() )});

			});

		}, 'azul');
		

		$(btn.main).css('top', (90* en_fila)+60);
		$(btn.main).css('left', 90* en_col);
		$(holder_grid).append(btn.main)

		$(holder_grid).css('height', (100* en_fila)+180);


	this._set =  function(){
		app.header.borrar_busqueda()
	}
	function doEventosHoy(){

		var _date = new Date();
		var mes =  (_date.getMonth()+1)
		if(mes<10) mes = '0' + mes;
		var dia =  (_date.getDate())
		if(dia<10) dia = '0' + dia;
		var fecha_de_hoy = _date.getFullYear() + '-' + mes + '-' + dia;


		app.secciones.go(app.secciones.seccionlistaeventos, 300, {fecha: fecha_de_hoy});



	}

	



}

SeccionHomeEventos.prototype = new Base_Seccion();