import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

console.log("permissoes.js carregado");

let usuarioAtual = null;

async function buscarPerfil(uid) {
  const referencia = doc(db, "usuarios", uid);

  const documento = await getDoc(referencia);

  if (!documento.exists()) {
    return null;
  }

  return {
    uid: documento.id,
    ...documento.data()
  };
}

function aplicarPermissoes(perfil) {
  console.log("Perfil encontrado:", perfil);
  console.log("Nível de acesso:", perfil.role);

  if (perfil.ativo === false) {
    alert("Seu usuário está desativado.");
    return;
  }

  if (perfil.role === "master") {
    console.log("Acesso MASTER liberado");

    document.body.classList.add("usuario-master");
    return;
  }

  console.log("Acesso somente visualização");

  document.body.classList.add("usuario-visualizador");
}

onAuthStateChanged(auth, async (usuario) => {
  if (!usuario) {
    console.log("Nenhum usuário autenticado");
    return;
  }

  console.log("Usuário autenticado:", usuario.email);
  console.log("UID:", usuario.uid);

  try {
    const perfil = await buscarPerfil(usuario.uid);

    if (!perfil) {
      console.error(
        "Usuário logado, mas não existe perfil na coleção usuarios."
      );

      return;
    }

    usuarioAtual = perfil;

    aplicarPermissoes(perfil);

  } catch (erro) {
    console.error(
      "Erro ao buscar perfil no Firestore:",
      erro
    );
  }
});

export {
  usuarioAtual,
  buscarPerfil
};