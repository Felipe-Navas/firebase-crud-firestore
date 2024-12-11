// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js'
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCWSrd6pG-SDn3s5LxVV_YlH5Yao8hMoX8',
  authDomain: 'fir-crud-firestore-243af.firebaseapp.com',
  projectId: 'fir-crud-firestore-243af',
  storageBucket: 'fir-crud-firestore-243af.firebasestorage.app',
  messagingSenderId: '992633200455',
  appId: '1:992633200455:web:86f762d54d0af473637662',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore()

export const saveTask = (title, description) => {
  addDoc(collection(db, 'tasks'), { title, description })
}

export const getTasks = () => {
  return getDocs(collection(db, 'tasks'))
}

export const onGetTasks = (callback) => {
  onSnapshot(collection(db, 'tasks'), callback)
}
