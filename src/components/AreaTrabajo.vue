<template>
<div v-show="popOpener" class="popContainer">



<div class="text-center" v-show="!comentarioisshowingLabel">
<i @click="hidePop()" class="bi bi-x cerrar"></i>
<b >{{alertaShowing.alerta}}</b>
<div>{{ new Date(alertaShowing.fecha).toLocaleDateString()+" "+new Date(alertaShowing.fecha).toLocaleTimeString('en-US')}}</div>
<div>{{alertaShowing.mensaje}}</div>
<iframe
  id="hola"
  class="trackerMap"
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
<div class="col text-center mt-4">
<i @click="hidePop()" class="bi bi-x cerrar"></i>
 <h4> <span class="titulo1"><b>RECONOCIMIENTOS</b></span> DE ALERTAS</h4>
 <label>{{popFecha}}</label>
 <br>
 <label>{{popTipo}}</label>
 <hr style="opacity: 0.1;"/>
 <label>{{popMensaje}}</label>
 <hr style="opacity: 0.1;"/>


 <div class="text-center">
 <span class="titulo1">Dejar un mensaje</span> 
<textarea maxlength ="80" v-model="comentario" class="form-control textareainput"  rows="3" style="width: 70%; margin-left: auto; margin-right:auto;"></textarea>
</div>
<button @click="hidePop()" type="button" class="btn btCancelar"><b>Cancelar</b></button>
<button @click="enviarDatos()" :disabled='disabledBt' type="button" class="btn btn-primary btEnviar">Enviar</button>
<div v-if="enviado">
<h4 class="titulo1 text-center"><b>Mensaje Enviado</b></h4>
</div>
</div>
</div>

</div>

<div style="position: relative;">

<div @mouseup="hidePop" class="d-flex flex-column" style="height: 85vh;">

<div class="titulo" style="margin-left: 5%">Dashboard</div>

<div class="menus">

  <!-- row #1 -->
<div class="row">

  <div class="col-12">

    <div class="row">
      <div class="col-10">
        <div class="targetasContainer">

<div @click="changeStatus(data[1].name)" class="ffolder medium zoom"  style="margin:10px;" :style="{ backgroundColor:'#'+myColor(data)}" v-for=" (data, index) in carpetas" :key="index">
<div class="folderInside">

<div class="folderName">
<!--   data[1].name -->
<b>{{ data[1].name}}</b>

</div>
<div class="valorFolder"><b class="count">{{data[1].count}}</b></div>

</div>
</div>

<!-- Fin de targetas -->
  
</div>
      </div>
      <div class="col-2">
        
        <!-- targeta 4 -->



<div  @click="changeStatus('Unclassified')" class="ffolder medium zoom"  style=" float: right; backgroundColor:#829aa8">
<div :class="{ desabilitado: !true}" class="folderInside">

<div class="folderName">
<b>{{'Sin Clasificar'}}</b>

</div>
<div class="valorFolder"><b class="count">{{neutralCount}}</b></div>

</div>
</div>
</div>
</div>




</div>

</div>
  
<!-- row # 2 -->
<div class="row">
  <div class="d-flex flex-row" style="margin-top:10px; margin-bottom: 20px; width: 100%;">
<div class="d-flex flex-row" style="width: 90%;">
<span class="titulo" style="width: 40%;">Listas de Alertas Sin Reconocer</span>
<div class="border rounded-pill searchBarContainer" style="width: 60%;">
<input class="rounded-pill searchBar"  placeholder="" type="text">
</div>  
</div>
<!-- otro -->
<div @click="listadoAll()" class="d-flex justify-content-end" style="width: 30%; padding-right: 60px;">
<div class="border rounded-pill" style="padding-right: 20px; padding-left: 20px; cursor: pointer;">See All</div>
</div>
  
</div>
  
</div>
</div>
<div class="contenedorTabla">

    <table  class="table project-list-table table-nowrap align-middle table-borderless">
           <thead > 

                  <tr>
            <th scope="col" class="ps-4 columnaName">
            <div class="form-check font-size-14"><input type="checkbox" class="form-check-input" id="contacusercheck" /><label class="form-check-label" for="contacusercheck"></label></div>
            </th>
                                <th scope="col" class="columnaName">Fecha</th>
                             
                                <th scope="col" class="columnaName">Alerta</th>
                                <th scope="col" class="columnaName">Mensaje</th>
                                <th scope="col" class="columnaName">Ver</th>
                            </tr>
    
        
        </thead>
        
    

        <tbody>       
    <tr class="hovertabla" v-for=" (dato, index) in listaAlertas" :key="index">
        <td scope="row" class="ps-4">
            <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck1" /><label class="form-check-label" for="contacusercheck1"></label></div>
        </td>
        <td class="hovertabla">
            <i class="bi bi-circle-fill" :style="{ color: '#'+dato.hex_color }" style=" padding-right: 15px; font-size: 20px;"></i><a href="#" class="text-body">{{new Date(dato.time).toLocaleDateString()+" "+new Date(dato.time).toLocaleTimeString('en-US')}} </a>
        </td>
        <td><span class="badge mb-0" style="background-color: #c4c4c4;" :style="{ backgroundColor: '#'+dato.hex_color }" >{{dato.description}}</span></td>
        <td>{{dato.message}}</td>
        <td>
          <div class="d-flex">
              <i @click="showPopPopDescription(dato.lat, dato.lng, dato.id, new Date(dato.time), dato.description ,dato.message)" :style="{ color: '#'+dato.hex_color }" class="bi bi-eye"></i>
            <i @click="showPopPopMapa(dato.lat, dato.lng, dato.id, new Date(dato.time), dato.description ,dato.message)" :style="{ color: '#'+dato.hex_color }" style="margin-left: 5px;" class="bi bi-geo-alt"></i>
            
          </div>
        </td>
    </tr>
</tbody>
</table>
<div>{{incomingstatus}}</div>
</div>



</div>


</div>
	
</template>
<script >
import { ref, } from 'vue'
/*import TablaDasboard from './TablaDasboard.vue'*/
import { count, notificationsAll, updateDatos,isNewData,prioritie } from './DataConector'


export default {
  props:['dataUserInfo'],
  components: {
      /*TablaDasboard */ 
  },
  setup(props){

    let userInfo=ref(props.dataUserInfo)
    let popTipo=ref('Velocidad media')
    let popFecha=ref('2-12-2023 ; 2:00:14PM')
    let enviado=ref(false)
    let disabledBt=ref(false)

    const carpetas =ref( new Map())
    const clasificacion =ref( new Map())

    clasificacion.value.set('Unclassified',{name: 'Unclassified', value:'Unclassified', activo:true})

    let clasiArray=ref("' '")

    
    let popMensaje=ref('“Este conductor sobrepaso el limite de 445Km/h Establecidos')

    let datosParaEnviar=ref({
      user_id:null,
      user_name:null,
      id:null,
      date:null,
      alertType:null,
      message:null,
      messagetype:null
      })

    let incomingstatus=ref('No hay Datos nuevos')


    let neutralCount=ref(0)

    let listaAlertas=ref();
    let comentario=ref('');

    let valorAnterior=ref(null)

    let alertaShowing=ref({alerta:null, mensaje:null, fecha:null}) 

    let popOpener=ref(false);  
    function hidePop(){
      disabledBt.value=false;
      popOpener.value=false;
      comentario.value='';
    }

    let comentarioisshowingLabel=ref(false)

    async function showMap(lat,long) {
    let link=`https://maps.google.com/maps?q=${lat},${long}&hl=es&z=15&t=m`;
    let mapa=document.getElementById('hola');

    mapa.removeAttribute("src");
    let url = link + "&output=embed";
    await mapa.setAttribute("src",url);
  }

  function getPrioridades(){
    clasiArray.value=''

    clasificacion.value.forEach(elem=>{
      clasiArray.value=clasiArray.value+"'"+elem.value+"'"+', ' 
    })

    clasiArray.value=clasiArray.value.substr(0,(clasiArray.value.length-2))
    return clasiArray.value
  }



    function showPopPopDescription(lat, lng, notification_id ,fechaInput,alerta,mensaje){

      comentarioisshowingLabel.value=true

    console.log(lat+" "+lng)
      popTipo.value=alerta
      popFecha.value=fechaInput.toLocaleDateString()+" "+fechaInput.toLocaleTimeString('en-US')
      popMensaje.value=mensaje;


        datosParaEnviar.value={
        user_id:userInfo.value.id,
        user_name:userInfo.value.userName,
        id:notification_id,
        date:fechaInput,
        alertType:alerta,
        message:mensaje,
      }


      popOpener.value=true;


    }

       function showPopPopMapa(lat, lng, notification_id ,fechaInput,alerta,mensaje){

      comentarioisshowingLabel.value=false

   

      alertaShowing.value={alerta:alerta, mensaje:mensaje, fecha:fechaInput}

       showMap(lat,lng)
    
    
      popTipo.value=alerta
      popFecha.value=fechaInput.toLocaleDateString()+" "+fechaInput.toLocaleTimeString('en-US')
      popMensaje.value=mensaje;


        datosParaEnviar.value={
        user_id:userInfo.value.id,
        user_name:userInfo.value.userName,
        id:notification_id,
        date:fechaInput,
        alertType:alerta,
        message:mensaje,
      }


      popOpener.value=true;


    }
    

        function enviarDatos(){
          if (comentario.value !='' ) {

      datosParaEnviar.value.messagetype=comentario.value;

      updateDatos(datosParaEnviar.value).then(resul=>{
      console.log(resul)

      consultAlerts()
            })

            comentario.value=''

            for (let t = 0; t < 2; t++) {
              if(t==0){
                enviado.value=true
                disabledBt.value=true
            
              }else if(t==1){
            
            setTimeout(function(){
              enviado.value=false
              hidePop()//brayan no lo queria

            }, 1000);

              } 
              /*enviado.value=false  */
            }

          }else{
            console.log('llene el campo comentario')
          }
          
           
    }

function counter(){

    count("Unclassified", false, userInfo.value.id_client).then(resul=>{
      neutralCount.value=resul.data[0].count;
    })


prioritie(userInfo.value.id_client).then(resul=>{
    
    resul.data.forEach(elementR=>{

    count( elementR.name, false, userInfo.value.id_client).then(resul=>{

        let count_value=resul.data[0].count

        carpetas.value.set(elementR.name, {name: elementR.name, hex_color:elementR.hex_color, count:count_value});
    })

      })
})
}



    function changeStatus(data){

     if (clasificacion.value.get(data).activo) {
        clasificacion.value.set(data,{name: data, value:' ', activo:false})      

      }else{
        clasificacion.value.set(data ,{name: data, value:data, activo:true})
      }  

      consultAlerts() 
    }


    prioritie(userInfo.value.id_client).then(resul=>{
    
    resul.data.forEach(valore=>{
       clasificacion.value.set(valore.name,{name: valore.name, value:valore.name, activo:true})
    })


    isNewData().then(resul=>{


          try{

            if (resul.length!=0) {
              valorAnterior.value=resul[0].id
              incomingstatus.value=""
              updateder();

            }else{

              incomingstatus.value="No hay Nuevas Alertas"
         
            }

          } catch (error) {
          console.log(error)
        }
      })


  })


  function myColor(data){

    if( clasificacion.value.get(data[1].name).activo){

        return  data[1].hex_color

    }else{
        return  '829aa8'
    }
  
  } 






function updateder(){

setInterval(()=>{        

  isNewData().then(resul=>{


    try{  
    /*console.log(valorAnterior.value)  */ 
   /* console.log(resul[0].id);  */ 
      if(valorAnterior.value !=resul[0].id){
        valorAnterior.value=resul[0].id
        console.log('diferente')
        consultAlerts()
      }

        } catch (error) {
          console.log(error)
        }

  })}, 13000);
}




      function listadoAll(){
        consultAlerts();
    }



    function consultAlerts(){
      try{
/*console.log(userInfo.value.id_client)
console.log(userInfo.value.id)*/

notificationsAll(getPrioridades() ,'false', userInfo.value.id_client).then(resul=>{

  listaAlertas.value=[];

  counter()
  
    resul.data.forEach(element=>{
      listaAlertas.value.push(element)
    })

  

     
 
  })


 


      } catch (error) {
      console.error(error);
    }
    }


  listadoAll();

          
      return {
        userInfo,
        listaAlertas,
        hidePop,
        popOpener,
        alertaShowing,
        showPopPopDescription,
        comentarioisshowingLabel,
        neutralCount,
        popTipo,
        popFecha,
        popMensaje,
        datosParaEnviar,
        enviarDatos,
        clasificacion,
        comentario,
        enviado,
        myColor,
        disabledBt,
        getPrioridades,
        changeStatus,
        carpetas,
        listadoAll,
        showPopPopMapa,
        incomingstatus,
        consultAlerts
    }
    },
   mounted() {
/*console.log(this.comentario)*/
  }
  
}



</script>
<style scoped>
 .count{
  font-size: calc(1em + 1vw);
 }


.trackerMap{
    width:100%;
    height:385px;
    border:none;   
    border-radius: 15px 15px 15px 15px;  
/*    filter: grayscale(50%) invert(90%) contrast(90%);*/
 
}

.menus{
margin-left: auto;
margin-right: auto;
width: 95%;
}

.contenedorTabla {
height: 100%;
margin-left: auto;
margin-right: auto;
/*margin-bottom: 5px;*/
width: 95%;
overflow: auto
}

.ffolder:before, .ffolder.gray span{ background-color: #687F8C;}
.ffolder:after{ border-bottom-color:#687F8C;}



.targetasContainer{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  /*justify-content: space-around;*/
}

input:focus{
    outline: none;
}

.zoom:hover {-webkit-transform:scale(1);transform:scale(1.2);}


.searchBar{
background-color: #eff2f8; 
margin-left: 15px; 
border: none; 
width: 90%;

}

.searchBarContainer{
width: 40%;  
margin-left: 10px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 1px 1px;
}

.desabilitado{
  filter: grayscale(1);

}

.ocultar{
  visibility: hidden;
}


 .targetas{ 

/*  min-height: 155px;*/
  min-width: 15%;
  position: relative;
}
.folderImg{
  position: relative; 
  width: 200px;
  height:150px ;
 /* box-shadow: rgba(0, 0, 0, 0.1) 2px 5px 5px 2px;*/
  border-radius: 20px 0px 20px 20px;  
}

.pedazo{
width: 100%; 
height: 15%; 
position: absolute; 
top: 0px; 
right: 0px; 
background: red; 
}

.folderInside{
width: 90%; 
position: relative; 
margin-right: auto; 
margin-left: auto;
}

.titulo{
  font-size:larger; 
  font-weight: bold;

}
.titulo1{
  color: #00ab5f;
}
.valorFolder{
  position: absolute; 
  right: 30px; 
  top: 60px; 
  color: white;
}


.folderName{
  position: absolute; 
  left: 20px; 
  top: 20px; 
  color: white;
}
.filaAlertas:hover {
    background:white;
    box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 19px 1px;
    border-radius: 5px 5px 5px 5px;

}
.filaAlertas{
  margin-right: 5%;
  margin-top: 1%;
  margin-left:2px;
  padding-left: 12px;
}
label .ojoVerAlerta{
  visibility: hidden;
}
.filaAlertas:hover label i {
  visibility: visible;
  cursor: pointer;

}

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


/*ventana emergiente*/
  .popContainer{
  background-color: white;
  position: absolute;
  width: 50%;
  height: auto;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
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