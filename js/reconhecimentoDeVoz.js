const elementoChute = document.getElementById('chute');
// Pega o lugar na página onde a gente vai mostrar o que a pessoa falou (o chute).

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
// Prepara o reconhecimento de voz, usando o padrão do navegador ou o webkit (para funcionar em mais navegadores).

const recognition = new SpeechRecognition();
// Cria uma nova "máquina" que vai escutar a voz da pessoa.

recognition.lang = 'pt-BR';
// Diz que o idioma que vamos escutar é português do Brasil.

recognition.interimResults = false;
// Diz para só pegar o resultado final da fala, sem mostrar o que a pessoa está dizendo enquanto fala.

recognition.continuous = true; // 🔑 mantém a escuta contínua
// Faz o reconhecimento de voz ficar escutando o tempo todo, sem parar.

recognition.addEventListener('result', onSpeak);
// Quando a pessoa falar algo, chama a função onSpeak para processar o que foi dito.

recognition.addEventListener('start', () => {
    console.log('Reconhecimento de voz iniciado');
});
// Quando o reconhecimento de voz começar, mostra essa mensagem no console (para saber que está funcionando).

recognition.addEventListener('error', (e) => {
    console.error('Erro no reconhecimento:', e);
});
// Se der algum erro enquanto escuta a voz, mostra o erro no console.

function onSpeak(e) {
    const chute = e.results[e.results.length - 1][0].transcript;
    // Pega o que a pessoa falou no último pedaço reconhecido.

    console.log('Você disse:', chute);
    // Mostra no console o que a pessoa falou.

    //elementoChute.innerText = chute;
    // (Comentado) Poderia mostrar o chute direto assim, mas a gente usa outra função.

    exibeChuteNaTela(chute);
    // Chama a função para mostrar o chute bonitinho na tela.

    verificaSeOChutePossuiUmValorValido(chute);
    // Chama a função para checar se o que a pessoa falou é um número válido.
}

function exibeChuteNaTela(chute){
    elementoChute.innerHTML = `
    <div class="reborn">Você disse!</div>
    <span class="box">${chute}</span>
    `;
    // Coloca na tela uma mensagem "Você disse!" e o que a pessoa falou dentro de uma caixinha.
}

// Inicia apenas uma vez
recognition.start();
// Começa a escutar a voz da pessoa assim que o código roda.
