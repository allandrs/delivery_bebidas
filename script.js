// aula 05
// criar a variável modalKey sera global
let modalKey = 0

let keyAtual;

let typeAtual;


// variavel para controlar a quantidade inicial de produtos na modal
let quantProduto = 0



let cart = [] // carrinho
// /aula 05

// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.windowArea').style.opacity = 0 // transparente
    seleciona('.windowArea').style.display = 'flex'
    setTimeout(() => seleciona('.windowArea').style.opacity = 1, 150)
    
}

const fecharModal = () => {
    seleciona('.windowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.windowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.itemInfo--cancelButton, .itemInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDosProdutos = (produtoItem, item, index, clas) => {
    // aula 05
    // setar um atributo para identificar qual elemento foi clicado
	produtoItem.setAttribute('data-key', index)
	produtoItem.setAttribute('data-type', clas.slice(1))
    produtoItem.querySelector('.produto-item--img img').src = item.img
    produtoItem.querySelector('.produto-item--price').innerHTML = formatoReal(item.price[0])
    produtoItem.querySelector('.produto-item--name').innerHTML = item.name
}

const preencheDadosModal = (item) => {
    seleciona('.produtoBig img').src = item.img
    seleciona('.itemInfo h1').innerHTML = item.name
    seleciona('.itemInfo--actualPrice').innerHTML = formatoReal(item.price[0])
}

// aula 05
const pegarKey = (e, dataSet) => {
    // .closest retorna o elemento mais proximo que tem a class que passamos
    // do .produto-item ele vai pegar o valor do atributo data-key
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
    seleciona('.itemInfo-size.selected').classList.remove('selected')

    // **selecionar todos os tamanhos
    selecionaTodos('.itemInfo-size').forEach((size, sizeIndex) => {
        // selecionar a unidade
        (sizeIndex == 0) ? size.classList.add('selected') : ''
        // size.querySelector('span').innerHTML = listItens[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key, type) => {
    // Ações nos botões de tamanho
    // selecionar todos os tamanhos
    
    selecionaTodos('.itemInfo-size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // clicou em um item, tirar a selecao dos outros e marca o q vc clicou
            // ** tirar a selecao de tamanho atual e selecionar a caixa

            seleciona('.itemInfo-size.selected').classList.remove('selected')
            // marcar o que vc clicou, ao inves de usar e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected')

            // mudar o preço de acordo com o tamanho
            seleciona('.itemInfo--actualPrice').innerHTML = formatoReal(listItens.data[type][key].price[sizeIndex])
        })
    })
}



//MUDAR A QUANTIDADE BOTÕES + e - da janela modal
// const mudarQuantidade = () => {
function mudarQtdMais() {
    quantProduto++
    seleciona('.itemInfo--qt').innerHTML = quantProduto

}
function mudarQtdMenos() {
    if(quantProduto > 1) {
        quantProduto--
        seleciona('.itemInfo--qt').innerHTML = quantProduto	
    }
}
// }
// /aula 05
// const mudarQuantidade = () => {
//     // Ações nos botões + e - da janela modal
//     seleciona('.pizzaInfo--qtmais').addEventListener('click', () => {
//         quantPizzas++
//         seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
//     })

//     seleciona('.pizzaInfo--qtmenos').addEventListener('click', () => {
//         if(quantPizzas > 1) {
//             quantPizzas--
//             seleciona('.pizzaInfo--qt').innerHTML = quantPizzas	
//         }
//     })
// }



// aula 06
const adicionarNoCarrinho = () => {
    
        console.log('Adicionar no carrinho')

        // pegar dados da janela modal atual
    	// qual produto? pegue o modalKey para usar listItens[modalKey]
    	console.log("produto " + modalKey)

    	// tamanho
	    let size = seleciona('.itemInfo-size.selected').getAttribute('data-key')
	    console.log("Tamanho " + size)
	    // quantidade
    	console.log("Quant. " + quantProduto)


        const product = listItens.data[typeAtual][keyAtual]


        console.log(product)

        // console.log(product)
        // const repo = product

        // preco
        let price = size === "unidade" ? product.price[0] : product.price[1];

        console.log(price)

        // const ids = repo.reduce((ids, item) => item.id, [])


        // crie um identificador que junte id e tamanho
	    // concatene as duas informacoes separadas por um símbolo, vc escolhe
	    let identificador = product.id+'t'+size

        console.log(`IDENTIFICADOR ${identificador}`)

        // antes de adicionar verifique se ja tem aquele codigo e tamanho
        // para adicionarmos a quantidade
        let indexNoCart = cart.findIndex( (item) => item.identificador == identificador)

        console.log(indexNoCart)


        if(indexNoCart > -1) {

            cart[indexNoCart].qt += quantProduto

            // se encontrar aumente a quantidade
            
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
            console.log(cart)
            cart = [...cart,produto]
            console.log(produto)
            console.log('Sub total R$ ' + (produto.qt * produto.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('#aside_carrinho').classList.add('show')
        // seleciona('aside').style.left = '0vw' // usando 0vw ele ficara na tela
        seleciona('#aside_carrinho').style.right = '0vw'
        seleciona('.cabecalho').style.display = 'none' // não mostrar barra superior
    }
    
    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.right = '0vw'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.right = '150vw' // usando 150vw ele ficara fora da tela
        seleciona('.cabecalho').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
	seleciona('.menu-openner span').innerHTML = cart.length
	
	// mostrar ou nao o carrinho
	if(cart.length > 0) {

		// mostrar o carrinho
		seleciona('#aside_carrinho').classList.add('show')

		// zerar meu .cart para nao fazer insercoes duplicadas
		seleciona('.cart').innerHTML = ''

        // crie as variaveis antes do for
		let subtotal = 0
		let desconto = 0
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal

		for(let i in cart) {
			// use o find para pegar o item por id
			let produtoItem = cart[i];
            // let produtoItem = produtoItem.find( (item) => item.id == cart[i].id)		
            console.log(produtoItem);

            // em cada item pegar o subtotal
        	subtotal += cart[i].price * cart[i].qt
            //console.log(cart[i].price)

			// fazer o clone, exibir na telas e depois preencher as informacoes
			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let produtoSizeName = cart[i].size

			let produtoName = `${produtoItem.name} (${produtoSizeName})`

			// preencher as informacoes
			cartItem.querySelector('img').src = produtoItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = produtoName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			// selecionar botoes + e -
			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				// adicionar apenas a quantidade que esta neste contexto
				cart[i].qt++
				// atualizar a quantidade
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
                    // subtrair apenas a quantidade que esta neste contexto
					cart[i].qt--
				} else {
					// remover se for zero
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('.cabecalho').style.display = 'flex' : ''

				// atualizar a quantidade
				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} // fim do for

		// fora do for
		// calcule desconto 10% e total
		//desconto = subtotal * 0.1
		desconto = subtotal * 0
		total = subtotal - desconto

		// exibir na tela os resultados
		// selecionar o ultimo span do elemento
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		// ocultar o carrinho
		seleciona('aside').classList.remove('show')
		// seleciona('aside').style.left = '100vw'
	}
}

// BOTAO PROXIMO --> AVANÇA DO CARRINHO PARA O FORM
const finalizarCompra = () => {
    console.log('Finalizar compra')
    seleciona('#aside_carrinho').classList.remove('show')
    seleciona('.cabecalho').style.display = 'flex'
    seleciona('.cabecalho').style.display = 'none' // não mostrar barra superior
}

// BOTAO PROXIMO --> AVANÇA DO FORM PARA CONFIRMAÇÃO DE DADOS
const finalizarForm = () => {
    console.log('Finalizar formulario')
    seleciona('#aside_endereco').classList.remove('show')
    seleciona('.cabecalho').style.display = 'flex'
    seleciona('.cabecalho').style.display = 'none' // não mostrar barra superior
}

// VOLTAR AO CARRINHO
const voltarCarrinho = () => {
    console.log('teste voltar ao carrinho');
    seleciona('#aside_endereco').classList.remove('show')
    // seleciona('#aside_endereco').style.right = '0vw'
    seleciona('#aside_carrinho').classList.add('show')
    // seleciona('#aside_carriho').style.right = '0vw'

}

// FORMULARIO
const openForm = () => {
    seleciona('#aside_endereco').classList.add('show')
    // seleciona('#aside_carriho').style.left = '150vw'
    console.log('disparei')
}

// CONFIRMAÇÃO DE DADOS
const confirmForm = () => {
    seleciona('#aside_confirm').classList.add('show')
    seleciona('#aside_endereco').style.left = '150vw'
    console.log('disparei')
}

// RECOLHER ASIDE
const fecharAside = () => {
    console.log('teste botao fechar')
    seleciona('#aside_carrinho').classList.remove('show')
    seleciona('#aside_endereco').classList.remove('show')
    seleciona('.cabecalho').style.display = 'flex'
}

// ATIVAR FORMULARIO RETIRAR NA LOJA
function retirarNaLoja() {
    seleciona('#retirar').style.backgroundColor = '#eba324'
    seleciona('#entregar').style.backgroundColor = '#a3a3a3'
    seleciona('#info_entrega').style.display = 'none'
}

// ATIVAR FORMULARIO ENTREGA
function entregar() {
    seleciona('#retirar').style.backgroundColor = '#a3a3a3'
    seleciona('#entregar').style.backgroundColor = '#eba324'
    seleciona('#info_entrega').style.display = 'flex'
}

// WHATSAPP
function whatsapp() {
    let nameWpp = seleciona('.campo_nome').value;
    let telefoneWpp = seleciona('.campo_telefone').value;
    let ruaWpp = seleciona('.campo_rua').value;
    let numeroWpp = seleciona('.campo_numero_endereco').value;
    let referenciaWpp = seleciona('.campo_referencia').value;
    let bairroWpp = seleciona('.campo_bairro').value;
    let pagamentoWpp = seleciona('#pagamento').value;
    let itens = cart.map(produto => Object.values({
        nome: produto.name,
        qtd: produto.qt
    }).join(': '));

    console.log(itens)

    // let url = "https://wa.me/75991281921?text="
    let url = "https://wa.me/55997323505?text="
    +"*Nome :* "+nameWpp+"%0a"
    +"*Telefone :* "+telefoneWpp+"%0a"
    +"*Rua :* "+ruaWpp+"%0a"
    +"*Numero :* "+numeroWpp+"%0a"
    +"*Referência :* "+referenciaWpp+"%0a"
    +"*Bairro :* "+bairroWpp+"%0a"
    +"*Pagamento :* "+pagamentoWpp+"%0a"
    +"*Produtos :* "+itens+"%0a";

    window.open(url, '_blank').focus();
}


// /aula 06
function redenrizaItem (item, index, clas) {
    let produtoItem = document.querySelector('.models .produto-item').cloneNode(true)
    //console.log(produtoItem)
    seleciona(clas).append(produtoItem)

    // preencher os dados de cada produto
    preencheDadosDosProdutos(produtoItem, item, index, clas)
    
    console.log('adicionou evento')
    // produto clicado
    produtoItem.querySelector('.produto-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou no produto')

        // aula 05
        let chave = pegarKey(e, 'data-key')
        let type = pegarKey(e, 'data-type')
        // /aula 05

        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)

        // aula 05
        // pegar tamanho selecionado
        preencherTamanhos(chave)

		// definir quantidade inicial como 1
		seleciona('.itemInfo--qt').innerHTML = quantProduto

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


// mudar quantidade com os botoes + e -
// mudarQuantidade()


// atualizarCarrinho()
fecharCarrinho()
// finalizarCompra()
