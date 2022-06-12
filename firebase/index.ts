import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbVvF_SrGsW81i3mPq13RM_FjnpcOjr3U",
  authDomain: "myfavorites-17746.firebaseapp.com",
  projectId: "myfavorites-17746",
  storageBucket: "myfavorites-17746.appspot.com",
  messagingSenderId: "365779212837",
  appId: "1:365779212837:web:db8539fbcfd2a514057dcc",
  measurementId: "G-Z6C8WT8VLQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
