function somar() {
  let p1String = document.getElementById("input1").value //Pegando o valor do input1 camisetas P
  let m2String = document.getElementById("input2").value //Pegando o valor do input2 camisetas M
  let g3String = document.getElementById("input3").value //Pegando o valor do input3 camisetas G

  //Verificando se os 3 campos lidos são diferentes de vazio, ou seja, foram preenchidos

  if (p1String != "" && m2String != "" && g3String != "") {
    //Converter e Calcular

    let p = parseInt(p1String) //Convertendo a String com o valor de camisetas P em número
    let m = parseInt(m2String) //Convertendo a String com o valor de camisetas M em número
    let g = parseInt(g3String) //Convertendo a String com o valor de camisetas G em número

    let total = p * 10 + m * 12 + g * 15 //Cálculo do valor total do pedido

    alert(`O resultado é: R$ ${total.toFixed(2)}`)
  } else {
    alert("Preencha todos os campos!")
  }

  //   document.getElementById("resultado").innerText = "O total é: R$" + total
  //   document.getElementById("resultado").innerHTML =
  //     "<button class='botao'>Salvar</button>"
}
