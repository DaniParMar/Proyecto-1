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

const cards = document.querySelectorAll(".card");
let stopper = 0;
let cardUpp = 0;
const cardUpped = [];

///////
// const reveal = (e) => {

//   const currentCard = e.currentTarget;
//   currentCard.classList.add("flipped");

//   setTimeout(() => {
//     currentCard.classList.remove("flipped");
//   }, 1000);
// };
///////
let bloqueo = 0;
const reveal = (e) => {
  console.log("esta es la carta que he levantado", e);
  if (!cardUpped.includes(e.currentTarget)) {
    if (stopper < 2 && cardUpp !== e.currentTarget && bloqueo === 0) {
      stopper++;
      const currentCard = e.currentTarget;

      currentCard.classList.add("flipped");
      console.log("informacion carta levantada", currentCard);

      // setTimeout(() => {
      //   currentCard.classList.remove("flipped");
      // }, 100000);

      if (stopper === 2) {
        bloqueo = 1;
        console.log("has levantado dos cartas iguales");
        stopper = 0;

        // if(cardUpp === e.currentTarget)
        cardUpped.push(cardUpp);

        cardUpped.push(e.currentTarget);
        console.log("cartas levantadas", cardUpped);
        const cardtoRemove = cardUpp;

        setTimeout(() => {
          currentCard.classList.add("erased");
          cardtoRemove.classList.add("erased");
          currentCard.classList.remove("flipped");
          cardtoRemove.classList.remove("flipped");
          bloqueo = 0;
          // currentCard.classList.remove("flipped");
        }, 3000);
        // } else {
        //   console.log("No son iguales");
        //   setTimeout(() => {
        //     currentCard.classList.remove("flipped");
        //     cardUpp.classList.remove("flipped");
        //   }, 3000);
        //   stopper = 0;
        // }
      }
      cardUpp = e.currentTarget;
    }
  }
};

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
