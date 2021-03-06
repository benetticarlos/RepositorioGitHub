
const lista = ["producto", "cantidad", "precio"];

function guardarDatos(nombreDeLista, lista) {
  localStorage.setItem(nombreDeLista, JSON.stringify(lista));
}


function mostrarDatos(datosbuscar) {
  return JSON.parse(localStorage.getItem(datosbuscar));
}


function eliminarTodo() {
  localStorage.clear();
}

const producto = document.querySelector("#input-producto");
const cantidad = document.querySelector("#input-cantidad");
const precio = document.querySelector("#input-precio");
let boton = document.querySelector("#guardarboton");
let formulario = document.querySelector("#formulario-principal");

formulario.addEventListener("submit", function (event) {
  event.defaultPrevented();
});

function limpiarCampos() {
  producto.value = "";
  cantidad.value = "";
  precio.value = "";
}

function borrarComportamiento(e) {
  let evento = window.event || e;
  evento.preventDefault();
}


let contador = 1;
const nombreDeLista = "lista";

boton.addEventListener("click", function () {
  borrarComportamiento();
  const listaFinal = [contador, producto.value, cantidad.value, precio.value];

  guardarDatos(contador, listaFinal);
  tablaArmada(listaFinal);
  contador += 1;
  console.log(contador);
  limpiarCampos();
  producto.focus();
});

let botonBorrar = document.querySelector("#borrar-todo");

botonBorrar.addEventListener("click", function () {
  eliminarTodo();
  tbody.innerHTML = "";
  contador = 1;
});

function eliminarItem(item) {
  localStorage.removeItem(item);

  document.querySelector("#fila" + item).remove();
  actualizarOrden();
}


const tbody = document.querySelector("tbody");

function tablaArmada(listaFinal) {
  tbody.innerHTML += `<tr id="${
    "fila" + listaFinal[0]
  }"><th scope="row"></th><td>${listaFinal[1]}</td><td>${
    listaFinal[2]
  }</td><td>${
    listaFinal[3]
  }</td><td><button type="button" class="btn btn-danger" id="eliminarLinea" onClick="eliminarItem(${
    listaFinal[0]
  });">-</button></td></tr>`;
  
  actualizarOrden()
}

function actualizarOrden(){
  let miTabla = document.querySelector("table")
  let iteracion = miTabla.rows.length
  for (let i = 1; i < iteracion; i++){
    miTabla.rows[i].cells[0].textContent = i
  }
} 

function traerLocalStore(){
  let cantidaditem = 50
  for (let i = 0 ; i <= cantidaditem; i++){
    if(mostrarDatos(i)){
      tablaArmada(mostrarDatos(i))
    }
  }
}
window.onload = traerLocalStore;