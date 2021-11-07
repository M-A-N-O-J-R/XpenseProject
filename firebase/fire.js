  
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB86NFpJXpo7qvFZwR7_fyB3brBckPDKBk",
    authDomain: "xpense-1d0c1.firebaseapp.com",
    databaseURL: "http://xpense-1d0c1.firebaseio.com",
    projectId: "xpense-1d0c1",
    storageBucket: "xpense-1d0c1.appspot.com",
    messagingSenderId: "41400402973",
    appId: "1:41400402973:web:28160fbc1f00a121f6b2f4",
    measurementId: "G-GKTG805LPD"
     
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;