let firebaseConfig = {
  apiKey: "AIzaSyDNKp2Klf-qgjepxH2YiSlOpFqV8d9SMuY",
  authDomain: "personal-portfolio-604fc.firebaseapp.com",
  projectId: "personal-portfolio-604fc",
  storageBucket: "personal-portfolio-604fc.appspot.com",
  messagingSenderId: "298046408274",
  appId: "1:298046408274:web:49c4d7b9d496d05923418b",
  measurementId: "G-VZVL7L7C2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let db = firebase.firestore();