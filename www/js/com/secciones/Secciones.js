function Secciones(){ 
	
	var self = this

  	this.main = document.createElement('div')
  	this.main.id = 'secciones'

  	this.seccionhome = new SeccionHome();
	$(this.main).append(this.seccionhome.main)
	this.seccionhome.ocultar(0);

	this.seccionhomeofertas = new SeccionHomeOfertas();
	$(this.main).append(this.seccionhomeofertas.main)
	this.seccionhomeofertas.ocultar(0);

	this.seccionhomeeventos = new SeccionHomeEventos();
	$(this.main).append(this.seccionhomeeventos.main)
	this.seccionhomeeventos.ocultar(0);

	this.seccionlistaeventos = new SeccionListaEventos();
	$(this.main).append(this.seccionlistaeventos.main)
	this.seccionlistaeventos.ocultar(0);

	this.seccionunevento = new SeccionUnEvento();
	$(this.main).append(this.seccionunevento.main)
	this.seccionunevento.ocultar(0);

	this.seccionlistaofertas = new SeccionListaOfertas();
	$(this.main).append(this.seccionlistaofertas.main)
	this.seccionlistaofertas.ocultar(0);

	this.seccionunaoferta = new SeccionUnaOferta();
	$(this.main).append(this.seccionunaoferta.main)
	this.seccionunaoferta.ocultar(0);

	this.seccionterms = new SeccionTerms();
	$(this.main).append(this.seccionterms.main)
	this.seccionterms.ocultar(0);

	this.secciontermsbanner = new SeccionTermsBanner();
	$(this.main).append(this.secciontermsbanner.main);
	this.secciontermsbanner.ocultar(0);

	this.seccionmapa = new SeccionMapa();
	$(this.main).append(this.seccionmapa.main)
	this.seccionmapa.ocultar(0);

	this.seccionpush = new SeccionPush();
	$(this.main).append(this.seccionpush.main)
	this.seccionpush.ocultar(0);

	var despazada = false;
	var historia = new Array()

	document.addEventListener("backbutton", backKeyDown, false);

	var obj_seccion_actual = null;	
	var cambiando_historia = false;
	this.get_obj_seccion_actual = function (){
		return obj_seccion_actual;
	}


	this.cerrar_desplazamiento = function (){

		$(self.main).transition({x:0})
		despazada = false
		$('#Header').removeClass('header_con_sombra')

	}

	this.toogle_desplazar =  function(){

		if(!despazada){
			$(self.main).transition({x:230})
			$('#Header').addClass('header_con_sombra')
			despazada = true
		}else{
			this.cerrar_desplazamiento()
		}
		

	}


	function backKeyDown(){

			if(!cambiando_historia){
						
				if(historia.length<=1) 	{
					
					navigator.app.exitApp();
					e.preventDefault();

				}else{

					cambiando_historia = true;
					if(historia.length>1) historia.pop();
					var penultimo_elemento = historia[historia.length-1];
					app.secciones.go(penultimo_elemento[0], 300, penultimo_elemento[1], false);
					setTimeout(function (){
						cambiando_historia = false;
					}, 500)
				}

			}
		
		
	}
	this.go = function($base_seccion, $time, $data, $guardar_historia){
		self.cerrar_desplazamiento()
		var guardar_historia = true;
		if(typeof($guardar_historia) != 'undefined') guardar_historia =  $guardar_historia;
		
		if($base_seccion.main.id == 'SeccionMenu') app.header.ocultar_menu()
		else  app.header.mostrar_menu()

		if($base_seccion==obj_seccion_actual) return;
		var d = new Date()
		//document.location.href = '#'  + d.getTime();
		$(this.main).css({ display: 'block'});
		
		try{
			if($base_seccion != obj_seccion_actual)
				obj_seccion_actual.ocultar($time);
		}catch(e){}
		
		if(guardar_historia) historia.push([$base_seccion, $data]);

		$base_seccion.mostrar($time, $data);

		obj_seccion_actual = $base_seccion
			
		
	}

	this._close_all = function(){
		
		$(document).trigger('CERRANDO_TODAS_LAS_SECCIONES');
		obj_seccion_actual.ocultar();
		obj_seccion_actual = null;

	}

}

