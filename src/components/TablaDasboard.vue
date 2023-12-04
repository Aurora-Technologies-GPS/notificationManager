<template>
<div v-show="popOpener" class="popContainer">

<div class="row" style="height: 100%;">
    <!-- logo y barra -->
<div class="col-2 d-flex flex-row">
<div class="barraVerde"></div>
<div class="barraAzul"></div>   
</div>
<!-- fin Logo y Barra -->
<div class="col text-center mt-4">
<i @click="hidePop()" class="bi bi-x cerrar"></i>
 <h4> <span class="titulo1"><b>RECONOCIMIENTOS</b></span> DE ALERTAS</h4>
 <label>2-12-2023 ; 12:00:14PM</label>
 <br>
 <label>Velocidad Alta</label>
 <hr style="opacity: 0.1;"/>
 <label>“Este conductor sobrepaso el limite de 45Km/h Establecidos” 
</label>
 <hr style="opacity: 0.1;"/>


 <div class="text-center">
 <span class="titulo1">Dejar un mensaje</span> 
  <textarea class="form-control"  rows="3" style="width: 70%; margin-left: auto; margin-right:auto;"></textarea>
</div>
<button @click="hidePop()" type="button" class="btn btCancelar"><b>Cancelar</b></button>
<button type="button" class="btn btn-primary btEnviar">Enviar</button>

</div>
</div>

</div>
<h1>{{"red "+redCount}}</h1>
<h1>{{"amarillo "+yellowCount}}</h1>
<h1>{{"verde "+greenCount}}</h1>
    <table  class="table project-list-table table-nowrap align-middle table-borderless text-center">
        <thead>
            <tr>
            <th scope="col" class="ps-4 columnaName" style="width: 50px;">
            <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck" /><label class="form-check-label" for="contacusercheck"></label></div>
            </th>
                                <th scope="col" class="columnaName">Fecha</th>
                                <th scope="col" class="columnaName">Hora</th>
                                <th scope="col" class="columnaName">Alerta</th>
                                <th scope="col" class="columnaName">Mensaje</th>
                                <th scope="col" class="columnaName">Ver</th>
                            </tr>
        </thead>

        <tbody>       
    <tr v-for=" (dato, index) in listaAlertas" :key="index">
        <th scope="row" class="ps-4">
            <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck1" /><label class="form-check-label" for="contacusercheck1"></label></div>
        </th>
        <td>
            <i class="bi bi-circle-fill" :style="{ color: '#'+dato.categoria }" style="padding-right: 15px; font-size: 30px;"></i><a href="#" class="text-body">{{new Date(dato.fechainicio).toLocaleDateString()}} </a>
        </td>
        <td>{{new Date(dato.fechainicio).getHours()+":"+new Date(dato.fechainicio).getMinutes()}}</td>
        <td><span class="badge mb-0" :style="{ backgroundColor: '#'+dato.categoria }" >{{dato.tipo}}</span></td>
        <td>{{dato.descripcion}}</td>
        <td>
            <i @click="verPop()" class="bi bi-eye"></i>
        </td>
    </tr>
</tbody>
</table>

</template>
<script>
import { ref } from 'vue'
import {alerts} from './DataConector'
export default {

     name: 'tablaMain',
  components: {
   
  },
    props: ['dataAlerts'],

    setup(props) {
    

    let datosUser=ref(props.dataAlerts);

    let redCount=ref(0);
    let yellowCount=ref(0);
    let greenCount=ref(0);
   /* let otraCount=ref(0);*/

    let listaAlertas=ref();
 
   /* console.log(datosUser.value)*/
    /*console.log(datosUser.value.key)*/

    let popOpener=ref(false);  
    function hidePop(){
      popOpener.value=false;
    }
    function verPop(){
        popOpener.value=true;
    }
    function tipo(categoria){
        switch (categoria) {
        case 'ce2238':
            //roja
            redCount.value+=1
           
            break;

        case '4ca531':
            //verde
            greenCount.value+=1
            
            break;
        case 'e4c745':
            //amarillo
            yellowCount.value+=1
            
            break;
          
        default:
            console.log("error")
            break;
        }

    }

    

    alerts(datosUser.value.key).then((alertData)=>{
    listaAlertas.value=[]

    redCount.value=0;
    yellowCount.value=0;
    greenCount.value=0;

    console.log(alertData)

    alertData.forEach(element=>{
    listaAlertas.value.push(element)
    tipo(element.categoria)

    })}).catch(error => {console.log(error)});


      
      return {
        datosUser,
        listaAlertas,
        hidePop,
        popOpener,
        verPop,
        redCount,
        yellowCount,
        greenCount,
        tipo
    }
    }
}
	
</script>
<style scoped>

 .columnaName  {
  position: sticky; 
  top: 0px;

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


.table>:not(caption)>*>* {
    padding: 0.75rem 0.75rem;
    background-color: var(--bs-table-bg);
    border-bottom-width: 1px;
    box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}

a {
    color: #3b76e1;
    text-decoration: none;
}


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
  margin-right:2% ;
  margin-top:2%;
  margin-bottom:2%;
  color:#263e6a;
  background-color: #eff2f8;
  }



</style>