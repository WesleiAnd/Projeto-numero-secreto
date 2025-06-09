function verificaSeOChutePossuiUmValorValido(chute){
    const numero =+ chute

    if(chuteForInvalido(numero)){
        console.log(numero)
        elementoChute.innerHTML = `
        <br>
            <div class="teste">fale um numero!</div>
        `
        return
    }

    if(numeroForMaiorOuMenorQueOValorPermitido(numero)){
        console.log('numero ',numero)
        elementoChute.innerHTML = `
            <div>valor invalido: fale um numero entre ${menorValor} e ${maiorValor} </div>
        `
        return
    }

    if(numero === numeroSecreto){
    document.body.innerHTML += `
        <h2>Parabéns, você acertou!</h2>
        <button class="btn" onclick="window.location.reload()">Jogar Novamente!</button>
    `

    } else if (numero > numeroSecreto){
      elementoChute.innerHTML += `
      <div>O número secreto é menor <i class="fa-solid fa-down-long"></i></div>
      
      `  

    } else {
      elementoChute.innerHTML += `
      <div>O número secreto é maior <i class="fa-solid fa-up-long"></i></div>
      `    

    }

}

function chuteForInvalido(numero){
    return Number.isNaN(numero)

}

function numeroForMaiorOuMenorQueOValorPermitido(numero){
    return numero > maiorValor || numero < menorValor
}
