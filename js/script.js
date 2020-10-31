
////VARIABLES GLOBALES
let contador = 4; //contador para crear los id de los productos
const nombreDeLista = "lista"
let datosPruductos1 = "datosPruductos" //nombre de arreglo en localstore




///---------------------------------
////CAPTURO ELEMENSTOS
const producto = document.querySelector('#input-producto')
const cantidad = document.querySelector('#input-cantidad')
const precio = document.querySelector("#input-precio");

let boton = document.querySelector("#guardarboton")
let formulario = document.querySelector("#formulario-principal")
let botonBorrar = document.querySelector("#borrar-todo")
let tbody = document.querySelector("tbody")



{

  //probando con objetos para funcionamiento
  ///lista inicial
  // const misListas = {
  //   "ProductosO" : [
  //     {
  //       "lista1":[1,"Primer Producto","22","99"]
  //     },
  //     {
  //       "lista2":[2,"segundo Producto","23","100"]
  //     },
  //     {
  //       "lista3":[3,"tercer Producto","24","150"]
  //     }
  //   ]
  // }
  ////segunda prueba
  // const misListas2 = [
  //   {"lista1":[1,"Primer Producto","22","99"]},
  //   {"lista2":[2,"segundo Producto","23","100"]},
  //   {"lista3":[3,"tercer Producto","24","150"]}
  // ]
  // const nuevaLista = {"lista3":[3,"tercer Producto","24","150"]}
}
 
///implementando utilizacion de arreglos de arreglos
////tercera prueba
///lista inicial de localstore
let misListas3 = [
  [1,"Primer Producto","22","99"],
  [2,"segundo Producto","23","100"],
  [3,"tercer Producto","24","150"]
]



///-------------------------------
////verifica datos en localstore para traerlos si existen
function traerDatosExistentes() {
  if(mostrarDatos(datosPruductos1)){
   tablaArmada(mostrarDatos(datosPruductos1))
   misListas3 = mostrarDatos(datosPruductos1)
  } else {
    tablaArmada(misListas3) // si no existen relleno con datos precargados
  }
}
traerDatosExistentes()

////si existen datos ajustar el id = contador
function ajustarId() { //solo optativo para incorporar un id
  if(mostrarDatos(datosPruductos1)){
    contador = mostrarDatos(datosPruductos1)[mostrarDatos(datosPruductos1).length - 1][0] + 1
   } 
}
ajustarId()//segun datos ya existentes ajusta id al inicio tomando en cuneta el ultimo que se uso



/////////TRABAJO LOCALSTORE

//guarda datos en localstore
 function guardarDatos(nombreDeLista, lista) {
  localStorage.setItem(nombreDeLista, JSON.stringify(lista));
}

//trae datos localstore
function mostrarDatos(datosbuscar) {
  return JSON.parse(localStorage.getItem(datosbuscar))
}

//elimina un item de la lista
function eliminarItem(indice){

  misListas3.splice(indice-1,1)//elimina item del arreglo
  
  guardarDatos("datosPruductos", misListas3)

  eliminaFilaDeTabla(indice)

  tablaArmada(misListas3)
}

//elimina todo el localstore
function eliminarTodo() {
  localStorage.clear()
}

//elimina una fila de la tabla html
function eliminaFilaDeTabla(indice) {
  document.querySelector("#fila"+indice).remove()
}


///----------------------------------
////EVENTOS
//elimina el comportamiento por efecto del formulario
formulario.addEventListener("submit", function(event){
  event.defaultPrevented()
})

boton.addEventListener("click", function () {
  
  borrarComportamiento()

  //crear un arreglo apartir de los datos del formulario
  const listaFinal = [contador,producto.value,cantidad.value,precio.value]
  //agrega el arreglo anterior a la lista
  misListas3.push(listaFinal)
  
  //guarda la lista en el localstore
  guardarDatos("datosPruductos", misListas3)

  tablaArmada(misListas3)

  contador += 1;
  limpiarCampos()
  producto.focus()
})


botonBorrar.addEventListener("click", function () {
  eliminarTodo()
  tbody.innerHTML=""
  contador = 1
})


///-----------------------
////FUNCIONES AUXILIARES
function limpiarCampos() {
       producto.value=""
       cantidad.value=""
       precio.value=""
}
//borra comportamiento por defecto del formulario
function borrarComportamiento(e) {
  let evento = window.event || e;
  evento.preventDefault()
}
//arma la tabla con los datos de la lista
function tablaArmada(datosLocalStore) {
  let indiceFilas = 1
  tbody.innerHTML = ""
  for (const unProducto of datosLocalStore) {          
      tbody.innerHTML+=`<tr id="${"fila"+indiceFilas}">
                            <th scope="row">${indiceFilas}</th>
                            <td>${unProducto[1]}</td>
                            <td>${unProducto[2]}</td>
                            <td>${unProducto[3]}</td>
                            <td><button type="button" 
                                        class="btn btn-danger" 
                                        id="eliminarLinea" 
                                        onClick="eliminarItem(${indiceFilas});">
                                          -
                                </button>
                            </td>
                        </tr>`
      indiceFilas++
    
  }
}











////FIREBASE



// function registrar() {
//   let email = document.querySelector("#exampleInputEmail1").value
//   let contrasena = document.querySelector("#exampleInputPassword1").value
//   firebase.auth().createUserWithEmailAndPassword(email, contrasena)
//   .catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorCode)
//     console.log(errorMessage)
//     // ...
//   });
  
// }
// function ingresoUsuarios() {
//   let email = document.querySelector(".controlUsuariosEmail").value
//   let contrasena = document.querySelector(".controlUsuariosContrasena").value

//   firebase.auth().signInWithEmailAndPassword(email, contrasena).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorCode)
//     console.log(errorMessage)
//     // ...
//   });
  
// }
// function observador(){
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       console.log('existe usuario activo')

//       // User is signed in.
//       // var user = firebase.auth().currentUser;
//       var name, email, photoUrl, uid, emailVerified, providerData;

     
//         name = user.displayName;
//         email = user.email;
//         photoUrl = user.photoURL;
//         emailVerified = user.emailVerified;
//         providerData = user.providerData;
//         uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
//                         // this value to authenticate with your backend server, if
//                         // you have one. Use User.getToken() instead.
//         let datos = [name,email,photoUrl,emailVerified,providerData,uid]
//         console.log(datos)
//     } else {
//       // No user is signed in.
//       console.log('no existe usuario activo')
//     }
//   });
// }

// observador()
