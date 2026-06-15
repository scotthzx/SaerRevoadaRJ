// Array com 17 fotos - ADICIONE SUAS FOTOS AQUI
const fotos = [
    {
        src: '../image/galeria1.png',
        titulo: 'Galeria 1'
    },
    {
        src: '../image/galeria2.png',
        titulo: 'Galeria 2'
    },
    {
        src: '../image/galeria3.png',
        titulo: 'Galeria 3'
    },
    {
        src: '../image/galeria4.png',
        titulo: 'Galeria 4'
    },
    {
        src: '../image/galeria5.png',
        titulo: 'Galeria 5'
    },
    {
        src: '../image/galeria6.png',
        titulo: 'Galeria 6'
    },
    {
        src: '../image/galeria7.png',
        titulo: 'Galeria 7'
    },
    {
        src: '../image/galeria8.png',
        titulo: 'Galeria 8'
    },
    {
        src: '../image/galeria9.png',
        titulo: 'Galeria 9'
    },
    {
        src: '../image/galeria10.png',
        titulo: 'Galeria 10'
    },
    {
        src: '../image/galeria11.png',
        titulo: 'Galeria 11'
    },
    {
        src: '../image/galeria12.png',
        titulo: 'Galeria 12'
    },
    {
        src: '../image/galeria13.png',
        titulo: 'Galeria 13'
    },
    {
        src: '../image/galeria14.png',
        titulo: 'Galeria 14'
    },
    {
        src: '../image/galeria15.png',
        titulo: 'Galeria 15'
    },
    {
        src: '../image/galeria16.png',
        titulo: 'Galeria 16'
    },
    {
        src: '../image/galeria17.png',
        titulo: 'Galeria 17'
    }
];

let fotoAtual = 0;

// Inicializar a galeria quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    criarMiniaturas();
    criarBolinhas();
    atualizarGaleria();
});

// Criar miniaturas dinamicamente
function criarMiniaturas() {
    const container = document.getElementById('miniaturasContainer');
    container.innerHTML = '';
    
    fotos.forEach((foto, index) => {
        const miniatura = document.createElement('div');
        miniatura.className = 'miniatura';
        if (index === fotoAtual) {
            miniatura.classList.add('ativa');
        }
        miniatura.onclick = () => fotoEspecifica(index);
        
        const img = document.createElement('img');
        img.src = foto.src;
        img.alt = foto.titulo;
        img.loading = 'lazy';
        
        miniatura.appendChild(img);
        container.appendChild(miniatura);
    });
}

// Criar bolinhas de paginação
function criarBolinhas() {
    const oldBolinhas = document.querySelector('.paginacao-bolinhas');
    if (oldBolinhas) {
        oldBolinhas.remove();
    }
    
    const bolinhasContainer = document.createElement('div');
    bolinhasContainer.className = 'paginacao-bolinhas';
    
    fotos.forEach((foto, index) => {
        const bolinha = document.createElement('span');
        bolinha.className = 'bolinha';
        if (index === fotoAtual) {
            bolinha.classList.add('ativa');
        }
        bolinha.onclick = () => fotoEspecifica(index);
        bolinha.title = foto.titulo;
        
        bolinhasContainer.appendChild(bolinha);
    });
    
    const contador = document.querySelector('.contador');
    contador.after(bolinhasContainer);
}

// Navegar para foto específica
function fotoEspecifica(index) {
    fotoAtual = index;
    atualizarGaleria();
}

// Mudar foto (anterior/próxima)
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

// Atualizar a galeria
function atualizarGaleria() {
    const fotoImg = document.getElementById('fotoAtual');
    const fotoContador = document.getElementById('fotoContador');
    
    fotoImg.classList.add('fade');
    
    setTimeout(() => {
        fotoImg.src = fotos[fotoAtual].src;
        fotoImg.alt = fotos[fotoAtual].titulo;
        fotoContador.textContent = `${fotoAtual + 1} / ${fotos.length}`;
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
    
    // Atualizar bolinhas
    const bolinhas = document.querySelectorAll('.bolinha');
    bolinhas.forEach((bolinha, index) => {
        if (index === fotoAtual) {
            bolinha.classList.add('ativa');
        } else {
            bolinha.classList.remove('ativa');
        }
    });
}

// Navegação por teclado
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        mudarFoto(-1);
    } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        mudarFoto(1);
    } else if (event.key === 'Home') {
        event.preventDefault();
        fotoEspecifica(0);
    } else if (event.key === 'End') {
        event.preventDefault();
        fotoEspecifica(fotos.length - 1);
    }
});

// Suporte a gestos touch
let touchStartX = 0;
let touchEndX = 0;

const fotoDisplay = document.querySelector('.foto-display');

fotoDisplay.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, { passive: true });

fotoDisplay.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        mudarFoto(1);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        mudarFoto(-1);
    }
}