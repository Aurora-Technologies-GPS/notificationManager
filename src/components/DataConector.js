import axios from 'axios';

const ip='notificationsb.dev2.rastreo.gs';
const protocol='https';
const apiURl=`${protocol}://${ip}/`;


/*const ip='10.0.0.229:9093';
const protocol='http';
const apiURl=`${protocol}://${ip}/`;*/


export async function auth(user, pass){

   let data;

 await axios.get(apiURl+`auth/validar/${user}/${pass}`).then(response=>{
    data=response.data;

   }).catch(error => {
      console.log(error)
   });
   return data
}


export async function buscar_filtro(parametros){

   let data;

 await axios.post(apiURl+'data/buscarfiltro',parametros).then(response=>{
    data=response.data;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}

export async function filterNew(id_client, group_id){

   let data;
   let param={
   "client_id": id_client, 
   "group_id":group_id
}

 await axios.post(apiURl+'data/filter',param).then(response=>{
    data=response.data;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}






export async function users(id_client){

   let data;
   let param={
      "id_client":id_client 
   }

 await axios.post(apiURl+'auth/usuarios',param).then(response=>{
    data=response.data;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}


export async function setPriority(client_id, id, event){

   let data;
   let param={
      "client_id":client_id, 
      "id":id, 
      "event":event
   }

 await axios.post(apiURl+'data/setpriority',param).then(response=>{
    data=response.data;
      
   }).catch(error => {
      console.log(error)

   });
   return data
  
}



export async function count(clasificacion,  ack, client_id){
let data;
let param={
   "client_id":client_id, 
   "ack":ack, 
   "clasificacion":clasificacion
}
   await axios.post(apiURl+'data/count', param ).then(response => {
      data=response

   }).catch(error => {
      console.log(error)
   });

   return data;
   
}

export async function trackers(client_id){
let data;
let param={
   "client_id":client_id
}

await axios.post(apiURl+'data/trackers',param ).then(response => {
      data=response
   }).catch(error => {
      console.log(error)
   });
   return data; 
}

export async function groups(client_id){
let data;
let param={
   "client_id":client_id
}

await axios.post(apiURl+'data/groups',param ).then(response => {
      data=response
   }).catch(error => {
      console.log(error)
   });
   return data; 
}



export async function priorities(client_id, id){
let data;
let param={
   "client_id":client_id,
   "id":id
}

await axios.post(apiURl+'data/priorities',param ).then(response => {
      data=response
   }).catch(error => {
      console.log(error)
   });
   return data; 
}

export async function prioritie(client_id){
let data;
let param={
   "client_id":client_id
}

await axios.post(apiURl+'data/prioritie',param ).then(response => {
      data=response
   }).catch(error => {
      console.log(error)
   });
   return data; 
}


export async function setColores(client_id,color,id){
let data;
let param={
   "client_id":client_id,
   "hex_color":color,
   "id":id
}

await axios.post(apiURl+'data/setcolores',param ).then(response => {
      data=response
   }).catch(error => {
      console.log(error)
   });
   return data; 
}



export async function eventList(client_id){
let data;
let param={
   "client_id":client_id
}
await axios.post(apiURl+'data/eventlist',param ).then(response => {
      data=response
   }).catch(error => {
      console.log(error)
   });
   return data; 
}



export async function notificationsAll( getPrioridades, ack, client_id ){
let data;

let param={
/*   "clasificacion" : ` 'low', 'medium', 'high', 'neutral' `, */
   "clasificacion" :`${getPrioridades}`, 
   "client_id" :  client_id,
   "ack" : ack
}

   await axios.post(apiURl+'data/notificationsall',param).then(response => {
      data=response
   }).catch(error => {
      console.log(error)
   });

   return data;
   
}



export async function notificationsdone(client_id){

let data;

let param={
   "client_id" : client_id
}
   await axios.post(apiURl+'data/notificationsdone',param).then(response => {
      data=response
   }).catch(error => {
      console.log(error)
   });

   return data;
   
}

export async function isNewData(){
let data;
 await axios.get(apiURl+`data/isnewdata`).then(response=>{
   data=response.data;
   }).catch(error => {
      console.log(error.response.data)
   });
    return data
}

export async function updateDatos(datos){

  let id=datos.id;
  let userid=datos.user_id;
  let user_name=datos.user_name;
  let comentario=datos.messagetype;

 /* console.log(datos)*/
let data;
 await axios.get(apiURl+`update/${id}/${userid}/${user_name}/${comentario}/`).then(response=>{
   data=response.data;
      
   }).catch(error => {
      console.log(error.response.data)

   });

    return data


}

