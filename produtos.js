const produtosCatalogo = [
    {
        id: 1,
        marca: 'Golden',
        nome: 'Ração Golden Special para Cães Adultos Frango e Carne',
        preco: 149.90,
        precoAntigo: 179.90,
        desconto: '-17%',
        disponivel: true,
        imagem: '🥘',
        pesos: ['10kg', '15kg', '20kg']
    },
    {
        id: 2,
        marca: 'Golden',
        nome: 'Ração Golden Gatos Castrados Frango',
        preco: 129.90,
        precoAntigo: 149.90,
        desconto: '-13%',
        disponivel: true,
        imagem: '🥘',
        pesos: ['1kg', '3kg', '10kg']
    },
    {
        id: 3,
        marca: 'Golden',
        nome: 'Ração Granplus Choice Gatos Adultos Frango e Carne',
        preco: 138.90,
        precoAntigo: 159.90,
        desconto: '-13%',
        disponivel: true,
        imagem: '🥘',
        pesos: ['1kg', '3kg', '10kg']
    },
    {
        id: 4,
        marca: 'Golden',
        nome: 'Ração Golden Gatos Castrados Adultos',
        preco: 29.90,
        precoAntigo: 39.90,
        desconto: '-25%',
        disponivel: true,
        imagem: '🥘',
        pesos: ['500g', '1kg', '3kg']
    },
    {
        id: 5,
        marca: 'Golden',
        nome: 'Ração Golden Fórmula Cães Adultos Raças Pequenas Frango',
        preco: 20.90,
        precoAntigo: 29.90,
        desconto: '-30%',
        disponivel: true,
        imagem: '🥘',
        pesos: ['1kg', '3kg', '7kg', '10kg']
    },
    {
        id: 6,
        marca: 'Golden',
        nome: 'Ração Golden Fórmula Cães Adultos Raças Pequenas Carne',
        preco: 20.90,
        precoAntigo: 29.90,
        desconto: '-30%',
        disponivel: true,
        imagem: '🥘',
        pesos: ['1kg', '3kg', '7kg', '10kg']
    }
];

let carrinhoItens = [];

document.addEventListener('DOMContentLoaded', function() {
    inicializarPagina();
});

function inicializarPagina() {
    carregarCarrinho();
    renderizarProdutos();
    atualizarContadorCarrinho();
}

function renderizarProdutos() {
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = '';
    
    produtosCatalogo.forEach(produto => {
        const cartao = criarCartaoProduto(produto);
        listaProdutos.appendChild(cartao);
    });
}

function criarCartaoProduto(produto) {
    const cartao = document.createElement('div');
    cartao.className = 'cartao-produto';
    
    const secaoImagem = document.createElement('div');
    secaoImagem.className = 'imagem-produto';
    secaoImagem.textContent = produto.imagem;
    
    const conteudo = document.createElement('div');
    conteudo.className = 'conteudo-produto';
    
    conteudo.innerHTML = `
        <div class="marca-produto">${produto.marca}</div>
        <h3 class="nome-produto">${produto.nome}</h3>
        <span class="disponibilidade">✓ Disponível: Entrega Programada</span>
        <div class="preco-produto">
            R$ ${produto.preco.toFixed(2)}
            <span class="preco-antigo">R$ ${produto.precoAntigo.toFixed(2)}</span>
            <span class="desconto">${produto.desconto}</span>
        </div>
        <div class="opcoes-peso">
            ${produto.pesos.map(peso => `<button class="botao-peso">${peso}</button>`).join('')}
        </div>
        <button class="botao-adicionar" onclick="adicionarAoCarrinho(${produto.id})">
            Adicionar ao Carrinho 🛒
        </button>
    `;
    
    cartao.appendChild(secaoImagem);
    cartao.appendChild(conteudo);
    
    return cartao;
}

function adicionarAoCarrinho(produtoId) {
    const produto = produtosCatalogo.find(p => p.id === produtoId);
    
    if (produto) {
        carrinhoItens.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco
        });
        
        salvarCarrinho();
        atualizarContadorCarrinho();
        mostrarNotificacao(`${produto.nome} adicionado ao carrinho!`);
    }
}

function salvarCarrinho() {
    localStorage.setItem('carrinhoPetshop', JSON.stringify(carrinhoItens));
}

function carregarCarrinho() {
    const dados = localStorage.getItem('carrinhoPetshop');
    carrinhoItens = dados ? JSON.parse(dados) : [];
}

function atualizarContadorCarrinho() {
    const contador = document.getElementById('contadorCarrinho');
    contador.textContent = carrinhoItens.length;
    
    if (carrinhoItens.length > 0) {
        contador.style.display = 'flex';
    } else {
        contador.style.display = 'none';
    }
}

function mostrarNotificacao(mensagem) {
    const modal = document.getElementById('modalNotificacao');
    const texto = document.getElementById('textoNotificacao');
    
    texto.textContent = mensagem;
    modal.style.display = 'block';
    
    setTimeout(() => {
        esconderNotificacao();
    }, 3000);
}

function esconderNotificacao() {
    const modal = document.getElementById('modalNotificacao');
    modal.style.animation = 'slideInRight 0.3s ease reverse';
    
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.animation = '';
    }, 300);
}
