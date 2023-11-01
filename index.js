const cards = document.querySelectorAll(".card");

const emojis=["😄","🥵","😵‍💫","🥴","🥳","🥸","🤯","😎"]
const emojisDoble = [...emojis,...emojis]

//desordenamos el array
const desordenar2 = (array) => {
for(let i = 0; i < array.length;i++){
    const x = Math.floor(Math.random()*array.length)
    const temporal = array[i];
    array[i]=array[x]
    array[x]=temporal
}
console.log(array)
return array
}
emojisDobleDesordenados = desordenar2(emojisDoble)
//y distribuimos las en cada carta
const emojiCarta = document.querySelectorAll('div.back')
for ( let i = 0; i<16;i++){
    emojiCarta[i].innerHTML=emojisDobleDesordenados[i];
}
//logica del juego
let cardUp = null;
const cardUpper = [];
let stopper = 0;
let bloqueo = 0;
let contador = 0
//funcion a la que llamamos cada vez que hacemos click en una carta
const reveal = (e) => {
      // Verificamos si la carta seleccionada no se encuantra en el array donde hemos almacenados las cartas ya descatadas
    if(!cardUpper.includes(e.currentTarget)){
        //aseguramos que se selecciona dos cartas como maximo y distintas entre ellas
        if(stopper<2 && cardUp!==e.currentTarget && bloqueo === 0){
            stopper++
            const currentCard = e.currentTarget;
            currentCard.classList.add("flipped");//añadimos el giro
            //logica con las dos cartas seleccionadas que bloquea que giren mas cartas con el bloqueo igual a 1
        if(stopper ===2){
            bloqueo = 1
            const cardRemove = cardUp
            const carta1 =cardRemove.innerText
            const carta2 = e.currentTarget.innerText
            //En casa de cartas iguales(hemos comparado el contenido de ellas) incrementamos en 1 el contador de intentos y las almacenamos a la vez que reseteamos para poder volver a seleccioanr.
            if(carta1===carta2){
                contador++
                cardUpper.push(cardRemove)
                cardUpper.push(e.currentTarget)
                bloqueo  = 0
                stopper = 0
            }else{//En caso de que no sean iguales, las volvemos a girar, sumamos tambien 1 al contador y las volvemos a tornar pasado 1 seg. A su vez reseamos valores para volver a seleccionar
                contador++
                bloqueo  = 0
                setTimeout(() => {
                    currentCard.classList.remove("flipped");
                    cardRemove.classList.remove("flipped");
                    stopper = 0
                    cardUp=0
                    }, 1000);
                }
            }
        }cardUp=e.currentTarget//variable que utilizamos para acumulamos la primera carta selecionada de las dos posibles
    }
};
//bucle que recorre todas las cartas esperando el 'click'
for (const card of cards) {
    card.addEventListener("click", reveal);
}