
////VARIABLES GLOBALES
let contador = 1;
const nombreDeLista = "lista"

///-------------------------------
/////////TRABAJO LOCALSTORE
 function guardarDatos(nombreDeLista, lista) {
  localStorage.setItem(nombreDeLista, JSON.stringify(lista));
}

function mostrarDatos(datosbuscar) {
  return JSON.parse(localStorage.getItem(datosbuscar))
}

function eliminarItem(item){
  localStorage.removeItem(item)
  document.querySelector("#fila"+item).remove()
}

function eliminarTodo() {
  localStorage.clear()
}

///---------------------------------
////CAPTURO ELEMENSTOS
const producto = document.querySelector('#input-producto')
const cantidad = document.querySelector('#input-cantidad')
const precio = document.querySelector("#input-precio");

let boton = document.querySelector("#guardarboton")
let formulario = document.querySelector("#formulario-principal")
let botonBorrar = document.querySelector("#borrar-todo")
let tbody = document.querySelector("tbody")


///----------------------------------
////EVENTOS
formulario.addEventListener("submit", function(event){
  event.defaultPrevented()
})

boton.addEventListener("click", function () {
  borrarComportamiento()
  const listaFinal = [contador,producto.value,cantidad.value,precio.value]
  
  guardarDatos(contador, listaFinal)
  tablaArmada(listaFinal)
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

function tablaArmada(listaFinal) {
  tbody.innerHTML+=`<tr id="${"fila"+listaFinal[0]}">
                        <th scope="row"></th>
                        <td>${listaFinal[1]}</td>
                        <td>${listaFinal[2]}</td>
                        <td>${listaFinal[3]}</td>
                        <td><button type="button" 
                                    class="btn btn-danger" 
                                    id="eliminarLinea" 
                                    onClick="eliminarItem(${listaFinal[0]});">
                                      -
                            </button>
                        </td>
                    </tr>`
}














