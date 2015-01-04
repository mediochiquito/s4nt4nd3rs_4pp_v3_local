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


	var btn_promos = new BotonDashboard('promos/promo', 'Promociones', doVerPromos)

	btn_promos.main.id = 'SeccionHome_btn_promos'
	$(this.main).append(btn_promos.main)
	btn_promos.habil(false)


	$(document).bind('on_cargo_pommos', on_cargo_pommos);

	$(this.main).append('<div class="spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div>');
		
	function on_cargo_pommos(){

		$('#SeccionHome .spinner').hide()
		if(app.json_promos != null){
			btn_promos.habil(true)
		}else{
			btn_promos.habil(false)
		}
	}

	function doVerPromos(){

		app.secciones.go(app.secciones.seccionlistapromos, 300);

	}

	function doVerDescuentos(){

		app.secciones.go(app.secciones.seccionhomeofertas, 300);

	}

	function doVerEventos(){

		app.secciones.go(app.secciones.seccionhomeeventos, 300);
	}


	function doVerMapa(){

		app.secciones.go(app.secciones.seccionmapa);

	}




}
SeccionHome.prototype = new Base_Seccion();