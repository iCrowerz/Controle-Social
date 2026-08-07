import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

onAuthStateChanged(auth, (usuario) => {
  if (!usuario) {
    window.location.replace("./login.html");
    return;
  }

  criarBotaoSair(usuario);
});

function criarBotaoSair(usuario) {
  if (document.getElementById("controleSessao")) {
    return;
  }

  const controle = document.createElement("div");
  controle.id = "controleSessao";

  controle.style.position = "fixed";
  controle.style.right = "15px";
  controle.style.bottom = "15px";
  controle.style.zIndex = "99999";
  controle.style.padding = "10px";
  controle.style.borderRadius = "10px";
  controle.style.background = "#111827";
  controle.style.color = "#ffffff";
  controle.style.fontFamily = "Arial, sans-serif";

  const email = document.createElement("span");
  email.textContent = usuario.email || "Usuário conectado";
  email.style.marginRight = "12px";
  email.style.fontSize = "13px";

  const botaoSair = document.createElement("button");
  botaoSair.type = "button";
  botaoSair.textContent = "Sair";
  botaoSair.style.padding = "8px 14px";
  botaoSair.style.border = "none";
  botaoSair.style.borderRadius = "7px";
  botaoSair.style.background = "#dc2626";
  botaoSair.style.color = "#ffffff";
  botaoSair.style.cursor = "pointer";

  botaoSair.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.replace("./login.html");
    } catch (erro) {
      console.error("Erro ao sair:", erro);
      alert("Não foi possível sair.");
    }
  });

  controle.appendChild(email);
  controle.appendChild(botaoSair);
  document.body.appendChild(controle);
}