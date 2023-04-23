const botonEncriptar = document.querySelector(".btn-encriptar");
const botonDesencriptar = document.querySelector(".btn-desencriptar");
const botonCopiar = document.querySelector(".btn-copiar");
const munieco = document.querySelector(".contenedor-munieco");
const h3 = document.querySelector(".contenedor-h3");
const parrafo = document.querySelector(".contenedor-texto");
const resultado = document.querySelector(".texto-resultado");
const texto = document.querySelector(".area");

const valores = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;
botonCopiar.onclick = copiarTexto;

function encriptar() {
  let mensaje = recuperarTexto();
  if (mensaje === "") {
    removerOcultar();
  } else ocultarDerecha();
  resultado.textContent = encriptarTexto(mensaje);
}

function desencriptar() {
  let mensaje = recuperarTexto();
  if (mensaje === "") {
    removerOcultar();
  } else ocultarDerecha();
  resultado.textContent = desencriptarTexto(mensaje);
}

function recuperarTexto() {
  let mensaje = texto.value;
  return mensaje;
}

function encriptarTexto(texto) {
  let textoEncriptado = texto;

  for (const key in valores) {
    const regex = new RegExp(key, "g");
    textoEncriptado = textoEncriptado.replace(regex, valores[key]);
  }

  return textoEncriptado;
}

function desencriptarTexto(texto) {
  let textoDesencriptado = texto;

  for (const key in valores) {
    const regex = new RegExp(valores[key], "g");
    textoDesencriptado = textoDesencriptado.replace(regex, key);
  }

  return textoDesencriptado;
}

function copiarTexto() {
  navigator.clipboard.writeText(resultado.innerHTML);
  alert("Mensaje Copiado al Portapapeles");
}

function ocultarDerecha() {
  munieco.classList.add("ocultar");
  h3.classList.add("ocultar");
  parrafo.classList.add("ocultar");
}

function removerOcultar() {
  munieco.classList.remove("ocultar");
  h3.classList.remove("ocultar");
  parrafo.classList.remove("ocultar");
}
