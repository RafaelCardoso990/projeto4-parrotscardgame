function iniciar(){
    cardNumbers = parseInt(prompt("Com quantas cartas você quer jogar? Insira um número par entre 4 e 14."));
    while((cardNumbers % 2 !== 0) || (cardNumbers < 4) || (cardNumbers > 14)){
        cardNumbers = parseInt(prompt("Escolha um número par entre 4 e 14."));
    }
}

iniciar();