function ItemDeptoPush($num, $label)
{
	
	var self = this
	this.main =  document.createElement('div')
	this.main.className = 'ItemDeptoPush';
	


	var col1 =  document.createElement('div')
	col1.className = 'Push_col1'
	$(col1).html($label)
	$(this.main).append(col1)



	var col2 =  document.createElement('div')
	col2.className = 'Push_col2'
	$(this.main).append(col2)
	var chk_eventos = new BotonToogle("img/mapa/checkbox.svg", 'eventos' , 20, 40, _callback)
	$(col2).append(chk_eventos.main);



	var col3 =  document.createElement('div')
	col3.className = 'Push_col3'
	$(this.main).append(col3)
	var chk_ofertas = new BotonToogle("img/mapa/checkbox.svg", 'ofertas' , 20, 40, _callback)
	$(col3).append(chk_ofertas.main);
	

	this._clear = function (){

		 chk_eventos.setSelected(false);
		 chk_ofertas.setSelected(false);
	}
   
	function _callback(){
		app.secciones.seccionpush.marcar_actividad()
	}

	this._select = function($type){
		
		switch($type){
			case "eventos":  chk_eventos.setSelected(true);  break;
			case "ofertas":  chk_ofertas.setSelected(true);  break;
		}

	}

 	this.getValue =  function(){

 		return {e:chk_eventos.getSelected(), o:chk_ofertas.getSelected()};

 	}

	
		

}