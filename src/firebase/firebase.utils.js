import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBesA3QruEcoJT3YGmLDH1gmK_drmWH9LY",
    authDomain: "northhikers-merchandise.firebaseapp.com",
    databaseURL: "https://northhikers-merchandise.firebaseio.com",
    projectId: "northhikers-merchandise",
    storageBucket: "",
    messagingSenderId: "631332734538",
    appId: "1:631332734538:web:6bac5c208ff97e9e2548b3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {

            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (err) {
            console.log("Error creating user", err.message);
            return err.message;
        }
    }
    return userRef;
}

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
