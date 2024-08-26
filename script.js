const botonEncriptar = document.querySelector(".boton_encriptar");
const txtArea = document.querySelector(".text_area");
const aviso = document.querySelector(".texto_aviso");
const respuesta = document.querySelector(".evaluar");
const botonCopiar = document.querySelector(".boton_copiar");
const botonDesencriptar = document.querySelector(".boton_desencriptar");

function mostrarAviso(mensaje) {
    aviso.style.background = "#0A3871";
    aviso.style.color = "#FFFF";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;
    
    setTimeout(() => {
        aviso.removeAttribute("style");
    }, 1500);
}

function validarTexto(texto) {
    let txt = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]><:"`;,\u0300-\u036f']/g, "");

    if (texto === "") {
        mostrarAviso("El campo de texto no debe estar vacío");
        return false;
    } else if (texto !== txt) {
        mostrarAviso("No debe tener acentos y caracteres especiales");
        return false;
    } else if (texto !== texto.toLowerCase()) {
        mostrarAviso("El texto debe ser todo en minúscula");
        return false;
    }
    return true;
}

botonEncriptar.addEventListener("click", e => {
    e.preventDefault();
    let texto = txtArea.value;
    if (validarTexto(texto)) {
        texto = texto.replace(/e/g, "enter").replace(/i/g, "imes").replace(/a/g, "ai").replace(/o/g, "ober").replace(/u/g, "ufat");
        respuesta.textContent = texto; 
        botonCopiar.style.visibility = "visible"; 
    }
});

botonDesencriptar.addEventListener("click", e => {
    e.preventDefault();
    let texto = txtArea.value;
    if (validarTexto(texto)) {
        texto = texto.replace(/enter/g, "e").replace(/imes/g, "i").replace(/ai/g, "a").replace(/ober/g, "o").replace(/ufat/g, "u");
        respuesta.textContent = texto; 
        botonCopiar.style.visibility = "visible"; 
    }
});

botonCopiar.addEventListener("click", e => {
    e.preventDefault();
    navigator.clipboard.writeText(respuesta.textContent).then(() => {
        console.log('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
});