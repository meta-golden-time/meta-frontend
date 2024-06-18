import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

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
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // 성공적인 로그인 후 결과 처리
    console.log(result.user);
  } catch (error) {
    console.error(error);
  }
};
export { app, auth, signInWithGoogle };