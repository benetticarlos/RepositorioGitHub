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




function eliminarItem(item){
  localStorage.removeItem(item)
}

function eliminarTodo() {
  localStorage.clear()
}

const producto = document.querySelector("#input-producto")

const cantidad = document.querySelector('#input-cantidad')

const precio = document.querySelector("#input-precio");

let boton = document.querySelector("#guardarboton")

// const datos = [producto.value, cantidad.value, precio.value];

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
  guardarDatos(nombreDeLista+contador, lista)
  contador += 1;
  console.log(contador)
})

let botonBorrar = document.querySelector("#borrar-todo")

botonBorrar.addEventListener("click", function () {
  eliminarTodo()
  contador = 1
})

let formulario = document.querySelector("#formulario")
