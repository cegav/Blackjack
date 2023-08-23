/*
*2C = Two of clubs
*2D = Two of Diaminds
*2H = Two of Hearts
*2S = Two of Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0, 
    puntosComputadora = 0

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

const puntosHtml = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

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

//Turno de la computadora

const turnoComputadora = ( puntosMinimos ) => {

    do {

    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntosHtml[1].innerText = puntosComputadora;

    // <img class="carta" src="./assets/cartas/2C.png" alt="2-trebol"> 
    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${ carta }.png`
    imgCarta.classList.add('carta');
    divCartasComputadora.append( imgCarta );

    if ( puntosMinimos > 21 ) {
        break;
    };

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout( () => {  

    validacionPuntos(puntosComputadora);

    }, 400 );
};


//Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    // <img class="carta" src="./assets/cartas/2C.png" alt="2-trebol"> 
    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/${ carta }.png`
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if (puntosJugador > 21) {
        console.warn('Lo siento, Perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if (puntosJugador === 21) {
        console.warn('¡21, Genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }


    console.log(puntosJugador);
});


btnDetener.addEventListener( 'click', () => {
    
    btnPedir.disabled   = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );

});


const validacionPuntos = ( puntosComputadora ) => {

    if ( puntosJugador === puntosComputadora) {
        console.warn('Empate');
        alert('Empate');
    } else if (puntosJugador > 21) {
        console.log('Perdiste');
        alert('Perdiste');
    } else if ( ( puntosComputadora > puntosJugador ) && ( puntosComputadora <= 21 ) ) {
        console.log('Perdiste');
        alert('Perdiste');
    } else if ( ( puntosComputadora > puntosJugador) && ( puntosComputadora > 21 ) ) {
        console.log('Ganaste');
        alert('Ganaste');
    };
}

btnNuevo.addEventListener( 'click', () => {

    console.clear();

    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHtml[0].innerHTML = 0;
    puntosHtml[1].innerHTML = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnDetener.disabled = false;
    btnPedir.disabled = false;

});

