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
window.onload = () => {
    escreverTexto();
};

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



