const admin = require('firebase-admin');

const serviceAccount = require('./oxinus-test-firebase-adminsdk-v13we-ea7274cc6b.json'); // Replace with the path to your service account key JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://oxinus-test-default-rtdb.firebaseio.com', // Replace with your Firebase project's database URL
});


module.exports = admin;