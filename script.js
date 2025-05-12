// Obtém o canvas (área de desenho) e o contexto 2D para desenhar nele
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

// Define a largura e altura do canvas para que ele ocupe a tela inteira
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cria um array para armazenar as partículas e um objeto para armazenar a posição e o raio do mouse
const particles = [];
const mouse = {
  x: null,
  y: null,
  radius: 120 // Raio da área de influência do mouse
};

// Evento para capturar a posição do mouse na tela
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

// Evento para redimensionar o canvas caso a janela seja redimensionada
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles(); // Reinicia as partículas ao redimensionar a janela
});

// Classe que define a partícula
class Particle {
  constructor(x, y, dx, dy, radius) {
    this.x = x; // Posição X da partícula
    this.y = y; // Posição Y da partícula
    this.dx = dx; // Velocidade em X
    this.dy = dy; // Velocidade em Y
    this.radius = radius; // Raio da partícula
  }

  // Método para desenhar a partícula no canvas
  draw() {
    ctx.beginPath(); // Inicia o caminho de desenho
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // Desenha um círculo
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)"; // Define a cor da partícula (branco com opacidade)
    ctx.fill(); // Preenche o círculo com a cor
  }

  // Método para atualizar a posição da partícula
  update() {
    // Calcula a distância entre a partícula e o mouse
    const dxMouse = this.x - mouse.x;
    const dyMouse = this.y - mouse.y;
    const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

    // Se a partícula estiver dentro do raio do mouse, ela será atraída para o mouse
    if (distance < mouse.radius) {
      const angle = Math.atan2(dyMouse, dxMouse); // Calcula o ângulo entre a partícula e o mouse
      const force = (mouse.radius - distance) / mouse.radius; // Calcula a força de atração
      const forceX = Math.cos(angle) * force * 3; // Calcula o movimento em X
      const forceY = Math.sin(angle) * force * 3; // Calcula o movimento em Y

      this.x += forceX; // Move a partícula em X
      this.y += forceY; // Move a partícula em Y
    } else {
      // Se a partícula não estiver perto do mouse, ela se move com a velocidade inicial
      if (this.x > canvas.width || this.x < 0) this.dx = -this.dx; // Inverte a direção se atingir as bordas do canvas
      if (this.y > canvas.height || this.y < 0) this.dy = -this.dy; // Inverte a direção se atingir as bordas do canvas

      this.x += this.dx; // Move a partícula em X
      this.y += this.dy; // Move a partícula em Y
    }

    this.draw(); // Desenha a partícula após atualizar a posição
  }
}

// Função para inicializar as partículas
function initParticles() {
  particles.length = 0; // Limpa a lista de partículas
  for (let i = 0; i < 100; i++) { // Cria 100 partículas
    const radius = 2; // Raio da partícula
    const x = Math.random() * canvas.width; // Posição X aleatória
    const y = Math.random() * canvas.height; // Posição Y aleatória
    const dx = (Math.random() - 0.5) * 1; // Velocidade aleatória em X
    const dy = (Math.random() - 0.5) * 1; // Velocidade aleatória em Y
    particles.push(new Particle(x, y, dx, dy, radius)); // Adiciona a partícula ao array
  }
}

// Função para conectar as partículas com linhas
function connectParticles() {
  for (let a = 0; a < particles.length; a++) { // Itera sobre todas as partículas
    for (let b = a + 1; b < particles.length; b++) { // Compara cada partícula com as outras
      const dx = particles[a].x - particles[b].x; // Distância em X
      const dy = particles[a].y - particles[b].y; // Distância em Y
      const distance = dx * dx + dy * dy; // Distância total entre as partículas

      // Se a distância for menor que um limite, desenha uma linha entre elas
      if (distance < 10000) {
        ctx.beginPath(); // Inicia o desenho da linha
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"; // Cor da linha (branco, com baixa opacidade)
        ctx.lineWidth = 1; // Largura da linha
        ctx.moveTo(particles[a].x, particles[a].y); // Move para a posição da partícula A
        ctx.lineTo(particles[b].x, particles[b].y); // Desenha uma linha até a partícula B
        ctx.stroke(); // Aplica o desenho da linha
      }
    }
  }
}

// Função que anima as partículas
function animateParticles() {
  requestAnimationFrame(animateParticles); // Chama a função de animação repetidamente
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas a cada frame
  particles.forEach(p => p.update()); // Atualiza e desenha cada partícula
  connectParticles(); // Conecta as partículas com linhas
}




const textoPrincipal = "Olá, eu sou ";
const nome = "Bruno Raphael";
const elemento = document.getElementById("typing");
const cursor = document.querySelector('.cursor')








elemento.innerHTML = ""; // começa vazio

let index = 0;

// Função que digita o texto principal
function escreverTexto() {
    if (index < textoPrincipal.length) {
        elemento.innerHTML += textoPrincipal.charAt(index);
        index++;
        setTimeout(escreverTexto, 100);
    } else {
        escreverNome();
    }
}

// Função que digita o nome dentro da tag <span>
let nomeIndex = 0;
function escreverNome() {
    const span = document.createElement("span");
    span.style.color = "#4d7cfe"; // Mantém a cor azul do seu span
    elemento.appendChild(span);

    function digitarNome() {
        if (nomeIndex < nome.length) {
            span.innerHTML += nome.charAt(nomeIndex);
            nomeIndex++;
            setTimeout(digitarNome, 100);
        } else {
            // Ao terminar o nome, adiciona o ponto final fora do span
            elemento.innerHTML += "."; 
        }
    }

    digitarNome();
}

// Inicia a animação assim que a página carrega

/*document.addEventListener('mousemove', function(info){
   
    cursor.style.left = info.clientX + 'px'
    cursor.style.top = info.clientY + 'px'
})*/

// Obter o botão
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Mostrar o botão quando rolar para baixo
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Voltar para o topo quando o botão for clicado
scrollToTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Efeito suave
    });
};

window.onload = () => {
    escreverTexto(); // Inicia a escrita do texto
  initParticles(); // Inicializa as partículas
  animateParticles(); // Inicia a animação das partículas

};
