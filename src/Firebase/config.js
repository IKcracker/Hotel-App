import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCIPBs49tVKZ2iDSmHysOSYOBcBbcEVI6A",
  authDomain: "hotel-c4f06.firebaseapp.com",
  projectId: "hotel-c4f06",
  storageBucket: "hotel-c4f06.appspot.com",
  messagingSenderId: "820461250825",
  appId: "1:820461250825:web:c5f265176743d82ec78bd8"
};


const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app)
export const db = getFirestore(app)
export const db2 = getStorage(app)