let receitas = []
let despesas = []

let totalReceitas = 0
let totalDespesas = 0

function adicionarReceita() {
  let receitaString = document.getElementById("entradaReceita").value
  let receitaConvertida = parseFloat(receitaString)

  receitas.push(receitaConvertida)

  totalReceitas = totalReceitas + receitaConvertida

  calcularBalanco()
}

function adicionarDespesa() {
  let despesaString = document.getElementById("entradaDespesa").value
  let despesaConvertida = parseFloat(despesaString)

  despesas.push(despesaConvertida)

  totalDespesas = totalDespesas + despesaConvertida

  calcularBalanco()
}

function calcularBalanco() {
  let balanco = totalReceitas - totalDespesas

  let spanReceita = document.getElementById("resultadoReceita")
  spanReceita.innerText = "R$ " + totalReceitas.toFixed(2)
  spanReceita.style = "color:green"

  let spanDespesa = document.getElementById("resultadoDespesa")
  spanDespesa.innerText = "R$ " + totalDespesas.toFixed(2)
  spanDespesa.style = "color:red"

  let spanBalanco = document.getElementById("balanco")
  spanBalanco.innerText = "R$ " + balanco.toFixed(2)

  if (balanco >= 0) {
    spanBalanco.style = "color:green"
  } else {
    spanBalanco.style = "color:red"
  }

  console.log("Lista de receitas: " + receitas)
  console.log("Lista de despesas: " + despesas)

  console.log("Balanço: " + balanco)
}
