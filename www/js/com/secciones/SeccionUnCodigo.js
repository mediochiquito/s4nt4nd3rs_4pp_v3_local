function SeccionUnCodigo()
{
	this.main.id = 'SeccionUnCodigo';
	
	var holder_blanco_secciones = document.createElement('div');
	holder_blanco_secciones.className = 'holder_blanco_secciones';
	$(this.main).append(holder_blanco_secciones);
	$(holder_blanco_secciones).css({width: app.ancho-20, height: app.alto-60});

	var titulo_seccion =  document.createElement('div');
	titulo_seccion.className = 'titulo_seccion';
	$(holder_blanco_secciones).append(titulo_seccion);
	$(titulo_seccion).html('Promociones');

	var holder = document.createElement('div');
	holder.id = 'UnCodigo_holder';
	holder.className = 'Tabs_holder';
	$(holder).append('<div></div>');
	$(this.main).append(holder);
	$(holder).css({width: app.ancho-40, height: app.alto-120});

	var header_titulo =  document.createElement('div')
	header_titulo.id = 'UnCodigo_header_titulo'
	$(holder).find('>div').append(header_titulo)

	var titulo_txt =  document.createElement('div')
	titulo_txt.id = 'UnCodigo_titulo_txt'
	$(header_titulo).append(titulo_txt)

	var btn_volver = new Boton2Frames("img/btn_volver_rojo.svg", 25, 50, doVolver)
	btn_volver.main.id = 'UnCodigo_btn_volver'
	$(holder_blanco_secciones).append(btn_volver.main)


	var txt_copy1 =  document.createElement('div')
	txt_copy1.className = 'UnaPromo_txt_copy1 box label_normal'
	$(holder).find('>div').append(txt_copy1);
	$(txt_copy1).html('El código de promoción es:');


 	var txt_code =  document.createElement('div');
 	txt_code.className = 'label_negrira'
	txt_code.id = 'UnaPromo_code'
	$(holder).find('>div').append(txt_code);
	

	var txt_copy2 =  document.createElement('div')
	txt_copy2.className = 'UnaPromo_txt_copy2 box label_negrira'
	$(holder).find('>div').append(txt_copy2);
	$(txt_copy2).html('Podrás consultar tus códigos vigentes en el menú de la aplicación.');

 

	var obj;

	function doVolver(){
		
		/*
		if(obj.viene_de_push)
			app.secciones.go(app.secciones.seccionhome, 300);
		else
			app.secciones.go(app.secciones.seccionlistaofertas, 300)
		*/

		app.secciones.go(app.secciones.seccionlistapromos, 300);

	}
		

	this._set = function ($obj){

		$(titulo_txt).html($obj.lugar);
		$(txt_code).html($obj.code);
		
	}


	  

}

SeccionUnCodigo.prototype = new Base_Seccion();
