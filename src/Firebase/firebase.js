import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyApyEBCDWCSlQpF9F5u-RvSdqIE5_ETRTs",
    authDomain: "ecommerce-5e3a3.firebaseapp.com",
    projectId: "ecommerce-5e3a3",
    storageBucket: "ecommerce-5e3a3.appspot.com",
    messagingSenderId: "80201448133",
    appId: "1:80201448133:web:f49affd38f79422e404eac",
    measurementId: "G-6TRSX14XXQ"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();