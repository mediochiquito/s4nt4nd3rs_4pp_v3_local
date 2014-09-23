function Header(){ 
	
	var self = this
  	this.main = document.createElement('div')
  	this.main.id = 'Header'

	var logito = new Image()
	logito.src = 'img/header/logito.png';
	logito.id = 'Header_logito';
	$(this.main).append(logito);


	var btn_menu = new Boton2Frames('img/header/btn_menu.png', 50, 60, doMenu)
	btn_menu.main.id = 'Header_btn_menu'
	$(this.main).append(btn_menu.main)

	var search = document.createElement('input');
	search.id = 'Header_search';
	search.type = 'text';
	$(this.main).append(search);
	$(search).bind('keyup', doKeyUp)
	$(search).bind('click', do_click)
	$(search).bind('touchstart', do_touchstart)
	$(search).bind('blur', do_blur)
	$(search).attr('tabindex', -1)

	var btn_close = new Boton2Frames('img/header/close.svg', 30, 60, do_click_btn_close)
	btn_close.main.id = 'Header_btn_close'
	$(btn_close.main).bind('touchstart', doTocuhStartClose)
	$(this.main).append(btn_close.main)
	$(btn_close.main).hide()

	var ancho_search = 210+((app.ancho-320)/2)
	if(ancho_search>270) ancho_search = 270;
	$(search).css({'width':ancho_search});

	var wm = 'Buscar...';
	$(search).val(wm);

	var intervalo_tipeo;
	var ultima_busqeuda = ''

	function do_blur(){
		if($(search).val() == '') $(search).val(wm);
	}
	function doTocuhStartClose(){
		
		$(search).css('pointer-events', 'none');
		setTimeout(function(){
			$(search).css('pointer-events', 'auto');

		}, 500)

	}
	function do_touchstart(){

		$(search).focus();
		if($(search).val() == wm) $(search).val('');
	}

	function doKeyUp(e){

	
		if($(search).val().length > 0) $(btn_close.main).show();

	

		try{
			clearTimeout(intervalo_tipeo)
		}catch(e){}

		intervalo_tipeo = setTimeout(enviar_busqueda, 500)



	}

	this.borrar_busqueda = function(){
		ultima_busqeuda = ''
		$(search).val('');
	}


	function enviar_busqueda(){

		if($(search).val().length>0 && $(search).val().length<=3){
			app.alerta('La busqueda debe contener mas de 3 digitos.')
			return;
		}
		
		if(ultima_busqeuda!=$(search).val()){
		
			ultima_busqeuda = $(search).val();

				app.secciones.seccionlistaeventos.listar($(search).val(), function ($cantidad_eventos){
		
					app.secciones.seccionlistaofertas.listar($(search).val(), function ($cantidad_ofertas){
							
							if($(search).val() != ''){
			
								if($cantidad_ofertas>$cantidad_eventos) app.secciones.go(app.secciones.seccionlistaofertas, 300)
								else app.secciones.go(app.secciones.seccionlistaeventos, 300)

							}else{
								
								app.secciones.go(app.secciones.seccionhome, 300)
									
							}
						 
					});
				});

		}
		
	}


	function do_click(){
		
		if($(search).val() == wm) $(search).val('');

	}

	function do_click_btn_close(){

		$(search).val('');
		$(search).blur();
		$(btn_close.main).hide()
		
			app.secciones.go(app.secciones.seccionhome, 300)

		setTimeout(function(){
			$(search).blur();

		}, 200);
		

	}
	function doMenu(){
		app.secciones.toogle_desplazar()
	}
	
	this.mostrar_menu = function(){

		$(btn_menu.main).transition({x:0}, 500)
		$(logito).transition({x:0}, 500);

	}

	this.ocultar_menu = function(){

		$(btn_menu.main).transition({x:-20}, 500)
		$(logito).transition({x:-15}, 500)
		
		
	}



}

