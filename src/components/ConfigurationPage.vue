<template>
<div class="contenedor">
<div class="contenedor2">

<div >
<div style="width: 100%;" class="row">

<div class="col contenedor3">	
	<!-- datos -->
<div style="width: 100%; margin-bottom: 5px;" v-for=" (dato, index) in listaMap" :key="index" class="row">
<div class="col">
<span style="color: black; font-weight: bold">{{dato[1].title}}</span>
</div>
<div class="col-3">


<div class="dropdown">
  <button class="btn content-select dropdown-toggle" :style="{ borderColor: dato[1].color }" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    {{dato[1].prioritylabel}}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a @click="setPrioridad(dato[1].event, dato[1].title, high, 'high', highColor)" class="dropdown-item" href="#">high</a>
    <a @click="setPrioridad(dato[1].event, dato[1].title,medium, 'medium', mediumColor)" class="dropdown-item" href="#">medium</a>
    <a @click="setPrioridad(dato[1].event, dato[1].title, low, 'low', lowColor)" class="dropdown-item" href="#">low</a>
    <a @click="setPrioridad(dato[1].event, dato[1].title, 0, 'Sin Asignar',sinClaColor)" class="dropdown-item" href="#">Sin Asignar</a>
  </div>
</div>

</div>
</div>
<!--Fin datos -->


</div>

<div style="position: relative;" class="col-6">
<div class="row">
<div class="col text-center mb-3">
<b>Creacion y Edicion de Prioridades</b>
</div>
</div>

<!-- primer color  -->
<div class="row">


<div  v-for=" (data, index) in carpetas" :key="index" class="col mb-2">

<div class="dropdown">
  <button class="btn content-select dropdown-toggle" :style="{ borderColor: '#'+data[1].hex_color }" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{data[1].name}}</button>

  <div class="dropdown-menu paletaColores" aria-labelledby="dropdownMenuButton">
<div @click="setColor('669900',data[1].id, data[1].name)" class="color" style="border-radius: 25px 25px 0px 0px;background:#669900;"> 
</div>
<div @click="setColor('669966',data[1].id, data[1].name)" class="color" style="background:#669966;"> 
</div>
<div @click="setColor('4CA531',data[1].id, data[1].name)" class="color" style="background:#4CA531;"> 
</div>
<div @click="setColor('4cb02d',data[1].id, data[1].name)" class="color" style="background:#4cb02d;"> 
</div>
<div @click="setColor('66CC00',data[1].id, data[1].name)" class="color" style="background:#66CC00;"> 
</div>
<div @click="setColor('66CC66',data[1].id, data[1].name)" class="color" style="background:#66CC66;"></div>
<div @click="setColor('66CCCC',data[1].id, data[1].name)" class="color" style="background:#66CCCC;"></div>
<div @click="setColor('66CCFF',data[1].id, data[1].name)" class="color" style="background:#66CCFF;"></div>

<div @click="setColor('6699CC',data[1].id, data[1].name)" class="color" style="background:#6699CC;"> 
</div>
<div @click="setColor('6699FF',data[1].id, data[1].name)" class="color" style="background:#6699FF;"> 
</div>

<div @click="setColor('ce2238',data[1].id, data[1].name)" class="color" style="background:#ce2238;"> 
</div>
<div @click="setColor('e8243d',data[1].id, data[1].name)" class="color" style="background:#e8243d;"> 
</div>
<div @click="setColor('FF0000',data[1].id, data[1].name)" class="color" style="background:#FF0000;"> 
</div>
<div @click="setColor('FF0066',data[1].id, data[1].name)" class="color" style="background:#FF0066;"> 
</div>
<div @click="setColor('FF00CC',data[1].id, data[1].name)" class="color" style="background:#FF00CC;"> 
</div>
<div @click="setColor('FF00FF',data[1].id, data[1].name)" class="color" style="background:#FF00FF;"> 
</div>
<div @click="setColor('FF66CC',data[1].id, data[1].name)" class="color" style="background:#FF66CC; "> 
</div>
<div @click="setColor('FF66FF',data[1].id, data[1].name)" class="color" style="background:#FF66FF;"> 
</div>
<div @click="setColor('FF9999',data[1].id, data[1].name)" class="color" style="background:#FF9999; "> 
</div>
<div @click="setColor('FF99CC',data[1].id, data[1].name)" class="color" style="background:#FF99CC; "> 
</div>
<div @click="setColor('FF99FF',data[1].id, data[1].name)" class="color" style="background:#FF99FF; "> 
</div>

<div @click="setColor('e4c745',data[1].id, data[1].name)" class="color" style="background:#e4c745;"> 
</div>
<div @click="setColor('c2a72f',data[1].id, data[1].name)" class="color" style="background:#c2a72f;"> 
</div> 
<div @click="setColor('FF9966',data[1].id, data[1].name)" class="color" style="background:#FF9966; "> 
</div>
<div @click="setColor('c26f45',data[1].id, data[1].name)" class="color" style="background:#c26f45;"> 
</div>

<div @click="setColor('9fa3a9',data[1].id, data[1].name)" class="color" style="background:#9fa3a9;"> 
</div>
<div @click="setColor('6a6e73',data[1].id, data[1].name)" class="color" style="background:#6a6e73;"> 
</div>
<div @click="setColor('393d42',data[1].id, data[1].name)" class="color" style="background:#393d42;"> 
</div>
<div @click="setColor('1f2124',data[1].id, data[1].name)" class="color" style="background:#1f2124;"> 
</div>
<div @click="setColor('171718',data[1].id, data[1].name)" class="color" style="border-radius: 0px 0px 25px 25px; background:#171718;"> 
</div>
 
  </div>
</div>
	
</div>
</div>

<!-- fin de colores -->

<div class="campoBotones">
<button @click="resetdatos()" type="button" class="btn btCancelar"><b>Cancelar</b></button>
<button @click="enviarDatos()" type="button" class="btn btn-primary btEnviar">Enviar</button>
</div>


</div>
</div>



</div>



	

</div>


</div>
</template>

<script setup>
import { ref } from 'vue'
import { eventList, priorities, prioritie, setPriority,setColores } from './DataConector'  //
import {buscarIndex} from './tool'

let high=ref()
let medium=ref()
let low=ref()

let highColor=ref('dc3545')
let mediumColor=ref('dbbf42')
let lowColor=ref('4ca531')
let sinClaColor=ref('#dee0e6')


const listaMap =ref( new Map())
const carpetas=ref(new Map())



const setPrioridad=(pri,descripcion,level, prioritylabel, color)=>{
	listaMap.value.set(pri, {event:pri, title: descripcion, priority:level, prioritylabel:prioritylabel, color:'#'+color});
}

function setColor(color, id, name){
    carpetas.value.set(id, {name: name, id: id, hex_color:color});
}



prioritie(window.$cookies.get('auth').id_client).then(resultado=>{
	
	resultado.data.forEach(elemPriority=>{

  carpetas.value.set(elemPriority.id, {name: elemPriority.name, id:elemPriority.id, hex_color:elemPriority.hex_color});


	if (elemPriority.name=='high'){

		// console.log("high :"+elemPriority.id)
		high.value=elemPriority.id
		highColor.value=elemPriority.hex_color
	}

	if (elemPriority.name=='medium'){
		// console.log("medium :"+elemPriority.id)
		medium.value=elemPriority.id
		mediumColor.value=elemPriority.hex_color
	}

	if (elemPriority.name=='low'){
		// console.log("low :"+elemPriority.id)
		low.value=elemPriority.id
		lowColor.value=elemPriority.hex_color
	}



	})

   carpetas.value.set(0, {name: 'Unclassified', id: 0, hex_color:'829aa8'});

  // console.log(carpetas.value)



})


async function traducirPrioridad(id){

	let data

	await priorities(window.$cookies.get('auth').id_client, id).then(prioridades=>{
		//console.log(eventsTypes.data)
		data=prioridades.data
	
	})
	return data
}

function resetdatos(){

	eventList(window.$cookies.get('auth').id_client).then(eventLists=>{

	
	eventLists.data.forEach(elementLista=>{



		let ultimoElem=buscarIndex(elementLista.row, ',')


		let outStatatement=elementLista.row.substr(ultimoElem+2,elementLista.row.length)
		let outEvent=elementLista.row.substr(1,ultimoElem-1)

		ultimoElem= buscarIndex(outStatatement, '"')

		outStatatement= outStatatement.substr(0,ultimoElem)

		

		let temprpriority=elementLista.row.substr(elementLista.row.length-2, elementLista.row.length ) 

		ultimoElem= buscarIndex(temprpriority, ')')
		let priority=temprpriority.substr(0,temprpriority.length-1 )     




		traducirPrioridad(priority).then(response=>{

			if (response.length>=1) {
			
				listaMap.value.set(outEvent, {event:outEvent, title: outStatatement, priority:priority, prioritylabel:response[0].name, color:'#'+response[0].hex_color});
			}else{
				listaMap.value.set(outEvent, {event:outEvent, title: outStatatement, priority:0, prioritylabel:'Sin Asignar', color:'#dee0e6'});
			}

		})
 

		
	})



})

}
resetdatos()

function enviarDatos(){
	listaMap.value.forEach(elementoEnvido=>{		

	if (elementoEnvido.prioritylabel=='high') {

		setPriority(window.$cookies.get('auth').id_client,high.value,elementoEnvido.event).then(()=>{
			//console.log(updater)
		})	

	}else if (elementoEnvido.prioritylabel=='medium') {

		setPriority(window.$cookies.get('auth').id_client,medium.value, elementoEnvido.event).then(()=>{
				//console.log(updater)
		})

	}else if (elementoEnvido.prioritylabel=='low') {

		setPriority(window.$cookies.get('auth').id_client,low.value, elementoEnvido.event).then(()=>{
			//console.log(updater)
		})

	}else if(elementoEnvido.prioritylabel=='Sin Asignar'){

		setPriority(window.$cookies.get('auth').id_client,0, elementoEnvido.event).then(()=>{
			//console.log(updater)
		})
	}
	console.log('se actualizaron los datos')
		
})

carpetas.value.forEach(colorEnviado=>{

 setColores(window.$cookies.get('auth').id_client, colorEnviado.hex_color, colorEnviado.id).then(()=>{
      //console.log(updater)
    console.log('se actualizaron los colores')
    })
})


}



</script>


<style scoped>
.content-select {
    color:#666;
   /* font-weight: bold;*/
    background-color: #eff2f8;
    border-radius: 5px 5px 5px 5px;
    /*border-color: #dee0e6;*/
    width: 170px;
    height: 80%;
    border-width: 2px;
    border-radius: 10px 10px 10px 10px;
    /*padding:3px;*/
}



.campoBotones{
	position: absolute;
	right: 5%;
	bottom: 0px;
}

  .btCancelar{
  color:#263e6a;
  margin: 10px;
  background-color: #eff2f8;
  border-radius: 5px 5px 5px 5px;
  border-style: solid;
  border-width: 2px;
  border-color: #dee0e6;
  }

 .btEnviar{
 margin: 10px;
}

.paletaColores{
border-radius: 25px 25px 25px 25px;

}

.contenedor{	
	background-color: white;
	background-color: #eff2f8;
	border-color: black;
	height: 80vh;

}
.contenedor2{
	border-radius: 20px 20px 20px 20px;
	background-color: #eff2f8;
	border-color: white;
	border-style: solid;
	border-width: 5px 5px 5px 5px;
	
	min-height:800px;
	margin:40px;	
	padding: 30px;	
}

.contenedor3{
	max-height:90%;
	overflow: auto;
	height:710px;
	border-style: solid;
	border-width: 0px 1px 0px 0px;
	border-color:#dadada;
}

 .color:hover {
  border-color: #eff2f8;
  border-style: solid;
}

.color{
	margin-left: 10px; 
	margin-right: 10px;
	height: 20px; 
	cursor: pointer;
}

</style>