import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBIY_-LSlwExQ6F0Ibj0o3KUAFrXWWzcLQ",
  authDomain: "ticket-box-staging.firebaseapp.com",
  projectId: "ticket-box-staging",
  storageBucket: "ticket-box-staging.appspot.com",
  messagingSenderId: "678036788945",
  appId: "1:678036788945:web:cd1fab5ffee37d4636d7f0",
  measurementId: "G-NP2HCB5ECR"
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
export default firebase;