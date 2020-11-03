
function time_to_date(dia, hora){
	var h = hora.split(":");
	var h1 = h[0].padStart(2, '0');
	var h2 = h[1].padStart(2, '0');	
	var nd = `${dia.getFullYear()}-${dia.getMonth()+1}-0${dia.getDate()}T${h1}:${h2}:00-03:00`;	
	return new Date(nd).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' })
}

function atualiza_horarios(){
	var s_dia = document.getElementsByClassName("fc-list-heading")[0].getAttribute('data-date');
	var vdia = s_dia.split("-")
	var dia = new Date(vdia[0], parseInt(vdia[1])-1, vdia[2])
	var itens = document.getElementsByClassName("fc-list-item-time")
	var i;

	for(i=0; i<itens.length; i++){
	   var x = itens[i];
	   if(!x.getAttribute("fuso")){
		   var horas = x.innerHTML.split("-");
		   x.innerHTML = `${time_to_date(dia,horas[0].trim())} - ${time_to_date(dia,horas[1].trim())}`;   
		   x.setAttribute("fuso", true);
		}
	}	
}

function verifica_fuso(){
	return (Intl.DateTimeFormat().resolvedOptions().timeZone != "America/Sao_Paulo")
}

function horario_local(){
	if(verifica_fuso()){
		atualiza_horarios();
	}
}
