/**
 * Variables
 */
const botonEncriptar = document.querySelector(".btn-encriptar");
const botonDesencriptar = document.querySelector(".btn-desencriptar");
const botonCopiar = document.querySelector(".btn-copiar");
const imagenResultado = document.querySelector(".contenedor-munieco");
const containerMensaje = document.querySelector(".contenedor-mensaje");
const containerTexto = document.querySelector(".contenedor-texto");
const resultado = document.querySelector(".texto-resultado");
const inputText = document.querySelector(".area");
const botonlimpiar = document.querySelector(".btn-limpiar");

const permitidos = /^[a-zñ\s]+$/;

const MENSAJE = {
  VACIO: "",
  COPIADO: "Mensaje Copiado a Portapapeles",
};

const valores = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

/**
 * Funciones Reutilizables
 */
const addOcultar = () => {
  imagenResultado.classList.add("ocultar");
  containerMensaje.classList.add("ocultar");
  containerTexto.classList.add("ocultar");
  botonCopiar.classList.remove("ocultar");
  resultado.classList.remove("ocultar");
};

const removeOcultar = () => {
  imagenResultado.classList.remove("ocultar");
  containerMensaje.classList.remove("ocultar");
  containerTexto.classList.remove("ocultar");
  botonCopiar.classList.add("ocultar");
  resultado.classList.add("ocultar");
};

const encriptarTexto = (mensaje) => {
  for (const key in valores) {
    const regex = new RegExp(key, "g");
    mensaje = mensaje.replace(regex, valores[key]);
  }
  return mensaje;
};

const desencriptarTexto = (mensaje) => {
  for (const key in valores) {
    const regex = new RegExp(valores[key], "g");
    mensaje = mensaje.replace(regex, key);
  }
  return mensaje;
};

const limpiarTexto = (texto) => {
  return texto.normalize("NFD").replace(/[^a-zA-Z0-9 ]/g, "");
};

const alertaMensajeVacio = () => {
  Swal.fire({
    title: "Warning!",
    text: "You didn't enter any message!",
    icon: "error",
    confirmButtonText: "OK",
  });
};

const alertaMensajeCopiado = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "Copiado con exito al Portapeles",
  });
};

/**
 * Funciones para los botones
 */
botonEncriptar.addEventListener("click", () => {
  const texto = limpiarTexto(inputText.value);
  console.log(texto);
  if (texto === MENSAJE.VACIO) {
    removeOcultar();
    alertaMensajeVacio();
  } else addOcultar();
  resultado.innerHTML = encriptarTexto(texto);
});

botonDesencriptar.addEventListener("click", () => {
  const texto = limpiarTexto(inputText.value);
  if (texto === MENSAJE.VACIO) {
    removeOcultar();
    alertaMensajeVacio();
  } else addOcultar();
  resultado.textContent = desencriptarTexto(texto);
});

botonCopiar.addEventListener("click", () => {
  let copyMessage = "";
  copyMessage = document.querySelector(".texto-resultado").innerHTML;
  document.querySelector(".area").value = "";
  document.querySelector(".area").value = copyMessage;
  console.log(copyMessage);
  alertaMensajeCopiado();
});

botonlimpiar.addEventListener("click", () => {
  document.querySelector(".area").value = "";
  removeOcultar();
});

/**
 * TODO verificar
 */
inputText.addEventListener("keypress", (event) => {
  if (event.key.match(permitidos) === null) {
    event.preventDefault();
  }
});
