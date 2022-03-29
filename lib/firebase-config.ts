import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbVvF_SrGsW81i3mPq13RM_FjnpcOjr3U",
  authDomain: "myfavorites-17746.firebaseapp.com",
  projectId: "myfavorites-17746",
  storageBucket: "myfavorites-17746.appspot.com",
  messagingSenderId: "365779212837",
  appId: "1:365779212837:web:db8539fbcfd2a514057dcc",
  measurementId: "G-Z6C8WT8VLQ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
