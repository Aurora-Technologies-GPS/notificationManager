<template>
<div>
<!-- login -->
<section v-show="!autenticado" class="login">
<div style="float: right; padding: 10px;">
<img  src='../assets/logoAurora.svg' alt="Responsive image" style="position: absolute: right:0px; width: 100%;">
</div>



<div class="contenidoLogin text-center">
<h1 class="Bienvenido">Notification Manager</h1>


<div @click="clear()" class="searchBar   mt-2 rounded-pill" style="position: relative;">
<i class="bi bi-person-fill"></i>
<input v-model="usuario" class="inputsearchBar"  placeholder="Usuario" type="text">
<i v-if="claveIncorrecta" class="bi bi-exclamation-circle" style="position: absolute; right: 5%; margin: 5px; font-size: larger; color: red;"></i> 
</div>




<br>	
<div @click="clear()" class="searchBar rounded-pill" style="position: relative;">
<i class="bi bi-key-fill"></i>
<input class="inputsearchBar" @keyup="onPress" v-model="contrasena"  placeholder="Contrasena" type="password">
<i v-if="claveIncorrecta" class="bi bi-exclamation-circle" style="position: absolute; right: 5%; margin: 5px; font-size: larger; color: red;"></i> 
</div>	
	
<div @click="enviar()" class="btn btn-primary rounded-pill btAcceder" href="#" role="button"><b>Ingresar</b>
</div>

</div>



</section>	

<!-- dasboard -->
<section v-if="autenticado" class="d-flex pagina">

<div class="sidebar">
<div class="container-fluid" style="height: 100%;">
  <div class="row" style="height: 100%;">
    <div class="col-2 verdeLogo " ></div>
    <div class="col" style="position: relative;">

 <div style="width: 100%; position: absolute; left: 0px; top: 17%;">

   <img v-bind:src="imgLogo" style="width: 100%;">

 </div>
<div @click="mostrarDashboar()" :class="{ pestanaActual: dbShowing}" class="bi bi-ui-checks-grid menu menuDashboard"> Eventos</div> 
<div @click="mostrarReporte()" :class="{ pestanaActual: repShowing}" class="bi bi-bookmark-dash menu menuHistorico"> Historico</div> 
<div @click="mostrarSetting()" :class="{ pestanaActual: !repShowing & !dbShowing}" class="bi bi-gear-fill  menu menuConfiguracion"> Setting</div> 
<a @click="logOut()">
<div class="bi bi-door-open menu menuLogOut"> Log Out</div>
</a>


<!-- style="font-size: max(0.5vw, 10px);" -->
</div>
  </div>
</div>     
</div>

<div class="areaTrabajo" style="position: relative;">

<div style="float: right; margin-right: 80px; padding-top: 20px;">
<i class="bi bi-person-circle iconUser"></i><span><b>{{datosUser.userName}}</b></span>
<br>
<sup @click="logOut()" style="float: right; cursor: pointer; color:#ce2238 ;"><div class="bi bi-door-open mt-2"><b>Log Out</b></div></sup>
</div>
<div class="text-center" style="padding-top: 20px; margin-bottom: 40px;">
 <h2> <span class="titulo1"><b>{{tituloPages()}}</b></span> DE ALERTAS</h2>
</div>

<div v-show="dbShowing">
<AreaTrabajo :dataUserInfo="datosUser"/>
<!-- <h1>{{datosUser}}</h1> -->

</div>
<div v-show="repShowing">
  <ReportesAlerta />
</div>

<div v-show="!repShowing & !dbShowing">

<ConfigurationPage />

</div>

</div>

</section>
</div>
</template>

<script setup>
import { ref } from 'vue'
import {auth} from './DataConector'
import AreaTrabajo from  './AreaTrabajo.vue'
import ReportesAlerta from './ReportesAlertas.vue'
import ConfigurationPage from './ConfigurationPage.vue'


/*login */

let company=ref({
  name:'',
  client_id:0
})

let imgLogo= ref(require(`../assets/auroraLogo.png`));


function brandLogo(){

switch(company.value.client_id) {

  case 257873:
imgLogo.value= require(`../assets/a24.png`); 
  break;
    case 226152:
imgLogo.value= require(`../assets/induban.png`); 
  break;

  default:
imgLogo.value= require(`../assets/auroraLogo.png`);
  break;
}

}

  if (window.$cookies.isKey('auth')){
   company.value.client_id=window.$cookies.get('auth').id_client
 }
brandLogo()



let datosUser=ref({
	id:null,
	id_pannel:null,
	userName:'Jose H.',
  id_client:null,
	domain:null,
  key:null,
	legal_name:null

})

let autenticado=ref(false)
let usuario=ref(null);
let contrasena=ref(null);
let claveIncorrecta=ref(false)


function tituloPages(){

let title;
  if(!repShowing.value && dbShowing.value){
title='HISTORICO'
  }else if(repShowing.value && !dbShowing.value){
   title='RECONOCIMIENTOS'
  }else if(!repShowing.value && !dbShowing.value){
   title='CONFIGURACION'
  } 
  return title
}

const onPress = (e) => {
  if (e.key == "Enter") {
    enviar()
    return;
  }else{
    clear();
    return;
  }
};

function clear(){
  claveIncorrecta.value=false
}


function enviar(){

if (!window.$cookies.isKey('auth')) {

if ((contrasena.value !=null) && (usuario.value !=null) ) {

  auth(usuario.value,contrasena.value).then(result=>{
  console.log(result)

    if(result.success){
    autenticado.value=true;
    datosUser.value.id=result.id
    datosUser.value.id_client=result.id_client
    datosUser.value.id_pannel=result.id_pannel
    datosUser.value.userName=result.name
    datosUser.value.domain=result.domain
    datosUser.value.key=result.key
    datosUser.value.legal_name=result.legal_name

    //console.log(datosUser.value)

   window.$cookies.set('auth', datosUser.value)
   company.value.client_id=datosUser.value.id_client
   brandLogo();

}else{
  claveIncorrecta.value=true
}
}).catch(error => {console.log(error)});

  }else{
    console.log('favor llene los campos')
    claveIncorrecta.value=true
      return null
  }

} 
}

if (window.$cookies.isKey('auth')){
  autenticado.value=true;

  

    datosUser.value.id=window.$cookies.get('auth').id
    datosUser.value.id_pannel=window.$cookies.get('auth').id_pannel
    datosUser.value.userName=window.$cookies.get('auth').userName
    datosUser.value.domain=window.$cookies.get('auth').domain
    datosUser.value.id_client=window.$cookies.get('auth').id_client
    datosUser.value.key=window.$cookies.get('auth').key
    datosUser.value.legal_name=window.$cookies.get('auth').legal_name
 
}

function logOut(){
	autenticado.value=false;
  window.$cookies.remove('auth')
}

/*fin login*/

/*dasboard*/
let dbShowing=ref(true)
let repShowing=ref(false)


const mostrarDashboar = () => {
      dbShowing.value=true;
      repShowing.value=false;
  }

const mostrarReporte=()=>{
      repShowing.value=true;
      dbShowing.value=false;
}

const mostrarSetting=()=>{
      repShowing.value=false;
      dbShowing.value=false;
    }


/*fin dasboard*/

</script>

<style scoped>
/* para el login*/

.Bienvenido{
  color:#00ab5f;
  font-size: calc(2em + 1vw);
  padding-bottom: 20px;
}

.inputsearchBar{
padding:10px;
width: 80%;

outline: none !important;
border: none;

}

.searchBar{
  /*width: 400px;*/
  margin-left: 21%;
  margin-right: 21%;
  background-color: white;
  border: none;
  color: #00ab5f;
 /* margin:5px;*/


}
.btAcceder{
  background-color: #ffffff;
  color: #003466;
  width: 230px;
   border: none;
   margin-top: 20px;
   margin-bottom:20px;

/*  padding-left: 70px;
  padding-right: 70px;*/
/*  margin-top: 20px;*/

}


.login {
  background-image: url("../assets/bgLogin.jpeg");
  height: 100vh;
  /*min-width: 1000px;*/
 background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.contenidoLogin{
  position: absolute;
  width: auto;
  padding: 15px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.1);;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  border-radius: 15px 15px 15px 15px;
/*  box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;*/
  
}

/*para el poppop*/
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
  margin-right:2% ;
  margin-top:2%;
  margin-bottom:2%;
  color:#263e6a;
  background-color: #eff2f8;
  }

/*fin popop*/



.titulo{
	font-size: calc(3em + 1vw);
	color:#00ab5f;
}

/* para el login*/

/*alertas para el dasboard*/

  .pagina{
background-color: #cbcbcb;
min-height: 100vh;
/*min-height: 950px;*/

font-family: 'Poppins', sans-serif;
}
.iconUser{
  color: green; 
  font-size: 30px;
  }
  .titulo1{
  color: #00ab5f;
}


  .sidebar{
  background-color: #263e6a;
  border-radius: 20px 0px 0px 20px;
  min-width: 200px;
}

.areaTrabajo{
  min-width: 1200px;
  width: 100%; 

  border-radius: 0px 20px 20px 0px;
  background-color: #eff2f8;
}

.menu{
  position: absolute;   
  left: 0px; 
  right: 0px; 
  width: 100%;
  color: white;
  border-radius: 0px 20px 20px 0px;
  padding: 5px;

}

.menuDashboard{
top:35%;
}
.menuDashboard:hover{
background-color: #00ae2f;
cursor: pointer;
}

.pestanaActual{
  background-color: #00ae2f;
}
.menuHistorico{
top:40%;
}
.menuHistorico:hover{
background-color: #00ae2f;
cursor: pointer;
}

.menuConfiguracion{
top:45%;
}
.menuConfiguracion:hover{
background-color: #00ae2f;
cursor: pointer;
}

.menuLogOut{
bottom:25%;
}
.menuLogOut:hover{
background-color: #00ae2f;
cursor: pointer;
}


.verdeLogo{
  background-color: #00ae2f;
  height: 100%;
  border-radius: 20px 0px 0px 20px;
  border-width: thin;

}

.titulo{
  font-size:larger; 
  font-weight: bold;

}

</style>