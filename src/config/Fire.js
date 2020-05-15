import firebase from 'firebase';

const config = { 
    apiKey: process.env.GOOGLE_FIREBASE_API_KEY,
    authDomain: "sos-data-viz.firebaseapp.com",
    databaseURL: "https://sos-data-viz.firebaseio.com",
    projectId: "sos-data-viz",
    storageBucket: "sos-data-viz.appspot.com",
    messagingSenderId: process.env.GOOGLE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.GOOGLE_FIREBASE_APP_ID,
    measurementId: process.env.GOOGLE_FIREBASE_MEASUREMENT_ID
};

const fire = firebase.initializeApp(config);
export default fire;