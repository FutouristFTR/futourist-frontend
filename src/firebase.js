import firebase from "firebase";
import firebaseConfig from "config/firebase";

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
