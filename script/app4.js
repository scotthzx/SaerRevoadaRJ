function abrirTutorial(tipo) {
    // Remover classe 'ativo' de todos os botões
    const botoes = document.querySelectorAll('.tutorial-btn');
    botoes.forEach(botao => {
        botao.classList.remove('ativo');
    });
    
    // Remover classe 'ativo' de todos os painéis
    const paineis = document.querySelectorAll('.tutorial-painel');
    paineis.forEach(painel => {
        painel.classList.remove('ativo');
    });
    
    // Ativar o botão clicado
    const botaoAtivo = document.querySelector(`[onclick="abrirTutorial('${tipo}')"]`);
    if (botaoAtivo) {
        botaoAtivo.classList.add('ativo');
    }
    
    // Ativar o painel correspondente
    const painelAtivo = document.getElementById(`tutorial-${tipo}`);
    if (painelAtivo) {
        painelAtivo.classList.add('ativo');
    }
    
    // Salvar a aba ativa no localStorage
    localStorage.setItem('tutorialAtivo', tipo);
}

// Carregar última aba visitada
document.addEventListener('DOMContentLoaded', function() {
    const ultimaAba = localStorage.getItem('tutorialAtivo');
    if (ultimaAba) {
        abrirTutorial(ultimaAba);
    }
});

// Navegação por teclado
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        switch(event.key) {
            case '1':
                abrirTutorial('video');
                break;
            case '2':
                abrirTutorial('config');
                break;
            case '3':
                abrirTutorial('protocolo');
                break;
        }
    }
});