function LightBox(){

	var self = this
	this.main = document.createElement('div');
	this.main.className = 'LightBox'

	var ventana =  document.createElement('div');
		ventana.className = 'HolderLightBox_ventana'
		$(this.main).append(ventana)

	
	var holder =  document.createElement('div');
		holder.className = 'HolderLightBox'
		$(ventana).append(holder)


	var cerrar_btn =  new Boton('img/ligthbox/cerrar.png', cerrar)
		cerrar_btn.main.className = 'CerrarLightBox'
		$(ventana).append(cerrar_btn.main)

	var obj;

	var esta_visible = false
	$(ventana).transition({opacity:0, scale:1.2}, 0)

	
	function cerrar(){
		self.ocultar()
	}

	this.ocultar = function(){


		$("input").blur();
		$(ventana).transition({opacity:0, scale:1.2}, 300, 'easeInBack')
		
		setTimeout(function(){
		
			$(self.main).css('pointer-events', 'none');
			$(holder).empty()
			esta_visible = false
		}, 300)

		 $(document).trigger('OCULTAR_LIGHTBOX');
		 $(document).trigger("CONTINUAR_CONTADOR");
	} 


	this.mostrar = function($width, $height, $obj, $con_cerrar){
		
		esta_visible = true

		if(typeof $con_cerrar == 'undefined') $(cerrar_btn.main).show();
		else if ($con_cerrar === false)  $(cerrar_btn.main).hide()

		$(self.main).css('pointer-events', 'auto');

		$(holder).html('')

		var p = parseInt($(this.main).css('padding'), 10)
		
		$(ventana).css({width: $width, height: $height, "margin-left": -($width/2)-p, "margin-top": -($height/2)-p})
		obj = $obj;

		$(holder).html(obj.main);
		
		$(ventana).delay(150).transition({
		  scale:1,
		  opacity:1
		}, 300, 'easeOutBack')

		$(document).trigger('MOSTRAR_LIGHTBOX');
		$(document).trigger("PAUSAR_CONTADOR");


	}
	
}
