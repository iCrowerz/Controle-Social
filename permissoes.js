import { auth, db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Guarda os dados do usuário atual.
let usuarioAtual = null;

// Função que busca o perfil do usuário no Firestore.
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

// Aguarda o Firebase descobrir quem está logado.
onAuthStateChanged(auth, async (usuario) => {

  if (!usuario) {
    return;
  }

  try {

    const perfil = await buscarPerfil(usuario.uid);

    if (!perfil) {
      console.error(
        "Usuário autenticado, mas sem perfil no Firestore."
      );

      return;
    }

    usuarioAtual = perfil;

    console.log(
      "Perfil carregado:",
      usuarioAtual
    );

    aplicarPermissoes(usuarioAtual);

  } catch (erro) {

    console.error(
      "Erro ao carregar permissões:",
      erro
    );

  }

});

// Aplica as permissões visuais.
function aplicarPermissoes(perfil) {

  console.log(
    "Nível de acesso:",
    perfil.role
  );

  if (perfil.ativo === false) {

    alert(
      "Seu acesso ao sistema está desativado."
    );

    return;
  }

  if (perfil.role === "master") {

    console.log(
      "Acesso MASTER liberado."
    );

    document.body.classList.add(
      "usuario-master"
    );

  } else {

    console.log(
      "Acesso somente para visualização."
    );

    document.body.classList.add(
      "usuario-visualizador"
    );

  }

}

export {
  usuarioAtual,
  buscarPerfil
};