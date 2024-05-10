import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const btnSignup = document.getElementById('r-submit');
const btnLogin = document.getElementById('l-submit');


const app = initializeApp ({
    apiKey: "AIzaSyAjtQMIpIb9kziwSNR9QcZ8OQ_LLzwFCgA",
    authDomain: "the-botanical-library.firebaseapp.com",
    databaseURL: "https://the-botanical-library-default-rtdb.firebaseio.com",
    projectId: "the-botanical-library",
    storageBucket: "the-botanical-library.appspot.com",
    messagingSenderId: "375387946793",
    appId: "1:375387946793:web:80062bbae24cedc72f8138",
    measurementId: "G-FQXCFF9X98"
});

const auth = getAuth(app);
const db = getFirestore(app);


const displayUsername = async () => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("No user is currently logged in.");
    return;
  }

  const userId = currentUser.uid; // Get the user's UID
  const userDocRef = doc(db, 'users', userId); // Reference to the user's document in Firestore

  try {
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data(); // Get the user data
      const userCreated = userData.username; // Retrieve the username

      const userWelcomeElement = document.getElementById('display-username'); // Ensure correct element
      let html = `${userCreated}`; // Update the element
      userWelcomeElement.innerText = html;
    } else {
      console.error("User document does not exist.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message); // Handle errors
  }
};

  
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in, so display the username
    displayUsername();
  } else {
    console.error("No user is currently logged in.");
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const logOut = document.getElementById("logout-button"); 
  
  if (logOut) {
    logOut.addEventListener('click', (e) => {
      e.preventDefault();
      auth.signOut().then(() => {
        console.log('User logged out!');
        setTimeout(() => {
          window.location.href = 'index.html'; // Redirect after a delay
        }, 500);
      }).catch((error) => {
        console.error('Error during logout:', error.message); // Handle errors
      });
    });
  } else {
    console.error("Logout button not found."); // Handle element not found
  }
});




const loginUserPassword = async (event) => {
  event.preventDefault();
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential);
    console.log('login success');


    setTimeout(() => {
      window.location.href = 'plantbase.html';
    }, 600);

  }

  catch(error) {
    console.log('Login failed: ', error.code, error.message);
  }
}

btnLogin.addEventListener('click', loginUserPassword);



const createAccount = async (event) => {
  event.preventDefault();
  const registerUser = document.getElementById('register-user').value;
  const registerEmail = document.getElementById('register-email').value;
  const registerPassword = document.getElementById('register-password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    const user = userCredential.user;

    const ref = doc(db, 'users', user.uid)
    await setDoc(ref, { username: registerUser})
    console.log('username created and stored successfully!');

    setTimeout(() => {
      window.location.href = 'plantbase.html';
    }, 600);

  }

  catch(error) {
    console.log('Account creation failed: ', error.code, error.message);
  }
};  

btnSignup.addEventListener('click', createAccount);

