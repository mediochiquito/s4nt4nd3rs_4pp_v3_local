function SeccionHome()
{

	this.main.id = 'SeccionHome';
	this.ocultar(0);
	
	var promo = new Image()
	promo.src = 'img/home/promo.png';
	promo.id = 'SeccionHome_promo';
	$(this.main).append(promo);


	var btn_descuentos = new BotonDashboard('descuentos', 'Descuentos', doVerDescuentos)
	btn_descuentos.main.id = 'SeccionHome_btn_descuentos'
	$(this.main).append(btn_descuentos.main)

	var btn_eventos = new BotonDashboard('eventos', 'Eventos', doVerEventos)
	btn_eventos.main.id = 'SeccionHome_btn_eventos'
	$(this.main).append(btn_eventos.main)

	function doVerDescuentos(){

		//app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'ofertas'});
		app.secciones.go(app.secciones.seccionhomeofertas, 300);

	}

	function doVerEventos(){
		//app.secciones.go(app.secciones.seccioneventosofertas, 300, {solapa: 'eventos'});
		app.secciones.go(app.secciones.seccionhomeeventos, 300);
	}


	function doVerMapa(){

		app.secciones.go(app.secciones.seccionmapa);

	}

}
SeccionHome.prototype = new Base_Seccion();