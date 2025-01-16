let listaNumerosSorteados = [];
let numeroLimite = 10;

function exibirMensagemInicial() {
  exibirTexto("h1", "Jogo do número secreto");
  exibirTexto("p", "Escolha um número entre 1 e 10!");
}

exibirMensagemInicial();

function exibirTexto(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.3 });
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantElementosLista = listaNumerosSorteados.length;

  if (quantElementosLista == numeroLimite) {
    listaNumerosSorteados = [];
  }

  if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroEscolhido);
    console.log(listaNumerosSorteados);
    return numeroEscolhido;
  }
}

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function limparCampo() {
  palpite = document.querySelector("input");
  palpite.value = "";
}

function verificarChute() {
  let palpite = document.querySelector("input").value;

  if (palpite == numeroSecreto) {
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;

    exibirTexto("h1", "PARABÉNS!");
    exibirTexto("p", mensagemTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (palpite > numeroSecreto) {
      exibirTexto("p", "O número secreto é menor!");
    } else {
      exibirTexto("p", "O número secreto é maior!");
    }

    tentativas++;
    limparCampo();
  }
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
