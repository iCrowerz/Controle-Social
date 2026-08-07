import { auth } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

console.log("auth.js carregado com sucesso");

onAuthStateChanged(
  auth,

  (usuario) => {
    console.log("Firebase respondeu:", usuario);

    if (!usuario) {
      console.log("Usuário não está logado.");

      window.location.href = "./login.html";
      return;
    }

    console.log("Usuário conectado:", usuario.email);
  },

  (erro) => {
    console.error("Erro ao verificar autenticação:", erro);

    alert(
      "O sistema encontrou um erro ao verificar o login. " +
      "Abra o console do navegador para visualizar."
    );
  }
);