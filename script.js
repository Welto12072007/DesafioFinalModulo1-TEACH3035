document.addEventListener('DOMContentLoaded', function() {
    const formularioAtendimento = document.getElementById('formularioAtendimento');
    
    if (formularioAtendimento) {
        formularioAtendimento.addEventListener('submit', salvarCliente);
    }
});

function salvarCliente(evento) {
    evento.preventDefault();
    
    const novoCliente = {
        tutor: {
            nome: document.getElementById('nomeTutor').value,
            telefone: document.getElementById('telefoneTutor').value,
            endereco: document.getElementById('enderecoTutor').value,
            dataAtendimento: document.getElementById('dataAtendimento').value
        },
        animal: {
            nome: document.getElementById('nomeAnimal').value,
            idade: document.getElementById('idadeAnimal').value,
            porte: document.getElementById('porteAnimal').value
        },
        id: gerarId()
    };
    
    adicionarClienteNoStorage(novoCliente);
    mostrarMensagemSucesso();
    limparFormulario();
}

function gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function adicionarClienteNoStorage(cliente) {
    const clientes = obterClientesDoStorage();
    clientes.push(cliente);
    localStorage.setItem('clientesPetshop', JSON.stringify(clientes));
}

function obterClientesDoStorage() {
    const dados = localStorage.getItem('clientesPetshop');
    return dados ? JSON.parse(dados) : [];
}

function limparFormulario() {
    document.getElementById('formularioAtendimento').reset();
}

function mostrarMensagemSucesso() {
    const mensagemDiv = document.createElement('div');
    mensagemDiv.className = 'mensagem-sucesso-flutuante';
    mensagemDiv.innerHTML = `
        <div class="conteudo-mensagem-sucesso">
            <span class="icone-check">✓</span>
            <p>Cliente cadastrado com sucesso!</p>
        </div>
    `;
    
    const estiloMensagem = document.createElement('style');
    estiloMensagem.textContent = `
        .mensagem-sucesso-flutuante {
            position: fixed;
            top: 2rem;
            right: 2rem;
            z-index: 1000;
            animation: deslizarEntrada 0.3s ease;
        }
        
        .conteudo-mensagem-sucesso {
            background: linear-gradient(135deg, #00d9ff, #7b2cbf);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 217, 255, 0.4);
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .icone-check {
            font-size: 2rem;
            background-color: rgba(255,255,255,0.3);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        @keyframes deslizarEntrada {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes deslizarSaida {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(estiloMensagem);
    document.body.appendChild(mensagemDiv);
    
    setTimeout(() => {
        mensagemDiv.style.animation = 'deslizarSaida 0.3s ease';
        setTimeout(() => {
            mensagemDiv.remove();
            estiloMensagem.remove();
        }, 300);
    }, 3000);
}
