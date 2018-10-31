export const environment = {
    production: false,
    firebase: {
        <API_KEY>,
        authDomain: "todoapp-bw.firebaseapp.com",
        databaseURL: "https://todoapp-bw.firebaseio.com",
        projectId: "todoapp-bw",
        storageBucket: "todoapp-bw.appspot.com",
        messagingSenderId: "983872583803"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';
