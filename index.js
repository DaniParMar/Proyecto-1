'use strict'
// Nos traemos todas las constantes globales necesatias para el funcionamiento del juego
const emojis = "😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 🥺 😢 😭 😮‍💨 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🫣 🤗 🫡 🤔 🫢 🤭 🤫 🤥 😶 😐 😑 😬 🫨 🫠 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫 🫥 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 👽";

const cards = document.querySelectorAll(".card");

const numeroParejas = 8

const botonStart = document.querySelector(".button-start");

const tablero = document.querySelector(".tablero");

const puntuacion = document.querySelector(".marcador");

const parrafo = document.querySelector(".textoInicial");

const body = document.querySelector(".body");

const emojiCarta = document.querySelectorAll("div.back");
// variable que evita que podamos seleccionar cartas antes de pulsar el boton de empezar y que podamos elegir más de 2 cartas a la vez
let bloqueo = 1;
// creamos un array a partir del string de emojis para poder trabajar con ellos
const arrayEmojis = emojis.split(" ");

const arrayCartas = [];
// constante que desordena las cartas 
const desordenar = (array) => {
  for (let i = 0; i < array.length; i++) {
    const x = Math.floor(Math.random() * array.length);
    const temporal = array[i];
    array[i] = array[x];
    array[x] = temporal;
  }
  return array;
};
//boton de inicio que tambie resetea para jugar de nuevo 
const iniciar = (e) => {
  //bucle que selecciona aleatoriamente 8 emojis del array que contiene todos los emojis
  do {
      const x = Math.floor(Math.random() * arrayEmojis.length);
      if (!arrayCartas.includes(arrayEmojis[x])) {
          arrayCartas.push(arrayEmojis[x]);
      }
  } while (arrayCartas.length < numeroParejas);
//duplicamos el array de emojis selecionados aleatoriamente para tener las 8 parejas
  const cartasJuego=[...arrayCartas, ...arrayCartas]


  let emojisDobleDesordenados = desordenar(cartasJuego);
  //empujamos el array desordenado a cada una de las cartas del tablero a trabes de un bucle for
  for ( let i = 0; i<16;i++){
      emojiCarta[i].innerHTML=emojisDobleDesordenados[i];
  }
  //ocultamos boton,y modificamos el contenido del area asignada como parrafo para mostrar la puntuacion
  botonStart.setAttribute("hidden", true);
  parrafo.classList.add("atras");
  puntuacion.classList.remove("atras");
  puntuacion.innerHTML = `Tu puntuación es: 0`;
  tablero.classList.remove("inicial");
  //restablecemos valores de variables para empezar a jugar 
  bloqueo = 0;
  contador = 0;
  cardUpper = [];
};

botonStart.addEventListener("click", iniciar);

//logica del juego
let cardUp = null;
let cardUpper = [];
let stopper = 0;
let contador = 0;
//funcion a la que llamamos cada vez que hacemos click en una carta
const reveal = (e) => {
  // Verificamos si la carta seleccionada no se encuantra en el array donde hemos almacenados las cartas ya descatadas
  if (!cardUpper.includes(e.currentTarget)) {
    //aseguramos que se selecciona dos cartas como maximo y distintas entre ellas
    if (stopper < 2 && cardUp !== e.currentTarget && bloqueo === 0) {
      stopper++;
      const currentCard = e.currentTarget;
      currentCard.classList.add("flipped"); //añadimos el giro
      //logica con las dos cartas seleccionadas que bloquea que giren mas cartas con el bloqueo igual a 1
      if (stopper === 2) {
        bloqueo = 1;
        const cardRemove = cardUp;
        const carta1 = cardRemove.innerText;
        const carta2 = e.currentTarget.innerText;
        //En casa de cartas iguales(hemos comparado el contenido de ellas) incrementamos en 1 el contador de intentos y las almacenamos a la vez que reseteamos para poder volver a seleccioanr.
        if (carta1 === carta2) {
          contador++;
          cardUpper.push(cardRemove);
          cardUpper.push(e.currentTarget);
          currentCard.classList.add("good");
          cardRemove.classList.add("good");
          setTimeout(() => {
            currentCard.classList.remove("good");
            cardRemove.classList.remove("good");
          }, 1000);
          bloqueo = 0;
          stopper = 0;
          if (cardUpper.length === 16) {
            setTimeout(() => {
              for (const card of cards) {
                card.classList.remove("flipped");
              }
              arrayCartas.length = 0;
              bloqueo = 1;
              tablero.classList.add("inicial");
              botonStart.innerHTML = "JUGAR DE NUEVO";
              botonStart.removeAttribute("hidden");
              puntuacion.innerHTML = `Enhorabuena tu puntuacion es: ${contador}`;
            }, 1000);
          }
        } else {
          //En caso de que no sean iguales, las volvemos a girar, sumamos tambien 1 al contador y las volvemos a tornar pasado 1 seg. A su vez reseamos valores para volver a seleccionar
          contador++;
          bloqueo = 0;
          setTimeout(() => {
            currentCard.classList.add("bad");
            cardRemove.classList.add("bad");
          }, 500);
          setTimeout(() => {
            currentCard.classList.remove("bad");
            cardRemove.classList.remove("bad");
            currentCard.classList.remove("flipped");
            cardRemove.classList.remove("flipped");
            stopper = 0;
            cardUp = 0;
          }, 1000);
        }
      }
    }
    //variable que utilizamos para acumulamos la primera carta selecionada de las dos posibles
    cardUp = e.currentTarget; 
  }
  puntuacion.innerHTML = `Tu puntuacion es: ${contador}`;
};
//bucle que recorre todas las cartas esperando el 'click'
for (const card of cards) {
  card.addEventListener("click", reveal);
}
