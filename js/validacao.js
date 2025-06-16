document.addEventListener('DOMContentLoaded', () => {
  // Espera a página carregar tudo, aí começa a rodar esse código.

  const elementoChute = document.getElementById('chute');
  // Pega o lugar na página onde vamos mostrar o que a pessoa chutou.

  const mensagemFinal = document.getElementById('mensagem-final');
  // Pega o lugar onde vamos mostrar a mensagem de fim de jogo.

  window.verificaSeOChutePossuiUmValorValido = function (chute) {
    // Cria uma função para verificar se o chute (o número que a pessoa falou) é válido.

    const numero = +chute;
    // Converte o chute (que é texto) para número.

    if (chuteForInvalido(numero)) {
      // Se o chute não for um número válido...

      elementoChute.innerHTML = `
        <br>
        <div class="teste">FALE UM NÚMERO!</div>
      `;
      // Mostra uma mensagem para a pessoa falar um número de verdade.

      return;
      // Para de executar essa função aqui porque o chute é inválido.
    }

    if (numeroForMaiorOuMenorQueOValorPermitido(numero)) {
      // Se o número for maior que o permitido ou menor que o permitido...

      elementoChute.innerHTML = `
        <div>Valor inválido: fale um número entre ${menorValor} e ${maiorValor}</div>
      `;
      // Mostra uma mensagem falando qual o intervalo certo para o número.

      return;
      // Para de executar a função, porque o número está fora do intervalo permitido.
    }

    if (numero === numeroSecreto) {
      // Se a pessoa acertou o número secreto...

      mensagemFinal.innerHTML = `
        <h2>Parabéns, você acertou!</h2><br><br>
        <button class="jogar-novamenteee" onclick="window.location.reload()">Jogar Novamente!</button>
      `;
      // Mostra a mensagem de parabéns e o botão para jogar de novo (que recarrega a página).

      if (window.criarExplosao && window.canvas) {
        // Se as funções para criar explosão de fogos estiverem disponíveis...

        let intervalo = setInterval(() => {
          window.criarExplosao(
            Math.random() * window.canvas.width,
            Math.random() * window.canvas.height
          );
        }, 300);
        // A cada 300 milissegundos cria uma explosão em um lugar aleatório da tela.

        setTimeout(() => clearInterval(intervalo), 3000);
        // Para de criar explosões depois de 3 segundos.
      }
    } else if (numero > numeroSecreto) {
      // Se o número chutado é maior que o número secreto...

      elementoChute.innerHTML += `
        <div>Dica: O número secreto é menor <i class="fa-solid fa-down-long"></i></div>
      `;
      // Mostra uma dica dizendo que o número secreto é menor (seta para baixo).
    } else {
      // Se o número chutado é menor que o número secreto...

      elementoChute.innerHTML += `
        <div>Dica: O número secreto é maior <i class="fa-solid fa-up-long"></i></div>
      `;
      // Mostra uma dica dizendo que o número secreto é maior (seta para cima).
    }
  };

  function chuteForInvalido(numero) {
    return Number.isNaN(numero);
    // Retorna verdadeiro se o número não for um número de verdade (NaN = Not a Number).
  }

  function numeroForMaiorOuMenorQueOValorPermitido(numero) {
    return numero > maiorValor || numero < menorValor;
    // Retorna verdadeiro se o número for maior que o maior permitido ou menor que o menor permitido.
  }
});

