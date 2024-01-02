let currentIndex = 0; // Indice della permutazione corrente
// Carica i dati JSON
const permutazioni = await d3.json('../data.json'); // Assicurati di inserire il percorso corretto al tuo file JSON

// Ottieni tutte le farfalle
let butterflies = d3.selectAll('.butterfly').nodes();

// Copia delle posizioni iniziali delle farfalle e degli offset iniziali
let butterflyPositions = butterflies.map(butterfly => {
  const rect = butterfly.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
});

// Mappa le farfalle alle loro posizioni correnti con una scala ordinale d3
const butterflyScale = d3.scaleOrdinal()
  .domain(butterflies)
  .range(butterflyPositions);

// Funzione per aggiornare dinamicamente le posizioni delle farfalle
function updateButterflyPositionsFirst() {
  // Aggiornamento delle posizioni delle farfalle in base a una logica specifica
  // In questo caso, le nuove posizioni sono generate casualmente
  
  butterflyPositions.forEach(function (position) {
    position.x = referencePosition.x - 60;
    position.y = position.y -300;
  });

  console.log(butterflyPositions);
  butterflyScale.domain(butterflies).range(butterflyPositions);
  butterflyScale.range(butterflyPositions);

  // Chiamare una funzione di rendering o di aggiornamento dell'interfaccia grafica
  // per riflettere i cambiamenti nella posizione delle farfalle
  renderButterflies();
}

// Funzione per aggiornare dinamicamente le posizioni delle farfalle
function updateButterflyPositionsSecond() {
  // Aggiornamento delle posizioni delle farfalle in base a una logica specifica
  // In questo caso, le nuove posizioni sono generate casualmente
  let oldPositions = butterflyPositions;

  butterflyPositions.forEach(function (position, index) {


    let deltaX = calculateNewPosition(index, permutazioni[currentIndex], oldPositions);
  

    position.x = deltaX;
    position.y = position.y;
  });

  function calculateNewPosition(index, permutation, oldPositions) {
    
    //calcola l'indice della farfalla che prima era in posizione index
    let oldIndex = permutation.indexOf(index);

    if (index === oldIndex)
      return 0;
    else if (index > oldIndex)
      return (oldIndex - index) * 160;
    else
      return (oldIndex - index) * 160;

    
  }

  console.log(butterflyPositions);

    // Ricalcola la scala con le nuove posizioni
  butterflyScale.domain(butterflies).range(butterflyPositions);

  butterflyScale.range(butterflyPositions);

  // Chiamare una funzione di rendering o di aggiornamento dell'interfaccia grafica
  // per riflettere i cambiamenti nella posizione delle farfalle
  renderButterflies();
}

// Funzione di rendering delle farfalle
function renderButterflies() {
  // fai muovere ogni farfalla alla sua posizione corrente con una transizione
  d3.selectAll('.butterfly')
    .transition()
    .duration(1000)
    .style('left', (butterfly, index) => butterflyPositions[index].x + 'px')
    .style('top', (butterfly, index) => butterflyPositions[index].y + 'px');
}

// Ottieni la posizione iniziale della prima farfalla
const referencePosition = butterflies[0].getBoundingClientRect();
const offsetX = 0;
// Imposta le posizioni iniziali delle farfalle con spaziatura orizzontale costante
butterflies.forEach(function (butterfly, index) {

  butterfly.style.position = 'absolute';
  butterfly.style.left = referencePosition.x + offsetX * index + -270 + 'px';
  butterfly.style.top = referencePosition.y + -400 + 'px';
});

updateButterflyPositionsFirst();

let contatore = 0;

const permutationDisplay = document.getElementById('permutationDisplay');
permutationDisplay.textContent = 'Current permutation: ' + permutazioni[currentIndex];

// Esempio di chiamata della funzione di aggiornamento delle posizioni alla pressione di un tasto
document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    // Incrementa currentIndex quando viene premuta la freccia destra
    currentIndex = (currentIndex + 1) % permutazioni.length;
    permutationDisplay.textContent = 'Current permutation: ' + permutazioni[currentIndex];
  } else if (event.key === 'ArrowLeft') {
    // Decrementa currentIndex quando viene premuta la freccia sinistra
    currentIndex = (currentIndex - 1 + permutazioni.length) % permutazioni.length;
    permutationDisplay.textContent = 'Current permutation: ' + permutazioni[currentIndex];
  }

  // Stampa una stringa che descrive la permutazione corrente nella console
  console.log('Permutazione corrente: ' + permutazioni[currentIndex]);

  // Aggiorna le posizioni delle farfalle
  updateButterflyPositionsSecond();
});



