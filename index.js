const cards = document.querySelectorAll(".card");

const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add("flipped");
  console.log(cards)
  const temporal1 = cards.filter(function(elementoActual){
    return elementoActual="section.card.flipped"
  })
  console.log(temporal1)
  // setTimeout(() => {
    //   currentCard.classList.remove("flipped");
  // }, 1000);
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
