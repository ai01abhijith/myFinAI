// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt1j4Lkd6zJEo9_2kc-yZ1ZEt0RS4SO4g", // <--- You need to get this from your Firebase Project settings
  authDomain: "myfinai-68caf.firebaseapp.com",
  projectId: "myfinai-68caf",
  storageBucket: "myfinai-68caf.appspot.com",
  messagingSenderId: "615620065560",
  appId: "1:615620065560:web:f26adb81c513e22285866d",
  measurementId: "G-0WHK4FQ4LQ"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); // Get the Auth service

// Get references to your HTML elements
const authStatusDiv = document.getElementById('auth-status');
const userInfoDiv = document.getElementById('user-info');
const userEmailSpan = document.getElementById('user-email');
const googleSignInButton = document.getElementById('google-sign-in-button');
const signOutButton = document.getElementById('sign-out-button');


// --- Authentication State Observer ---
// This listens for changes in the user's sign-in status
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log("User signed in:", user);
    userEmailSpan.textContent = user.email;
    authStatusDiv.style.display = 'none'; // Hide sign-in section
    userInfoDiv.style.display = 'block'; // Show user info section
  } else {
    // User is signed out
    console.log("User signed out");
    userEmailSpan.textContent = '';
    authStatusDiv.style.display = 'block'; // Show sign-in section
    userInfoDiv.style.display = 'none'; // Hide user info section
  }
});

// --- Event Listener for Google Sign-In Button ---
googleSignInButton.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = result.credential;
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("Google Sign-In Success!", user);
      // The onAuthStateChanged listener above will handle updating the UI
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.error("Google Sign-In Error:", errorCode, errorMessage);
      // ... display error message to user ...
    });
});

// --- Event Listener for Sign Out Button ---
signOutButton.addEventListener('click', () => {
  auth.signOut().then(() => {
    // Sign-out successful.
    console.log("Sign-out successful.");
    // The onAuthStateChanged listener above will handle updating the UI
  }).catch((error) => {
    // An error happened.
    console.error("Sign-out Error:", error);
  });
});

