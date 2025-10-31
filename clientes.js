document.addEventListener('DOMContentLoaded', function() {
    carregarClientes();
});

function carregarClientes() {
    const clientes = obterClientesDoStorage();
    const listaClientes = document.getElementById('listaClientes');
    const mensagemVazio = document.getElementById('mensagemVazio');
    
    if (clientes.length === 0) {
        listaClientes.style.display = 'none';
        mensagemVazio.style.display = 'block';
    } else {
        listaClientes.style.display = 'grid';
        mensagemVazio.style.display = 'none';
        renderizarClientes(clientes);
    }
}

function renderizarClientes(clientes) {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';
    
    clientes.forEach(cliente => {
        const cartao = criarCartaoCliente(cliente);
        listaClientes.appendChild(cartao);
    });
}

function criarCartaoCliente(cliente) {
    const cartao = document.createElement('div');
    cartao.className = 'cartao-cliente';
    cartao.onclick = () => abrirDetalhes(cliente);
    
    cartao.innerHTML = `
        <h3>🐾 ${cliente.animal.nome}</h3>
        <p><strong>Tutor:</strong> ${cliente.tutor.nome}</p>
        <p><strong>Data:</strong> ${formatarData(cliente.tutor.dataAtendimento)}</p>
    `;
    
    return cartao;
}

function formatarData(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function obterClientesDoStorage() {
    const dados = localStorage.getItem('clientesPetshop');
    return dados ? JSON.parse(dados) : [];
}

function abrirDetalhes(cliente) {
    const modal = document.getElementById('modalDetalhes');
    const detalhesCliente = document.getElementById('detalhesCliente');
    
    detalhesCliente.innerHTML = `
        <div class="secao-detalhes">
            <h3>📋 Informações do Tutor</h3>
            <p><strong>Nome:</strong> ${cliente.tutor.nome}</p>
            <p><strong>Telefone:</strong> ${cliente.tutor.telefone}</p>
            <p><strong>Endereço:</strong> ${cliente.tutor.endereco}</p>
            <p><strong>Data do Atendimento:</strong> ${formatarData(cliente.tutor.dataAtendimento)}</p>
        </div>
        <div class="secao-detalhes">
            <h3>🐶 Informações do Animal</h3>
            <p><strong>Nome:</strong> ${cliente.animal.nome}</p>
            <p><strong>Idade:</strong> ${cliente.animal.idade} anos</p>
            <p><strong>Porte:</strong> ${cliente.animal.porte}</p>
        </div>
    `;
    
    modal.style.display = 'block';
    
    const estiloDetalhes = document.createElement('style');
    estiloDetalhes.id = 'estiloDetalhesModal';
    if (!document.getElementById('estiloDetalhesModal')) {
        estiloDetalhes.textContent = `
            .secao-detalhes {
                background: #f8f9fa;
                padding: 1.5rem;
                border-radius: 10px;
                margin-bottom: 1.5rem;
            }
            
            .secao-detalhes h3 {
                background: linear-gradient(135deg, #00d9ff, #7b2cbf);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 1rem;
                font-size: 1.3rem;
                font-weight: 700;
            }
            
            .secao-detalhes p {
                margin-bottom: 0.8rem;
                font-size: 1.05rem;
            }
            
            .secao-detalhes strong {
                color: #2d1b4e;
                font-weight: 600;
            }
        `;
        document.head.appendChild(estiloDetalhes);
    }
}

function fecharModal() {
    const modal = document.getElementById('modalDetalhes');
    modal.style.display = 'none';
}

document.querySelector('.fechar-modal').onclick = fecharModal;

window.onclick = function(evento) {
    const modal = document.getElementById('modalDetalhes');
    if (evento.target === modal) {
        fecharModal();
    }
};
