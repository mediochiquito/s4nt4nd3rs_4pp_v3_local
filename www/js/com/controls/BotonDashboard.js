function BotonDashboard($icon, $label, $callback, $color){
	
	var self = this
	this.main = document.createElement('div');
	this.main.className = 'BotonDashboard';

	this.data = null;

	var BotonDashboard_icon = document.createElement('div');
	BotonDashboard_icon.className =  'BotonDashboard_icon'
	$(this.main).append(BotonDashboard_icon)


	var img= new Image()
	img.src = 'img/icons_dashboards/'+$icon+'.svg'
	$(BotonDashboard_icon).append(img)

	var BotonDashboard_label = document.createElement('div');
	BotonDashboard_label.className =  'BotonDashboard_label'
	$(BotonDashboard_label).html($label)
	$(this.main).append(BotonDashboard_label)

	if($color == 'azul'){

		$(BotonDashboard_icon).css('background-image', 'url(img/controls/bg_btn_dashboard_azul.png)')
	}

	$(this.main).css("cursor", "pointer");

	var habil = true;

	if(app.es_touch()){

		this.main.addEventListener("touchend", do_mouseout);
		this.main.addEventListener("touchstart", do_mouseover);
		this.main.addEventListener("touchstart", do_touchstart);

	}else{

		this.main.addEventListener("click", do_click);
		this.main.addEventListener("mouseout", do_mouseout);
		this.main.addEventListener("mouseover", do_mouseover);
		
	}

	this.habil = function($b){
		
		habil =  $b
		
		if($b) {
			$(this.main).css("cursor", "pointer");
			$(this.main).transition({ opacity: 1 }, 0);
		}
		else{
		   $(this.main).css("cursor", "default");
		   $(this.main).transition({ opacity: .3 }, 0);
		}

	}

	function do_touchstart(){

	
		setTimeout(function (){

			
			do_mouseout()
			do_click()
		}, 200)
	}


	function do_click(){
	
		if(habil) $callback(self.data);
		document.activeElement.blur();
		$("input").blur();
	}
	
	function do_mouseover(){
		if(habil)
		$(self.main).transition({opacity:.5}, .2);
		
	}
	
	function do_mouseout(){
		if(habil)
		$(self.main).transition({opacity:1}, .2);
	}

	this.getValor = function(){

		return $(this.main).val()

	}

}