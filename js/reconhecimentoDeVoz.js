const elementoChute = document.getElementById('chute');

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.continuous = true; // 🔑 mantém a escuta contínua

recognition.addEventListener('result', onSpeak);
recognition.addEventListener('start', () => {
    console.log('Reconhecimento de voz iniciado');
});
recognition.addEventListener('error', (e) => {
    console.error('Erro no reconhecimento:', e);
});

function onSpeak(e) {
    const chute = e.results[e.results.length - 1][0].transcript;
    console.log('Você disse:', chute);
    //elementoChute.innerText = chute;
    exibeChuteNaTela(chute)
    verificaSeOChutePossuiUmValorValido(chute)
}

function exibeChuteNaTela(chute){
    elementoChute.innerText = `
    <div>voce disse</div>
    <span class="box">${chute}</span>
    `
    
}


// Inicia apenas uma vez
recognition.start();

