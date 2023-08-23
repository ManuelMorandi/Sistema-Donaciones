window.addEventListener("load",inicio);

function inicio(){
	document.getElementById("boton1").addEventListener("click",registrarDonante);
	document.getElementById("boton2").addEventListener("click",registrarDonaciones);
	document.getElementById("nombreDonante").addEventListener("click",cargarTabla);
	document.getElementById("montoDecreciente").addEventListener("click",cargarTabla);
	document.getElementById("check").addEventListener("click",cargarTabla);
	mostrarTotal();
	cargarTabla();
	cargarCombo();
	cantidadDonaciones();
	masDonante();
	mostrarMayor();
	mostrarPromedio();
}

let sistema=new Sistema();

function registrarDonante(){
	if(!sistema.existeDonante(document.getElementById("nombre").value)){
		if(document.getElementById("formDonantes").reportValidity()){
			let nombre=document.getElementById("nombre").value;
			let direccion=document.getElementById("direccion").value;
			let telefono=document.getElementById("telefono").value;
			let donante=new Donante(nombre,direccion,telefono);
			sistema.agregarDonante(donante);
			cargarCombo();
			document.getElementById("nombre").value="";
			document.getElementById("direccion").value="";
			document.getElementById("telefono").value="";
		}
	}
	else{
		alert("Donante ya registrado");
	}
}

function cargarCombo(){
	let combo=document.getElementById("donante");
	combo.innerHTML="";
	let donantes=sistema.darDonantes();
	for(let elemento of donantes){
		let nodo=document.createElement("option");
		let nodoTexto=document.createTextNode(elemento.nombre);
		nodo.appendChild(nodoTexto);
		combo.appendChild(nodo);
	}
}

let modos=[0,0,0,0,0,0];

function registrarDonaciones(){
	let modoArray=["Efectivo","Transferencia","Canje","Mercadería","Cheque","Otros"];
	if(document.getElementById("formDonaciones").reportValidity()){
		let donante=sistema.darDonantePorIndice(document.getElementById("donante").selectedIndex);
		let modo=modoArray[document.getElementById("modo").selectedIndex];
		let monto=document.getElementById("monto").value;
		let comentarios=document.getElementById("comentarios").value;
		let donacion=new Donacion(donante,modo,monto,comentarios);
		sistema.agregarDonacion(donacion);
		cargarTabla();
		cantidadDonaciones();
		mostrarPromedio();
		mostrarTotal();
		mostrarMayor();
		masDonante();
		modos[document.getElementById("modo").selectedIndex]++;
		cargarGrafica(modos);
		document.getElementById("monto").value="";
		document.getElementById("comentarios").value="";
	}
}

function cargarTabla(){
	let tabla=document.getElementById("tablaBody");
	tabla.innerHTML="";
	let donaciones=sistema.darDonacionesPorMonto();
	if(document.getElementById("nombreDonante").checked){
		donaciones=sistema.darDonacionesPorNombre();
	}
	for(let i=0;i<donaciones.length;i++){
		let fila=tabla.insertRow();
		let celda1=fila.insertCell();
		celda1.innerHTML=donaciones[i].donante;
		let celda2=fila.insertCell();
		celda2.innerHTML=donaciones[i].modo;
		let celda3=fila.insertCell();
		celda3.innerHTML=donaciones[i].monto;
		if(parseInt(donaciones[i].monto)>="1000"){
			celda3.style.color="red";
		}
		else{
			celda3.style.color="green";
		}
		let celda4=fila.insertCell();
		celda4.innerHTML=donaciones[i].comentario;
		if(document.getElementById("check").checked && (parseInt(donaciones[i].monto) == document.getElementById("deMonto").value)) {
			celda1.style.backgroundColor="yellow";
			celda2.style.backgroundColor="yellow";
			celda3.style.backgroundColor="yellow";
			celda4.style.backgroundColor="yellow";
		}
		else {
			celda1.style.backgroundColor="";
			celda2.style.backgroundColor="";
			celda3.style.backgroundColor="";
			celda4.style.backgroundColor="";
    }
	}
}

function cantidadDonaciones(){
	let cantidad=sistema.darCantidadDonaciones();
	let texto="Cantidad total de donaciones: ";
	if(cantidad==0){
		texto+="No hay donaciones";
	}
	else{
		texto+=cantidad;
	}
	document.getElementById("cantidadDonaciones").innerHTML=texto;
}

function mostrarPromedio(){
	let promedio=sistema.promedio();
	let texto="Promedio por donación: "+promedio;
	document.getElementById("promedio").innerHTML=texto;
}

function masDonante(){
	let mayoresDonantes=sistema.mayorDonante();
	let texto="Donante que más veces donó: ";
	document.getElementById("masDonantes").style.display="none";
	if(mayoresDonantes.length==1){
		texto+=mayoresDonantes[0];
	}
	else if(mayoresDonantes.length==0){
		texto+="No hay donaciones";
	}
	else if(mayoresDonantes.length>1){
		cargarListaDonantes(mayoresDonantes);
	}
	document.getElementById("masDonante").innerHTML=texto;
}

function cargarListaDonantes(mayoresDonantes){
	document.getElementById("masDonantes").style.display="block";
	let lista=document.getElementById("masDonantes");
	lista.innerHTML="";
	for(let i=0;i<mayoresDonantes.length;i++){
		let nodo=document.createElement("li");
		let nodoTexto=document.createTextNode(mayoresDonantes[i]);
		nodo.appendChild(nodoTexto);
		lista.appendChild(nodo);
	}
}

function mostrarTotal(){
	let total=sistema.total();
	document.getElementById("textoTotalGeneral").innerHTML=total;
}

function mostrarMayor(){
	let mayor=sistema.mayorDonacion();
	document.getElementById("textoMayorDonacion").innerHTML=mayor;
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(cargarGrafica);
	
function cargarGrafica(){
	let grafica=document.getElementById("piechart");
	grafica.style.display="none";
	
    var data = google.visualization.arrayToDataTable([
        ['Modo', 'Cantidad de donaciones'],
        ['Efectivo',modos[0]],
        ['Transferencia',modos[1]],
        ['Canje',modos[2]],
        ['Mercadería',modos[3]],
        ['Cheque',modos[4]],
		['Otros',modos[5]]
    ]);

    var options = {
        title: 'Modo de donación'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
    
	let hay=false;
	for(let i=0;i<=5;i++){
		if(modos[i]!=0){
			hay=true;
		}
	}
	if(hay){
		grafica.style.display="block";
	}
}