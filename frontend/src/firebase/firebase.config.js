// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_Sercet_Api,
  authDomain: import.meta.env.VITE_Sercet_Domain,
  projectId: import.meta.env.VITE_Sercet_ProjectId,
  storageBucket: import.meta.env.VITE_Sercet_StorageBucket,
  messagingSenderId: import.meta.env.VITE_Sercet_MessagingSenderId,
  appId: import.meta.env.VITE_Sercet_AppId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app