var palabrasContenidas  = Array("Oracle", "Programacion", "Mexico","Alura");
let contadorVidas       = 6;
let palabraOculta       = "";
let palabraAdivinar     = "";
let agregarPalabra      = "";
let letrasMal           = "";

document.getElementById("pantallaInicio").style.display = "initial";
document.getElementById("pantallaJuego").style.display = "none";
document.getElementById("pantallaNuevaPalabra").style.display = "none";

function juego(){
    contadorVidas       = 6;
    letrasMal           = "";
    agregarPalabra      = "";
    palabraOculta       = "";
    palabraAdivinar     = "";
    borrarCanvas();
    palabraOculta = palabrasContenidas[Math.floor(Math.random() * palabrasContenidas.length)];
    for (let i = 0 ; i < palabraOculta.length ; i++) {
        palabraAdivinar = palabraAdivinar + "_ ";
    }
    document.getElementById("palabraOculta").innerHTML = palabraAdivinar;
}

let letra = "";
let codeAscii       = "";
window.addEventListener("keydown", function (event) {
    letra           = event.key;
    codeAscii       = event.keyCode;
    resultado();
    LetraEquivocada(letra);
  },
  false
);

function comprobarPalabra() {
    letra               = letra.toLocaleLowerCase();
    palabraOculta       = palabraOculta.toLocaleLowerCase();
    let nuevaPalabra    = "";

    for(let i = 0; i < palabraOculta.length; i++) {
        if(letra == palabraOculta[i]) {
            nuevaPalabra = nuevaPalabra + letra + " ";
        }else{
            nuevaPalabra = nuevaPalabra + palabraAdivinar[i * 2] + " ";
        }
    }

    if (nuevaPalabra == palabraAdivinar) {
        contadorVidas--;
        letrasMal = letrasMal + letra + " ";
        document.getElementById("letrasMal").innerHTML = letrasMal;
        document.getElementById("vidas").innerHTML = "Vidas Actuales: " + contadorVidas;
    }

    palabraAdivinar = nuevaPalabra;
    document.getElementById("palabraOculta").innerHTML = palabraAdivinar;

    function notificacion(resul, msg, icono) {
      swal(resul, msg, icono);
    }

    if (contadorVidas < 1) {
      document.getElementById("vidas").innerHTML = "Perdiste";
      document.getElementById("vidas").classList = "perdiste";
      document.getElementById("vidas").style.fontSize = "30px";
      notificacion("Perdiste", "¿Deseas jugar de nuevo?", "error");
    }

    if (palabraAdivinar.search("_") == -1) {
      document.getElementById("vidas").innerHTML = "Ganaste";
      document.getElementById("vidas").style.fontSize = "30px";
      notificacion("Ganaste", "Felicidades haz acertado la palabra", "success");
    }
    dibujarCanvas();
    letra = "";
}

function borrarCanvas() {
    let canvas = document.getElementById("myCanvas");
    if (canvas.getContext) {
        let dibujo = canvas.getContext("2d");
        dibujo.clearRect(0, 0, canvas.width, canvas.height);
    }
    document.getElementById("letrasMal").innerHTML = letrasMal;
    document.getElementById("vidas").innerHTML = "Vidas Actuales: " + contadorVidas;
}

function dibujarCanvas() {
    let canvas = document.getElementById("myCanvas");
    if (canvas.getContext) {
        let dibujo = canvas.getContext("2d");
        dibujo.lineWidth = 4;
        dibujo.strokeStyle = "#0a3871";
        switch(contadorVidas){
            case 0: //Dibujar Piernas
                dibujo.beginPath();
                dibujo.moveTo(150, 100);
                dibujo.lineTo(170, 130);
                dibujo.stroke();
                dibujo.beginPath();
                dibujo.moveTo(150, 100);
                dibujo.lineTo(130, 130);
                dibujo.stroke();
            break;
            case 1: //Dibujar Brazos
                dibujo.beginPath();
                dibujo.moveTo(150, 60);
                dibujo.lineTo(130, 100);
                dibujo.stroke();
                dibujo.beginPath();
                dibujo.moveTo(150, 60);
                dibujo.lineTo(170, 100);
                dibujo.stroke();
            break;
            case 2://dibujar cuerpo
                dibujo.beginPath();
                dibujo.moveTo(150, 60);
                dibujo.lineTo(150, 100);
                dibujo.stroke();
            break;
            case 3://Dibujo Cabeza
                dibujo.beginPath();
                dibujo.arc(150, 40, 20, 0, Math.PI * 2);
                dibujo.stroke();
            break;
            case 4://dibuja el poste
                dibujo.beginPath();
                dibujo.moveTo(30, 200);
                dibujo.lineTo(30, 10);
                dibujo.lineTo(150, 10);
                dibujo.lineTo(150, 20);
                dibujo.stroke();
            break;
            case 5://Dibuja la base del ahorcado
                dibujo.beginPath();
                dibujo.moveTo(30, 200);
                dibujo.lineTo(150, 200);
                dibujo.stroke();
            break;
            default:
            break;
        }
    }
}

function checkName(evento) {
    let charCode = evento;
    if (charCode != 0) {
        if (charCode < 65 || charCode > 90 == 192) {
        } else {
            LetraRepetida(letra);
        }
    }
}

function LetraEquivocada(string) {
    let salida = "";
    let filtro = "abcdefghijklmnñopqrstuvwxyz"; 
    for (let i = 0; i < string.length; i++)
        if (filtro.indexOf(string.charAt(i)) != -1) checkName(codeAscii);
}

function LetraRepetida(LetraIngresada) {
    if (palabraAdivinar.includes(LetraIngresada) || letrasMal.includes(LetraIngresada)) {
        return false;
    }
    comprobarPalabra();
}

function resultado() {
    if (contadorVidas < 1) {
        letra = "";
        document.removeEventListener("keydown", Window, false);
    }
    if (palabraAdivinar.search("_") == -1) {
        letra = "";
        document.removeEventListener("keydown", Window, false);
    }
}

function nuevaPalabra() {
    var textarea = document.querySelector(".añadir");
    if(textarea.value.length>3){
        agregarPalabra = document.querySelector(".añadir").value.toLowerCase();
        palabrasContenidas.push(agregarPalabra);
        document.getElementById("añadir").value = "";
        notificacion("Correcto", "La palabra se ha añadido correctamente", "success");
        return;
    }else{
        document.getElementById("añadir").value = "";
        notificacion("Error", "La palabra no cumple los requisitos", "error");
    }
    function notificacion(resul, msg, icono) {
        swal(resul, msg, icono);
    }
}

function agregarpalabra(){
    document.getElementById("pantallaInicio").style.display = "none";
    document.getElementById("pantallaJuego").style.display = "none";
    document.getElementById("pantallaNuevaPalabra").style.display = "initial";
}

function iniciarjuego() {
    document.getElementById("pantallaInicio").style.display = "none";
    document.getElementById("pantallaJuego").style.display = "initial";
    document.getElementById("pantallaNuevaPalabra").style.display = "none";
    palabraAdivinar = " ";
    juego();
}

function rendirse() {
    document.getElementById("pantallaInicio").style.display = "initial";
    document.getElementById("pantallaJuego").style.display = "none";
    document.getElementById("pantallaNuevaPalabra").style.display = "none";
}

function soloLetras(e) {
    let key = e.keyCode || e.which,
    tecla = String.fromCharCode(key).toLowerCase(),
    letras = " abcdefghijklmnñopqrstuvwxyz",
    especiales = [8],
    tecla_especial = false;

    for (let i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
}