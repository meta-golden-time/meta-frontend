import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGwGGwfFQ5cz7ml1w_yOWbfrkb7jBtqMU",
  authDomain: "maps-86696.firebaseapp.com",
  projectId: "maps-86696",
  storageBucket: "maps-86696.appspot.com",
  messagingSenderId: "911910709381",
  appId: "1:911910709381:web:8f45b08e415af83ef161ec",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };