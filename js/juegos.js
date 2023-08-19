/*
*2C = Two of clubs
*2D = Two of Diaminds
*2H = Two of Hearts
*2S = Two of Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K'];

const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push(i + tipo);
        }
    };

    for( let tipo of tipos ) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    };


    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
};

crearDeck();

// Esta función me permite tomar una carta

const pedirCarta = () => {

    if ( deck.length === 0 ) {
        //Palabra reservada para mostrar error en consola
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    console.log(deck);
    console.log(carta);
    return carta;
}


//
const valorCarta = ( carta ) => {

    //constante llamada valor para extraer el primer valor del string
    const valor = carta.substring(0, carta.length - 1);
    // 2 == 2, 3 == 3, 10 == 10...

    //Forma resumida con ternario
    return ( isNaN(valor) )  ? 
           ( valor === 'A' ) ? 11 : 10 
           : valor * 1;

    //Forma un poco más larga con if-else
    // let puntos = 0;
    // if( isNaN(valor) ) {
    //     console.log('No es un número');
    //     puntos = ( valor === 'A' ) ? 11 : 10;

    // }else {
    //     console.log('Es un número');
    //     puntos = valor * 1;
    // }
    // console.log(puntos)
}

const valor = valorCarta( pedirCarta() );
console.log({ valor });