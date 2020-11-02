
// ////VARIABLES GLOBALES
let contador = 4; //contador para crear los id de los productos
const nombreDeLista = "lista"
let datosPruductos1 = "datosPruductos" //nombre de arreglo en localstore




// ///---------------------------------
// ////CAPTURO ELEMENSTOS
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


////si existen datos ajustar el id = contador
function ajustarId() { //solo optativo para incorporar un id
  if(mostrarDatos(datosPruductos1)){
    if(mostrarDatos(datosPruductos1).length == 0){
      contador = 1
    } else {
      contador = mostrarDatos(datosPruductos1)[mostrarDatos(datosPruductos1).length - 1][0] + 1
    }  
   } 
}



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
let cargaDatos = document.querySelector("#cargaDatos")
let login = document.querySelector("#login")
let registro = document.querySelector("#registro")
let datosDeUsuario = document.querySelector("#datosDeInicio")
let registrarUsuario = document.querySelector('#registarUsuario')
let loguinUsuarios = document.querySelector('#loguinUsuarios')

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDtQDFnRvNWpFQqJlLww1aE_cNv3dSEa60",
  authDomain: "usuario1-1c65b.firebaseapp.com",
  databaseURL: "https://usuario1-1c65b.firebaseio.com",
  projectId: "usuario1-1c65b",
  storageBucket: "usuario1-1c65b.appspot.com",
  messagingSenderId: "819871423345",
  appId: "1:819871423345:web:37625987ba323ce90ff4d0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
function registrar() {

    let email = document.querySelector("#emailId").value;
    let contrasena = document.querySelector("#contrasenaId").value;
    console.log("registro ", email, contrasena)

    firebase.auth().createUserWithEmailAndPassword(email, contrasena)
    .then(function(){
      console.log("dentro del then registro ", email, contrasena)

    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      console.log("dentro del catch", email, contrasena)
      // ...
    });       
  };
  function ingresar() {

    let email = document.querySelector("#emailIdIngreso").value;
    let contrasena = document.querySelector("#contrasenaIdIngreso").value;

    console.log("ingreso",email, contrasena)

    // console.log("ingreso",login)

    firebase.auth().signInWithEmailAndPassword(email, contrasena)
    .then(function(){
      console.log("dentro del then de ingreso", email, contrasena)
      // login.style.display = "none"
      // datosDeUsuario.style.display = "block"
      // cargaDatos.style.display = "block"

    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      // console.log("dentro del catch de registro", email, contrasena)
      // ...
    });       
  };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
      console.log("usuario logueado : ",email)
      login.style.display = "none"
      datosDeUsuario.style.display = "flex"
      cargaDatos.style.display = "block"
      document.querySelector("#emailUsuario").innerHTML = email

      ///datos de pantalla de carga de datos
      traerDatosExistentes()
      ajustarId()//segun datos ya existentes ajusta id al inicio tomando en cuneta el ultimo que se uso
      
    } else {
      // User is signed out.
      // ...
      console.log("se deslogueo usuario")
      login.style.display = "block"
      datosDeUsuario.style.display = "none"
      cargaDatos.style.display = "none"

      

    }
  });

  function cerrarSesion(){
    firebase.auth().signOut()
    .then(function() {
      // Sign-out successful.
      console.log("sesion cerrada")
      
      
    }).catch(function(error) {
      // An error happened.
      console.log("no pudimos cerrar sesion")
    });
  }

  registrarUsuario.addEventListener("click", function(){
    login.style.display = "none"
    registro.style.display = "block"
  })
  loguinUsuarios.addEventListener("click", function(){
    registro.style.display = "none"
    login.style.display = "block"
  })


