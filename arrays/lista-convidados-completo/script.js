let convidados = []
let posicaoEdicao = null
let backupIdade = -1
let adultos = 0
let criancas = 0
let adolescentes = 0
let idosos = 0

async function buscarConvidados() {
  let x = await fetch("http://localhost:3000/convidados")
  x.json().then((convidadosResposta) => {
    convidados = convidadosResposta
    listarConvidado()
  })
}

function salvar() {
  let convidado = {}
  convidado.nome = document.getElementById("nomeDigitado").value
  convidado.idade = document.getElementById("idadeDigitado").value
  convidado.sexo = document.querySelector("[type=radio]:checked")

  if (convidado.nome == "") {
    alert("Preencha o nome")
    return
  }

  if (convidado.idade == "") {
    alert("Preencha a idade")
    return
  }

  if (convidado.sexo == null) {
    alert("Preencha o sexo")
    return
  } else {
    convidado.sexo = document.querySelector("[type=radio]:checked").value
  }

  if (posicaoEdicao == null) {
    adicionar(convidado)
  } else {
    finalizarEdicao(convidado)
  }

  listarConvidado()
  verificarClassificacao(convidado.idade, false)
  limpar()
}

function limpar() {
  document.getElementById("nomeDigitado").value = ""
  document.getElementById("idadeDigitado").value = ""
  document.getElementById("masc").checked = false
  document.getElementById("fem").checked = false

  backupIdade = 0
  posicaoEdicao = null
}

function finalizarEdicao(convidado) {
  convidados[posicaoEdicao] = convidado
}

function adicionar(convidado) {
  convidado.sexo = document.querySelector("[type=radio]:checked").value
  convidados.push(convidado)
  alert("Convidado Cadastrado")
  listarConvidado()

  limpar()
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
    verificarClassificacao(convidados[posicao].idade, true)
    convidados.splice(posicao, 1)
    listarConvidado()
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
  backupIdade = convidados[posicao].idade
}

function verificarClassificacao(idade, eRemocao) {
  if (posicaoEdicao == null) {
    eRemocao ? classificar(idade, false) : classificar(idade, true)
  } else {
    classificar(backupIdade, false)
    classificar(idade, true)
  }
}

function classificar(idade, adicao) {
  if (idade < 14) {
    adicao ? criancas++ : criancas--
    document.querySelector("#criancas").innerText = criancas
  } else if (idade >= 14 && idade < 18) {
    adicao ? adolescentes++ : adolescentes--
    document.querySelector("#adolescentes").innerText = adolescentes
  } else if (idade >= 18 && idade < 60) {
    adicao ? adultos++ : adultos--
    document.querySelector("#adultos").innerText = adultos
  } else {
    adicao ? idosos++ : idosos--
    document.querySelector("#idosos").innerText = idosos
  }
}
