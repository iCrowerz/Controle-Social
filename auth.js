import { auth } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

console.log("auth.js foi carregado.");

onAuthStateChanged(
  auth,

  (usuario) => {
    if (!usuario) {
      console.log("Nenhum usuário conectado.");

      window.location.replace("./login.html");
      return;
    }

    console.log("Usuário conectado:", usuario.email);
    console.log("Acesso ao sistema liberado.");
  },

  (erro) => {
    console.error(
      "Erro ao verificar autenticação:",
      erro
    );
  }
);