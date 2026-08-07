import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Aguarda o Firebase confirmar se existe um usuário conectado.
onAuthStateChanged(auth, (usuario) => {
  // Se não houver usuário conectado, envia para a tela de login.
  if (!usuario) {
    window.location.replace("./login.html");
    return;
  }

  criarBotaoSair(usuario);
});

function criarBotaoSair(usuario) {
  // Evita criar o botão mais de uma vez.
  if (document.getElementById("controleSessao")) {
    return;
  }

  const controle = document.createElement("div");
  controle.id = "controleSessao";

  controle.innerHTML = `
    <span id="usuarioLogado"></span>
    <button id="botaoSair" type="button">Sair</button>
  `;

  Object.assign(controle.style, {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    zIndex: "99999",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "10px",
    background: "#111827",
    color: "#ffffff",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
    fontFamily: "Arial, sans-serif"
  });

  document.body.appendChild(controle);

  const usuarioLogado = document.getElementById("usuarioLogado");
  const botaoSair = document.getElementById("botaoSair");

  usuarioLogado.textContent = usuario.email || "Usuário conectado";

  Object.assign(usuarioLogado.style, {
    fontSize: "12px",
    maxWidth: "200px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  });

  Object.assign(botaoSair.style, {
    border: "none",
    borderRadius: "7px",
    padding: "8px 13px",
    background: "#dc2626",
    color: "#ffffff",
    fontWeight: "bold",
    cursor: "pointer"
  });

  botaoSair.addEventListener("click", async () => {
    botaoSair.disabled = true;
    botaoSair.textContent = "Saindo...";

    try {
      await signOut(auth);
      window.location.replace("./login.html");
    } catch (erro) {
      console.error("Erro ao sair:", erro);
      alert("Não foi possível sair do sistema.");

      botaoSair.disabled = false;
      botaoSair.textContent = "Sair";
    }
  });
}