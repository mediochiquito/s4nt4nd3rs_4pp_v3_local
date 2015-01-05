function ItemLocalPromo($row, $con_gps, $num)
{
	var self = this;
	this.main =  document.createElement('div')
	this.main.id = 'ItemLocalPromo';

	var header_titulo =  document.createElement('div')
	header_titulo.id = 'ItemLocalPromo_header_titulo'



	$(this.main).append(header_titulo)
	
	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'ItemLocalPromo_titulo_txt'
	$(header_titulo).append(titulo_txt)

	var btn_ver_en_mapa = new Boton2Frames("img/promos/marker_lineas.svg", 25, 50, doVerEnMapa)
	btn_ver_en_mapa.main.id = 'UnaOferta_btn_ver_en_mapa'
	$(header_titulo).append(btn_ver_en_mapa.main)

	$(titulo_txt).html($row.promos_locales_localidad +'<br />' + $row.promos_locales_dir+'<br style="clear:both;" />' );		
	

	var holder_regs =  document.createElement('div')
	$(holder_regs).hide()
	$(this.main).append(holder_regs)

	addRegistro('Teléfono', $row.promos_locales_tel, '#E91C24')
	addRegistro('Dirección', $row.promos_locales_dir)
	

	var haciendo_click = false;
	var inter_pintar;

	if(app.es_touch()){
		
		header_titulo.addEventListener('touchstart', doTocuhStart);
		header_titulo.addEventListener('touchend', doTocuhEnd);

	}else{

		header_titulo.addEventListener('click', doClick);

	}
	if($num == 0) $(holder_regs).show();


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
		if($con_gps) $(header_titulo).append('<div class="ItemLocalPromo_disancia">'+distance(app.posicion_global.coords.latitude, app.posicion_global.coords.longitude, $row.promos_locales_lat, $row.promos_locales_lon, 'K').toFixed(2)+' KM.</div>')
	}, 0)
	

	function doVerEnMapa(){
		
		app.secciones.go(app.secciones.seccionmapa, 300, {desde_donde_viene: 'una_promo', row_local:$row});

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


	function addRegistro($label, $data, $color){
		if($data!=''){

			$(holder_regs).append('<div class="UnaOferta_reg"><div class="UnaOferta_label">'+ $label+
							  '</div><div class="UnaOferta_data" ><div style="color:'+$color+'">'+ $data+
							  '</div></div><br style="clear:both" /></div>');
		}
		
		
	}


}

