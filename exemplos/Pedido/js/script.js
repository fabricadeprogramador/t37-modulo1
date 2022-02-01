function somar() {
  let p1String = document.getElementById("input1").value
  let m2String = document.getElementById("input2").value
  let g3String = document.getElementById("input3").value

  let p = parseInt(p1String)
  let m = parseInt(m2String)
  let g = parseInt(g3String)

  let total = p * 10 + m * 12 + g * 15

  alert(`O resultado é: R$ ${total}`)

  //   document.getElementById("resultado").innerText = "O total é: R$" + total
  //   document.getElementById("resultado").innerHTML =
  //     "<button class='botao'>Salvar</button>"
}
