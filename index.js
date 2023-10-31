// const cards = document.querySelectorAll(".card");

// const reveal = (e) => {
//   const currentCard = e.currentTarget;
//   currentCard.classList.add("flipped");

//   setTimeout(() => {
//     currentCard.classList.remove("flipped");
//   }, 1000);
// };

// for (const card of cards) {
//   card.addEventListener("click", reveal);
// }

///////
// const reveal = (e) => {

//   const currentCard = e.currentTarget;
//   currentCard.classList.add("flipped");

//   setTimeout(() => {
//     currentCard.classList.remove("flipped");
//   }, 1000);
// };
///////

const ArrEmojies = ["😀", "😃"];
const cards = document.querySelectorAll(".card");
let stopper = 0;
let cardUpp = 0;
const cardUpped = [];
let contador = 0;
let bloqueo = 0;

// funcion a la que llamamos una vez que selecionamos un carta
const reveal = (e) => {
  console.log(
    "esta carta ya ha sido levantada ?",
    cardUpped.includes(e.currentTarget)
  );

  // Verificamos si la carta seleccionada no se encuantra en el array donde hemos almacenados las cartas ya descatadas
  if (!cardUpped.includes(e.currentTarget)) {
    console.log("esta carta no esta incluida", e.currentTarget);
    // Verificamos si la carta que hemos seleccionado no coincide con la que hemos levantado anteriormente, y que sea la primera o segunda carta
    if (stopper < 2 && cardUpp !== e.currentTarget && bloqueo === 0) {
      console.log(cardUpp !== e.currentTarget);
      //aumentamos el contador de cartas levantadas
      stopper++;
      //alamcenamos carta levantada y le añadimos la clase flipped para que nos la gire
      let currentCard = e.currentTarget;
      currentCard.classList.add("flipped");
      console.log("informacion carta levantada", currentCard);
      // Verificamos si tenemos dos cartas levantadas
      if (stopper === 2) {
        //activamos bloqueo para que no se levanten mas cartas
        bloqueo = 1;
        console.log("has levantado dos cartas");
        //cargamos los valores de ambas cartas para su posterior comparacion
        const carta1 = cardUpp.innerText.toString();
        const carta2 = e.currentTarget.innerText.toString();
        console.log(carta1);
        console.log(carta2);
        //guardamos la anteriormente levantada
        const cardtoRemove = cardUpp;
        // verificamos si las dos cartas levantadas son iguales
        if (carta1 === carta2) {
          // aumentamos el contador de intentos
          contador++;
          console.log("las cartas son iguales");
          //alamcenamos las dos cartas levantadas a nuestro array de cartas levantadas
          cardUpped.push(cardtoRemove);
          cardUpped.push(e.currentTarget);
          // SI las cartas levantadas son todas las del tablero imprimimos el contador y reseteamos las cartas**
          if (cardUpped.length === 16) {
            console.log("Has termiando tu partida, tu puntuacion es", contador);
            contador = 0;
            // despues de un segundo eliminaos las clases previamente añadidas para resetear el juego
            setTimeout(() => {
              for (const card of cards) {
                card.classList.remove("flipped");
                card.classList.remove("erased");
              }
            }, 1000);
          }
          // despues de un segundo reseteamos variables de control y la carta primeramente levantada y añadimos la case erased
          setTimeout(() => {
            currentCard.classList.add("erased");
            cardtoRemove.classList.add("erased");
            stopper = 0;
            bloqueo = 0;
            cardUpp = 0;
          }, 1000);
          // en caso no afiramtivo, las cartas no son iguales
        } else {
          console.log("las cartas no son iguales");
          // aumentamos el contador
          contador++;
          // despues de un segundo elimnamos la clase flipped de ambas cartas para que se tapen y reseteamos variables de control
          setTimeout(() => {
            currentCard.classList.remove("flipped");
            cardtoRemove.classList.remove("flipped");
            stopper = 0;
            bloqueo = 0;
            cardUpp = 0;
          }, 1000);
        }
      } else {
        // En caso de que aun no tengamos dos cartas levantadas, almacenamos la carta que se ha levantado para poder compararla con la siguiente
        console.log("la almaceno en carta levantada");
        cardUpp = e.currentTarget;
      }
    }
  }
};

// añadimos el EventListener a los elementos card que hemos cargdo en esa variable previamente
for (const card of cards) {
  card.addEventListener("click", reveal);
}

///generador de posisicones aleatorias, para reparto de cartas una vez obtenido los 8 emojis

const arrInicial2 = [0, 1, 2, 3, 4, 5, 6, 7];
const arrInicialdoble = [...arrInicial2, ...arrInicial2];

const aleatorio = (array) => {
  let i = 0;
  const arrRandCartas = [];
  const arrIncPos = [];
  do {
    const x = Math.floor(Math.random() * array.length);
    if (!arrIncPos.includes(x)) {
      arrIncPos.push(x);
      arrRandCartas[x] = array[i];
      i++;
    }
  } while (arrIncPos.length < array.length);
  return arrRandCartas;
};
console.log(" array definitivo", aleatorio(arrInicialdoble));
