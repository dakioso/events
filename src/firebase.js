import {initalizeApp} from 'firebase';

const app = initalizeApp({
        apiKey: "AIzaSyDd4PGh3zRhsLCyk3wxoutcznFTOWLq0Ks",
        authDomain: "events-6e22a.firebaseapp.com",
        databaseURL: "https://events-6e22a.firebaseio.com",
        projectId: "events-6e22a",
        storageBucket: "events-6e22a.appspot.com",
        messagingSenderId: "993497669305"
});

export const db = app.database();
