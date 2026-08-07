import { auth } from "./firebase.js";

import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const formulario = document.getElementById("formLogin");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const botaoEntrar = document.getElementById("botaoEntrar");
const botaoMostrarSenha = document.getElementById("mostrarSenha");
const mensagem = document.getElementById("mensagem");

// Mostrar ou esconder a senha.
botaoMostrarSenha.addEventListener("click", () => {
  const senhaEstaOculta = campoSenha.type === "password";

  campoSenha.type = senhaEstaOculta ? "text" : "password";
  botaoMostrarSenha.textContent = senhaEstaOculta
    ? "Ocultar"
    : "Mostrar";
});

// Mostra mensagens na tela.
function mostrarMensagem(texto, tipo = "erro") {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

// Traduz erros comuns do Firebase.
function traduzirErro(codigo) {
  const mensagens = {
    "auth/invalid-email": "O e-mail digitado não é válido.",
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/user-disabled": "Este usuário está desativado.",
    "auth/missing-password": "Digite sua senha.",
    "auth/too-many-requests":
      "Muitas tentativas. Aguarde um pouco e tente novamente.",
    "auth/network-request-failed":
      "Falha de conexão. Verifique sua internet.",
    "auth/operation-not-allowed":
      "O login por e-mail e senha não está ativado no Firebase."
  };

  return mensagens[codigo] || `Erro no login: ${codigo}`;
}

// Evento executado ao enviar o formulário.
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const email = campoEmail.value.trim();
  const senha = campoSenha.value;

  mensagem.textContent = "";
  mensagem.className = "";

  if (!email || !senha) {
    mostrarMensagem("Preencha o e-mail e a senha.");
    return;
  }

  botaoEntrar.disabled = true;
  botaoEntrar.textContent = "Entrando...";

  try {
    const resultado = await signInWithEmailAndPassword(
      auth,
      email,
      senha
    );

    console.log(
      "Usuário conectado:",
      resultado.user.email
    );

    mostrarMensagem(
      "Login realizado! Abrindo o sistema...",
      "sucesso"
    );

    // Pequeno intervalo apenas para mostrar a mensagem.
    setTimeout(() => {
      window.location.href =
        "https://icrowerz.github.io/Controle-Social/index.html";
    }, 700);
  } catch (erro) {
    console.error("Erro completo do Firebase:", erro);

    mostrarMensagem(
      traduzirErro(erro.code),
      "erro"
    );

    botaoEntrar.disabled = false;
    botaoEntrar.textContent = "Entrar";
  }
});