
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "Enter your Own Key",
  authDomain: "Enter your Own Key",
  projectId: "Enter your Own Key",
  storageBucket: "Enter your Own Key",
  messagingSenderId: "Enter your Own Key",
  appId: "Enter your Own Key"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getFirestore(app);
