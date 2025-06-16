
document.addEventListener("DOMContentLoaded", () => { 
  // Espera a página carregar tudo, aí começa o nosso código.

  // ========== MATRIX ========== //
  const matrixCanvas = document.getElementById('matrixCanvas'); 
  // Pega o lugar na página onde a gente vai desenhar a "chuva" da Matrix.

  const matrixCtx = matrixCanvas.getContext('2d'); 
  // Pega a “caneta” para desenhar no lugar que escolhemos.

  matrixCanvas.width = window.innerWidth;
  // Faz a largura do desenho ser igual a largura da janela do navegador.

  matrixCanvas.height = window.innerHeight;
  // Faz a altura do desenho ser igual a altura da janela do navegador.

  const letters = "0123456789".split("");
  // Cria uma lista com os números de 0 a 9 para usar na Matrix.

  const fontSize = 14;
  // Define o tamanho das letras que vão aparecer.

  const columns = Math.floor(matrixCanvas.width / fontSize);
  // Calcula quantas colunas de números vão caber na largura da tela.

  const drops = Array(columns).fill(1);
  // Cria uma lista para guardar a posição vertical de cada coluna, começando lá em cima.

  function drawMatrix() {
    matrixCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
    // Escolhe uma cor preta com transparência para apagar a tela aos poucos.

    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    // Desenha um retângulo preto transparente para cobrir toda a tela (como um apagador suave).

    matrixCtx.fillStyle = "#0F0";
    // Muda a cor da caneta para verde (cor da Matrix).

    matrixCtx.font = fontSize + "px monospace";
    // Define o tipo e tamanho da letra que vai aparecer (fonte monospace).

    for (let i = 0; i < drops.length; i++) {
      // Para cada coluna...

      const text = letters[Math.floor(Math.random() * letters.length)];
      // Escolhe um número aleatório para mostrar nessa coluna.

      const x = i * fontSize;
      // Calcula a posição horizontal onde vai desenhar o número.

      const y = drops[i] * fontSize;
      // Calcula a posição vertical onde vai desenhar o número (posição atual da “gota”).

      matrixCtx.fillText(text, x, y);
      // Desenha o número verde na tela.

      if (y > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      // Se o número passou da parte de baixo da tela, às vezes ele volta para o topo.

      drops[i]++;
      // Faz o número descer um pouquinho na próxima vez.
    }
  }

  setInterval(drawMatrix, 33);
  // Fica desenhando a Matrix várias vezes por segundo (30 vezes por segundo).

  // ========== JOGO ========== //
  const resposta = document.getElementById('resposta');
  // Pega o lugar na página para mostrar se o jogador acertou ou errou.

  const btnJogarNovamente = document.getElementById('jogar-novamente');
  // Pega o botão para jogar outra vez.

  const numeroSecreto = Math.floor(Math.random() * 100) + 1;
  // Escolhe um número secreto aleatório entre 1 e 100.

  // ========== FOGUETES / EXPLOSÕES ========== //
  const canvas = document.getElementById('foguetes');
  // Pega o lugar para desenhar os fogos de artifício.

  const ctx = canvas.getContext('2d');
  // Pega a caneta para desenhar os fogos.

  canvas.width = window.innerWidth;
  // Define a largura do lugar dos fogos igual à largura da janela.

  canvas.height = window.innerHeight;
  // Define a altura do lugar dos fogos igual à altura da janela.

  class Particula {
    // Cria um modelo para as partículas dos fogos de artifício.

    constructor(x, y, cor) {
      this.x = x;
      // Guarda a posição horizontal da partícula.

      this.y = y;
      // Guarda a posição vertical da partícula.

      this.cor = cor;
      // Guarda a cor da partícula.

      this.velocidadeX = Math.random() * 6 - 3;
      // Define a velocidade horizontal aleatória (pra esquerda ou direita).

      this.velocidadeY = Math.random() * -6 - 1;
      // Define a velocidade vertical para cima (negativa).

      this.tamanho = Math.random() * 3 + 1;
      // Define o tamanho da partícula, que pode ser pequeno ou médio.

      this.duracao = Math.random() * 60 + 60;
      // Define por quanto tempo a partícula vai durar antes de desaparecer.
    }

    atualizar() {
      this.x += this.velocidadeX;
      // Move a partícula na horizontal.

      this.y += this.velocidadeY;
      // Move a partícula na vertical.

      this.velocidadeY += 0.1;
      // Aumenta a velocidade pra baixo (gravidade).

      this.duracao--;
      // Diminui o tempo que a partícula ainda tem para viver.
    }

    desenhar() {
      ctx.beginPath();
      // Começa a desenhar uma forma.

      ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
      // Desenha um círculo no lugar da partícula.

      ctx.fillStyle = this.cor;
      // Define a cor da bolinha.

      ctx.fill();
      // Preenche o círculo com a cor.
    }

    estaViva() {
      return this.duracao > 0;
      // Diz se a partícula ainda está viva (tempo maior que zero).
    }
  }

  let particulas = [];
  // Lista para guardar todas as partículas vivas.

  function criarExplosao(x, y) {
    const cores = ['#ff0044', '#ff6600', '#ffcc00', '#33cc33', '#3399ff'];
    // Cores diferentes para as partículas dos fogos.

    for (let i = 0; i < 100; i++) {
      particulas.push(new Particula(x, y, cores[Math.floor(Math.random() * cores.length)]));
      // Cria 100 partículas coloridas na posição do estouro do fogo.
    }
  }

  window.criarExplosao = criarExplosao;
  // Deixa a função criarExplosao disponível para usar de fora.

  window.canvas = canvas;
  // Deixa o canvas disponível para usar de fora também.

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Apaga tudo que foi desenhado antes para desenhar de novo.

    particulas = particulas.filter(p => p.estaViva());
    // Mantém só as partículas que ainda estão vivas.

    particulas.forEach(p => {
      p.atualizar();
      // Atualiza a posição da partícula.

      p.desenhar();
      // Desenha a partícula na nova posição.
    });

    requestAnimationFrame(animar);
    // Pede para rodar essa função de novo na próxima animação, para continuar o movimento.
  }

  animar();
  // Começa a animação dos fogos.

  // ========== Função principal do jogo ==========
  function verificarNumero(numero) {
    resposta.innerHTML = `<p>Você disse:</p><h2>${numero}</h2>`;
    // Mostra na tela o número que a pessoa disse.

    if (parseInt(numero) === numeroSecreto) {
      resposta.innerHTML += `<p>🎉 Parabéns, você acertou!</p>`;
      // Se acertou, mostra parabéns.

      btnJogarNovamente.style.display = 'inline-block';
      // Mostra o botão para jogar de novo.

      // 🌟 Explosão de foguetes!
      let intervaloExplosao = setInterval(() => {
        criarExplosao(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }, 300);
      // A cada 300ms cria fogos em lugares aleatórios da tela.

      setTimeout(() => clearInterval(intervaloExplosao), 3000);
      // Para de criar fogos depois de 3 segundos.

    } else {
      resposta.innerHTML += `<p>❌ Tente novamente!</p>`;
      // Se errou, pede para tentar outra vez.
    }
  }

  btnJogarNovamente.addEventListener('click', () => {
    location.reload();
    // Quando clicar para jogar de novo, recarrega a página pra começar tudo do zero.
  });

  window.verificarNumero = verificarNumero;
  // Deixa a função para verificar o número disponível para usar de fora.

  // ========== RESIZE ========== //
  window.addEventListener("resize", () => {
    matrixCanvas.width = window.innerWidth;
    // Quando a janela mudar de tamanho, ajusta a largura do desenho da Matrix.

    matrixCanvas.height = window.innerHeight;
    // Ajusta a altura da Matrix.

    canvas.width = window.innerWidth;
    // Ajusta a largura do lugar dos fogos.

    canvas.height = window.innerHeight;
    // Ajusta a altura do lugar dos fogos.
  });
});
