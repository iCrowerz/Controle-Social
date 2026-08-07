import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const formulario = document.getElementById("formLogin");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const botaoEntrar = document.getElementById("botaoEntrar");
const mensagem = document.getElementById("mensagem");

console.log("login.js carregado corretamente");

if (
  !formulario ||
  !campoEmail ||
  !campoSenha ||
  !botaoEntrar ||
  !mensagem
) {
  console.error(
    "Algum elemento do login.html não foi encontrado."
  );
} else {
  formulario.addEventListener("submit", async (evento) => {
    // Impede o navegador de colocar os dados na URL.
    evento.preventDefault();

    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    mensagem.textContent = "";
    mensagem.className = "";

    botaoEntrar.disabled = true;
    botaoEntrar.textContent = "Entrando...";

    try {
      const credencial = await signInWithEmailAndPassword(
        auth,
        email,
        senha
      );

      console.log(
        "Login realizado:",
        credencial.user.email
      );

      mensagem.textContent =
        "Login realizado com sucesso.";

      mensagem.className = "sucesso";

      window.location.replace("./index.html");
    } catch (erro) {
      console.error("Erro no login:", erro);

      if (erro.code === "auth/invalid-credential") {
        mensagem.textContent =
          "E-mail ou senha incorretos.";
      } else if (
        erro.code === "auth/operation-not-allowed"
      ) {
        mensagem.textContent =
          "O login por e-mail e senha não está ativado.";
      } else if (
        erro.code === "auth/network-request-failed"
      ) {
        mensagem.textContent =
          "Erro de conexão. Verifique sua internet.";
      } else {
        mensagem.textContent =
          `Erro ao entrar: ${erro.code}`;
      }

      mensagem.className = "erro";

      botaoEntrar.disabled = false;
      botaoEntrar.textContent = "Entrar";
    }
  });
}