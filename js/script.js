
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




//probando con objetos para funcionamiento
const misListas = {
  "ProductosO" : [
    {
      "lista1":[1,"Primer Producto","22","99"]
    },
    {
      "lista2":[2,"segundo Producto","23","100"]
    },
    {
      "lista3":[3,"tercer Producto","24","150"]
    }
  ]
}
////segunda prueba
const misListas2 = [
  {"lista1":[1,"Primer Producto","22","99"]},
  {"lista2":[2,"segundo Producto","23","100"]},
  {"lista3":[3,"tercer Producto","24","150"]}
]
const nuevaLista = {"lista3":[3,"tercer Producto","24","150"]}
 
///implementando utilizacion de arreglos de arreglos
////tercera prueba
///lista inicial de localstore
let misListas3 = [
  [1,"Primer Producto","22","99"],
  [2,"segundo Producto","23","100"],
  [3,"tercer Producto","24","150"]
]



///-------------------------------
////verifica datos en localstore para traerlos siexisten
function traerDatosExistentes() {
  if(mostrarDatos(datosPruductos1)){
   tablaArmada(mostrarDatos(datosPruductos1))
   misListas3 = mostrarDatos(datosPruductos1)
  } else {
    tablaArmada(misListas3)
  }
}
traerDatosExistentes()

////si existen datos ajustar el id = contador
function ajustarId() {
  if(mostrarDatos(datosPruductos1)){
    contador = mostrarDatos(datosPruductos1)[mostrarDatos(datosPruductos1).length - 1][0] + 1
   } 
}
ajustarId()



/////////TRABAJO LOCALSTORE
 function guardarDatos(nombreDeLista, lista) {
  localStorage.setItem(nombreDeLista, JSON.stringify(lista));
}

function mostrarDatos(datosbuscar) {
  return JSON.parse(localStorage.getItem(datosbuscar))
}

function eliminarItem(indice){

  misListas3.splice(indice-1,1)
  
  guardarDatos("datosPruductos", misListas3)

  document.querySelector("#fila"+indice).remove()

  tablaArmada(misListas3)
}

function eliminarTodo() {
  localStorage.clear()
}


///----------------------------------
////EVENTOS
formulario.addEventListener("submit", function(event){
  event.defaultPrevented()
})

boton.addEventListener("click", function () {
  
  borrarComportamiento()
  

  const listaFinal = [contador,producto.value,cantidad.value,precio.value]
  
 

  misListas3.push(listaFinal)
  

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

function borrarComportamiento(e) {
  let evento = window.event || e;
  evento.preventDefault()
}

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














