
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDufzCmxHbKhtjY8I09rolVrSQcAfaLmyM",
  authDomain: "assesment-5b7ec.firebaseapp.com",
  projectId: "assesment-5b7ec",
  storageBucket: "assesment-5b7ec.appspot.com",
  messagingSenderId: "122397802624",
  appId: "1:122397802624:web:64c513fa1f92b8629ba665"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);