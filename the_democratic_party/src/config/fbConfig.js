import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyDutwnfrdOQcJcscemzlUPWRNqKZknTjbA',
  authDomain: 'the-democratic-party.firebaseapp.com',
  databaseURL: 'https://the-democratic-party.firebaseio.com',
  projectId: 'the-democratic-party',
  storageBucket: 'the-democratic-party.appspot.com',
  messagingSenderId: '431328617235',
  appId: '1:431328617235:web:c90889c0345b6d67',
};
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
