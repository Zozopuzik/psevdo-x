import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC16ZZYaMxCDAiPNx2b9xg13qbYotJTD3Q",
  authDomain: "test-task-dzen.firebaseapp.com",
  projectId: "test-task-dzen",
  storageBucket: "test-task-dzen.firebasestorage.app",
  messagingSenderId: "82489381121",
  appId: "1:82489381121:web:fefa253ceba96bddd8cb00",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
