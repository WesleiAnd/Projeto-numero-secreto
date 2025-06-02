function verificaSeOChutePossuiUmValorValido(chute){
    const numero = chute

    if(chuteForValido(numero)){
        elementoChute.innerHTML += `
            <div>valor invalido</div>
        `
        return
    }

    if(numeroForMaiorOuMenorQueOValorPermitido(numero)){
        elementoChute.innerHTML += `
            <div>valor invalido: fale um numero entre ${menorValor} e ${maiorValor} </div>
        `
        return
    }

}

function chuteForValido(numero){
    return Number.isNaN(numero)

}

function numeroForMaiorOuMenorQueOValorPermitido(numero){
    return numero > maiorValor || numero < menorValor
}