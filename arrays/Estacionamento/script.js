let carros = []

function adicionar() {
  let carroNovo = lerDados()
  if (validar(carroNovo)) {
    carroNovo.ano = parseInt(carroNovo.ano)
    carros.push(carroNovo)
    imprimir()
    limpar()
  } else {
    alert("Preencha todos os campos!")
  }
}

function lerDados() {
  let carro = {}
  carro.marca = document.getElementById("marca").value
  carro.modelo = document.getElementById("modelo").value
  carro.ano = document.getElementById("ano").value
  return carro
}

function validar(carro) {
  if (carro.marca && carro.modelo && carro.ano) return true
  else return false
}

function imprimir() {
  let tabela = document.getElementById("tabela")
  tabela.innerText = ""
  for (let i = 0; i < carros.length; i++) {
    tabela.innerHTML += `
        <tr>
        <td>${carros[i].marca} ${carros[i].modelo}, ${carros[i].ano}</td>
        <td><img src="lixeira.png" alt="Imagem de uma Lixeira" onclick="excluir(${i})"></td>
        </tr>
        `
  }
}

function excluir(posicao) {
  if (confirm("Deseja excluir esta linha?")) {
    carros.splice(posicao, 1)
    imprimir()
  }
}

function limpar() {
  document.getElementById("marca").value = ""
  document.getElementById("modelo").value = ""
  document.getElementById("ano").value = ""
}

function classificar() {
  if (carros.length == 0) alert("Nenhum carro foi adicionado!")
  else {
    let maior = carros[0]
    let menor = carros[0]
    let media = 0

    for (let i = 0; i < carros.length; i++) {
      if (carros[i].ano > maior.ano) maior = carros[i]
      if (carros[i].ano < menor.ano) menor = carros[i]
      media += carros[i].ano
    }
    media = media / carros.length
    imprimirResultado(maior, menor, media)
  }
}

function imprimirResultado(maior, menor, media) {
  document.getElementById("maisNovo").innerText = toString(maior)
  document.getElementById("maisVelho").innerText = toString(menor)
  document.getElementById("media").innerText = media.toFixed(2)
}

function toString(carro) {
  return `${carro.marca} ${carro.modelo}, ${carro.ano}`
}
