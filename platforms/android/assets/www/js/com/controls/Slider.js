function Slider(){

	var self = this
	this.main = document.createElement('div');
	this.main.className = 'rangeslider'
	$(this.main).css({	width: app.ancho-85})

	var titulo =  document.createElement('div');
	titulo.className = 'rangeslider_tiutlo'
	$(titulo).html('Distancia de preferencia (Kms)');
	$(this.main).append(titulo)


	var holder_labels =  document.createElement('div');
	holder_labels.className = 'rangeslider_holder_labels'
	$(holder_labels).html('<div style="left:0%">0</div><div style="left:20%">1</div><div style="left:40%">2</div><div style="left:60%">3</div><div style="left:80%">4</div><div style="left:100%">5</div>');
	$(this.main).append(holder_labels)




	var slider = document.createElement('input')
	slider.type = 'range'
	slider.min =  1

	slider.max = 5
	slider.value = 1
	$(this.main).append(slider)
	var maxima_slide = (app.ancho-115)
	var distancia_elegida ;
	var inter;

	setTimeout(function(){

			 $(function() {
	            $('input[type="range"]').rangeslider({
	                polyfill: false,
	              	
	                onSlide: function(position, value) {
	                    // do some stuff ...

	              		distancia_elegida = position;
	              		app.secciones.seccionmapa.ini_set_Distancia(distancia_elegida, maxima_slide)
	                },

	                onSlideEnd: function(position, value) {
	                 	
	                 	try{
	                 		clearInterval(inter)
	                 	}catch(e){}
	                 	
	                 	inter = setTimeout(function(){
	                 		app.secciones.seccionmapa.set_Distancia(distancia_elegida, maxima_slide)
	                 	}, 500)	

	                }


	            });
	           
	        });

	}, 0)



	this.mostrar = function($b){
		
		
			$(self.main).show()
	

	}
	this.ocultar = function($b){
		
		
			$(self.main).hide()
	

	}


}