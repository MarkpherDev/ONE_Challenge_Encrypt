const botonEncriptar = document.querySelector(".btn-encriptar");
const botonDesencriptar = document.querySelector(".btn-desencriptar");
const botonCopiar = document.querySelector(".btn-copiar");
const munieco = document.querySelector(".contenedor-munieco");
const h3 = document.querySelector(".contenedor-h3");
const parrafo = document.querySelector(".contenedor-texto");
const resultado = document.querySelector(".texto-resultado");
const texto = document.querySelector(".area");

const MENSAJE = {
  VACIO: "",
  COPIADO: "Mensaje Copiado al Portapapeles",
};

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
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  let mensaje = recuperarTexto();

  let texto = removeAccents(mensaje);

  if (texto === MENSAJE.VACIO) {
    removerOcultar();
  } else ocultarDerecha();
  resultado.textContent = encriptarTexto(texto);
}

function desencriptar() {
  let mensaje = recuperarTexto();
  if (mensaje === MENSAJE.VACIO) {
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
    title: "Signed in successfully",
  });
  // if (texto.value !== MENSAJE.VACIO) {
  //   navigator.clipboard.writeText(resultado.innerHTML);
  // } else alert("x");
}

function ocultarDerecha() {
  munieco.classList.add("ocultar");
  h3.classList.add("ocultar");
  parrafo.classList.add("ocultar");
  botonCopiar.classList.remove("ocultar");
}

function removerOcultar() {
  munieco.classList.remove("ocultar");
  h3.classList.remove("ocultar");
  parrafo.classList.remove("ocultar");
  botonCopiar.classList.add("ocultar");
}
