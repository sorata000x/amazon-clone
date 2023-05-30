import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6zkX-TIbJXKZq0TJGadALDMYDCrsr_Mw",
  authDomain: "clone-f93da.firebaseapp.com",
  projectId: "clone-f93da",
  storageBucket: "clone-f93da.appspot.com",
  messagingSenderId: "896195349353",
  appId: "1:896195349353:web:7caeef17a0810fac034bf8",
  measurementId: "G-6SBX0584K5",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = require("firebase/firestore");
const auth = getAuth(firebaseApp)

export { db, auth };
