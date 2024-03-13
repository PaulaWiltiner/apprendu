// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  onSnapshot,
  collection,
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  orderBy,
  query,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmNu1LLMMj-WaKjyW2rF3rvLoP7SlxwT8",
  authDomain: "apprendu-test-f6d33.firebaseapp.com",
  projectId: "apprendu-test-f6d33",
  storageBucket: "apprendu-test-f6d33.appspot.com",
  messagingSenderId: "1050596534094",
  appId: "1:1050596534094:web:7f71a922cb09727b41a01f",
  measurementId: "G-DRTSRHD67Y",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function useAPI() {
  async function sendAnswers(answers: Record<string, boolean>) {
    const db = getFirestore(app);

    try {
      await addDoc(collection(db, "percentage"), answers);
      console.log("Respostas enviadas com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar as respostas:", error);
    }
  }

  async function sendEmail(email: Record<string, string>) {
    const db = getFirestore(app);

    try {
      await addDoc(collection(db, "emails"), email);
      console.log("Email enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar as respostas:", error);
    }
  }

  async function sendForm(form: Record<string, string>) {
    const db = getFirestore(app);

    try {
      await addDoc(collection(db, "forms"), form);
      console.log("Formulário enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar as respostas:", error);
    }
  }

  return {
    sendAnswers,
    sendEmail,
    sendForm
  };
}
