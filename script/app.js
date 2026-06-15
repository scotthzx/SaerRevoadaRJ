const fotos = [
    {
        src: '../image/galeria1.png',
        titulo: 'Operação Phoenix'
    },
    {
        src: '../image/galeria2.png',
        titulo: 'Concurso do SAER'
    },
    {
        src: '../image/galeria3.png',
        titulo: 'Atiradores do SAER'
    },
    {
        src: '../image/galeria4.png',
        titulo: 'as350 "phoenix"'
    },
    {
        src: '../image/galeria5.png',
        titulo: 'Departamento da policia civil'
    }
];

let fotoAtual = 0;

function mudarFoto(direcao) {
    fotoAtual += direcao;
    
    if (fotoAtual >= fotos.length) {
        fotoAtual = 0;
    }
    
    if (fotoAtual < 0) {
        fotoAtual = fotos.length - 1;
    }
    
    atualizarGaleria();
}

function fotoEspecifica(index) {
    fotoAtual = index;
    atualizarGaleria();
}

function atualizarGaleria() {
    const fotoImg = document.getElementById('fotoAtual');
    const fotoTitulo = document.getElementById('fotoTitulo');
    const fotoContador = document.getElementById('fotoContador');
    
    // Adicionar efeito de fade
    fotoImg.classList.add('fade');
    
    setTimeout(() => {
        fotoImg.src = fotos[fotoAtual].src;
        fotoTitulo.textContent = fotos[fotoAtual].titulo;
        fotoContador.textContent = `${fotoAtual + 1} / ${fotos.length}`;
        
        // Remover efeito de fade
        fotoImg.classList.remove('fade');
    }, 300);
    
    // Atualizar miniaturas ativas
    const miniaturas = document.querySelectorAll('.miniatura');
    miniaturas.forEach((miniatura, index) => {
        if (index === fotoAtual) {
            miniatura.classList.add('ativa');
        } else {
            miniatura.classList.remove('ativa');
        }
    });
}

// Navegação por teclado
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        mudarFoto(-1);
    } else if (event.key === 'ArrowRight') {
        mudarFoto(1);
    }
});

// Suporte a gestos touch
let touchStartX = 0;
let touchEndX = 0;

const fotoDisplay = document.querySelector('.foto-display');

fotoDisplay.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

fotoDisplay.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe para esquerda - próxima foto
        mudarFoto(1);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe para direita - foto anterior
        mudarFoto(-1);
    }
}

// Auto-play opcional (descomente as linhas abaixo se quiser que as fotos mudem automaticamente)
/*
let autoPlayInterval;

function iniciarAutoPlay() {
    autoPlayInterval = setInterval(() => {
        mudarFoto(1);
    }, 5000); // Muda a cada 5 segundos
}

function pararAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Iniciar auto-play
iniciarAutoPlay();

// Parar auto-play quando o mouse estiver sobre a galeria
document.querySelector('.galeria-container').addEventListener('mouseenter', pararAutoPlay);
document.querySelector('.galeria-container').addEventListener('mouseleave', iniciarAutoPlay);
*/