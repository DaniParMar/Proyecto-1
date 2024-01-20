'use strict';

const emojis = "😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 🥺 😢 😭 😮‍💨 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🫣 🤗 🫡 🤔 🫢 🤭 🤫 🤥 😶 😐 😑 😬 🫨 🫠 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫 🫥 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 👽";

console.log(emojis);
console.log('hola');
const arrayEmojis = emojis.split(" ");
console.log(arrayEmojis);

const arrayCartas = [];
do {
    const x = Math.floor(Math.random() * arrayEmojis.length);
    if (!arrayCartas.includes(arrayEmojis[x])) {
        arrayCartas.push(arrayEmojis[x]);
    }
} while (arrayCartas.length < 8);

console.log(arrayCartas);




// function selecctorDeEmojis(array){
// for(let i = 0; i<array.length;i++){
//     const x = Math.floor(Math.random()*array.length)
//     console.log(x)
// if(!arrayCartas.includes(array[x])){
//     arrayCartas.push(array[x])
// }else{
//     continue
// }
//     const temporal = array[i];
//     console.log(array[i])
//     array[i]=array[x]
//     console.log(array[i])
//     console.log(array)
//     array[x]=temporal
//     console.log(array)
// }
// return arrayCartas
// }

// do{
//     const x = Math.floor(Math.random()*emojis.length)
//     console.log(x)
//     console.log(arrayCartas.includes(emojis[x]))
//     console.log(arrayCartas)
//     if(!arrayCartas.includes(emojis[x])){
//         arrayCartas.push(emojis[x])
//     }else{
//         continue
//     }
// }while (arrayCartas.length = 8)
// console.log(arrayCartas)

