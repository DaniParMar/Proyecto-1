const botonStart = document.querySelector(".button-start");
const tablero = document.querySelector(".tablero");

const puntuacion = document.querySelector(".marcador");
const parrafo = document.querySelector(".textoInicial");
let bloqueo = 1;

const iniciar = (e) => {
  let emojisDobleDesordenados = desordenar2(emojisDoble);
  const emojiCarta = document.querySelectorAll("div.back");
  // for ( let i = 0; i<16;i++){
  //     emojiCarta[i].innerHTML=emojisDobleDesordenados[i];
  // }
  botonStart.setAttribute("hidden", true);
  // botonStart.style.display = 'none';
  //parrafo.remove();
  parrafo.classList.add("atras");
  puntuacion.style.color = "black";
  // puntuacion.style.z-index = "0";???
  puntuacion.innerHTML = `Tu puntuacion es: 0`;
  tablero.classList.remove("inicial");
  bloqueo = 0;
  contador = 0;
  cardUpper = [];
  console.log(cardUpper);
};

botonStart.addEventListener("click", iniciar);

const cards = document.querySelectorAll(".card");

const emojis = ["😄", "🥵", "😵‍💫", "🥴", "🥳", "🥸", "🤯", "😎"];
const emojisDoble = [...emojis, ...emojis];

//desordenamos el array
const desordenar2 = (array) => {
  for (let i = 0; i < array.length; i++) {
    const x = Math.floor(Math.random() * array.length);
    const temporal = array[i];

    array[i] = array[x];
    array[x] = temporal;
  }
  console.log(array);
  return array;
};


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
          console.log(contador);

          if (cardUpper.length === 16) {
            setTimeout(() => {
              for (const card of cards) {
                card.classList.remove("flipped");
              }
              bloqueo = 1;
              tablero.classList.add("inicial");
              botonStart.innerHTML = "JUGAR DE NUEVO";
              botonStart.removeAttribute("hidden");
              puntuacion.innerHTML = `Enhorabuena tu puntuacion es: ${contador}`;
              contador;
            }, 1000);
          }
        } else {
          //En caso de que no sean iguales, las volvemos a girar, sumamos tambien 1 al contador y las volvemos a tornar pasado 1 seg. A su vez reseamos valores para volver a seleccionar
          contador++;
          bloqueo = 0;
          currentCard.classList.add("bad");
          cardRemove.classList.add("bad");
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
    cardUp = e.currentTarget; //variable que utilizamos para acumulamos la primera carta selecionada de las dos posibles
  }
  puntuacion.innerHTML = `Tu puntuacion es: ${contador}`;
};
//bucle que recorre todas las cartas esperando el 'click'
for (const card of cards) {
  card.addEventListener("click", reveal);
}

