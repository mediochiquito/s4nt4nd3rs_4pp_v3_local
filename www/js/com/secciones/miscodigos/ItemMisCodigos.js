function ItemMisCodigos($row)
{
	
	var self = this
	this.main = document.createElement('div');
	this.main.className = 'ItemMisCodigos';

	var txt_lugar = document.createElement('div');
	txt_lugar.className = 'SeccionMisCodigos_txt_lugar';
	$(this.main).append(txt_lugar)
	$(txt_lugar).html($row.codes_lugar)
	
	var txt_code = document.createElement('div');
	txt_code.className = 'SeccionMisCodigos_txt_code';
	$(this.main).append(txt_code);
	$(txt_code).html($row.codes_code);

	/*
	if($row.type == 0){

		var hoy = new Image();
		hoy.className =  'SeccionMisCodigos_hoy';
		hoy.src = 'img/hoy.png';
		$(this.main).append(hoy);

	}*/
	
	var haciendo_click = false;
	var inter_pintar;

	var array_fecha_fin  = $row.codes_fin.split('-')

	//var fin = new Date($row.codes_fin + ' 00:00:00')
	var fin = new Date(array_fecha_fin[0],(array_fecha_fin[1]-1),array_fecha_fin[2],0,0,0,0);
	
	var now = new Date()
	var ahora = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0,0);

	if($row.codes_usado == '0000-00-00 00:00:00' && ahora.getTime()<=fin.getTime()){
		if(app.es_touch()){
			
			this.main.addEventListener('touchstart', doTocuhStart);
			this.main.addEventListener('touchend', doTocuhEnd);

		}else{

			this.main.addEventListener('click', doClick);

		}
	}else{

		$(txt_lugar).css('color', '#ccc')
		$(txt_code).css('color', '#ccc')
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
			setTimeout(function(){
				app.secciones.go(app.secciones.seccionuncodigo, 300, {desde:'lista_codes', code: $row.codes_code, lugar: $row.codes_lugar});
			}, 200)
			setTimeout(despintar, 800)
			haciendo_click = false
		}
	}

	function doClick(e){
		pintar()
		setTimeout(function(){
			app.secciones.go(app.secciones.seccionuncodigo, 300, {desde:'lista_codes', code: $row.codes_code, lugar: $row.codes_lugar});
		}, 200)
		setTimeout(despintar, 800)
	}

	function pintar(){

		$(self.main).css('background-color', '#ccc')

	}
	function despintar(){

		$(self.main).css('background-color', '#fff')
	
	}
}

