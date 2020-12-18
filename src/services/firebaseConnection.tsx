import * as firebase from 'firebase';
// import 'firebase/storage';
// import 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDshDhBhUWKGONciyb1-L4PCECZk29RcRQ",
  authDomain: "rodas-presas.firebaseapp.com",
  databaseURL: "https://rodas-presas.firebaseio.com",
  projectId: "rodas-presas",
  storageBucket: "rodas-presas.appspot.com",
  messagingSenderId: "1005561457722",
  appId: "1:1005561457722:web:99b9b0621e6f2a73efd903",
  measurementId: "G-JKSRMKNW2J"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
