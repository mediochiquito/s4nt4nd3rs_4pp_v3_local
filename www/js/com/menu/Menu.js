function Menu()
{
	var self = this
  	this.main = document.createElement('div')
	this.main.id = 'SeccionMenu';

	var holder = document.createElement('div')
	holder.id = 'SeccionMenu_holder'
	$(this.main).append(holder)

	var btn_descuentos = new ItemMenu('Descuentos', 'icon_ofertas.svg', doVerDescuentos)
	$(holder).append(btn_descuentos.main)

	var btn_eventos = new ItemMenu('Eventos', 'icon_eventos.svg', doVerEventos)
	$(holder).append(btn_eventos.main)

	var btn_promos = new ItemMenu('Promociones', 'icon_promos.svg', doPromos)
	$(btn_promos.main).hide()
	$(holder).append(btn_promos.main)

	var btn_codigos = new ItemMenu('Mis Códigos de Promoción', 'icon_codigos.svg', doCodigos)
	$(holder).append(btn_codigos.main)

	var btn_notitficaciones = new ItemMenu('Notificaciones Push', 'icon_push.svg', doPush)
	$(holder).append(btn_notitficaciones.main)

	var btn_terms = new ItemMenu('Términos y Condiciones', 'icon_terms.svg', doTerms)
	$(holder).append(btn_terms.main)

	$(document).bind('on_cargo_pommos', on_cargo_pommos);


	setTimeout(function(){
		$('#SeccionMenu_header_bg').css({width: app.ancho-20})
	})

	function on_cargo_pommos(){
			$(btn_promos.main).show()
	}
	

	function doCheckPush(){
			
	}
	


	function doPromos(){
		app.secciones.go(app.secciones.seccionlistapromos)
	}
	function doCodigos(){
		app.secciones.go(app.secciones.seccionmiscodigos)
	}
	function doTerms(){


		app.secciones.go(app.secciones.seccionterms)
	}
	function doPush(){

		if(!app.hay_internet()) {
			app.alerta('Debes conectarte a internet para ejecutar esta acción.')
			return;
		}

		app.secciones.go(app.secciones.seccionpush)

	}

	function doVerDescuentos(){

		app.secciones.go(app.secciones.seccionhomeofertas, 300);
	}

	function doVerEventos(){
		app.secciones.go(app.secciones.seccionhomeeventos, 300);
	}


	function doVerMapa(){

		app.secciones.go(app.secciones.seccionmapa, 300, {desde:'menu'});

	}

}
