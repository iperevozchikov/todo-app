# TodoApp

TodoApp is the test application to show basic capabilities of Firebase platform and Angular 6+. 
The app has next features:
- Firebase authentication with Google
- Offline mode working with todo notes
- Simultaneous working with editing todo notes
- Viewing archived todo notes
- Simple access control for notes
- Simple and smooth Material UI

Also app has next minor features like route guarding, responsive markup, AOT etc.

[Demo page](https://todoapp-bw.firebaseapp.com/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Firebase platform

The app uses new generation of Firebase Database - Cloud Firestore. About main differences between Cloud Firestore and Firebase Realtime, you may read [here](https://firebase.google.com/docs/database/rtdb-vs-firestore).

## Installation

Run `npm ci` under source root directory. If you want to run app under pre-built firebase project, then just skip this step.
Otherwise you must followed next instruction:
- Get configuration of your project and set it to `src/environment/environment.*.ts`
- Update `.firebaserc` file to using your default project
- Run command `npm run login`, to authorize yourself in firebase-cli
- Run command `npm run firebase -- --only firestore` to initialize db and indexes. Information about indexes stores in `firestore.indexes.json`, and about db rules in `firestore.rules`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. Build command already set to using production environment.

## Deploy

Run `npm run login` if you do it at first time and after it was completed, run `npm run deploy`. 
Firebase tools will upload already built app from `dist` directory into hosting, and also applying db rules and indexes.

## Running unit tests (not implemented yet)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests (not implemented yet)

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
