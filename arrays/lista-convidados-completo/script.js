let convidados = []
let posicaoEdicao = null
let adultos = 0
let criancas = 0
let adolescentes = 0
let idosos = 0

async function buscarConvidados() {
  let x = await fetch("http://localhost:3000/convidados")
  x.json().then((convidadosResposta) => {
    convidados = convidadosResposta
    listarConvidado()
    classificar()
  })
}

function validar(convidado) {
  let mensagemValidacao = ""

  if (convidado.nome == "") {
    mensagemValidacao += "Campo nome é obrigatório!\n"
  }

  if (convidado.idade == "") {
    mensagemValidacao += "Campo idade é obrigatório!\n"
  }

  if (convidado.sexo == null) {
    mensagemValidacao += "Campo sexo é obrigatório!\n"
  }

  if (mensagemValidacao == "") return true
  else {
    alert(mensagemValidacao)
    return false
  }
}

function salvar() {
  let convidado = {}
  convidado.nome = document.getElementById("nomeDigitado").value
  convidado.idade = document.getElementById("idadeDigitado").value
  convidado.sexo = document.querySelector("[type=radio]:checked")

  if (validar(convidado)) {
    convidado.sexo = document.querySelector("[type=radio]:checked").value

    if (posicaoEdicao == null) {
      adicionar(convidado)
    } else {
      finalizarEdicao(convidado)
    }
  }
}

function limpar() {
  document.getElementById("nomeDigitado").value = ""
  document.getElementById("idadeDigitado").value = ""
  document.getElementById("masc").checked = false
  document.getElementById("fem").checked = false

  posicaoEdicao = null
}

function finalizarEdicao(convidado) {
  convidados[posicaoEdicao]

  fetch(`http://localhost:3000/convidados/${convidados[posicaoEdicao]._id}`, {
    method: "PUT",
    body: JSON.stringify(convidado),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resposta) => {
      return resposta.json()
    })
    .then((convidadoEdicao) => {
      convidados[posicaoEdicao] = convidadoEdicao
      alert("Convidado editado com Sucesso!")
      listarConvidado()
      classificar()
      limpar()
    })
}

function adicionar(convidado) {
  fetch("http://localhost:3000/convidados", {
    method: "POST",
    body: JSON.stringify(convidado),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
    .then((resposta) => {
      return resposta.json()
    })
    .then((convidadoNovo) => {
      convidados.push(convidadoNovo)
      alert("Convidado Cadastrado com Sucesso!")
      listarConvidado()
      classificar()
      limpar()
    })
}

function listarConvidado() {
  let tabelaLista = document.getElementById("lista")

  tabelaLista.innerHTML = ""
  for (let i = 0; i < convidados.length; i++) {
    tabelaLista.innerHTML += ` 
        <tr>
            <td>${convidados[i].nome}</td>
            <td>${convidados[i].idade}</td>
            <td>${convidados[i].sexo}</td>
            <td>
                <img src="lixeira.png" style="cursor: pointer;" onclick="excluir(${i})"> 
                <img src="editar.png" style="cursor: pointer;" onclick="prepararEdicao(${i})">
            </td>
        </tr>
        `
  }
}

function excluir(posicao) {
  if (confirm("Tem certeza que deseja excluir este convidado?")) {
    fetch(`http://localhost:3000/convidados/${convidados[posicao]._id}`, {
      method: "DELETE"
    })
      .then((resposta) => {
        return resposta.json()
      })
      .then((convidadoDeletado) => {
        alert("Convidado removido com sucesso!")
        convidados.splice(posicao, 1)
        classificar()
        listarConvidado()
        limpar()
      })
  }
}

function prepararEdicao(posicao) {
  posicaoEdicao = posicao
  document.getElementById("nomeDigitado").value = convidados[posicao].nome
  document.getElementById("idadeDigitado").value = convidados[posicao].idade
  if (convidados[posicao].sexo == "Masculino") {
    document.getElementById("masc").checked = true
  } else {
    document.getElementById("fem").checked = true
  }
}

function classificar() {
  criancas = 0
  adolescentes = 0
  adultos = 0
  idosos = 0

  for (let i = 0; i < convidados.length; i++) {
    if (convidados[i].idade < 14) {
      criancas++
    } else if (convidados[i].idade >= 14 && convidados[i].idade < 18) {
      adolescentes++
    } else if (convidados[i].idade >= 18 && convidados[i].idade < 60) {
      adultos++
    } else {
      idosos++
    }
  }

  document.getElementById("criancas").innerText = criancas
  document.getElementById("adolescentes").innerText = adolescentes
  document.getElementById("adultos").innerText = adultos
  document.getElementById("idosos").innerText = idosos
}
// function verificarClassificacao(idade, eRemocao) {
//   if (posicaoEdicao == null) {
//     eRemocao ? classificar(idade, false) : classificar(idade, true)
//   } else {
//     classificar(backupIdade, false)
//     classificar(idade, true)
//   }
// }

// function classificar(idade, adicao) {
//   if (idade < 14) {
//     adicao ? criancas++ : criancas--
//     document.querySelector("#criancas").innerText = criancas
//   } else if (idade >= 14 && idade < 18) {
//     adicao ? adolescentes++ : adolescentes--
//     document.querySelector("#adolescentes").innerText = adolescentes
//   } else if (idade >= 18 && idade < 60) {
//     adicao ? adultos++ : adultos--
//     document.querySelector("#adultos").innerText = adultos
//   } else {
//     adicao ? idosos++ : idosos--
//     document.querySelector("#idosos").innerText = idosos
//   }
// }
