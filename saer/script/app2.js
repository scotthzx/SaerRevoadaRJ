function abrirAba(funcao) {
    // Remover classe 'ativo' de todos os botões
    const botoes = document.querySelectorAll('.aba-btn');
    botoes.forEach(botao => {
        botao.classList.remove('ativo');
    });
    
    // Remover classe 'ativo' de todos os painéis
    const paineis = document.querySelectorAll('.aba-painel');
    paineis.forEach(painel => {
        painel.classList.remove('ativo');
    });
    
    // Ativar o botão clicado
    const botaoAtivo = document.querySelector(`[onclick="abrirAba('${funcao}')"]`);
    if (botaoAtivo) {
        botaoAtivo.classList.add('ativo');
    }
    
    // Ativar o painel correspondente
    const painelAtivo = document.getElementById(`aba-${funcao}`);
    if (painelAtivo) {
        painelAtivo.classList.add('ativo');
    }
    
    // Salvar a aba ativa no localStorage
    localStorage.setItem('abaAtiva', funcao);
}

// Carregar última aba visitada ao abrir a página
document.addEventListener('DOMContentLoaded', function() {
    const ultimaAba = localStorage.getItem('abaAtiva');
    if (ultimaAba) {
        abrirAba(ultimaAba);
    }
});

// Suporte para navegação por teclado nas abas
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        const abas = ['piloto', 'atirador', 'administrador', 'elite', 'comando'];
        const botoes = document.querySelectorAll('.aba-btn');
        const botaoAtivo = document.querySelector('.aba-btn.ativo');
        const indexAtual = Array.from(botoes).indexOf(botaoAtivo);
        
        switch(event.key) {
            case '1':
                abrirAba('piloto');
                break;
            case '2':
                abrirAba('atirador');
                break;
            case '3':
                abrirAba('administrador');
                break;
            case '4':
                abrirAba('elite');
                break;
            case '5':
                abrirAba('comando');
                break;
            case 'ArrowRight':
                if (indexAtual < abas.length - 1) {
                    abrirAba(abas[indexAtual + 1]);
                }
                break;
            case 'ArrowLeft':
                if (indexAtual > 0) {
                    abrirAba(abas[indexAtual - 1]);
                }
                break;
        }
    }
});