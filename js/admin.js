import { db } from "./firebase.js";

import {

collection,

addDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function salvar(){

await addDoc(collection(db,"beneficiarios"),{

nome:"Thiago",

idade:29,

sexo:"Masculino"

});

}