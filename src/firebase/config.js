import firebase from 'firebase/compat/app';

import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBp2JpuEvHAfiHruVm9QnqJT0Qd2Ny8Cbc",
    authDomain: "chat-app-2a775.firebaseapp.com",
    projectId: "chat-app-2a775",
    storageBucket: "chat-app-2a775.appspot.com",
    messagingSenderId: "428564026271",
    appId: "1:428564026271:web:6d8131bcf4ec4fff8e23aa",
    measurementId: "G-PMFCCT62H0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// if (window.location.hostname === 'localhost') {
//   // auth.useEmulator('http://localhost:9099');
//   // db.useEmulator('localhost', '8080');
// }

export { db, auth };
export default firebase;