// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getDatabase, child, ref, set, get } from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlLJAnOy-sSe9mknnf4KYdb9ToBOje2ps",
  authDomain: "wave-801a3.firebaseapp.com",
  projectId: "wave-801a3",
  storageBucket: "wave-801a3.appspot.com",
  messagingSenderId: "149847609223",
  appId: "1:149847609223:web:e7f6fa716851fb79590d22",
  databaseURL: "https://wave-801a3-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app)

function writeUserData(userId, email, password) {
  return set(ref(database, `users/${userId}`), {
    email,
    password
  })
}

const getUser = (userId) => {
  // Обернули промис в промис
  // Изначально я не понимал почему 
  // get.then( (snapshot)=> return snapshot.val())
  // Ничего не возвращет в функцию getUser в которой он прописан
  // Это потому что он возвращал в контекст then()
  // Нельзя вернуть зн-е из промиса из функции в которой он вызван
  // Сейчас он возвращает результат в resolve который стоит выше в контексте
  // Мы вызываем промис который вызывает другой пропис и получает его результат в resolve
  // Всё это чтобы пользователю не пришлось вызывать get(..) и потом делать result.val()
  const dbRef = ref(database)
  const getUserFireBasePromise = get(child(dbRef, `users/${userId}`)) // Promise
  return new Promise( (resolve, reject) => {
    getUserFireBasePromise
      .then( snapshot => {
        if (snapshot.exists()) {
          resolve(snapshot.val())
        }
        else {
          reject( Error("No data available"))
        }
      })
      .catch( error => {
        reject(error)
      })

  })
}

export const api = () => {
    return getUser(0)
};