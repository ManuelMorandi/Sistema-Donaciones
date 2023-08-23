/* Mateo Dominguez y Manuel Morandi */

class Donante{
	constructor(nombre,direccion,telefono){
		this.nombre=nombre;
		this.direccion=direccion;
		this.telefono=telefono;
	}
	toString(){
		return this.nombre+"("+this.direccion+", "+this.telefono+")";
	}
}

class Donacion{
	constructor(donante,modo,monto,comentario){
		this.donante=donante;
		this.modo=modo;
		this.monto=monto;
		this.comentario=comentario;
	}
	toString(){
		return this.donante;
	}
}

class Sistema{
	constructor(){
		this.listaDonantes=[];
		this.listaDonaciones=[];
	}
	agregarDonante(donante){
		this.listaDonantes.push(donante);
	}
	agregarDonacion(donacion){
		this.listaDonaciones.push(donacion);
	}
	darDonantes(){
		return this.listaDonantes;
	}
	darDonacionesPorMonto(){
		return this.listaDonaciones.sort(function(primero,segundo){
			return segundo.monto-primero.monto;
		});
	}
	darDonacionesPorNombre(){
		return this.listaDonaciones.sort(function(primero,segundo){
			let dif=primero.donante.nombre.localeCompare(segundo.donante.nombre);
			return dif;
		});
	}
	darDonantePorIndice(indice){
		return this.listaDonantes[indice];
	}
	existeDonante(donanteBuscar) {
		let esta=false;
		for (let i=0;i<this.listaDonantes.length && !esta;i++){
			if(this.listaDonantes[i].nombre===donanteBuscar){
				esta=true;
			}
		}
		return esta;
	}
	darCantidadDonaciones(){
		return this.listaDonaciones.length;
	}
	promedio(){
		let suma=0;
		for(let elemento of this.listaDonaciones){
			suma+=parseInt(elemento.monto);
		}
		let retorno=suma/this.listaDonaciones.length;
		retorno=retorno.toFixed();
		if(this.listaDonaciones.length==0){
			retorno="No hay donaciones";
		}
		return retorno;
	}
	mayorDonante(){
		let donaciones=this.listaDonaciones;
		let vecesDonado=0;
		let cantidadMaxima=0;
		let mayoresDonantes=[];
		for(let i=0;i<donaciones.length;i++){
			let donante=donaciones[i].donante.nombre;
			for(let j=i;j<donaciones.length;j++){
				if(donante==donaciones[j].donante.nombre){
					vecesDonado++;
				}
			}
			if(vecesDonado==cantidadMaxima){
				mayoresDonantes.push(donante);
			}
			if(vecesDonado>cantidadMaxima){
				cantidadMaxima=vecesDonado;
				mayoresDonantes=[];
				mayoresDonantes.push(donante);
			}
			vecesDonado=0;
		}
		return mayoresDonantes;
	}
	total(){
		let donaciones=this.listaDonaciones;
		let total=0;
		for(let donacion of donaciones){
			total+=parseInt(donacion.monto);
		}
		return "$"+total;
	}
	mayorDonacion(){
		let donaciones=this.listaDonaciones;
		let mayor=0;
		for(let donacion of donaciones){
			if(parseInt(donacion.monto)>mayor){
				mayor=parseInt(donacion.monto);
			}
		}
		return "$"+mayor;
	}
}