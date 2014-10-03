function SeccionMapa()
{
	
	this.main.id = 'SeccionMapa';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})

    $(holder_blanco_secciones).html('<div class="spinner"><div class="bar1"></div><div class="bar2"></div><div class="bar3"></div><div class="bar4"></div><div class="bar5"></div><div class="bar6"></div><div class="bar7"></div><div class="bar8"></div><div class="bar9"></div><div class="bar10"></div><div class="bar11"></div><div class="bar12"></div></div>');
	
	var holdermap_canvas = document.createElement('div')
	holdermap_canvas.id = 'SeccionMapa_holdermap_canvas'
	$(holder_blanco_secciones).append(holdermap_canvas)

	var map_canvas = document.createElement('div')
	map_canvas.id = 'SeccionMapa_map_canvas'
	$(holdermap_canvas).append(map_canvas)

	var bounds;

	if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
	
/*		var esquina_si = new Image()
		esquina_si.src = 'img/mapa/esquina_izq.png';
		esquina_si.id = 'SeccionMapa_esquina_si';
		$(this.main).append(esquina_si);

		var esquina_der = new Image()
		esquina_der.src = 'img/mapa/esquina_der.png';
		esquina_der.id = 'SeccionMapa_esquina_der';
		$(this.main).append(esquina_der);
		$(esquina_der).css('left',app.ancho-24);*/
	}

	var my_marker;
	var array_markers;

	var map;
	var cantidad_de_listas_cargadas = 0
	var centrando_en_bounds = true
	var ultima_pos = '';
	var  config_gps = {
		minAccuracy : 150,
		highAccuracy : true,
		maximumAge : 3000,
		readTimeout : 5000
		};
	var gps_locator;
	var gps_intervalo;

	var imposible =   document.createElement('div')
	imposible.id = 'SeccionMapa_imposible';
	$(imposible).append('IMPOSIBLE OBTENER SU POSICION GLOBAL');
	$(imposible).hide()
	$(this.main).append(imposible)

	var ya_me_localizo_una_vez = false;
	var ultimo_obj = '';
	var solo_ver = '';
	var map_circle;

	var lat = "";
	var lon = "";
	var ya_creado = false;

	var btn_volver = new Boton2Frames("img/btn_volver_rojo.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnaOferta_btn_volver'
	$(holder_blanco_secciones).append(btn_volver.main)
	
	var desde_donde_viene = '';
	var distancia=0;

	var _slider
	var slider_creado = false;

	function doVolver(){

		if(desde_donde_viene == 'home_ofertas')
			app.secciones.go(app.secciones.seccionhomeofertas, 300)

		if(desde_donde_viene == 'una_ofertas')
			app.secciones.go(app.secciones.seccionunaoferta, 300)

		if(desde_donde_viene == 'lista_eventos')
			app.secciones.go(app.secciones.seccionlistaeventos, 300)

		if(desde_donde_viene == 'un_evento')
			app.secciones.go(app.secciones.seccionunevento, 300)

	}


	this.getLatLonString = function (){
		if(lat=='') return '';
		return lat + ',' + lon
	}

	this.getUltimaPos = function(){
		return ultima_pos;
	}
	
	this.googleMapsLoaded = function (){
		app.cargo_mapa = true;
		app.secciones.seccionmapa._set(ultimo_obj);
	}

	this._remove = function(){
		
		$(map_canvas).hide()
		
		
		//$(_slider.main).remove()
		
		
		for (i in array_markers) {
		  array_markers[i].setMap(null);
		}
	
		if(app.plataforma=='android'){
			$(map_canvas).remove()
			map = null;
		}
	}

	function _construct() { 
			
			if(app.plataforma=='android'){

					map_canvas = document.createElement('div')
					map_canvas.id = 'SeccionMapa_map_canvas'
					$(holdermap_canvas).append(map_canvas)
			}
				 

		  var mapOptions = {
		    zoom: 13,
		    draggable:true,
		    mapTypeControl: false,
		    zoomControl: true,
		    panControl:false,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.LARGE,
		        position: google.maps.ControlPosition.LEFT_CENTER
		    },

		     streetViewControl: false,
		     styles:[
					    {
					        featureType: "poi",
					        elementType: "labels",
					        stylers: [
					              { visibility: "off" }
					        ]
					    }
					]
		  };

		if(!ya_creado ||  app.plataforma=='android'){

			 map = new google.maps.Map(map_canvas,  mapOptions);

			 var pos = new google.maps.LatLng(-34.965311,-54.94985);
			 map.setCenter(pos);

			 my_marker = new google.maps.Marker(
			           				{ 
									  icon: {
									  		 url:'img/mapa/mypoint.png', 
									  		 scaledSize: new google.maps.Size(20, 20),
									  		 anchor: new google.maps.Point(10,10)
									  		}
									  
									});
			my_marker.setMap(map);
		
			ya_creado = true

		}
		 	
	}
	
	this._set = function (obj){

		$(map_canvas).show()

		desde_donde_viene = obj.desde_donde_viene

				ultimo_obj = obj;

				if(desde_donde_viene=='home_ofertas'){
					
					$(holdermap_canvas).css({	width: app.ancho-22, height: app.alto-190})
					$(btn_volver.main).css({	bottom: 33})


					if(!slider_creado){
						_slider = new Slider()
						$(this.main).append(_slider.main)
						slider_creado =  true

					}
					
					_slider.mostrar();

				}else{
					if(slider_creado) _slider.ocultar();
					$(holdermap_canvas).css({	width: app.ancho-22, height: app.alto-125})
					$(btn_volver.main).css({	bottom: 18})
				}

				if(!app.hay_internet()) {
					app.alerta("Debes conectarte a internet para ver el mapa.");
					return;
				}

				if(app.hay_internet() && !app.cargo_mapa){	
					$.getScript("http://maps.google.com/maps/api/js?callback=app.secciones.seccionmapa.googleMapsLoaded&sensor=false", function(){});
					return;
				}

				_construct();

				$(self.main).find('.spinner').hide()

				google.maps.event.trigger(map, 'resize');

				solo_ver = '';
				try{
					solo_ver = obj.solo_ver;
				}catch(e){}
			
			
				if(app.posicion_global!='') my_marker.setPosition(new google.maps.LatLng(app.posicion_global.coords.latitude, app.posicion_global.coords.longitude));

				switch(desde_donde_viene){
					case  'home_ofertas':
						listar_ofertas_a_distancia()
						break;
					case  'una_ofertas':
						listar_unaoferta();
						break;
					case  'lista_eventos':
						listar_eventos();
						break;
					case  'un_evento':
						listar_unevento();
						break;
				}
		
	}

	
	function listar_unevento(){

		array_markers = new Array();
		app.db.transaction(function (tx) {

			tx.executeSql("SELECT *, MIN(datetime_eventos_fecha_hora) as fecha_menor FROM eventos INNER JOIN datetime_eventos ON datetime_eventos_eventos_id = eventos_id  WHERE eventos_id=?" , [ultimo_obj.row_evento.eventos_id], function (tx, resulato_evento) {
				
		           array_markers[0] = new google.maps.Marker({

																	  position: new google.maps.LatLng(resulato_evento.rows.item(0).eventos_lat, resulato_evento.rows.item(0).eventos_lon),
																	  title:resulato_evento.rows.item(0).eventos_nombre,
																	  
																	  icon: {url:'img/markers/evento.png', scaledSize: new google.maps.Size(19, 30)},
																	  row: resulato_evento.rows.item(0)
																	});
					array_markers[0].setMap(map);

					google.maps.event.addListener(array_markers[0], 'click', function() {
					   	mostrar_un_evento(this.row)
					});

					map.setZoom(16)
		       		map.setCenter(array_markers[0].getPosition());

					setTimeout(function(){
						 google.maps.event.trigger(map, 'resize')
					}, 200)		
			    	
		    });
		});
	}

	function listar_unaoferta(){

		array_markers = new Array();
		app.db.transaction(function (tx) {
			tx.executeSql("SELECT * FROM locales INNER JOIN ofertas ON locales_ofertas_id=ofertas_id WHERE locales_id=? LIMIT 1" , [ultimo_obj.row_local.locales_id], function (tx, resulato_locales) {
		    	
		           array_markers[0] = new google.maps.Marker({

																	  position: new google.maps.LatLng(resulato_locales.rows.item(0).locales_lat, resulato_locales.rows.item(0).locales_lon),
																	  title:resulato_locales.rows.item(0).locales_nombre,
																	  
																	  icon: {url:'img/markers/oferta.png', scaledSize: new google.maps.Size(19, 30)},
																	  row: resulato_locales.rows.item(0)
																	});
					array_markers[0].setMap(map);

					google.maps.event.addListener(array_markers[0], 'click', function() {
					   	mostrar_una_oferta(this.row)
					});
					map.setZoom(16)
		       		map.setCenter(array_markers[0].getPosition());

					setTimeout(function(){
						 google.maps.event.trigger(map, 'resize')
					}, 200)		
			    
		    });
		});
	}

	function listar_eventos(){

		bounds = new google.maps.LatLngBounds();
		array_markers = new Array();
		var resultado = app.secciones.seccionlistaeventos.get_ultimo_resultado();
		var cant_eventos = resultado.rows.length;

		for(var i=0; i<cant_eventos; i++){
		
			array_markers[i] = new google.maps.Marker(
			{
									  position: new google.maps.LatLng(resultado.rows.item(i).eventos_lat,resultado.rows.item(i).eventos_lon),
									  title:resultado.rows.item(i).eventos_nombre,
									  icon: {url:'img/markers/evento.png', scaledSize: new google.maps.Size(19, 30)},
									  row: resultado.rows.item(i)
			});

			array_markers[i].setMap(map);
			bounds.extend(array_markers[i].getPosition());
			
			
			google.maps.event.addListener(array_markers[i], 'click', function() {
				mostrar_un_evento(this.row)
			});
		}
		map.fitBounds(bounds)
		if(map.getZoom()>16 ) map.setZoom(16)
		setTimeout(function(){
				google.maps.event.trigger(map, 'resize')
		}, 200)		
	}
	
	function listar_ofertas_a_distancia(){

		if(app.posicion_global == ''){
			app.alerta('No se pudo encontrar encontrar tu ubicación');
			_slider.ocultar();
			return;
		}
		
		try{

			map_circle.setMap(null)
		}catch(e){}

		 var circleOptions = {
	      strokeColor: '#FF0000',
	      strokeOpacity: 0.2,
	      strokeWeight: 2,
	      fillColor: '#FF0000',
	      fillOpacity: 0.1,
	      map: map,
	      center: my_marker.getPosition(),
	      radius: (distancia*1000)
	    };

	    map_circle = new google.maps.Circle(circleOptions);


	    for (i in array_markers) {
		    try{
		    	array_markers[i].setMap(null);
		    }catch(e){}
		}
		bounds = new google.maps.LatLngBounds();
		
		bounds.extend(my_marker.getPosition());
		app.db.transaction(function (tx) {

			tx.executeSql("SELECT * FROM locales INNER JOIN ofertas ON locales_ofertas_id=ofertas_id WHERE locales_estado=1" , [], function (tx, resulato_locales) {
		    	
		    	var cant_locales = resulato_locales.rows.length;
		    	
		    	array_markers = new Array();

		        for(var i=0; i<cant_locales; i++){

		        	var d = distance(app.posicion_global.coords.latitude, 
									 app.posicion_global.coords.longitude, 
									 resulato_locales.rows.item(i).locales_lat, 
									 resulato_locales.rows.item(i).locales_lon, 'K');
		        
				    if(d > distancia) continue;

		            array_markers[i] = new google.maps.Marker(
		           				{

								  position: new google.maps.LatLng(resulato_locales.rows.item(i).locales_lat, resulato_locales.rows.item(i).locales_lon),
								  title:resulato_locales.rows.item(i).locales_nombre,					  
								  icon: {url:'img/markers/oferta.png', scaledSize: new google.maps.Size(19, 30)},
								  row: resulato_locales.rows.item(i)

								});
					
					array_markers[i].setMap(map);
					bounds.extend(array_markers[i].getPosition());
			
					google.maps.event.addListener(array_markers[i], 'click', function() {
					   	mostrar_una_oferta(this.row)
					});


		        }
		        map.fitBounds(bounds)
		        if(map.getZoom()>16 ) map.setZoom(16)
				setTimeout(function(){
						google.maps.event.trigger(map, 'resize')
				}, 200)		

		    });


		});

	}


	this.ini_set_Distancia = function ($distancia_elegida,$maxima_slide){
		distancia = ($distancia_elegida*5)/$maxima_slide
	}
	
	this.set_Distancia = function ($distancia_elegida,$maxima_slide){
		distancia = ($distancia_elegida*5)/$maxima_slide
		listar_ofertas_a_distancia()
	}

	function distance(lat1, lon1, lat2, lon2, unit) {
		var radlat1 = Math.PI * lat1/180
		var radlat2 = Math.PI * lat2/180
		var radlon1 = Math.PI * lon1/180
		var radlon2 = Math.PI * lon2/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist
	}


	function mostrar_una_oferta($row){

		app.secciones.go(app.secciones.seccionunaoferta, 300, {row: $row})

	}

	function mostrar_un_evento($row){
	
		app.secciones.go(app.secciones.seccionunevento, 300, {row: $row})
	}

	

}

SeccionMapa.prototype = new Base_Seccion();