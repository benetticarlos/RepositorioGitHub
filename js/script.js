// let producto = ""
// let cantidad = ""
// let precio = ""

const lista = ["producto", "cantidad", "precio"]



 function guardarDatos(nombreDeLista, lista) {
  localStorage.setItem(nombreDeLista, JSON.stringify(lista));
}
// guardarDatos(lista)


function mostrarDatos(datosbuscar) {
  return JSON.parse(localStorage.getItem(datosbuscar))
}
// let abrir = mostrarDatos(lista)
// console.log (abrir)






function eliminarTodo() {
  localStorage.clear()
}


const producto = document.querySelector('#input-producto')
const cantidad = document.querySelector('#input-cantidad')

const precio = document.querySelector("#input-precio");

let boton = document.querySelector("#guardarboton")

// const datos = [producto.value, cantidad.value, precio.value];
let formulario = document.querySelector("#formulario-principal")
formulario.addEventListener("submit", function(event){
  event.defaultPrevented()
})


function limpiarCampos() {
       producto.value=""
       cantidad.value=""
       precio.value=""
}


function borrarComportamiento(e) {
  let evento = window.event || e;
  evento.preventDefault()
}

// datos = {
//   "miproducto": producto.value,
//   "micantidad": cantidad.value,
//   "miprecio": precio.value
// }
let contador = 1;


const nombreDeLista = "lista"

boton.addEventListener("click", function () {
  borrarComportamiento()
  const listaFinal = [contador,producto.value,cantidad.value,precio.value]
  // console.log(listaFinal)
  guardarDatos(contador, listaFinal)
  tablaArmada(listaFinal)
  contador += 1;
  console.log(contador)
  limpiarCampos()
  producto.focus()
})
// borrar todo
let botonBorrar = document.querySelector("#borrar-todo")

botonBorrar.addEventListener("click", function () {
  eliminarTodo()
  tbody.innerHTML=""
  contador = 1
})
// borrar individual
function eliminarItem(item){

  localStorage.removeItem(item)
  // tbody.removeChild("#1")
  document.querySelector("#fila"+item).remove()
}

// const eliminarLinea = document.querySelector("#eliminarLinea")
// eliminarLinea.addEventListener("click",function() {
//   eliminarItem()
// })

// let formulario = document.querySelector("#formulario")

// lista de segundo cuadro
const tbody = document.querySelector("tbody")

function tablaArmada(listaFinal) {
   tbody.innerHTML+=`<tr id="${"fila"+listaFinal[0]}"><th scope="row"></th><td>${listaFinal[1]}</td><td>${listaFinal[2]}</td><td>${listaFinal[3]}</td><td><button type="button" class="btn btn-danger" id="eliminarLinea" onClick="eliminarItem(${listaFinal[0]});">-</button></td></tr>`
}
