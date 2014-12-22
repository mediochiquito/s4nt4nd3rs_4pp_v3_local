function ItemListaPromos($row)
{
	
	var self = this
	this.main = document.createElement('div');
	this.main.className = 'ItemListaPromos';

	var txt = document.createElement('div');
	txt.className = 'ItemListaPromos_txt_nombre';
	$(this.main).append(txt)
	$(txt).html($row.lugar)
	
	if($row.type == 0){

		var hoy = new Image();
		hoy.className =  'ItemListaPromos_hoy';
		hoy.src = 'img/hoy.png';
		$(this.main).append(hoy);


	}
	
	var haciendo_click = false;
	var inter_pintar;
	if($row.type > -1){
		if(app.es_touch()){
			
			this.main.addEventListener('touchstart', doTocuhStart);
			this.main.addEventListener('touchend', doTocuhEnd);

		}else{

			this.main.addEventListener('click', doClick);

		}
	}else{

		$(txt).css('color', '#ccc')
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
				app.secciones.go(app.secciones.seccionunapromo, 300, {row: $row})
			}, 200)
			setTimeout(despintar, 800)
			haciendo_click = false
		}
	}

	function doClick(e){
		pintar()
		setTimeout(function(){
			app.secciones.go(app.secciones.seccionunapromo, 300, {row: $row})

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

