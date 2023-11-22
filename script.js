// VARIÁVEIS GLOBAIS
let modalKey = 0

let keyAtual;

let typeAtual;


// variavel para controlar a quantidade inicial de produtos no modal
let quantProduto = 0


// carrinho
let cart = [] 


// funcoes auxiliares ou uteis
const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    document.querySelector('.windowArea').style.opacity = 0 // transparente
    document.querySelector('.windowArea').style.display = 'flex'
    setTimeout(() => document.querySelector('.windowArea').style.opacity = 1, 150)
    
}

const fecharModal = () => {
    document.querySelector('.windowArea').style.opacity = 0 // transparente
    setTimeout(() => document.querySelector('.windowArea').style.display = 'none', 500)
}

// BOTOES FECHAR MODAL
const botoesFechar = () => {
    document.querySelectorAll('.itemInfo--cancelButton, .itemInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDosProdutos = (produtoItem, item, index, clas) => {
    
    // setar um atributo para identificar qual elemento foi clicado
	produtoItem.setAttribute('data-key', index)
	produtoItem.setAttribute('data-type', clas.slice(1))
    produtoItem.querySelector('.produto-item--img img').src = item.img
    produtoItem.querySelector('.produto-item--price').innerHTML = formatoReal(item.price[0])
    produtoItem.querySelector('.produto-item--name').innerHTML = item.name
}

const preencheDadosModal = (item) => {
    document.querySelector('.produtoBig img').src = item.img
    document.querySelector('.itemInfo h1').innerHTML = item.name
    document.querySelector('.itemInfo--actualPrice').innerHTML = formatoReal(item.price[0])
}

const pegarKey = (e, dataSet) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos do .produto-item. Ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.produto-item').getAttribute(dataSet)
    console.log('Produto clicado ' + key)

    // garantir que a quantidade inicial de produto é 1
    quantProduto = 1

    // Para manter a informação de qual produto foi clicada
    modalKey = key

    return key
}

const preencherTamanhos = () => {
    // tirar a selecao de tamanho atual e selecionar a unidade
    document.querySelector('.itemInfo-size.selected').classList.remove('selected')

    // **selecionar todos os tamanhos
    document.querySelectorAll('.itemInfo-size').forEach((size, sizeIndex) => {
        // selecionar a unidade
        (sizeIndex == 0) ? size.classList.add('selected') : ''
        // size.querySelector('span').innerHTML = listItens[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key, type) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    
    document.querySelectorAll('.itemInfo-size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // ** tirar a selecao de tamanho atual e selecionar a caixa

            document.querySelector('.itemInfo-size.selected').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            // mudar o preço de acordo com o tamanho
            document.querySelector('.itemInfo--actualPrice').innerHTML = formatoReal(listItens.data[type][key].price[sizeIndex])
        })
    })
}

// ANCORA DO MENU PARA IR ATÉ UM PONTO DA PÁGINA
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".icon-anchor");
    
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            // obtem o id da seção clicada
            const sectionId = this.getAttribute("data-id");

            document.getElementById(sectionId).scrollIntoView({block: "center"})
        })
    })
})

// BOTÃO FLUTUANTE SCROLL TO TOP
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // efeito suave de rolagem
    })
}
// mostrar botão quando o usuário rolar para baixo
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('botao_flutuante').style.display = "block";
    } else {
        document.getElementById("botao_flutuante").style.display = "none";
    }
}

// FUNÇÃO PESQUISAR PRODUTO NO ARRAY
function pesquisarProduto(array, inputName) {
    
    inputName = inputName.toLowerCase();

    // método filter para criar um novo array com objetos de nomes correspondentes à pesquisa
    const resultados = array.filter((product) =>
    product.nome.toLowerCase().includes(inputName.toLowerCase())
    );      

    return resultados;
}
// função para lidar com a entrada do teclado e pesquisar
function handleKeyUp(event) {
    const input = document.getElementById('input')
    const resultsList = document.getElementById('results');

    resultsList.innerHTML = "";

    const searchName = input.value;
    const searchResults = pesquisarProduto(listItens, searchName);

//     searchResults.forEach((result) => {
//         const listItem = document.createElement("li");
//         listItem.textContent = `Name: ${result.name}, Age: ${result.age}`;
//         resultsList.appendChild(listItem);
//     });
// }

// const searchInput = document.getElementById("searchInput");
// searchInput.addEventListener("keyup", handleKeyUp);
}


//MUDAR A QUANTIDADE BOTÕES + e - na janela modal do produto
// const mudarQuantidade = () => {
function mudarQtdMais() {
    quantProduto++
    document.querySelector('.itemInfo--qt').innerHTML = quantProduto
}
function mudarQtdMenos() {
    if(quantProduto > 1) {
        quantProduto--
        document.querySelector('.itemInfo--qt').innerHTML = quantProduto
    }
}

const adicionarNoCarrinho = () => {
    
        console.log('Produto adicionado no carrinho')

        // pegar dados da janela modal atual
    	// qual produto? pegue o modalKey para usar listItens[modalKey]
    	console.log("Categoria: " + modalKey)

    	// tamanho
	    let size = document.querySelector('.itemInfo-size.selected').getAttribute('data-key')
	    console.log("Tamanho " + size)
	    // quantidade
    	console.log("Quant. " + quantProduto)

        const product = listItens.data[typeAtual][keyAtual]

        console.log(product)

        // preco
        let price = size === "unidade" ? product.price[0] : product.price[1];

        console.log(price)

        // crie um identificador que junte id e tamanho
	    // concatene as duas informacoes separadas por um símbolo, vc escolhe
	    let identificador = product.id+'t'+size

        console.log(`IDENTIFICADOR ${identificador}`)

        // antes de adicionar verifique se ja tem aquele codigo e tamanho para adicionarmos a quantidade
        let indexNoCart = cart.findIndex( (item) => item.identificador == identificador)

        console.log(indexNoCart)

        if(indexNoCart > -1) {
            // se encontrar aumente a quantidade
            cart[indexNoCart].qt += quantProduto
            
        } else {
            // adicionar objeto produto no carrinho
            let produto = {
                identificador,
                id: product.id,
                name: product.name,
                img: product.img,
                size, // size: size
                qt: quantProduto,
                price, // price: price
            }

            cart = [...cart,produto]

            console.log(produto)
            
        }
        
        console.log(cart)

        fecharModal()
        atualizarCarrinho()

}


const atualizarCarrinho = () => {


		if(cart.length >= 0) {

		// zerar o .cart para nao fazer inserções duplicadas
		document.querySelector('.cart').innerHTML = ''

        // criando as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal

		for(let i in cart) {
			// use o find para pegar o item por id
			let produtoItem = cart[i];
            // let produtoItem = produtoItem.find( (item) => item.id == cart[i].id)		

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes CART
			let cartItem = document.querySelector('.models .cart--item').cloneNode(true)
			// let cartItem = document.querySelector('.cart--item--qt').cloneNode(true)
			document.querySelector('.cart').append(cartItem)
            // document.querySelector('.menu-openner').append(cartItem)

			let produtoSizeName = cart[i].size
			let produtoName = `${produtoItem.name} (${produtoSizeName})`
            console.log(cart)

			// preencher as informacoes
			cartItem.querySelector('img').src = produtoItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = produtoName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

            // let quantit =+ cart[i].qt
            // cartItem.querySelector('.quant_cart').innerHTML = quantit

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt += 1
				// atualizar a quantidade
				atualizarCarrinho()
			})

            console.log(cart[i].qt)

            // function esvaziarCarrinho() {
            //     cart
            // }
            
			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
                // cart.length > 0 && 
                if(cart[i].qt > 1 ) {
                    cart[i].qt -= 1
                } else {
                    cart[i].qt -= 1
                    cart.splice(i,1)
                }

                (cart.length < 1) ? document.querySelector('.cabecalho').style.display = 'flex' & document.querySelector('aside').classList.remove('show') : ''
				
                // atualizar a quantidade
				atualizarCarrinho()

			})

            console.log({carrinho: cart})
			// document.querySelector('.cart').append(cartItem)

		} // fim do for

		// fora do for
        console.log(cart)

        console.log(subtotal)


        document.querySelector('.quant_cart').innerHTML = cart.reduce((total, item) => total + item.qt,0)
        document.querySelector('.subtotal_cart').innerHTML = formatoReal(subtotal)

        console.log({carrinho: cart})

		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * 0
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		document.querySelector('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		document.querySelector('.desconto span:last-child').innerHTML = formatoReal(desconto)
		document.querySelector('.total span:last-child').innerHTML    = formatoReal(total)

        // if(cart.length = 0) {
        //     document.querySelector('aside').classList.remove('show')
        // }



	} else {
		// ocultar o carrinho
		// document.querySelector('aside').classList.remove('show')
		// document.querySelector('aside').style.left = '100vw'
        
	}
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)

    document.querySelector('aside').classList.add('show')
    document.querySelector('aside').style.right = '0vw'

}

// BOTAO PROXIMO --> AVANÇA DO CARRINHO PARA O FORM
const finalizarCompra = () => {
    console.log('Finalizar compra')
    document.querySelector('#aside_carrinho').classList.remove('show')
    document.querySelector('.cabecalho').style.display = 'flex'
    document.querySelector('.cabecalho').style.display = 'none' // não mostrar barra superior
}

// BOTAO PROXIMO --> AVANÇA DO FORM PARA CONFIRMAÇÃO DE DADOS
const finalizarForm = () => {
    console.log('Finalizar formulario')
    document.querySelector('#aside_endereco').classList.remove('show')
    document.querySelector('.cabecalho').style.display = 'flex'
    document.querySelector('.cabecalho').style.display = 'none' // não mostrar barra superior
}

// VOLTAR AO CARRINHO
const voltarCarrinho = () => {
    console.log('teste voltar ao carrinho');
    document.querySelector('#aside_endereco').classList.remove('show')
    // document.querySelector('#aside_endereco').style.right = '0vw'
    document.querySelector('#aside_carrinho').classList.add('show')
    // document.querySelector('#aside_carriho').style.right = '0vw'
}

// VOLTAR AO CARRINHO
const voltarCheckout = () => {
    console.log('teste voltar ao checkout');
    document.querySelector('#aside_confirm').classList.remove('show')
    // document.querySelector('#aside_endereco').style.right = '0vw'
    document.querySelector('#aside_endereco').classList.add('show')
    // document.querySelector('#aside_carriho').style.right = '0vw'
}

// FORMULARIO
const openForm = () => {
    document.querySelector('#aside_endereco').classList.add('show')
    // document.querySelector('#aside_carriho').style.left = '150vw'
    console.log('disparei')
}

// CONFIRMAÇÃO DE DADOS
const confirmForm = () => {
    document.querySelector('#aside_confirm').classList.add('show')
    // document.querySelector('#aside_endereco').style.left = '150vw'
    console.log('disparei')
}

// RECOLHER ASIDE
const fecharAside = () => {
    console.log('teste botao fechar')
    document.querySelector('#aside_carrinho').classList.remove('show')
    document.querySelector('#aside_endereco').classList.remove('show')
    document.querySelector('#aside_confirm').classList.remove('show')
    document.querySelector('.cabecalho').style.display = 'flex'
}

// ATIVAR FORMULARIO RETIRAR NA LOJA
function retirarNaLoja() {
    document.querySelector('#retirar').style.backgroundColor = '#a3a3a3'
    document.querySelector('#entregar').style.backgroundColor = '#eba324'
    document.querySelector('#info_entrega').style.display = 'none'
    document.querySelector('#endereco_revisao').style.display = 'none'
}

// ATIVAR FORMULARIO ENTREGA
function entregar() {
    document.querySelector('#retirar').style.backgroundColor = '#eba324'
    document.querySelector('#entregar').style.backgroundColor = '#a3a3a3'
    document.querySelector('#info_entrega').style.display = 'flex'
}

function buttonEntregar() {
    document.querySelector('#entregar').classList.add('selected')
    document.querySelector('#retirar').classList.remove('selected')
}

function buttonRetirar() {
    document.querySelector('#entregar').classList.remove('selected')
    document.querySelector('#retirar').classList.add('selected')
}

// REVISÃO DOS DADOS NO ASIDE DE CONFIRMAÇÃO
function revisarDados() {
    const nomeRevisar = document.querySelector('.campo_nome').value
    const telefoneRevisar = document.querySelector('.campo_telefone').value
    
    
    //pegando dados de endereço e exibindo na tela de revisão
    const enderecoRevisar = document.querySelector('#info_entrega')
    const childrenInputs = enderecoRevisar.querySelectorAll('input')

    const inputValues = []

    childrenInputs.forEach(input => {
        inputValues.push(input.value)
    })

    console.log(inputValues)

    


    // const tipoPedidoRevisar = document.querySelector('.campo_rua').value
   
    document.querySelector('#container_itens_revisao').innerHTML = ''


    let subtotalValor = 0
    
    // para preencher os itens do carrinho, calcular subtotal
	for(let i in cart) {
		// use o find para pegar o item por id
		let produtoItem = cart[i];
        // let produtoItem = produtoItem.find( (item) => item.id == cart[i].id)		
        console.log(produtoItem);


        // document.querySelector('#itens_name').innerHTML += produtoItem.name

        // fazer o clone, exibir na tela e depois preencher as informacoes
        let cartItem = document.querySelector('.models .cart--item').cloneNode(true)
			document.querySelector('#container_itens_revisao').append(cartItem)

			let produtoSizeName = cart[i].size

			let produtoName = `${produtoItem.name} (${produtoSizeName})`

            let produtoPrice = cart[i].price * cart[i].qt

            console.log(produtoName)


			// preencher as informacoes

            cartItem.querySelector('img').style.display = 'none'
			cartItem.querySelector('.cart--item-nome').innerHTML = 
            `
            <p>${produtoName} Qtd: ${cart[i].qt}</p> 
            <p>Valor: ${formatoReal(produtoPrice)}</p>
            -------------------------------------
            `
            
			cartItem.querySelector('.cart--item--qt').style.display = 'none'
			cartItem.querySelector('.cart--item--qt').style.fontSize = '12px'
            cartItem.querySelector('.cart--item-qtmenos').style.display = 'none'
            cartItem.querySelector('.cart--item-qtmais').style.display = 'none'
            cartItem.querySelector('.cart--item--qtarea').style.backgroundColor = 'transparent'
            cartItem.querySelector('.cart--item-nome').style.margin = '5px 10px 0 10px'
            cartItem.querySelector('.cart--item-nome').style.fontWeight = 'bold'
            // cartItem.querySelector('')
            
            // let createDivRevisaoValor = document.createElement('div')
            // createDivRevisaoValor.classList.add('valor_rev')
            // createDivRevisaoValor.textContent('valores')
            // createDivRevisaoValor.document.querySelector('#container_itens_revisao').append(createDivRevisaoValor)

        
        // console.log(cart[i].price)

        // em cada item pegar o subtotal
    	subtotalValor += cart[i].price * cart[i].qt

    }


    
    // saber se é para entregar ou retirada
    const tipoValor = document.querySelector('#tipo_valor')
    const entregar = document.querySelector('#entregar').classList.contains('selected')
    console.log(entregar)

    if (entregar == true) {
        tipoValor.innerHTML = 'Entrega'
        let total = subtotalValor + 7.00
        console.log(total)
        document.querySelector('#total_valor').innerHTML = formatoReal(total)
        document.querySelector('#entrega_valor').style.display = 'block'
    } else {
        tipoValor.innerHTML = 'Retirar'
        document.querySelector('#total_valor').innerHTML = formatoReal(subtotalValor)
        document.querySelector('#entrega_valor').style.display = 'none'
    }

    console.log(tipoValor.textContent)
    // let str = "Rs. 6,67,000";
    // let res = str.replace(/\D/g, "");
    // alert(res);

    // calculo valor total
    // const taxaEntrega = document.querySelector('#entrega_valor').text
    // console.log(taxaEntrega)
    // var num = txt.replace(/[^0-9]/g, ''); 

    // const entregaRevisar = document.querySelector('.campo_referencia').value
    const totalRevisar = document.querySelector('#total_value').value
    document.querySelector('#nome_revisao').innerHTML = `${nomeRevisar}`
    document.querySelector('#telefone_revisao').innerHTML = `${telefoneRevisar}`
    document.querySelector('#endereco_revisao').innerHTML = `${document.querySelector('.campo_rua').value}, Nº ${document.querySelector('.campo_numero_endereco').value}, ${document.querySelector('.campo_referencia').value} <p>${document.querySelector('.campo_bairro').value}</p>`
    // document.querySelector('#tipo_valor').innerHTML = tipoEntrega
    document.querySelector('#subtotal_valor').innerHTML = formatoReal(subtotalValor)
    // document.querySelector('#entrega_valor').innerHTML = numeroEnderecoRevisar
    // document.querySelector('total_valor').innerHTML = totalRevisar

}

// BOTAO CARRINHO
// function botaoCarrinho() {
    
//     // mostrar o carrinho
// 		document.querySelector('#aside_carrinho').classList.add('show')

// 		// zerar meu .cart para nao fazer insercoes duplicadas
// 		document.querySelector('.cart').innerHTML = ''

//     let subtotalValor = 0
    
//     // para preencher os itens do carrinho, calcular subtotal
// 	for(let i in cart) {
//         subtotalValor += cart[i].price * cart[i].qt
//     }
    
//     const totalRevisar = document.querySelector('#total_value').value
//     document.querySelector('.subtotal_cart').innerHTML = formatoReal(subtotalValor)
// }

// WHATSAPP
function whatsapp() {
    let nameWpp = document.querySelector('.campo_nome').value;
    let telefoneWpp = document.querySelector('.campo_telefone').value;
    let ruaWpp = document.querySelector('.campo_rua').value;
    let numeroWpp = document.querySelector('.campo_numero_endereco').value;
    let referenciaWpp = document.querySelector('.campo_referencia').value;
    let bairroWpp = document.querySelector('.campo_bairro').value;
    let pagamentoWpp = document.querySelector('#pagamento').value;
    let totalValor = document.querySelector('#total_valor')
    let entrega = document.querySelector('#entrega_valor')
    let itens = cart.map(produto => Object.values({
        nome: produto.name,
        qtd: produto.qt,
        price: produto.price,
        size: produto.size
    }).join(': '));

    console.log(itens)

    const tipoValor = document.querySelector('#tipo_valor')

    // função para gerar número do pedido
    function gerarNumeroPedido() {
        const data = new Date();
        const ano = data.getFullYear();
        const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // +1 porque os meses começam em 0
        const dia = data.getDate().toString().padStart(2, '0');
        const numeroAleatorio = Math.floor(Math.random() * 10000); // Número aleatório de 0 a 9999

        const numeroPedido = `${dia}${mes}${ano}-${numeroAleatorio}`;
        return numeroPedido;
    }

    const numeroPedidoGerado = gerarNumeroPedido();
    console.log(numeroPedidoGerado)

    let message = ` 
    *NÚMERO DO PEDIDO:* ${numeroPedidoGerado}

    ${cart.map((produto) => (
    `
    ------------------------------
    *${produto.name}*
    *${produto.qt}x*
    *${produto.size}*
    *${formatoReal(produto.price * produto.qt)}*
    ------------------------------
    ` 
    ))}
    
    *Entrega:* ${entrega.textContent}
    *VALOR TOTAL:* ${totalValor.textContent}
    

    *Tipo do pedido:* ${tipoValor.textContent}
    *Pagamento:* ${pagamentoWpp}   
    
    ======= CLIENTE ========

    *Nome:* ${nameWpp}
    *Telefone:* ${telefoneWpp}
    *Rua:* ${ruaWpp}
    *Numero:* ${numeroWpp}
    *Referência:* ${referenciaWpp}
    *Bairro:* ${bairroWpp}
    `

    // let url = "https://wa.me/75991281921?text="
    let url = `https://wa.me/75991281921?text=${encodeURI(message)}`  
    

    window.open(url, '_blank').focus();
}

// IR PARA O INSTAGRAM
function sendToInstagram() {
    let url = "https://www.instagram.com/diskvilabeer/"

    window.open(url, '_blank').focus();
}

// LOJA FECHADA
// weekday
const openingTime = new Date();
openingTime.setHours(0, 1, 0);// Define o horário de abertura (09:00 AM)
const closingTime = new Date();
closingTime.setHours(23, 50, 0); // Define o horário de fechamento (17:00 PM)
console.log(openingTime)
console.log(closingTime)

// weekend and holidays
const openingTimeWeekend = new Date();
openingTimeWeekend.setHours(9, 0, 0); // Define o horário de abertura (09:00 AM)
const closingTimeWeekend = new Date();
closingTimeWeekend.setHours(19, 0, 0); // Define o horário de fechamento (19:00 PM)
console.log(openingTimeWeekend)
console.log(closingTimeWeekend)

function closeStore() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    
    //weekend
    const isWeekend = ((dayOfWeek === 6) || (dayOfWeek === 0))
    if ((isWeekend == true) && (now < openingTimeWeekend || now >= closingTimeWeekend)) {
        const mensage = document.createElement('p');
        mensage.setAttribute("class", "closed")
        mensage.textContent = 'A loja está fechada no momento.'
        
        // substitui a mensagem
        const conteudo = document.querySelector('#content')
        conteudo.innerHTML = "";
        conteudo.appendChild(mensage)

        document.querySelector('.menu-openner').style.display = 'none'

    } else if ((isWeekend == false && (now < openingTime || now >= closingTime))) {
        const mensage = document.createElement('p');
        mensage.setAttribute("class", "closed")
        mensage.textContent = 'A loja está fechada no momento.'
        
        // substitui a mensagem
        const conteudo = document.querySelector('#content')
        conteudo.innerHTML = "";
        conteudo.appendChild(mensage)

        document.querySelector('.menu-openner').style.display = 'none'
    }
}

// Verifique o status da loja a cada minuto (ajuste o intervalo conforme necessário)
setInterval(closeStore, 60000);

// Verifique o status da loja imediatamente ao carregar a página
window.addEventListener("load", closeStore);

// /aula 06
function redenrizaItem (item, index, clas) {
    let produtoItem = document.querySelector('.models .produto-item').cloneNode(true)
    //console.log(produtoItem)
    document.querySelector(clas).append(produtoItem)

    // preencher os dados de cada produto
    preencheDadosDosProdutos(produtoItem, item, index, clas)
    
    console.log('adicionou evento')
    // produto clicado
    produtoItem.querySelector('.produto-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou no produto')

        
        let chave = pegarKey(e, 'data-key')
        let type = pegarKey(e, 'data-type')
        // /aula 05

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        
        // pegar tamanho selecionado
        preencherTamanhos(chave)

		// definir quantidade inicial como 1
		document.querySelector('.itemInfo--qt').innerHTML = quantProduto

        // selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave, type)
        // /aula 05
        keyAtual = chave;
        typeAtual = type;

    })

    botoesFechar()
}

// MAPEAR listItens para gerar lista de itens
listItens.data.bebidas.map((item, index) => {
    //console.log(item)
    redenrizaItem(item, index, '#bebidas')

})

listItens.data.longNeck.map((item, index) => {
    //console.log(item)
    redenrizaItem(item, index, '#longNeck')

}) 

listItens.data.vinhoEspumantes.map((item, index) => {
    //console.log(item)
    redenrizaItem(item, index, '#vinhoEspumantes')

})

listItens.data.refrigerantesCia.map((item, index) => {
    //console.log(item)
    redenrizaItem(item, index, '#refrigerantesCia')

})

listItens.data.bebidasQuentes.map((item, index) => {
    //console.log(item)
    redenrizaItem(item, index, '#bebidasQuentes')

})

listItens.data.geloCarvao.map((item, index) => {
    //console.log(item)
    redenrizaItem(item, index, '#geloCarvao')

})

listItens.data.consumiveis.map((item, index) => {
    //console.log(item)
    redenrizaItem(item, index, '#consumiveis')

})

// fim do MAPEAR listItens para gerar lista de produtos