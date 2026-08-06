import { db } from "./firebase.js";

import {

collection,

getDocs

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const consulta = await getDocs(collection(db,"beneficiarios"));

consulta.forEach((doc)=>{

console.log(doc.data());

});