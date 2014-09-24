function SeccionPush()
{
	
	this.main.id = 'SeccionPush';
	this.ocultar(0);
	
	var holder_blanco_secciones = document.createElement('div')
	holder_blanco_secciones.className = 'holder_blanco_secciones'
	$(this.main).append(holder_blanco_secciones)
	$(holder_blanco_secciones).css({	width: app.ancho-20, height: app.alto-60})

	var titulo_seccion =  document.createElement('div')
	titulo_seccion.className = 'titulo_seccion'
	$(titulo_seccion).html('Notificaciones Push')
	$(holder_blanco_secciones).append(titulo_seccion)
	
	var header_titulo =  document.createElement('div')
	header_titulo.id = 'Push_header_labels'
	$(holder_blanco_secciones).append(header_titulo)
	
	$(header_titulo).html('<div class="Push_col1">Departamento</div>'+
							'<div class="Push_col2"><img src="img/push/event.svg" height="30" /></div>'+
							'<div class="Push_col3"><img src="img/push/porc.svg" height="30" /></div>')

	var holder = document.createElement('div')
	holder.id = 'Push_holder'
	holder.className = 'Push_holder'
	$(holder).append('<div></div>')
	$(this.main).append(holder)
	$(holder).css({width: app.ancho-42, height: app.alto-200});

	var bucle = 0;
	var dict_deptos = new Array()
	for(var depto in app.array_deptos){
		var ItemDeptoPush_mc = new ItemDeptoPush(bucle, app.array_deptos[depto])
		$(holder).find('>div').append(ItemDeptoPush_mc.main)
		bucle++;
		dict_deptos.push(ItemDeptoPush_mc)
	}

	var btn_guardar = new Boton('GUARDAR', aceptar);
	btn_guardar.main.id = 'Push_btn_aceptar'
	$(this.main).append(btn_guardar.main);

	var btn_cancelar = new Boton('CANCELAR', cancelar);
	btn_cancelar.main.id = 'Push_btn_cancelar'
	$(this.main).append(btn_cancelar.main);
	
	function aceptar(){

		if(!app.hay_internet()) {
			app.alerta('Debes conectarte a internet para ejecutar esta acción.')
			return;
		}

		var array_seleccionados = new Array()
		for(var depto in dict_deptos){
			array_seleccionados.push(dict_deptos[depto].getValue());
		}


		app.cargando(true, 'Guardando...')
			
			$.ajax({

					type: "POST",
					url: app.server + "void.set_push_deptos.php",
					dataType: 'text',
					cache: false, 
					data:{o: array_seleccionados, token:app._ManagePush.token, plataform: app._ManagePush.plataform}, 
					success:function(){
						 
						 app.db.transaction(function (tx) {
							 tx.executeSql('UPDATE app SET push=?', ['2']);
						 });
						 	btn_guardar.habil(false)
					  	btn_cancelar.habil(false)
						 app.cargando(false);
					},
					error:function (){

						app.alerta('Ocurrio un error, por favor intenta mas tarde.');
						app.secciones.go(app.secciones.seccionhome, 300)

					}
				});

	}




	this.select_depto = function ($depto){

		/*dict_deptos[$depto-1]._select('eventos')
		dict_deptos[$depto-1]._select('ofertas')*/

	}

	function cancelar(){

		app.secciones.seccionpush._set()

	}
	
	this.marcar_actividad =  function(){

		btn_guardar.habil(true)
		btn_cancelar.habil(true)
	}


	this._set  = function (obj){
			
			btn_guardar.habil(false)
			btn_cancelar.habil(false)

			app.cargando(true, 'Obteniendo configuración...')
			app._ManagePush.registrar(function(){

				$.ajax({

					type: "POST",
					url: app.server + "json.get_push_deptos.php",
					dataType: 'json',
					cache: false, 
					data:{token:app._ManagePush.token, plataform: app._ManagePush.plataform}, 
					
					success:function($json){
						 
						 for(var depto0 in dict_deptos){
						 	dict_deptos[depto0]._clear()
						 }



						 app.db.transaction(function (tx) {
							 tx.executeSql('UPDATE app SET push=?', ['2']);
						 });

						 for(var depto in $json){
						 	dict_deptos[$json[depto].push_deptos_departamentos_id-1]._select($json[depto].push_deptos_type)
						 }

						 app.cargando(false);

					},

					error:function (){

						app.alerta('Ocurrio un error, por favor intenta mas tarde.');
						app.cargando(false);
					}

				});

			}, function (){

				 app.alerta('Permiso para notificaciones denegado.')
				 app.cargando(false);

			});	

	}
	
		

}

SeccionPush.prototype = new Base_Seccion();