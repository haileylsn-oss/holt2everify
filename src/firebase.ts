// firebase.ts
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB9YJ5B6FwKv55qaCzxXQx-6jodlY9RKKM",
  authDomain: "ojairs-6d22f.firebaseapp.com",
  projectId: "ojairs-6d22f",
  storageBucket: "ojairs-6d22f.firebasestorage.app",
  messagingSenderId: "979096643424",
  appId: "1:979096643424:web:a11dd5674f4e2ea56e2005",
  measurementId: "G-E7VF996ZSH"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // This is what you’ll use

export { database, ref, onValue, set };
