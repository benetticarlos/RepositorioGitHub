// let producto = ""
// let cantidad = ""
// let precio = ""

const lista = ["producto", "cantidad", "precio"]

function guardarDatos(lista) {
  localStorage.setItem("lista", JSON.stringify(lista));
}

guardarDatos(lista)