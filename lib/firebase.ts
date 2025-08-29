import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAog_RDYaxiIo2HLXewWRiOQTAhHPYGnmw",
  authDomain: "ai-hair-salon.firebaseapp.com",
  projectId: "ai-hair-salon",
  storageBucket: "ai-hair-salon.appspot.com",
  messagingSenderId: "1078979706268",
  appId: "1:1078979706268:web:449fc6033052ef04d91c59",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };