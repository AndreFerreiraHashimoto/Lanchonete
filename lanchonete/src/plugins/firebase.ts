// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPhoXHSOiX2axtg4HzlWf6uDUOk4ka2Os",
  authDomain: "lanchonete-c78e6.firebaseapp.com",
  projectId: "lanchonete-c78e6",
  storageBucket: "lanchonete-c78e6.firebasestorage.app",
  messagingSenderId: "793989321166",
  appId: "1:793989321166:web:c759b7bd562fcfa7f91b9f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;