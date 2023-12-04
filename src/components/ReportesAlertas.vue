<template>

<div v-show="comentarioisshowing" class="popContainer">

<div class="text-center" v-show="!comentarioisshowingLabel">
<i @click="hidePop()" class="bi bi-x cerrar"></i>
<b >{{alertaShowing.alerta}}</b>
<div>{{ new Date(alertaShowing.fechaInput).toLocaleDateString()+" "+new Date(alertaShowing.fechaInput).toLocaleTimeString('en-US')}}</div>
<div>{{alertaShowing.mensaje}}</div>
<iframe
  id="hola2"
  class="trackerMapc"
  src="https://maps.google.com/maps?q=18.4574411,-69.9278577&hl=es&z=14&amp;output=embed"
  
 >
</iframe>
</div>

<div v-show="comentarioisshowingLabel" class="row" style="height: 100%;">
    <!-- logo y barra -->
<div class="col-2 d-flex flex-row">
<div class="barraVerde"></div>
<div class="barraAzul"></div>   
</div>
<!-- fin Logo y Barra -->

<div class="col mt-4">
<i @click="hidePop()" class="bi bi-x cerrar"></i>
 <h4 class="text-center mb-2"> <span class="titulo1"><b>HISTORICO</b></span> DE ALERTAS</h4>
<!--  formulario -->


<!--  fin formulario -->

  <label><b>Fecha Alerta : </b></label>
 <label>{{alertaShowing.fechaInput}}</label>
 <br>

 <label><b>Fecha Reconocimiento : </b></label>
 <label>{{alertaShowing.fechaOut}}</label>
 <br>

 <label><b>Owner : </b></label>
 <label>{{alertaShowing.user}}</label>
  <br>

  <label><b>Alerta : </b></label>
 <label>{{alertaShowing.alerta}}</label>
   <br>

   <label><b>Descripcion : </b></label>  
 <label>{{alertaShowing.mensaje}}</label>
 <hr style="opacity: 0.1;"/>
 <div  class="text-center" style=" border: 1px solid rgba(54, 54, 54, .5); margin-right:2%; height: 100px;" >{{alertaShowing.comentario}}</div>

 <div class="text-center">

    <button @click="hidePop()" type="button" class="btn btn-primary btCancelar"><b>OK</b></button>

     
 </div>
</div>
</div>

</div>

<div  style="position: relative;">


<div  @mouseup="hidePop" class="d-flex flex-column" style="height: 85vh; ">

<div class="titulo" style="margin-left: 5%;">Listas de Alertas Reconocidas</div>

<div class="menus">
    
<!-- row #1 -->
<div class="row">

<div class="col d-flex flex-row">
<i class="bi bi-person-circle iconUser"></i> 

<select class="content-select text-center"  @change="filtrarBusqueda()"  v-model="userSelected" style="margin-right: 50px;">
<option value="Ver Todos">Ver Todos</option>
<option value="Sytem Admin">Sytem Admin</option>
<option 
v-for="(user, index)  in usersList"
:value="user" 
:key="index"
>{{ user.first_name+" "+user.last_name }}</option>
</select>

<div class="d-flex flex-row" style="padding-top:10px;">

<!-- rojo -->

 <div  class="d-flex flex-row">
<i  @click="listadoHigh()" :class="{ 'bi bi-check-square-fill': redIschecked, 'bi bi-square':!redIschecked}" style="color: red;"></i>

  <div class="filaAlertas">
  <label>Prioridad Alta</label>
  </div>
</div>  

<!-- amarillo -->

<div class="d-flex flex-row" style="margin-left: 20px;">
<i @click="listadoMedium()" :class="{ 'bi bi-check-square-fill': yellowIschecked, 'bi bi-square':!yellowIschecked}" style="color:#e4c745;"></i>
  <div class="filaAlertas">
  <label>Prioridad Media</label>
  </div>
</div>  

<!-- verde -->

 <div class="d-flex flex-row" style="margin-left: 20px;">
  <i @click="listadoLow()" :class="{ 'bi bi-check-square-fill': greenIschecked, 'bi bi-square':!greenIschecked}" style="color:#4ca531;"></i>
  <div class="filaAlertas">
  <label>Prioridad Baja</label>
  </div>
</div> 

<!-- gris -->

 <div class="d-flex flex-row" style="margin-left: 20px;">
  <i @click="listadoNeutral()" :class="{ 'bi bi-check-square-fill': neutralIsActive, 'bi bi-square':!neutralIsActive}" style="color:#c4c4c4;"></i>
  <div class="filaAlertas">
  <label>Sin clasificar</label>
  </div>
</div> 


    
</div>

</div>

</div>

<!-- row #2 -->

<div class="row" style="margin-bottom: 10px">
<div class="col">

<div class="d-flex flex-row" style="position: relative;">

<div class="d-flex flex-row" style="width: 540px;">




<VueDatePicker :max-date="manana.toISOString().substr(0, 10)"  v-model="date" range multi-calendars @closed="filtrarBusqueda()"/>   


<button type="button" class="btn btn-primary invisible" style="border:none; border-radius:0px 20px 20px 0px;">
<i @click="filtrarBusqueda()" class="bi bi-search"></i>
</button>  

<button type="button" class="btn" style="position: absolute; right: 0px;">
<i @click="generatePDF()" class="bi bi-filetype-pdf"></i>
</button> 

</div>
</div>

</div>
</div>

<!-- row #3 -->
<div class="row">
<div class="col" style="position: relative;">

 
<!--   <b-dropdown text="Button text via Prop">
    <b-dropdown-item href="#">An item</b-dropdown-item>
    <b-dropdown-item href="#">Another item</b-dropdown-item>
  </b-dropdown>

  <b-dropdown>
    <template #button-content>
      Custom <strong>Content</strong> with <em>HTML</em> via Slot
    </template>
    <b-dropdown-item href="#">An item</b-dropdown-item>
    <b-dropdown-item href="#">Another item</b-dropdown-item>
  </b-dropdown> -->



<p>
  <a data-toggle="collapse" href="#multiCollapseExample1"  aria-expanded="false" aria-controls="multiCollapseExample1" >Busqueda Avanzada
  </a>
</p>  




<div class="collapse multi-collapse" id="multiCollapseExample1">

<button @click="filtrarBusqueda()" style="position: absolute; top: -5px; left: 220px;" type="button" class="btn btn-primary invisible">
<i class="bi bi-search"></i>
</button>
<div class="card card-body">



<div class="row">

<div class="col-4">
<div class="row">
<div class="col-12 text-center">
<b class="badge" style=" background-color: #00ae2f;">Busqueda Vehiculo</b>
<input  style="border: none; width: 80%; outline: none !important;" class="form-control" v-model="buquedaFitroVehiculo"  @keyup="fitroVehiculo" id="myInput" type="text" placeholder="Search..">
</div>
<div class="col-12">

<label  class="list-group-item">
<i  @click="markTrackers()"  style=" color: #2c5297"  :class="{ 'bi bi-check-square-fill': trackersMarked, 'bi bi-square':! trackersMarked}">{{trackersMarkedText}}</i>
</label>

<div class="button-group menuFlotante">

<label v-for="(item, index)  in resultadoFitroVehiculos"

:key="index" style="border: none;" class="list-group-item">

<i  @click="filtrartrackers(item.id,item.label)"  style=" color: #2c5297" :class="{ 'bi bi-check-square-fill': item.check, 'bi bi-square':!item.check}">{{ item.label}}</i>
</label>
</div>
</div>
</div>
</div>


<div class="col-4">
     <!--   primer element vehiculo -->
<div class="row">
<div class="col-12 text-center">
<b class="badge" style=" background-color: #00ae2f;">Busqueda Grupo</b>
<input  style="border: none; width: 80%; outline: none !important;" class="form-control" v-model="buquedaFitroGrupo"  @keyup="fitroGroups" id="myInput2" type="text" placeholder="Search..">
</div>
<div class="col-12">

<label  class="list-group-item" style="color: rgba(10, 91, 239, 0.1);">
<i  @click="markGroups()"  style=" color: #2c5297" :class="{ 'bi bi-check-square-fill': groupMarked, 'bi bi-square':!groupMarked }">{{groupMarkedText}}</i>
</label>

<div class="button-group menuFlotante">

<label v-for="(groupitem, index)  in resultadoFitroGroups"

:key="index" style="border: none;" class="list-group-item">
<i  @click="filtrarGroups(groupitem.id,groupitem.title)" style=" color: #2c5297" :class="{ 'bi bi-check-square-fill': groupitem.check, 'bi bi-square':!groupitem.check}">{{ groupitem.title}}</i>
</label>
</div>
</div>
</div> 
</div>   


<div class="col-4">
    
  <!--   primer element vehiculo -->
<div class="row">
<div class="col-12 text-center">
<b class="badge" style=" background-color: #00ae2f">Busqueda Evento</b>
<input  style="border: none; width: 80%; outline: none !important;" class="form-control" v-model="busquedaFiltroEvento"  @keyup="fitroEvento" id="myInput3" type="text" placeholder="Search..">
</div>
<div class="col-12">

<label  class="list-group-item" >
<i  @click="markEvents()" style=" color: #2c5297" :class="{ 'bi bi-check-square-fill': eventMarked, 'bi bi-square':!eventMarked }">{{eventMarkedText}}</i>
</label>

<div class="button-group menuFlotante">


<label v-for="(eventitem, index)  in resultadoFitroEventos"

:key="index" style="border: none;" class="list-group-item">
<i  @click="filtrarEvents(eventitem.event, eventitem.description)"  style=" color: #2c5297" :class="{ 'bi bi-check-square-fill': eventitem.check, 'bi bi-square':!eventitem.check}">{{ eventitem.description}}</i>
</label>
</div>
</div>
</div>
</div>
</div>




  

</div>
      <hr>
    </div>






</div>
</div>

</div>
   
<!-- id="printMe" -->
<div class="contenedorTabla">

    <table class="table project-list-table table-nowrap align-middle table-borderless">
           <thead > 

                  <tr>
       <th scope="col" class="columnaName">{{columns[0]}}</th>
                                <th scope="col" class="columnaName">{{columns[1]}}</th>
                             
                                <th scope="col" class="columnaName">{{columns[2]}}</th>
                                <th scope="col" class="columnaName">{{columns[3]}}</th>
                             
                                <th scope="col" class="columnaName">{{columns[4]}}</th>
                            </tr>
    
        
        </thead>
        
    

        <tbody>   


    <tr class="hovertabla" v-for=" (dato, index) in listaAlertasDone" :key="index">
         <td class="hovertabla">
          <div href="#" class="text-body">{{new Date(dato.time).toLocaleDateString()+" "+new Date(dato.time).toLocaleTimeString('en-US')}} </div>
        </td>
  
        <td class="hovertabla">
           <div href="#" class="text-body">{{new Date(dato.updated).toLocaleDateString()+" "+new Date(dato.updated).toLocaleTimeString('en-US')}} </div>
        </td>
        <td><span class="badge mb-0"  style="background-color: #c4c4c4;" :style="{ backgroundColor: '#'+dato.hex_color }"  >{{consultarUsers(dato.user_id)}}</span></td>
        <td>{{dato.message}}</td>
     <!--  class="badge mb-0" :style="{ backgroundColor: '#'+dato.categoria }" > -->
        <td>
        <div class="d-flex">
           <i @click="showPopPopDescription(dato.lat, dato.lng,dato.id, new Date(dato.time), dato.description ,dato.message, dato.updated, dato.note, dato.user_id)" :style="{ color: '#'+dato.hex_color }" class="bi bi-chat-left-dots"></i>
            <i @click="showPopPopMapa(dato.lat, dato.lng,dato.id, new Date(dato.time), dato.description ,dato.message, dato.updated, dato.note, dato.user_id)" :style="{ color: '#'+dato.hex_color }"  style="margin-left: 5px;" class="bi bi-geo-alt"></i>
                
        </div>
        </td>
      
       
    </tr>
</tbody>
</table>
</div>


</div>

</div>

</template>

<script setup>

import { ref } from 'vue'
import { notificationsdone, buscar_filtro , trackers, groups, eventList, users} from './DataConector'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


let un_diaMilisegundos=24*60*60*1000; 
let endDate=new Date(); 
let startDate=new Date(endDate.getTime()-un_diaMilisegundos) ; startDate.setHours(0, 1) 

let listaAlertasDone=ref();
let usersList=ref();
let userSelected=ref('Ver Todos')

let filtroRed=ref('high')
let redIschecked=ref(true)

let filtroyellow=ref('medium');
let yellowIschecked=ref(true)


let filtroGreen=ref('low')
let greenIschecked=ref(true)


let neutralActive=ref('Unclassified')
let neutralIsActive=ref(true)

let comentarioisshowing=ref(false);
let comentarioisshowingLabel=ref(false)

let clasificacion=ref(`' '`)
console.log(clasificacion.value)

let alertaShowing=ref({

    notification_id : 123456,
    lat:0,
    lng:0,
    fechaInput :'22/04/1995',
    alerta:'excesoviolacion',
    mensaje:'vehiculo super super excesoviolacion',
    fechaOut :'22/04/2023',
    comentario :'comentario por defecto',
    user :'Noel lora'
})


const columns = ['Fecha Alerta', 'Fecha Actualizacion', 'Usuario', 'Alerta', 'Comentario'];

let rows = ref([
  ['10/10/2023 3:06:48 PM', '10/10/2023 4:07:01 PM', 'Sytem Admin', 'Velocidad excesiva (relacionado con plataforma)', 'Comentario'],
  ['10/10/2023 3:06:48 PM', '10/10/2023 4:07:01 PM', 'Sytem Admin', 'Velocidad excesiva (relacionado con plataforma)', 'Comentario'],
  ['10/10/2023 3:06:48 PM', '10/10/2023 4:07:01 PM', 'Sytem Admin', 'Alerta', 'Comentario'],
]);



let date = ref();
let hoy=new Date();
let fechainicio = new Date(new Date().setDate(hoy.getDate() - 7));
fechainicio.setHours(0, 0)

let manana=new Date(hoy.getTime()+un_diaMilisegundos)
manana.setHours(23, 59)

date.value = [fechainicio, hoy];

let trackersMarked=ref(true)
let trackersMarkedText=ref('Desmarcar Todos')

let groupMarked=ref(true)
let groupMarkedText=ref('Desmarcar Todos')

let eventMarked=ref(true)
let eventMarkedText=ref('Desmarcar Todos')

const trackerMap =ref( new Map())
const groupMap=ref(new Map())
const eventMap=ref(new Map())

let buquedaFitroVehiculo=ref('')
let buquedaFitroGrupo=ref('')
let busquedaFiltroEvento=ref('')

let resultadoFitroVehiculos=ref([])
let resultadoFitroGroups=ref([])
let resultadoFitroEventos=ref([])

let id_clientCookies=window.$cookies.get('auth').id_client

//******************funciones importadas****************************

//#1 user function

users(id_clientCookies).then(usuarios=>{

    usersList.value=[]
    usuarios.forEach(element=>{
    usersList.value.push(element)
    }) 

//#2 trackers function

trackers(id_clientCookies).then(resul=>{

    resul.data.forEach(elemTracker=>{
    trackerMap.value.set(elemTracker.id, {id: elemTracker.id, check:true, label:elemTracker.label});
          
    }) 

//#3 groups function
groups(id_clientCookies).then(resultGrups=>{
          
        resultGrups.data.forEach(elemGroup=>{
        groupMap.value.set(elemGroup.id, {id: elemGroup.id, check:true, title:elemGroup.title});
         
        }) 

    
//#4 events function
eventList(id_clientCookies).then(resulteventList=>{

            resulteventList.data.forEach(elementEvent=>{

                let statementEvent=elementEvent.row
                let lastIndexevent
                let lastIndexDescription=statementEvent.length

                for (let i = 0; i < lastIndexDescription; i++) {
                    if (statementEvent[i]==',') {
                       lastIndexevent=i
                        break;
                    }                    
                }  



eventMap.value.set(statementEvent.substr(1,lastIndexevent-1), {event: statementEvent.substr(1,lastIndexevent-1), check:true, description:"('"+statementEvent.substr(lastIndexevent+2,statementEvent.length)});           
               
})
fitroEvento()              
})

fitroGroups();
 })
fitroVehiculo();

})
})

//******************Fin funciones importadas 1/2****************************



/*#3 notificationsdone function*/
notificationsdone(id_clientCookies).then(alets=>{
listaAlertasDone.value=alets.data;   
})

//******************Fin funciones importadas 2/2****************************

//function #1

function consultarName(name){

let nombre

usersList.value.filter(element=>{

    if(element.id==name){
            nombre=element.first_name + " "+element.last_name
        }
    })

    return nombre
}

function consultarUsers(name){
let nombre
    if (name==0) {
        nombre='Sytem Admin'        
    }else{
    nombre=consultarName(name)
    }
    return nombre
}


function markTrackers(){
    if ( trackersMarked.value) {
         trackersMarked.value=false
         trackersMarkedText.value='Marcar Todos'

   


trackerMap.value.forEach(elemTracker=>{
trackerMap.value.set(elemTracker.id, {id: elemTracker.id, check:false, label:elemTracker.label});
          
})
fitroVehiculo()


}else{
       trackersMarked.value=true
       trackersMarkedText.value='Desmarcar Todos'


trackerMap.value.forEach(elemTracker=>{
trackerMap.value.set(elemTracker.id, {id: elemTracker.id, check:true, label:elemTracker.label});
})
fitroVehiculo()

}
}


function markGroups(){
    if ( groupMarked.value) {
         groupMarked.value=false
         groupMarkedText.value='Marcar Todos'

groupMap.value.forEach(elemGroup=>{
groupMap.value.set(elemGroup.id, {id: elemGroup.id, check:false, title:elemGroup.title});
          
})
fitroGroups()
}else{
    groupMarked.value=true
    groupMarkedText.value='Desmarcar Todos'


groupMap.value.forEach(elemGroup=>{
groupMap.value.set(elemGroup.id, {id: elemGroup.id, check:true, title:elemGroup.title});
})
fitroGroups()

}
}

function markEvents(){

    if ( eventMarked.value) {
         eventMarked.value=false
         eventMarkedText.value='Marcar Todos'

eventMap.value.forEach(elemEvent=>{
eventMap.value.set(elemEvent.event, {event: elemEvent.event, check:false, description:elemEvent.description});
          
})
fitroEvento()
}else{
    eventMarked.value=true
    eventMarkedText.value='Desmarcar Todos'


eventMap.value.forEach(elemEvent=>{
eventMap.value.set(elemEvent.event, {event: elemEvent.event, check:true, description:elemEvent.description});
})
fitroEvento()

}
}

//function #2
 function generatePDF() {


rows.value=[]

listaAlertasDone.value.forEach(elements=>{

rows.value.push(
    [new Date(elements.time).toLocaleDateString()+" "+new Date(elements.time).toLocaleTimeString('en-US'), new Date(elements.updated).toLocaleDateString()+" "+new Date(elements.updated).toLocaleTimeString('en-US'),  consultarUsers(elements.user_id), elements.message, elements.note],
)
    })

console.log('se imprimio')

const doc = new jsPDF({
        orientation: "landscape",   //portrait
        unit: "in",
        format: "letter"
      });

// Or use javascript directly:
autoTable(doc, {
    head: [columns],
    body: rows.value,

    headStyles:{
        fillColor: [30, 212, 145],
        textColor: [255,255,255]},

    columnStyles: {
        0: {  fillColor: [232, 252, 245], },
        1: {  fillColor: [232, 252, 245], },
        2: {  fillColor: [232, 252, 245], },
        3: {  fillColor: [232, 252, 245], },
        4: {  fillColor: [232, 252, 245], },
        }
})

const labelName=(new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString('en-US')) 
doc.save('Alertas-'+labelName+'.pdf')
    }

//function #3

function hidePop(){
      comentarioisshowing.value=false;
      comentarioisshowingLabel.value=false
}

//function #4
function filtrarBusqueda(){
        
let userfilter
switch(userSelected.value) {
  case "Sytem Admin":
userfilter=[0]
    break;
  case "Ver Todos":
userfilter=[0]
usersList.value.forEach(element_user=>{
        userfilter.push(element_user.id)
    })
    break;
  default:
userfilter=userSelected.value.id
     break;
}

let selectedTracker=[]
trackerMap.value.forEach(trackerselected=>{
if(trackerselected.check==true){
    selectedTracker.push(trackerselected.id) 
}})

let selectedGroup=[]

groupMap.value.forEach(groupsselected=>{
if(groupsselected.check==true){
    selectedGroup.push(groupsselected.id) 
}
})

let selectedEvent=[]

eventMap.value.forEach(eventSelected=>{
if(eventSelected.check==true){
    selectedEvent.push("'"+eventSelected.event+"'") 
}
})

let param={

   "client_id": id_clientCookies, 
   "startDate":date.value[0].toISOString(),
   "endDate":date.value[1].toISOString(),
   "clasificacion" : ` '${filtroRed.value}', '${filtroyellow.value}', '${filtroGreen.value}', '${neutralActive.value}' `,
   "userIDs":userfilter,
   "trackersIDs":selectedTracker,
   "groupsIDs":selectedGroup,
   "events":selectedEvent

}

// console.log(param)


buscar_filtro(param).then(resutadoFiltro=>{
    listaAlertasDone.value=resutadoFiltro; 
    //console.log(resutadoFiltro)
    
})
}

//function #5
function filtrartrackers(id, label){

let check=trackerMap.value.get(id).check

 trackerMap.value.set(id, {id: id, check:!check, label:label});

 fitroVehiculo();
}


function filtrarGroups(id,title){

let check=groupMap.value.get(id).check

groupMap.value.set(id, {id: id, check:!check, title:title});

fitroGroups();

}

function filtrarEvents(event, description){

let check=eventMap.value.get(event).check

eventMap.value.set(event, {event: event, check:!check, description:description});
     fitroEvento()
}

function fitroVehiculo(){
    resultadoFitroVehiculos.value=[];

    let tempTrackerList=[]
    trackerMap.value.forEach(elementMap=>{
        tempTrackerList.push(elementMap)
    })
    resultadoFitroVehiculos.value = tempTrackerList.filter(element=>{

    if ( element.label.match(buquedaFitroVehiculo.value) || element.label.match(buquedaFitroVehiculo.value.toLowerCase()) || element.label.match(buquedaFitroVehiculo.value.toUpperCase()) ) {

        return true
    } 
    });  
    filtrarBusqueda()
}

function fitroGroups(){
    resultadoFitroGroups.value=[];

    let tempGroupsList=[]
    groupMap.value.forEach(elementMap=>{
        tempGroupsList.push(elementMap)
    })
 

    resultadoFitroGroups.value = tempGroupsList.filter(element=>{
    
        if ( element.title.match(buquedaFitroGrupo.value) || element.title.match(buquedaFitroGrupo.value.toLowerCase()) || element.title.match(buquedaFitroGrupo.value.toUpperCase()) ) {
        return true
    } 
    });  
     filtrarBusqueda()
}


function fitroEvento(){
    resultadoFitroEventos.value=[];

    let tempEventList=[]

    eventMap.value.forEach(elementMap=>{
        tempEventList.push(elementMap)
    })

  resultadoFitroEventos.value = tempEventList.filter(element=>{
    
        if ( element.description.match(busquedaFiltroEvento.value) || element.description.match(busquedaFiltroEvento.value.toLowerCase()) || element.description.match(busquedaFiltroEvento.value.toUpperCase()) ) {
        return true
    } 

    }); 

     filtrarBusqueda() 
}



function listadoHigh(){

        if (redIschecked.value) {
          redIschecked.value=false

          filtroRed.value=' ';
          
          filtrarBusqueda()
        }else{
          redIschecked.value=true

          filtroRed.value='high';
          filtrarBusqueda()
        }
}

function listadoMedium(){
        if (yellowIschecked.value) {
          yellowIschecked.value=false
          filtroyellow.value=' '
          filtrarBusqueda()
        }else{
          yellowIschecked.value=true
          filtroyellow.value='medium'
           filtrarBusqueda()
        }
}

function listadoLow(){

        if (greenIschecked.value) {

          greenIschecked.value=false
          filtroGreen.value=' '
          filtrarBusqueda()
        }else{
          greenIschecked.value=true
          filtroGreen.value= 'low'
           filtrarBusqueda()
           
        }     
}

function listadoNeutral(){

        if (neutralIsActive.value) {

          neutralIsActive.value=false
          neutralActive.value=' '
          filtrarBusqueda()
        }else{
          neutralIsActive.value=true
          neutralActive.value= 'Unclassified'
          filtrarBusqueda()
           
        }     
    }

async function showMap(lat,long) {
    let link=`https://maps.google.com/maps?q=${lat},${long}&hl=es&z=15&t=m`;
    let mapa=document.getElementById('hola2');

    mapa.removeAttribute("src");
    let url = link + "&output=embed";
    await mapa.setAttribute("src",url);
}


 function showPopPopDescription(lat, lng, notification_id, fechaInput, alerta, mensaje, fechaOut, comentario, user){
      comentarioisshowing.value=true;
      comentarioisshowingLabel.value=true

       alertaShowing.value.notification_id=notification_id
       alertaShowing.value.lat=lat
       alertaShowing.value.lng=lng
       alertaShowing.value.fechaInput=new Date(fechaInput).toLocaleDateString()+" "+new Date(fechaInput).toLocaleTimeString('en-US')
       alertaShowing.value.alerta=alerta
       alertaShowing.value.mensaje=mensaje
       alertaShowing.value.fechaOut=new Date(fechaOut).toLocaleDateString()+" "+new Date(fechaOut).toLocaleTimeString('en-US')
       alertaShowing.value.comentario=comentario
       alertaShowing.value.user=consultarUsers(user)
    }

     function showPopPopMapa(lat, lng, notification_id, fechaInput, alerta, mensaje, fechaOut, comentario, user){
    comentarioisshowing.value=true;
    comentarioisshowingLabel.value=false

    showMap(lat,lng)

       alertaShowing.value.notification_id=notification_id
       alertaShowing.value.lat=lat
       alertaShowing.value.lng=lng
       alertaShowing.value.fechaInput=new Date(fechaInput).toLocaleDateString()+" "+new Date(fechaInput).toLocaleTimeString('en-US')
       alertaShowing.value.alerta=alerta
       alertaShowing.value.mensaje=mensaje
       alertaShowing.value.fechaOut=new Date(fechaOut).toLocaleDateString()+" "+new Date(fechaOut).toLocaleTimeString('en-US')
       alertaShowing.value.comentario=comentario
       alertaShowing.value.user=consultarUsers(user)
    }




/*function getCookies(){

console.log('**********************')
console.log(id_clientCookies)
console.log(window.$cookies.get('auth').id)
console.log('**********************')
}
getCookies();*/


</script>
<style scoped>
.titulo{
  font-size:larger; 
  font-weight: bold;
}
.fechasCampos{
background-color: #003466; 
color: white;

}

.contenedorTabla {
height: 100%;
margin-left: auto;
margin-right: auto;
width: 95%;
overflow: auto
}

.menuFlotante{
    padding-top:0px; 
    max-height: 230px;
    overflow: auto
}


.menus{
margin-left: auto;
margin-right: auto;
width: 95%;
}
/*   .numeros{	  font-family: 'Lato black' }*/

/*tabladatos*/

.columnaName  {
  position: sticky; 
  top: 0px;

 }

 .hovertabla:hover td {
  background-color: rgba(215, 214, 211, 0.02);
}

.textareainput:focus {
    outline: none !important;
    border:1px solid red;
    box-shadow: 0 0 10px red;
  }

hr {
  margin-bottom: 1rem;
  border: 0;
 border-top: 1px solid rgba(255, 255, 255, 0.9);
}

.amarillo{
    color:#e4c745
}

.bg-soft-primary {
    background-color: rgba(59,118,225,.25)!important;
}

.rounded-circle {
    border-radius: 50%!important;
}

.me-2 {
    margin-right: 0.5rem!important;
}

img, svg {
    vertical-align: middle;
}
.table thead tr th {
  padding: 0.75rem 0.75rem;
} 

.table>:not(caption)>*>* {
    /*padding: 0.75rem 0.75rem;*/
    background-color: var(--bs-table-bg);
    border-bottom-width: 1px;
    box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}

a {
    color: #3b76e1;
    text-decoration: none;
}

/*fin data table*/

/*ventana emergiente*/
  .popContainer{
  background-color: white;
  position: absolute;
  width: 50%;
  height: auto;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  border-radius: 15px 15px 15px 15px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;
  }

    .barraVerde{
  height: 100%; 
  width: 20%; 
  background-color: #00ae2f;  
  border-radius: 15px 0px 0px 15px;
  }

  .barraAzul{
  height: 100%; 
  width: 80%; 
  background-color: #263e6a;
  }

  .titulo1{
  color: #00ab5f;
}
  .cerrar{
  float:right; 
  margin-right: 2%; 
  font-size: 30px;
  }

    .btEnviar{
  margin-top:2%;
  margin-bottom:2%;
  }
  .btCancelar{
/*  margin-right:auto ;
  margin-left: auto;*/
  width: 20%;
  margin-top:2%;
  margin-bottom:2%;

/*  color:#263e6a;*/
/*  background-color: #eff2f8;*/
  }

  hr {
  margin-bottom: 1rem;
  border: 0;
 border-top: 1px solid rgba(255, 255, 255, 0.9);
}

/*fin popo*/

/*dropbox*/

.content-select {
    color:green;
    font-weight: bold;
    background-color: #eff2f8;
    border-radius: 10px 10px 10px 10px;
    border-color: #dee0e6;
    /*padding:3px;*/
}

.content-select:focus{
    outline: none;
}

/*fin dropbox*/

.iconUser{
    color: #0daf67;
    padding:5px;
    font-size: 27px;
    margin-left: 15px;  
    margin-right: 5px;


}

.trackerMapc{
    width:100%;
    height:385px;
    border:none; 
    border-radius: 15px 15px 15px 15px;
/*    filter: grayscale(50%) invert(90%) contrast(90%);*/
 
}

.filaAlertas{
    margin-left: 5px;
}

/*.targetasContainer{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}*/

/*checkmarks*/




</style>