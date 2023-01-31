import { getDatabase, ref, set} from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyACwe_RZkDcq_kmuUIy4bVPNxH8aed_L5Y",
  authDomain: "qeq-quien-es-quien.firebaseapp.com",
  databaseURL: "https://qeq-quien-es-quien-default-rtdb.firebaseio.com",
  projectId: "qeq-quien-es-quien",
  storageBucket: "qeq-quien-es-quien.appspot.com",
  messagingSenderId: "279436356044",
  appId: "1:279436356044:web:d50ccc19900c41707e9569"
};
    
const app = initializeApp(firebaseConfig);
const database =getDatabase(app);

export default database;