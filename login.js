import {auth} from "./firebase.js";

import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const formLogin = document.getElementById("formLogin");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const botaoEntrar = document.getElementById("botaoEntrar");
const botaoMostrarSenha = document.getElementById("mostrarSenha");
const mensagem = document.getElementById("mensagem");

// Se o usuário já estiver conectado, vai direto para o sistema.
onAuthStateChanged(auth, (usuario) => {
  if (usuario) {
    window.location.replace("./index.html");
  }
});

botaoMostrarSenha.addEventListener("click", () => {
  const senhaEstaEscondida = campoSenha.type === "password";

  campoSenha.type = senhaEstaEscondida
    ? "text"
    : "password";

  botaoMostrarSenha.textContent = senhaEstaEscondida
    ? "Ocultar"
    : "Mostrar";
});

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

function limparMensagem() {
  mensagem.textContent = "";
  mensagem.className = "";
}

function traduzirErro(codigo) {
  const erros = {
    "auth/invalid-email":
      "O e-mail digitado não é válido.",

    "auth/missing-password":
      "Digite sua senha.",

    "auth/invalid-credential":
      "E-mail ou senha incorretos.",

    "auth/user-disabled":
      "Este usuário foi desativado.",

    "auth/too-many-requests":
      "Muitas tentativas. Aguarde um pouco e tente novamente.",

    "auth/network-request-failed":
      "Falha de conexão. Verifique sua internet."
  };

  return erros[codigo] ||
    "Não foi possível entrar no sistema.";
}

formLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  limparMensagem();

  const email = campoEmail.value.trim();
  const senha = campoSenha.value;

  if (!email || !senha) {
    mostrarMensagem(
      "Preencha o e-mail e a senha.",
      "erro"
    );

    return;
  }

  botaoEntrar.disabled = true;
  botaoEntrar.textContent = "Entrando...";

  try {
    await setPersistence(
      auth,
      browserLocalPersistence
    );

    await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );

    mostrarMensagem(
      "Login realizado com sucesso.",
      "sucesso"
    );

    window.location.replace("./index.html");
  } catch (erro) {
    console.error("Erro no login:", erro);

    mostrarMensagem(
      traduzirErro(erro.code),
      "erro"
    );
  } finally {
    botaoEntrar.disabled = false;
    botaoEntrar.textContent = "Entrar";
  }
});