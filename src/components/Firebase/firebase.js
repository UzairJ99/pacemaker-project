import app from 'firebase/app';
import 'firebase/auth';

/*
Firebase configuration
All these values are saved in the dotenv file so the public does not have access.
Confidential variables will all go into dotenv files for best practice.
For now during development and testing they will be explicitly initialized here.
*/
const firebaseConfig = {
    apiKey: "AIzaSyCivkeY0dn5_rIx4IkE6wsbLQm6KwsXgrc",
    authDomain: "k04-dcm.firebaseapp.com",
    databaseURL: "https://k04-dcm.firebaseio.com",
    projectId: "k04-dcm",
    storageBucket: "k04-dcm.appspot.com",
    messagingSenderId: "499098820240",
    appId: "1:499098820240:web:80d4a899e01ea772bd0215"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    // create user
    doCreateUser = (email, password) => {
        var authUser = this.auth.createUserWithEmailAndPassword(email, password);
        return authUser;
    }

    // sign in user
    doSignIn = (email, password) => {
        var authUser = this.auth.signInWithEmailAndPassword(email, password);
        return authUser;
    }

    // log off
    doSignOut = () => {
        var authUser = this.auth.signOut();
        return authUser;
    }

}

export default Firebase;