function abrirRegras(tipo) {
    // Remover classe 'ativo' de todos os botões
    const botoes = document.querySelectorAll('.regras-btn');
    botoes.forEach(botao => {
        botao.classList.remove('ativo');
    });
    
    // Remover classe 'ativo' de todos os painéis
    const paineis = document.querySelectorAll('.regras-painel');
    paineis.forEach(painel => {
        painel.classList.remove('ativo');
    });
    
    // Ativar o botão clicado
    const botaoAtivo = document.querySelector(`[onclick="abrirRegras('${tipo}')"]`);
    if (botaoAtivo) {
        botaoAtivo.classList.add('ativo');
    }
    
    // Ativar o painel correspondente
    const painelAtivo = document.getElementById(`regras-${tipo}`);
    if (painelAtivo) {
        painelAtivo.classList.add('ativo');
    }
    
    // Salvar a aba ativa no localStorage
    localStorage.setItem('regrasAtiva', tipo);
}

// Carregar última aba visitada
document.addEventListener('DOMContentLoaded', function() {
    const ultimaAba = localStorage.getItem('regrasAtiva');
    if (ultimaAba) {
        abrirRegras(ultimaAba);
    }
});

// Navegação por teclado
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        switch(event.key) {
            case '1':
                abrirRegras('gerais');
                break;
            case '2':
                abrirRegras('admin');
                break;
        }
    }
});