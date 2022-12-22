import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBtG6sQFQeiyD5mOxApnkDI9Z4FzK6SVtc",
  authDomain: "app.ticketboxonline.com",
  projectId: "ticket-box-302a6",
  storageBucket: "ticket-box-302a6.appspot.com",
  messagingSenderId: "685819179355",
  appId: "1:685819179355:web:0168616b10460f16c4ea7e",
  measurementId: "G-79HDBMENVK"
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export default firebase;