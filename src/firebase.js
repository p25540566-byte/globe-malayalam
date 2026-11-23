
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzzRPBErruBpIhI4WWKTqm5JNTFYI8G_g",
  authDomain: "globe-malayalam-news.firebaseapp.com",
  projectId: "globe-malayalam-news",
  storageBucket: "globe-malayalam-news.firebasestorage.app",
  messagingSenderId: "111172079260",
  appId: "1:111172079260:web:c7dac6bdc588116c086759"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
