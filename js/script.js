// let producto = ""
// let cantidad = ""
// let precio = ""

const lista = ["producto", "cantidad", "precio"]

function guardarDatos(lista) {
  localStorage.setItem("lista", JSON.stringify(lista));
}

function mostrarDatos(datosbuscar) {
  return JSON.parse(localStorage.getItem(datosbuscar))
}
// let abrir = mostrarDatos(lista)
// console.log (abrir)


guardarDatos(lista)


function eliminarItem(item){
  localStorage.removeItem(item)
}

function eliminarTodo() {
  localStorage.clear()
}