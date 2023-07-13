
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDj-HkP2fZPyZ1IjiBFOZLp4F19JaBZQEU",
  authDomain: "fir-chatapp-78112.firebaseapp.com",
  projectId: "fir-chatapp-78112",
  storageBucket: "fir-chatapp-78112.appspot.com",
  messagingSenderId: "831686543880",
  appId: "1:831686543880:web:4b4872ec27357013d81fbd"
};


const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getFirestore(app);