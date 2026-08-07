import { auth } from "../firebase.js";

import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const formLogin = document.getElementById("formLogin");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const botaoEntrar = document.getElementById("entrar");
const botaoAlternarSenha = document.getElementById("alternarSenha");
const mensagem = document.getElementById("mensagem");

// Se a pessoa já estiver conectada, não precisa ver o login novamente.
onAuthStateChanged(auth, (usuario) => {
  if (usuario) {
    window.location.replace("./index.html");
  }
});

// Mostra ou esconde a senha.
botaoAlternarSenha.addEventListener("click", () => {
  const senhaEstaOculta = campoSenha.type === "password";

  campoSenha.type = senhaEstaOculta ? "text" : "password";
  botaoAlternarSenha.textContent = senhaEstaOculta
    ? "Ocultar"
    : "Mostrar";
});

// Mostra uma mensagem abaixo do formulário.
function mostrarMensagem(texto, tipo = "erro") {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

// Remove a mensagem anterior.
function limparMensagem() {
  mensagem.textContent = "";
  mensagem.className = "";
}

// Traduz alguns erros comuns do Firebase.
function traduzirErroLogin(codigo) {
  const mensagens = {
    "auth/invalid-email": "O endereço de e-mail não é válido.",
    "auth/missing-password": "Digite sua senha.",
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/user-disabled": "Este usuário está desativado.",
    "auth/too-many-requests":
      "Muitas tentativas foram realizadas. Aguarde e tente novamente.",
    "auth/network-request-failed":
      "Não foi possível conectar. Verifique sua internet."
  };

  return mensagens[codigo] || "Não foi possível entrar no sistema.";
}

formLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  limparMensagem();

  const email = campoEmail.value.trim();
  const senha = campoSenha.value;

  if (!email || !senha) {
    mostrarMensagem("Preencha o e-mail e a senha.");
    return;
  }

  botaoEntrar.disabled = true;
  botaoEntrar.textContent = "Entrando...";

  try {
    // Mantém o usuário conectado mesmo se atualizar ou fechar o navegador.
    await setPersistence(auth, browserLocalPersistence);

    await signInWithEmailAndPassword(auth, email, senha);

    mostrarMensagem("Login realizado com sucesso.", "sucesso");

    window.location.replace("./index.html");
  } catch (erro) {
    console.error("Erro ao realizar login:", erro);

    mostrarMensagem(traduzirErroLogin(erro.code));
  } finally {
    botaoEntrar.disabled = false;
    botaoEntrar.textContent = "Entrar";
  }
});