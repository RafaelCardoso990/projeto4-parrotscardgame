// Declarando e Preparando Variáveis Globais

let mainHTML = document.querySelector('main');
let cards = [];
let firstCard;
let secondCard;
const images = ["images/back/bobrossparrot.gif",
"images/back/explodyparrot.gif",
"images/back/fiestaparrot.gif",
"images/back/metalparrot.gif",
"images/back/revertitparrot.gif",
"images/back/tripletsparrot.gif",
"images/back/unicornparrot.gif",];
var numberOfCards;
let formedPairs = []
let numberOfClicks = 0
let numberOfMoves = 0 


startGame()

// Iniciando o Jogo

function startGame(){
    images.sort(comparator); //Imagens embaralhadas.
    while(true){
        numberOfCards = parseInt(prompt('Com quantas cartas deseja jogar? Você pode jogar com 2 à 7 pares de cartas.'));
        if(numberOfCards >= 2 || numberOfCards <= 7){
            dealCards();
            return false;
        }
        else {
            alert('Você so pode escolher entre 2 à 7 pares de cartas.');
        }
    }
}

// Gerando e Distribuindo as Cartas na Mesa

function dealCards(){
    for (let i = 0; i < numberOfCards; i++) {
        let newCard = `<div class="letterSpace" >                          
                            <div class="card" onclick="turnCards(this)" data-identifier="card">
                                <div class="front" data-identifier="front-face">
                                    <img src="images/front 1.png" alt="">
                                </div>
                                <div class="back" data-identifier="back-face">
                                    <img src="${images[i]}" alt="">
                                </div>
                            </div>
                        </div>`;
        console.log(cards)
        cards.push(newCard);
        cards.push(newCard);
        cards.sort(comparator);
    }
    // "Distribuindo" As IMAGENS NO HTML
    for(let i = 0; i < cards.length; i++){
        mainHTML.innerHTML = mainHTML.innerHTML + cards[i];
    }

    
}



// Funções de interação com as Cartas
function turnCards(selectedDiv){ 
    numberOfMoves++
    numberOfClicks++  
    if(numberOfClicks <= 2){ 
        selectedDiv.classList.add('change');
        if(!document.querySelector('.firstCard')){
            selectedDiv.classList.add('firstCard');
            firstCard = selectedDiv;
            firstCard.setAttribute('onclick','')
            console.log(firstCard);
            return false;
        }
        selectedDiv.classList.add('secondCard');
        secondCard = selectedDiv;
        console.log(secondCard);
        setTimeout(compareCards, 500);
        console.log(document.querySelectorAll('.pickPair').length);
        console.log(cards.length);
    }else if (numberOfClicks > 2){ 
        selectedDiv.classList.remove('change')    
        numberOfClicks = 0 
    }
}    


function compareCards(){

    if(firstCard.innerHTML !== secondCard.innerHTML){
        firstCard.classList.remove('firstCard');
        firstCard.classList.remove('change');
        secondCard.classList.remove('secondCard');
        secondCard.classList.remove('change');
        firstCard.setAttribute('onclick','turnCards(this)');
    }
    else{
        formedPairs.push('pairMade')
        firstCard.classList.remove('firstCard');
        firstCard.classList.add('pickPair');
        firstCard.setAttribute('onclick','');
        secondCard.classList.remove('secondCard');
        secondCard.setAttribute('onclick','');
        secondCard.classList.add('pickPair');
        endGame()
        playAgain()  
        
    }
}


function playAgain(){
    if(formedPairs.length == numberOfCards){
        let result = prompt('Você ganhou, deseja jogar novamente ? (S) ou (N)')
        if(result == "s" || result == "S"){
            document.location.reload(true)
        }else if (result == 'n' || result =="N"){
            alert('Você ganhou!')
        }else{
            playAgain()
        }
    }
}

function endGame(){
    if(formedPairs.length == numberOfCards){
        alert(`Você ganhou em ${numberOfMoves} jogadas!`)
    }
}


function comparator() { // Função de aleatoriedade para geração de cartas 
	return Math.random() - 0.5;
}