import { clienteService } from "../service/cliente-service.js";

const criaNovaLinha = (nome, email, id) => {
    const linhaNovoCliente = document.createElement('tr')
    const conteudo =
        `<td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>
        <ul class="tabela__botoes-controle">
            <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
            <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
        </ul>
    </td>`

    linhaNovoCliente.innerHTML = conteudo
    linhaNovoCliente.dataset.id = id

    console.log(linhaNovoCliente)

    return linhaNovoCliente
}

const tabela = document.querySelector('[data-tabela]')


//Deleta a linha e o cliente
tabela.addEventListener('click', async (evento) => {
    let ehBotaoDeletar = evento.target.className === 'botao-simples botao-simples--excluir'
    if (ehBotaoDeletar) {
        try {
            //Pega o pai da linha que foi clicada
            const linhaCliente = evento.target.closest('[data-id]')
            let id = linhaCliente.dataset.id
            await clienteService.removeCliente(id)
            linhaCliente.remove()
        } catch (erro) {
            console.log(erro)
            window.location.href = '../telas/erro.html'
        }

    }
})


const render = async () => {
    try {
        const listaClientes = await clienteService.listaClientes()

        listaClientes.forEach(elemento => {
            tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id))
        })
    } catch (erro) {
        console.log(erro)
        window.location.href = '../telas/erro.html'
    }

}


render()


/*
Código que pode ser substituído pelo Fetch, conforme acima:
listaClientes()
.then(data => {
data.forEach(elemento => {
    tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email))
})});



const listaClientes = () => {
    const promise = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
 
        http.open('GET', 'http://localhost:3000/profile')
 
        http.onload = () => {
            if (http.status >= 400) {
                reject(JSON.parse(http.response));
            } else {
                resolve(JSON.parse(http.response));
            }
        }
        http.send();
    })
    console.log(promise)
    return promise
}
*/