function ItemLocal($row, $con_gps)
{
	var self = this;
	this.main =  document.createElement('div')
	this.main.id = 'ItemLocal';

	var header_titulo =  document.createElement('div')
	header_titulo.id = 'ItemLocal_header_titulo'



	$(this.main).append(header_titulo)
	
	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'ItemLocal_titulo_txt'
	$(header_titulo).append(titulo_txt)

	var btn_ver_en_mapa = new Boton2Frames("img/ofertas/marker_lineas.svg", 25, 50, doVerEnMapa)
	btn_ver_en_mapa.main.id = 'UnaOferta_btn_ver_en_mapa'
	$(header_titulo).append(btn_ver_en_mapa.main)

	$(titulo_txt).html($row.locales_localidad +'<br />' + $row.locales_dir+'<br style="clear:both;" />' );		
	

	var holder_regs =  document.createElement('div')
	$(holder_regs).hide()
	$(this.main).append(holder_regs)

	addRegistro('Descuento', $row.locales_descuento)
	addRegistro('Cuotas', $row.locales_cutoas)
	addRegistro('Días de descuentos', $row.locales_dias)
	addRegistro('Teléfono', '<a tabindex="-1" href="tel:' + $row.locales_tel + '">' + $row.locales_tel + "</a>")
	addRegistro('Dirección', $row.locales_dir)
	addRegistro('Observaciones', $row.locales_desc)


	var haciendo_click = false;
	var inter_pintar;

	if(app.es_touch()){
		
		header_titulo.addEventListener('touchstart', doTocuhStart);
		header_titulo.addEventListener('touchend', doTocuhEnd);

	}else{

		header_titulo.addEventListener('click', doClick);

	}
	


	function doTocuhMove(){
		haciendo_click = false
		despintar()
		clearTimeout(inter_pintar)
		document.removeEventListener('touchmove', doTocuhMove);
	}
	function doTocuhStart(){
		document.addEventListener('touchmove', doTocuhMove);
		haciendo_click = true
		inter_pintar = setTimeout(pintar , 200)
	}

	function doTocuhEnd(){
		
		if(haciendo_click){
			setTimeout(self._click, 200)
			setTimeout(despintar, 800)
			haciendo_click = false
		}

	}

	this._click = function(){
		if($(holder_regs).css('display')=='none') $(holder_regs).show();
		else $(holder_regs).hide()
	}

	function doClick(e){
		pintar()
		setTimeout(self._click, 200)
		setTimeout(despintar, 800)
	}

	function pintar(){

		$(header_titulo).css('background-color', '#ccc')

	}
	function despintar(){

		$(header_titulo).css('background-color', '#dedcdc')
	
	}


	setTimeout(function(){
		if($con_gps) $(header_titulo).append('<div class="ItemLocal_disancia">'+distance(app.posicion_global.coords.latitude, app.posicion_global.coords.longitude, $row.locales_lat, $row.locales_lon, 'K').toFixed(2)+' KM.</div>')
	}, 0)
	

	function doVerEnMapa(){
		
		app.secciones.go(app.secciones.seccionmapa, 300, {desde_donde_viene: 'una_ofertas', row_local:$row});

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


	function addRegistro($label, $data){
		if($data!=''){

			$(holder_regs).append('<div class="UnaOferta_reg"><div class="UnaOferta_label">'+ $label+
							  '</div><div class="UnaOferta_data" ><div>'+ $data+
							  '</div></div><br style="clear:both" /></div>');
		}
		
		
	}


}

