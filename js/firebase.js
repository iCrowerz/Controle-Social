// Importa o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

// Importa o Firestore (Banco de Dados)
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Importa o Authentication (Login)
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBqN9f11xl5-mxybU0KrCT4HgLi43F7PzI",
  authDomain: "projeto-social-d3f84.firebaseapp.com",
  projectId: "projeto-social-d3f84",
  storageBucket: "projeto-social-d3f84.firebasestorage.app",
  messagingSenderId: "670247263977",
  appId: "1:670247263977:web:4cde8c7bf4c0bb6c7d1a78"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Inicializa o Authentication
const auth = getAuth(app);

// Exporta para os outros arquivos
export { db, auth };