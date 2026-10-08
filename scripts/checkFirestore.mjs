import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdnw7AmGLlfc6V7NCvOUn_4DHSnGArQRE",
  authDomain: "dorcas-90019.firebaseapp.com",
  projectId: "dorcas-90019",
  storageBucket: "dorcas-90019.firebasestorage.app",
  messagingSenderId: "244926190004",
  appId: "1:244926190004:web:8c06f9a7cd58e22a50a2e1",
  measurementId: "G-85LZELPGP1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  try {
    const snap = await getDocs(collection(db, "love_story"));
    console.log("Documents in love_story:", snap.size);
    snap.forEach((doc) => {
      console.log(doc.id, JSON.stringify(doc.data()));
    });
  } catch (err) {
    console.error("Error reading Firestore:", err);
  }
}

check();
