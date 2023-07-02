import {onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword} from "firebase/auth";
import {getAuthInstance} from "./firebase";


export function logOut() {
    const auth = getAuthInstance();
    return new Promise((resolve, reject) => {
        auth
            .signOut()
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}

export function getCurrentUser() {
    const auth = getAuthInstance();
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                // UID !!! not id
                const newUser = user;
                newUser.id = newUser.uid;
                resolve(newUser);
                // console.log(user);
                // ...
            } else {
                // User is signed out
                // ...
                // console.log("error getting user");
                resolve(null);
            }
        });
    });
}


export function isUserAdmin(uid) {
    return new Promise((resolve, reject) => {
        getCurrentUser().then((user) => {
            console.log("isUserAdmin got user", user);
            resolve(!user.isAnonymous);
        });
    });
}


// may be registration or login
export function signInAnonymouslyMy() {
    const auth = getAuthInstance();
    return new Promise((resolve, reject) => {
        signInAnonymously(auth)
            .then(() => {
                resolve("sign in anonymously ok");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                reject(error);
            });
    });
}


export function signInWithEmail(email, password) {
    const auth = getAuthInstance();
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                resolve(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                reject(errorMessage);
            });
    });
}